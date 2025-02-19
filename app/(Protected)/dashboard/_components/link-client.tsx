"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import {
  LayoutGrid,
  LayoutGridIcon,
  List,
  ListIcon,
  Plus,
  Search,
} from "lucide-react";
import clsx from "clsx";
import { useModalContext } from "@/context/modal";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LinkClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { showModal } = useModalContext();

  const handleRedirect = () => {
    router.push(`${pathname}/link/new`);
    showModal();
  };

  const handleSearch = useDebouncedCallback((search: string) => {
    const params = new URLSearchParams(searchParams);
    if (search) {
      params.set("search", search);
    } else {
      params.delete("search");
    }

    router.replace(`${pathname}?${params.toString()}`);
  }, 400);

  const handleViewItems = (view: string) => {
    const params = new URLSearchParams(searchParams);
    if (view) {
      params.set("view", view);
    } else {
      params.delete("view");
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <nav className="my-4 flex items-center gap-3 h-11">
      {/* search */}
      <div className="h-full flex-1 relative text-zinc-600">
        <Search className="absolute top-1/2 transform -translate-y-1/2 tras left-2 sm:left-4 size-3 sm:size-6 " />
        <Input
          placeholder="Search your shortLink"
          className="h-full text-xs sm:text-xl placeholder:text-xs sm:placeholder:text-base pl-6 sm:pl-14 "
          onChange={(event) => handleSearch(event.target.value)}
          defaultValue={searchParams.get("search")?.toString()}
        />
      </div>
      {/* views */}
      <div className="hidden h-full min-h-fit md:flex items-center border rounded-md">
        <LayoutGridIcon
          className={clsx(
            "cursor-pointer text-zinc-500 p-1 size-8 rounded-sm m-1",
            {
              "bg-secondary": searchParams.get("view") === "grid",
            }
          )}
          onClick={() => handleViewItems("grid")}
        />
        <ListIcon
          className={clsx(
            "cursor-pointer text-zinc-500 p-1 size-8 rounded-sm m-1",
            {
              "bg-secondary": searchParams.get("view") === "list",
            }
          )}
          onClick={() => handleViewItems("list")}
        />
      </div>
      {/* btn create*/}
      <Button
        className="flex gap-2 bg-black text-white h-full"
        onClick={handleRedirect}
      >
        <Plus className="md:size-5 size-4" />
        Create Link
      </Button>
    </nav>
  );
}
