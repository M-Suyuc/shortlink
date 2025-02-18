"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BoxesIcon, LogOut, LucideHome, Settings } from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export function MenuProfile({ session }: { session: any }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Image
          className="w-8 h-8 rounded-full cursor-pointer"
          src={session.image}
          alt="user photo"
          width={100}
          height={100}
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-64 mr-6 mt-3 py-4 rounded-md">
        <DropdownMenuLabel>{session.name}</DropdownMenuLabel>
        <DropdownMenuLabel className="text-foreground/60 py-0 font-light">
          {session.email}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem asChild className="cursor-pointer  py-2">
          <Link
            href="/home"
            target="_blank"
            className="text-sm w-full h-full text-foreground/80 flex items-center"
          >
            <LucideHome className="size-[18px] mr-3 text-foreground/80" />
            Home Page
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild className="cursor-pointer py-2">
          <Link
            href="/dashboard"
            className="text-sm w-full h-full text-foreground/80 flex items-center"
          >
            <BoxesIcon className="size-[18px] mr-3 text-foreground/80" />
            Dashboard
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild className="cursor-pointer py-2">
          <Link
            href="/dashboard"
            className="text-sm w-full h-full text-foreground/80 flex items-center "
          >
            <Settings className="size-[18px] mr-3 text-foreground/80" />
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() =>
            signOut({
              callbackUrl: "/",
            })
          }
          className="cursor-pointer text-sm w-full h-full text-foreground/80"
        >
          <LogOut className="size-[18px] mr-3 text-foreground/80" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
