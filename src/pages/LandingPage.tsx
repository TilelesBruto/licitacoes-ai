import { useNavigate } from "react-router-dom";
import {
  Zap,
  ScanSearch,
  ShieldCheck,
  Radar,
  BarChart3,
  ArrowRight,
  CheckCircle2,
  FileText,
  Clock,
  Lock,
  TrendingUp,
  Users,
  ChevronRight,
  Sparkles,
  Shield,
  Timer,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: ScanSearch,
    title: "Analisador de Edital com IA",
    desc: "Upload do PDF e receba em segundos: objeto, valor, riscos e checklist de habilitação. Decisão GO/NO GO em menos de 2 minutos.",
    color: "text-primary",
    bg: "bg-primary/10",
    border: "group-hover:border-primary/40",
  },
  {
    icon: ShieldCheck,
    title: "Gestão de Certidões",
    desc: "Controle total das CNDs com alertas automáticos de vencimento. Nunca mais perca uma licitação por certidão vencida.",
    color: "text-accent",
    bg: "bg-accent/10",
    border: "group-hover:border-accent/40",
  },
  {
    icon: Radar,
    title: "Radar de Riscos TCU",
    desc: "Identifique cláusulas abusivas automaticamente. Gere impugnações com modelo jurídico baseado na irregularidade encontrada.",
    color: "text-warning",
    bg: "bg-warning/10",
    border: "group-hover:border-warning/40",
  },
  {
    icon: BarChart3,
    title: "Dashboard Executivo",
    desc: "Visão completa de licitações, prazos críticos, valores em disputa e taxa de vitórias em tempo real.",
    color: "text-primary",
    bg: "bg-primary/10",
    border: "group-hover:border-primary/40",
  },
];

const stats = [
  { value: "2.400+", label: "Editais analisados", icon: FileText },
  { value: "38%", label: "Taxa de vitórias", icon: TrendingUp },
  { value: "< 2min", label: "Tempo de análise", icon: Timer },
  { value: "99.5%", label: "Uptime garantido", icon: Shield },
];

const steps = [
  { num: "01", title: "Upload do Edital", desc: "Arraste o PDF do edital para a plataforma. Suportamos arquivos de até 50MB.", icon: FileText },
  { num: "02", title: "Análise com IA", desc: "A IA extrai dados, calcula índices financeiros, identifica riscos e gera o checklist completo.", icon: ScanSearch },
  { num: "03", title: "Decisão GO/NO GO", desc: "Tome a decisão com confiança. Gere impugnações ou kit de proposta com um clique.", icon: CheckCircle2 },
];

