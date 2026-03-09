"use client";

import * as React from "react";
import { Home, Pill, ShoppingBag, Utensils, Apple } from "lucide-react";
import { ExpandableTabs as ExpandableTabsBase } from "@/components/ui/expandable-tabs";

export type ModuleTab = "inicio" | "medicamentos" | "produtos" | "restaurantes" | "nutricao";

interface Tab {
  id: ModuleTab;
  icon: React.ElementType;
  label: string;
}

const TABS: Tab[] = [
  { id: "inicio", icon: Home, label: "Início" },
  { id: "medicamentos", icon: Pill, label: "Remédios" },
  { id: "produtos", icon: ShoppingBag, label: "Produtos" },
  { id: "restaurantes", icon: Utensils, label: "Restaurantes" },
  { id: "nutricao", icon: Apple, label: "Nutrição" },
];

interface ExpandableTabsProps {
  activeTab: ModuleTab;
  onTabChange: (tab: ModuleTab) => void;
}

// ─── MOBILE NAV (full-width app-style bottom bar) ────────────────────────────
const MobileNav = ({ activeTab, onTabChange }: ExpandableTabsProps) => (
  <nav
    className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-card border-t border-border"
    style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
  >
    <div className="flex items-stretch">
      {TABS.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`relative flex-1 flex flex-col items-center justify-center gap-0.5 py-2.5 transition-colors duration-200 ${
              isActive ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <Icon
              size={isActive ? 22 : 20}
              strokeWidth={isActive ? 2.2 : 1.8}
              className="transition-all duration-200"
            />
            <span
              className={`text-[10px] font-semibold leading-tight transition-all duration-200 ${
                isActive ? "opacity-100" : "opacity-70"
              }`}
            >
              {tab.label}
            </span>
            {isActive && (
              <span className="absolute bottom-0 w-6 h-0.5 rounded-full bg-primary" />
            )}
          </button>
        );
      })}
    </div>
  </nav>
);

// ─── DESKTOP NAV (floating pill) ─────────────────────────────────────────────
const DesktopNav = ({ activeTab, onTabChange }: ExpandableTabsProps) => {
  const tabs = TABS.map((tab) => ({
    title: tab.label,
    icon: tab.icon,
  }));

  const handleChange = (index: number | null) => {
    if (index !== null && index < TABS.length) {
      onTabChange(TABS[index].id);
    }
  };

  return (
    <div className="hidden lg:block fixed bottom-6 z-50 left-[calc(50%+8rem)] -translate-x-1/2">
      <ExpandableTabsBase
        tabs={tabs as any}
        className="bg-card border border-border rounded-full shadow-card"
        defaultSelected={TABS.findIndex((t) => t.id === activeTab)}
        onChange={handleChange}
      />
    </div>
  );
};

// ─── EXPORT ───────────────────────────────────────────────────────────────────
const ExpandableTabs = (props: ExpandableTabsProps) => (
  <>
    <MobileNav {...props} />
    <DesktopNav {...props} />
  </>
);

export default ExpandableTabs;
