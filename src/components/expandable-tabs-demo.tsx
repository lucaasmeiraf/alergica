import { Bell, Home, HelpCircle, Settings, Shield, Mail, User, FileText, Lock } from "lucide-react";
import { ExpandableTabs } from "@/components/ui/expandable-tabs";

function DefaultDemo() {
  const tabs = [
    { title: "Dashboard", icon: Home },
    { title: "Notifications", icon: Bell },
    { type: "separator" },
    { title: "Settings", icon: Settings },
    { title: "Support", icon: HelpCircle },
    { title: "Security", icon: Shield },
  ];

  return (
    <div className="flex flex-col gap-4 p-8">
      <h2 className="text-lg font-semibold">Default ExpandableTabs</h2>
      <ExpandableTabs 
        tabs={tabs as any}
        onChange={(index) => console.log("Selected tab:", index)}
      />
    </div>
  );
}

function CustomColorDemo() {
  const tabs = [
    { title: "Profile", icon: User },
    { title: "Messages", icon: Mail },
    { type: "separator" },
    { title: "Documents", icon: FileText },
    { title: "Privacy", icon: Lock },
  ];

  return (
    <div className="flex flex-col gap-4 p-8">
      <h2 className="text-lg font-semibold">Custom Color ExpandableTabs</h2>
      <ExpandableTabs 
        tabs={tabs as any}
        activeColor="text-blue-500"
        className="border-blue-200 dark:border-blue-800"
        onChange={(index) => console.log("Selected tab:", index)}
      />
    </div>
  );
}

export { DefaultDemo, CustomColorDemo };
