"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";

import { SIDEBAR_SECTIONS } from "../constants/dashboard";

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export default function MobileDrawer({
  open,
  onClose,
  user,
}: MobileDrawerProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Overlay */}

      <div
        onClick={onClose}
        className={`fixed inset-0 z-[90] bg-black/50 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          open
            ? "opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      {/* Drawer */}

      <aside className={`fixed top-0 left-0 bottom-0 z-[100] flex w-[300px] flex-col border-r border-[var(--border)] bg-[var(--sidebar)] transition-transform duration-300 ease-in-out md:hidden ${ open ? "translate-x-0" : "-translate-x-full" }`}
      >
        {/* Header */}

        <div className="flex h-[var(--navbar-height)] items-center justify-between border-b border-[var(--border)] px-6">
          <h1 className="text-xl font-bold tracking-tight">
            Convert
            <span className="text-[var(--accent)]">
              IQ
            </span>
          </h1>

          <button className="flex h-9 w-9 items-center justify-center rounded-xl text-[var(--text-secondary)] transition hover:bg-[var(--card)]"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}

        <div className="flex-1 overflow-y-auto px-4 py-6">
          {SIDEBAR_SECTIONS.map((section) => (
            <div
              key={section.title}
              className="mb-8"
            >
              <p className="mb-3 px-3 text-xs uppercase tracking-[0.15em] text-[var(--text-secondary)]">
                {section.title}
              </p>

              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;

                  const active =
                    pathname === item.href;

                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={onClose}
                      className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all ${
                        active
                          ? "bg-[var(--card)] text-[var(--text-primary)]"
                          : "text-[var(--text-secondary)] hover:bg-[var(--card)] hover:text-[var(--text-primary)]"
                      }`}
                    >
                      <Icon size={18} />

                      <span>
                        {item.label}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* User */}

        <div className="border-t border-[var(--border)] p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--accent)] font-semibold text-white">
              {user?.name?.charAt(0) ?? "U"}
            </div>

            <div className="min-w-0">
              <p className="truncate font-medium">
                {user?.name ?? "User"}
              </p>

              <p className="truncate text-sm text-[var(--text-secondary)]">
                {user?.email}
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}