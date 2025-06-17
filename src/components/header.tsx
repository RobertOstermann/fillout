import React from "react";

import { FilloutIcon } from "@/images/fillout";

export function Header() {
  return (
    <>
      <header className="fixed z-50 flex h-(--header-height) w-full items-center px-8 pt-4">
        <div className="bg-app-header/75 text-primary flex h-full w-full items-center justify-between gap-2 rounded-xl px-4 shadow-xl">
          <FilloutIcon className="text-primary ml-8 scale-125" />
          <h1 className="from-background-primary via-primary to-primary bg-linear-to-t bg-clip-text text-xl font-bold text-transparent md:text-3xl">
            Robert Ostermann
          </h1>
        </div>
      </header>
      <div id="header-placeholder" className="h-(--header-height) w-full" />
    </>
  );
}
