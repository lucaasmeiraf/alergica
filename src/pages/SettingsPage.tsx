import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Settings, Bell, Shield, Palette, Menu } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import ChatWidget from "@/components/ChatWidget";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Drawer, DrawerContent } from "@/components/ui/drawer";

const SettingsPage = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar - Desktop */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Mobile Drawer */}
      <Drawer open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <DrawerContent className="h-[85vh]">
          <Sidebar isDrawer={true} onClose={() => setSidebarOpen(false)} />
        </DrawerContent>
      </Drawer>

      <main className="flex-1 lg:ml-64 w-full">
        <div className="w-full h-full p-4 md:p-6 lg:p-8">
          <div className="w-full max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-6 lg:mb-10 animate-fade-in">
              <div className="flex items-center justify-between mb-3 gap-3">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-2 rounded-md bg-card"
                >
                  <Menu className="w-5 h-5 text-foreground" />
                </button>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate(-1)}
                  className="p-2 rounded-md bg-card"
                >
                  ←
                </button>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-foreground">Configurações</h1>
                  <p className="text-sm md:text-base text-muted-foreground mt-1">
                    Personalize sua experiência no AlerGica
                  </p>
                </div>
              </div>
            </div>

            {/* Settings Cards */}
            <div className="space-y-4 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <Card className="card-soft">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-base">
                    <Bell className="w-5 h-5 text-primary" />
                    Notificações
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Configurações de notificações serão disponibilizadas em breve.
                  </p>
                </CardContent>
              </Card>

              <Card className="card-soft">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-base">
                    <Shield className="w-5 h-5 text-primary" />
                    Privacidade e Segurança
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Configurações de privacidade serão disponibilizadas em breve.
                  </p>
                </CardContent>
              </Card>

              <Card className="card-soft">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-base">
                    <Palette className="w-5 h-5 text-primary" />
                    Aparência
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Use o botão de tema na barra lateral para alternar entre modo claro e escuro.
                  </p>
                </CardContent>
              </Card>

              <Card className="card-soft">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-base">
                    <Settings className="w-5 h-5 text-primary" />
                    Sobre o AlerGica
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    AlerGica ajuda famílias a identificar medicamentos e produtos seguros para crianças com APLV e outras alergias alimentares.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <ChatWidget />
    </div>
  );
};

export default SettingsPage;
