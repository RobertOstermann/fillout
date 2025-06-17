import React from "react";
import Link from "next/link";

import { FilloutIcon } from "@/images/fillout";

export function AppHeader() {
  return (
    <>
      <header className="fixed z-50 flex h-(--header-height) w-full items-center px-8 pt-4">
        <div className="bg-app-header text-primary flex h-full w-full items-center justify-between gap-2 rounded-xl px-4 shadow-xl">
          <Link href="/">
            <FilloutIcon className="text-primary ml-3 scale-125 sm:ml-8" />
          </Link>
          <h1 className="from-background-primary via-primary to-primary bg-linear-to-t bg-clip-text pl-4 text-end font-bold text-transparent sm:text-2xl md:text-3xl">
            Robert Ostermann
          </h1>
        </div>
      </header>
      <div id="header-placeholder" className="min-h-(--header-height)" />
    </>
  );
}
