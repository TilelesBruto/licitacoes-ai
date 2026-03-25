import { useState, useEffect } from "react";
import { MessageSquare, X, Bell } from "lucide-react";
import { cn } from "@/lib/utils";

const mockMessages = [
  { id: 1, time: "14:32", source: "Compras.gov.br", msg: "Pregão 045/2025 - Novo esclarecimento publicado" },
  { id: 2, time: "14:28", source: "Compras.gov.br", msg: "Pregão 038/2025 - Sessão remarcada para 28/03" },
  { id: 3, time: "14:15", source: "Sistema", msg: "Prazo de impugnação PE 041/2025 vence em 2h" },
  { id: 4, time: "13:50", source: "Compras.gov.br", msg: "Novo edital publicado - TI Infraestrutura" },
  { id: 5, time: "13:30", source: "Sistema", msg: "Análise do Edital PE 050/2025 concluída" },
];

export default function ChatMonitor() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(mockMessages.slice(0, 2));

  useEffect(() => {
    if (messages.length >= mockMessages.length) return;
    const timer = setTimeout(() => {
      setMessages((prev) => [...mockMessages.slice(0, prev.length + 1)]);
    }, 5000);
    return () => clearTimeout(timer);
  }, [messages.length]);

  return (
    <>
      {/* FAB */}
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center transition-all",
          "gradient-cobalt glow-cobalt hover:scale-105 pulse-dot"
        )}
      >
        {open ? (
          <X className="w-5 h-5 text-primary-foreground" />
        ) : (
          <MessageSquare className="w-5 h-5 text-primary-foreground" />
        )}
      </button>

      {/* Panel */}
      {open && (
        <div className="fixed bottom-20 right-6 z-50 w-80 glass-card rounded-xl overflow-hidden animate-slide-up">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
            <Bell className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Monitor em Tempo Real</span>
          </div>
          <div className="max-h-72 overflow-y-auto p-2 space-y-2">
            {messages.map((m) => (
              <div key={m.id} className="p-3 rounded-lg bg-secondary/50 animate-slide-up">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-medium text-primary uppercase tracking-wider">
                    {m.source}
                  </span>
                  <span className="text-[10px] text-muted-foreground">{m.time}</span>
                </div>
                <p className="text-xs text-secondary-foreground leading-relaxed">{m.msg}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
