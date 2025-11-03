"use client";

import { ReactNode } from "react";
import Sidebar from "@/components/layout/Sidebar";
import RequireAuth from "@/components/RequireAuth";

export default function Layout({ children }: { children: ReactNode }) {

  return (
    <RequireAuth>
      <div
        className="flex h-screen flex-col overflow-hidden transition-colors"
      >
        <div className={`flex flex-1 overflow-hidden gap-4`}>
          <Sidebar />
          <main className="flex-1 min-w-0 p-4 overflow-y-auto hide-scrollbar">
            {children}
          </main>
        </div>
      </div>
    </RequireAuth>
  );
}