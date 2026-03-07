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
  { id: "medicamentos", icon: Pill, label: "Medicamentos" },
  { id: "produtos", icon: ShoppingBag, label: "Produtos" },
  { id: "restaurantes", icon: Utensils, label: "Restaurantes" },
  { id: "nutricao", icon: Apple, label: "Nutrição" },
];

interface ExpandableTabsProps {
  activeTab: ModuleTab;
  onTabChange: (tab: ModuleTab) => void;
}

const ExpandableTabs = ({ activeTab, onTabChange }: ExpandableTabsProps) => {
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
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 lg:left-[calc(50%+8rem)]">
      <ExpandableTabsBase
        tabs={tabs as any}
        className="bg-card border border-border rounded-full"
        defaultSelected={TABS.findIndex((t) => t.id === activeTab)}
        onChange={handleChange}
      />
    </div>
  );
};

export default ExpandableTabs;
