"use client";

import Link from "next/link";
import { menus } from "@/constants/menus";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function AdminSidebar() {

  const pathname = usePathname();
  const [basePath, setBasePath] = useState<string | null>(null);

  useEffect(() => {
    if (pathname) {
      const part = pathname.split("/")[2];
      setBasePath(part);
    }
  }, [pathname]);

  return (
    <>
      <aside
        className="h-full overflow-hidden bg-black text-sm w-64 py-4"
      >
        <div className="text-white font-bold text-3xl mb-4 text-center">TEST BREND</div>
        <div className="h-full">
          <nav className="flex flex-col gap-1">
            {menus.map((item, idx) =>
              <Link
                key={idx}
                href={item.link}
                className={`text-white p-2 ${item.link.split("/")[2] === basePath ? "bg-gray-800" : ""}`}
              >
                {item.title}
              </Link>
            )}
          </nav>
        </div>
      </aside>
    </>
  );
}