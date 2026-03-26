import { useState } from "react";
import { Settings, Bell, Search, Shield, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Configuracoes() {
  const [keywords, setKeywords] = useState("TI, Infraestrutura, Software, Servidores");
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifPrazos, setNotifPrazos] = useState(true);

  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-3xl">
      <div>
        <h1 className="text-2xl font-semibold text-foreground tracking-tight">Configurações</h1>
        <p className="text-sm text-muted-foreground mt-1">Preferências da plataforma</p>
      </div>

      {/* Keywords */}
      <div className="glass-card p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Search className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">Palavras-chave do Radar</h3>
        </div>
        <p className="text-xs text-muted-foreground">Editais serão filtrados automaticamente com base nestas palavras.</p>
        <textarea
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          className="w-full h-20 bg-secondary rounded-lg px-4 py-3 text-sm text-foreground border border-border focus:border-primary focus:outline-none resize-none"
          placeholder="Separe por vírgula..."
        />
      </div>

      {/* Notifications */}
      <div className="glass-card p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">Notificações</h3>
        </div>
        <ToggleRow label="Alertas por e-mail" desc="Receber avisos de novos editais" value={notifEmail} onChange={setNotifEmail} />
        <ToggleRow label="Alertas de prazos" desc="Notificar 24h antes do vencimento" value={notifPrazos} onChange={setNotifPrazos} />
      </div>

      {/* Profile */}
      <div className="glass-card p-6 space-y-4">
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">Perfil da Empresa</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <InputField label="Razão Social" defaultValue="Tech Solutions Ltda" />
          <InputField label="CNPJ" defaultValue="12.345.678/0001-90" />
        </div>
      </div>

      <Button className="gradient-cobalt text-primary-foreground glow-cobalt">
        <Settings className="w-4 h-4 mr-1" /> Salvar Configurações
      </Button>
    </div>
  );
}

function ToggleRow({ label, desc, value, onChange }: { label: string; desc: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground">{desc}</p>
      </div>
      <button
        onClick={() => onChange(!value)}
        className={cn(
          "w-10 h-6 rounded-full transition-colors relative",
          value ? "bg-primary" : "bg-secondary"
        )}
      >
        <div className={cn(
          "w-4 h-4 rounded-full bg-foreground absolute top-1 transition-transform",
          value ? "translate-x-5" : "translate-x-1"
        )} />
      </button>
    </div>
  );
}

function InputField({ label, defaultValue }: { label: string; defaultValue: string }) {
  return (
    <div>
      <label className="text-xs text-muted-foreground mb-1 block">{label}</label>
      <input
        defaultValue={defaultValue}
        className="w-full bg-secondary rounded-lg px-4 py-2 text-sm text-foreground border border-border focus:border-primary focus:outline-none"
      />
    </div>
  );
}
