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
  },
  {
    icon: ShieldCheck,
    title: "Gestão de Certidões",
    desc: "Controle total das CNDs com alertas automáticos de vencimento. Nunca mais perca uma licitação por certidão vencida.",
    color: "text-accent",
    bg: "bg-accent/10",
  },
  {
    icon: Radar,
    title: "Radar de Riscos TCU",
    desc: "Identifique cláusulas abusivas automaticamente com base na jurisprudência do TCU e Lei 14.133/2021.",
    color: "text-warning",
    bg: "bg-warning/10",
  },
  {
    icon: BarChart3,
    title: "Dashboard Executivo",
    desc: "Visão completa de licitações, prazos críticos, valores em disputa e taxa de vitórias em tempo real.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
];

const stats = [
  { value: "2.400+", label: "Editais analisados" },
  { value: "38%", label: "Taxa de vitórias" },
  { value: "< 2min", label: "Tempo de análise" },
  { value: "99.5%", label: "Uptime garantido" },
];

const steps = [
  { num: "01", title: "Upload do Edital", desc: "Arraste o PDF do edital para a plataforma.", icon: FileText },
  { num: "02", title: "Análise Automática", desc: "A IA extrai dados, identifica riscos e gera o checklist.", icon: ScanSearch },
  { num: "03", title: "Decisão Rápida", desc: "Tome a decisão GO/NO GO com confiança em menos de 2 minutos.", icon: CheckCircle2 },
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Nav */}
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-border/50 backdrop-blur-xl bg-background/80">
        <div className="max-w-6xl mx-auto flex items-center justify-between h-16 px-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg gradient-cobalt flex items-center justify-center">
              <Zap className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-sm font-bold tracking-tight">Detail Licitações</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Funcionalidades</a>
            <a href="#how" className="hover:text-foreground transition-colors">Como Funciona</a>
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
      <section className="relative pt-32 pb-20 px-6">
        {/* Glow effects */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/8 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-40 left-1/3 w-[300px] h-[300px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-6">
            <Lock className="w-3 h-3" /> Lei 14.133/2021 · Compliance Garantido
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
            Inteligência Artificial para{" "}
            <span className="bg-gradient-to-r from-primary to-cobalt-glow bg-clip-text text-transparent">
              Licitações
            </span>{" "}
            no Brasil
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            Analise editais em segundos, gerencie certidões e identifique riscos automaticamente. 
            A plataforma que transforma analistas de licitação em estrategistas.
          </p>

          <div className="flex items-center justify-center gap-4">
            <Button
              size="lg"
              onClick={() => navigate("/dashboard")}
              className="gradient-cobalt text-primary-foreground glow-cobalt h-12 px-8 text-sm font-semibold"
            >
              Começar Agora <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/analisador")}
              className="h-12 px-8 text-sm"
            >
              <ScanSearch className="w-4 h-4 mr-2" /> Testar Analisador
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section id="stats" className="py-16 px-6 border-y border-border/50">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {s.value}
              </p>
              <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Tudo que você precisa para{" "}
              <span className="text-primary">vencer licitações</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Ferramentas integradas que automatizam o trabalho pesado e deixam você focar na estratégia.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="glass-card p-6 group hover:border-primary/30 transition-all duration-300"
              >
                <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-4", f.bg)}>
                  <f.icon className={cn("w-6 h-6", f.color)} />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="py-20 px-6 bg-card/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Como funciona em <span className="text-accent">3 passos</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((s, i) => (
              <div key={s.num} className="relative">
                <div className="glass-card p-6 text-center h-full">
                  <div className="w-14 h-14 rounded-2xl gradient-cobalt flex items-center justify-center mx-auto mb-4 glow-cobalt">
                    <s.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <span className="text-xs font-bold text-primary tracking-widest">{s.num}</span>
                  <h3 className="text-base font-semibold text-foreground mt-2 mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground">{s.desc}</p>
                </div>
                {i < steps.length - 1 && (
                  <ChevronRight className="hidden md:block absolute top-1/2 -right-5 w-5 h-5 text-muted-foreground/30 -translate-y-1/2" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="glass-card p-10 md:p-14 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 pointer-events-none" />
            <div className="relative z-10">
              <TrendingUp className="w-10 h-10 text-accent mx-auto mb-4" />
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
                Pronto para aumentar sua taxa de vitórias?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
                Junte-se a centenas de analistas que já utilizam a Detail Licitações para tomar decisões mais rápidas e assertivas.
              </p>
              <Button
                size="lg"
                onClick={() => navigate("/dashboard")}
                className="gradient-cobalt text-primary-foreground glow-cobalt h-12 px-10 text-sm font-semibold"
              >
                <Users className="w-4 h-4 mr-2" /> Acessar a Plataforma
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded gradient-cobalt flex items-center justify-center">
              <Zap className="w-3 h-3 text-primary-foreground" />
            </div>
            <span className="text-xs font-semibold">Detail Licitações</span>
          </div>
          <p className="text-xs text-muted-foreground">
            © 2026 Detail Licitações. Focado na Lei 14.133/2021.
          </p>
        </div>
      </footer>
    </div>
  );
}
