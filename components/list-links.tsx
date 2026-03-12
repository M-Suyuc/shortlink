"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Copy, LoaderIcon, Trash2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "ms-ui-toast";
import { useOrigin } from "@/hooks/use-origin";
import clsx from "clsx";
import { EditLink } from "./modals/edit-link-form";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { DialogTitle } from "@radix-ui/react-dialog";

interface Link {
  id: string;
  url: string;
  shortLink: string;
  description?: string | null;
  createdAt: Date;
}

interface Props {
  data: Link[];
}

export const ListLinks: React.FC<Props> = ({ data }) => {
  const [loading, setloading] = useState(false);
  const [open, setOpen] = useState(false);
  const [viewMode, setViewMode] = useState("grid");

  const searchParams = useSearchParams();
  const origin = useOrigin();
  const search = searchParams.get("search");
  const view = searchParams.get("view");
  const router = useRouter();

  useEffect(() => {
    if (view) {
      setViewMode(view);
    }
  }, [view]);

  const onDelete = async (id: string) => {
    try {
      setloading(true);
      await axios.delete(`/api/shortUrl/${id}`);
      toast.success({ title: "ShortLink deleted" });
      router.refresh();
    } catch (error: any) {
      console.error("Error:", error);
      toast.error(
        { title: error.response?.data?.message || "An error occurred" }
      );
    } finally {
      setloading(false);
      setOpen(false);
    }
  };

  const onCopy = async (shortLink: string) => {
    const url = `${origin}/${shortLink}`;
    navigator.clipboard.writeText(url);
    toast.success({ title: "Copied" });
  };

  return (
    <>
      {data && (
        <div
          className={clsx(
            "flex flex-col gap-4 sm:grid-cols-2 md:grid-cols-3",
            {
              "grid gap-4 md:grid-cols-3": viewMode === "grid",
            }
          )}
        >
          {data.map((item: Link) => {
            const formatDate = item.createdAt.toLocaleDateString("en-us", {
              year: "numeric",
              day: "numeric",
              month: "short",
            });

            return (
              <article
                key={item.id}
                className={clsx(
                  "flex flex-col gap-2 p-4 rounded-md outline-solid outline-[.1px] outline-zinc-800 overflow-hidden",
                  {
                    " gap-0": viewMode !== "grid",
                  }
                )}
              >
                <div className="flex justify-between">
                  <p className="text-secondary-foreground ">
                    {item.shortLink}
                  </p>
                  <div className="flex">
                    {/* Edit btn */}
                    <EditLink id={item.id} url={item.url} shortLink={item.shortLink} description={item.description ?? ``} />

                    {/* Copy btn */}
                    <TooltipProvider delayDuration={300}>
                      <Tooltip>
                        <TooltipTrigger
                          asChild
                          onClick={() => onCopy(item.shortLink)}
                        >
                          <Copy
                            size={38}
                            className="cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-800   p-2.5 rounded-md dark:stroke-[#e9e9e9e9]"
                          />
                        </TooltipTrigger>
                        <TooltipContent>Copy</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    {/* Delete btn */}
                    <Dialog open={open} onOpenChange={setOpen}>
                      <DialogTrigger asChild className="cursor-pointer">
                        <div>
                          <TooltipProvider delayDuration={300}>
                            <Tooltip>
                              <TooltipTrigger
                                asChild
                                onClick={() => setOpen(true)}
                              >
                                <Trash2
                                  size={38}
                                  className="cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-800   p-2.5 rounded-md dark:stroke-[#e9e9e9e9]"
                                />
                              </TooltipTrigger>
                              <TooltipContent>Delete</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </DialogTrigger>
                      <DialogContent className="w-11/12 md:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Are you sure?</DialogTitle>
                        </DialogHeader>
                        <DialogDescription>This action cannot be undone.</DialogDescription>

                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant="ghost" className="cursor-pointer" onClick={() => setOpen(false)}>Cancel</Button>
                          </DialogClose>
                          <Button type="submit" variant="destructive" form="form-rhf-input" className="gap-2 cursor-pointer" disabled={loading} onClick={() => onDelete(item.id)}>
                            {
                              loading
                                ?
                                <LoaderIcon size={16} className="ml-2 animate-spin" />
                                :
                                <Trash2 size={16} className="ml-2" />
                            }
                            <span>
                              {loading ? 'Deleting...' : 'Delete'}
                            </span>
                          </Button>
                        </DialogFooter>

                      </DialogContent>
                    </Dialog>
                  </div>
                </div>

                <h3 className="text-neutral-500 truncate">{item.url}</h3>
                {/* <p>{item.clicks} clicks</p> */}
                <p className="text-sm text-neutral-500 h-6 truncate ">
                  {item.description}
                </p>
                <p className="text-end text-sm text-foreground/50">
                  {formatDate}
                </p>
              </article>
            );
          })}
        </div>
      )}

      {!data && (
        <div className="border border-amber-500 w-full p-4">

          <span className="text-xl text-center z-50 relative mt-10 w-full inline-block selection:not-sr-only text-neutral-100 dark:text-neutral-100">
            &apos;{search}&apos; not Found
          </span>
        </div>
      )}
    </>
  );
};
