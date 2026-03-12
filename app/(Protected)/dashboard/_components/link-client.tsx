"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import {
  LayoutGridIcon,
  ListIcon,
  Search,
} from "lucide-react";
import clsx from "clsx";

import { Input } from "@/components/ui/input";
import { CreateLink } from "@/components/modals/create-link-form";

export function NavbarDashboard() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();


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
    <>
      <nav className="max-w-(--breakpoint-2xl) py-5 mx-auto">
        <div className="flex items-center gap-1.5 w-full h-11">
          {/* search */}
          <div className="h-full flex-1 relative">
            <Search className="absolute top-1/2 transform -translate-y-1/2 left-2 sm:left-4 size-3.5 sm:size-5 text-zinc-400" />
            <Input
              placeholder="Search your shortLink"
              className="h-full text-xs sm:text-xl text-secondary placeholder:text-xs sm:placeholder:text-base pl-6 sm:pl-11 focus-visible:ring-neutral-300 dark:focus-visible:ring-neutral-700"
              onChange={(event) => handleSearch(event.target.value)}
              defaultValue={searchParams.get("search")?.toString()}
            />
          </div>
          {/* views */}
          <div className="hidden h-full min-h-fit md:flex items-center gap-1.5 rounded-md">
            <span className={clsx("h-full border border-neutral-100 dark:border-neutral-800 inline-flex items-center rounded-md p-3 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer",
              {
                "bg-neutral-200 dark:bg-neutral-800": searchParams.get("view") === "grid",
              })}
              onClick={() => handleViewItems("grid")}
            >
              <LayoutGridIcon
                className="size-5"
              />
            </span>
            <span className={clsx("h-full border border-neutral-100 dark:border-neutral-800 inline-flex items-center rounded-md p-3 hover:bg-neutral-200 dark:hover:bg-neutral-800 cursor-pointer",
              {
                "bg-neutral-200 dark:bg-neutral-800": searchParams.get("view") === "list",
              })}
              onClick={() => handleViewItems("list")}
            >
              <ListIcon
                className={"size-5"}
              />
            </span>
          </div>
          {/* btn create*/}
          <CreateLink />

        </div>
      </nav>
    </>
  );
}