const portals = ["Compras.gov.br", "BLL", "ComprasSP", "PNCP"];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Nav */}
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-border/40 backdrop-blur-xl bg-background/70">
        <div className="max-w-6xl mx-auto flex items-center justify-between h-16 px-6">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl gradient-cobalt flex items-center justify-center glow-cobalt">
              <Zap className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-sm font-bold tracking-tight">Detail Licitações</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Funcionalidades</a>
            <a href="#how" className="hover:text-foreground transition-colors">Como Funciona</a>
            <a href="#portals" className="hover:text-foreground transition-colors">Portais</a>
            <a href="#stats" className="hover:text-foreground transition-colors">Resultados</a>
          </div>
          <Button
            onClick={() => navigate("/dashboard")}
            className="gradient-cobalt text-primary-foreground glow-cobalt text-xs h-9"
          >
            Acessar Plataforma <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-24 px-6">
        {/* Glow effects */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-primary/6 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute top-40 left-1/4 w-[400px] h-[400px] bg-accent/4 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-60 right-1/4 w-[300px] h-[300px] bg-primary/3 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-8 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5" /> Plataforma com IA para Lei 14.133/2021
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] mb-6">
            Analise editais em segundos.{" "}
            <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-primary via-cobalt-glow to-accent bg-clip-text text-transparent">
              Vença licitações
            </span>{" "}
            com inteligência.
          </h1>

          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Upload do edital, análise automática de riscos, cálculo de índices financeiros e geração de impugnações. 
            Tudo em menos de 2 minutos.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              onClick={() => navigate("/dashboard")}
              className="gradient-cobalt text-primary-foreground glow-cobalt h-13 px-10 text-sm font-semibold w-full sm:w-auto"
            >
              Começar Agora — Grátis <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/analisador")}
              className="h-13 px-8 text-sm w-full sm:w-auto border-border/60 hover:border-primary/40"
            >
              <ScanSearch className="w-4 h-4 mr-2" /> Testar Analisador de IA
            </Button>
          </div>

          <p className="text-xs text-muted-foreground mt-6">
            Sem cartão de crédito · Setup em 30 segundos · Compliance garantido
          </p>
        </div>
      </section>

      {/* Stats Bar */}
      <section id="stats" className="py-14 px-6 border-y border-border/40 bg-card/30 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center group">
              <div className="flex items-center justify-center gap-2 mb-2">
                <s.icon className="w-4 h-4 text-primary opacity-60" />
                <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {s.value}
                </p>
              </div>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-medium mb-4">
              <Lock className="w-3 h-3" /> Compliance Lei 14.133/2021
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Tudo para{" "}
              <span className="text-primary">vencer licitações</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm">
              Ferramentas com IA que automatizam o trabalho pesado e deixam você focar na estratégia competitiva.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {features.map((f) => (
              <div
                key={f.title}
                className={cn(
                  "glass-card p-6 group hover:bg-card/80 transition-all duration-300 cursor-default",
                  f.border
                )}
              >
                <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-4", f.bg)}>
                  <f.icon className={cn("w-6 h-6", f.color)} />
                </div>
                <h3 className="text-base font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portals */}
      <section id="portals" className="py-16 px-6 bg-card/30 border-y border-border/40">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-sm font-medium text-muted-foreground mb-6">
            <Globe className="w-4 h-4 inline mr-2" />
            Integração com os principais portais de licitação
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {portals.map((p) => (
              <div key={p} className="glass-card px-6 py-3 text-sm font-medium text-foreground">
                {p}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Decisão GO/NO GO em{" "}
              <span className="bg-gradient-to-r from-accent to-emerald-glow bg-clip-text text-transparent">3 passos</span>
            </h2>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Do upload do edital à decisão final em menos de 2 minutos.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((s, i) => (
              <div key={s.num} className="relative">
                <div className="glass-card p-6 text-center h-full hover:border-primary/30 transition-colors">
                  <div className="w-14 h-14 rounded-2xl gradient-cobalt flex items-center justify-center mx-auto mb-5 glow-cobalt">
                    <s.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <span className="text-xs font-bold text-primary tracking-widest">{s.num}</span>
                  <h3 className="text-base font-semibold text-foreground mt-2 mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
                {i < steps.length - 1 && (
                  <ChevronRight className="hidden md:block absolute top-1/2 -right-4 w-5 h-5 text-muted-foreground/30 -translate-y-1/2" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="glass-card p-10 md:p-16 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-primary/8 rounded-full blur-[80px] pointer-events-none" />
            <div className="relative z-10">
              <TrendingUp className="w-12 h-12 text-accent mx-auto mb-5" />
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
                Pronto para aumentar sua taxa de vitórias?
              </h2>
              <p className="text-sm text-muted-foreground mb-8 max-w-lg mx-auto leading-relaxed">
                Junte-se a centenas de analistas que já utilizam a Detail Licitações para tomar decisões mais rápidas e assertivas.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button
                  size="lg"
                  onClick={() => navigate("/dashboard")}
                  className="gradient-cobalt text-primary-foreground glow-cobalt h-12 px-10 text-sm font-semibold"
                >
                  <Users className="w-4 h-4 mr-2" /> Acessar a Plataforma
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate("/radar")}
                  className="h-12 px-8 text-sm"
                >
                  <Radar className="w-4 h-4 mr-2" /> Ver Radar de Riscos
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-10 px-6 bg-card/20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg gradient-cobalt flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 text-primary-foreground" />
            </div>
            <span className="text-xs font-bold">Detail Licitações</span>
          </div>
          <div className="flex items-center gap-6 text-xs text-muted-foreground">
            <span>Lei 14.133/2021</span>
            <span>·</span>
            <span>Compliance Garantido</span>
            <span>·</span>
            <span>© 2026 Detail Licitações</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
