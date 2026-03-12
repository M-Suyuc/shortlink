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
        <DropdownMenuLabel className="text-secondary">{session.name}</DropdownMenuLabel>
        <DropdownMenuLabel className="text-accent py-0 font-light">
          {session.email}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem asChild className="cursor-pointer py-2">
          <Link
            href="/home"
            target="_blank"
            className="text-sm w-full h-full text-accent gap-2"
          >
            <LucideHome className="size-4 text-accent" />
            Home Page
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild className="cursor-pointer py-2">
          <Link
            href="/dashboard"
            className="text-sm w-full h-full text-accent gap-2"
          >
            <BoxesIcon className="size-4 text-accent" />
            Dashboard
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild className="cursor-pointer py-2">
          <Link
            href="/dashboard"
            className="text-sm w-full h-full text-accent gap-2"
          >
            <Settings className="size-4 text-accent" />
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
          className="cursor-pointer text-sm w-full h-full text-accent gap-2"
        >
          <LogOut className="size-4 text-accent" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
