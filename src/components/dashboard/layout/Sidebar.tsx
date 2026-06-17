'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ChevronsLeft,
  ChevronsRight,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';
import { useState } from 'react';

import { SIDEBAR_SECTIONS } from '../constants/dashboard';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();

  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    AI: true,
    Communication: false,
    Management: false,
    Settings: false,
  });

  const toggleSection = (title: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <aside
      className="h-full overflow-y-auto bg-[var(--sidebar)] border-r border-[var(--border)] transition-all duration-300"
    >
      {/* Top Actions */}

      <div className="h-16 px-4 flex items-center justify-between">
        {!collapsed && (
          <button className="flex-1 mr-3 px-4 py-2.5 rounded-xl bg-[var(--card)] border border-[var(--border)] text-sm font-medium hover:border-[var(--accent)] transition"
          >
            + New Chat
          </button>
        )}

        <button onClick={onToggle} className="w-8 h-8 rounded-lg flex items-center justify-center text-[var(--text-secondary)] hover:bg-[var(--card)] transition"
        >
          {collapsed ? <ChevronsRight size={18} /> : <ChevronsLeft size={18} />}
        </button>
      </div>

      {/* Sections */}

      <div className="px-3 pb-6">
        {SIDEBAR_SECTIONS.map((section) => {
          const isOpen = openSections[section.title];

          return (
            <div key={section.title} className="mb-4">
              {/* Section Header */}

              {!collapsed && (
                <button onClick={() => toggleSection(section.title)} className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs uppercase tracking-[0.15em] text-[var(--text-secondary)] hover:bg-[var(--card)] transition"
                >
                  <span>{section.title}</span>

                  {isOpen ? (
                    <ChevronDown size={14} />
                  ) : (
                    <ChevronRight size={14} />
                  )}
                </button>
              )}

              {/* Section Items */}

              {(collapsed || isOpen) && (
                <div className="space-y-1 mt-2">
                  {section.items.map((item) => {
                    const Icon = item.icon;

                    const active =
                      pathname === item.href ||
                      pathname.startsWith(`${item.href}/`);

                    return (
                      <Link key={item.label} href={item.href}
					  className={`
                          flex
                          items-center
                          gap-3
                          px-3
                          py-3
                          rounded-xl
                          text-sm
                          font-medium
                          transition-all
                          ${
                            active
                              ? `
                                bg-[var(--card)]
                                text-[var(--text-primary)]
                                border
                                border-[var(--accent)]
                              `
                              : `
                                text-[var(--text-secondary)]
                                hover:bg-[var(--card)]
                                hover:text-[var(--text-primary)]
                              `
                          }
                        `}
                      >
                        <Icon size={18} className="shrink-0" />

                        {!collapsed && <span>{item.label}</span>}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}
