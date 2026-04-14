"use client";

import { useEffect, useRef, useState } from "react";
import { Ellipsis, Pencil, Trash2 } from "lucide-react";

export default function ProductCardMenu({ onEdit }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-white text-slate-700 shadow-sm"
      >
        <Ellipsis size={22} />
      </button>

      {open && (
        <div className="absolute right-0 top-14 z-20 w-48 rounded-2xl border border-gray-200 bg-white p-2 shadow-lg">
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              onEdit?.();
            }}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-lg text-slate-700 hover:bg-gray-50"
          >
            <Pencil size={18} />
            Edit
          </button>

          <button
            type="button"
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-lg text-slate-700 hover:bg-gray-50"
          >
            <Trash2 size={18} />
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
