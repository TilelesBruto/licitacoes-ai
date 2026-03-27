import { useState } from "react";
import {
  AlertTriangle,
  ShieldAlert,
  Scale,
  Building2,
  FileWarning,
  Ban,
  Gavel,
  X,
  Copy,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface RiscoAlerta {
  titulo: string;
  descricao: string;
  fundamentacao: string;
  severidade: "alta" | "media" | "baixa";
  icon: React.ComponentType<{ className?: string }>;
  modeloImpugnacao: string;
}

const alertas: RiscoAlerta[] = [
  {
    titulo: "Exigência de Marca Específica",
    descricao: "O edital PE 045/2025 exige marca específica de equipamentos sem justificativa técnica, violando o princípio da competitividade.",
    fundamentacao: "Art. 41, I da Lei 14.133/2021 — Acórdão TCU 2.401/2006",
    severidade: "alta",
    icon: Ban,
    modeloImpugnacao: `IMPUGNAÇÃO AO EDITAL

PREGÃO ELETRÔNICO Nº 045/2025

Ao Pregoeiro(a),

A empresa [NOME DA EMPRESA], inscrita no CNPJ nº [CNPJ], por meio de seu representante legal, vem, respeitosamente, apresentar IMPUGNAÇÃO ao Edital em epígrafe, pelos fatos e fundamentos a seguir expostos:

I - DOS FATOS

O instrumento convocatório, em seu item [X], exige expressamente a marca [MARCA], sem apresentar justificativa técnica que fundamente tal restrição. Tal exigência viola frontalmente o princípio da competitividade e da isonomia.

II - DO DIREITO

Conforme disposto no Art. 41, inciso I, da Lei nº 14.133/2021, é vedada a indicação de marca ou modelo, salvo quando tecnicamente justificável, ou quando o fornecimento de determinada marca for o único capaz de atender ao objeto licitado.

O Tribunal de Contas da União, no Acórdão nº 2.401/2006, firmou entendimento de que a indicação de marca sem justificativa técnica é irregular, por restringir indevidamente a competitividade do certame.

III - DO PEDIDO

Ante o exposto, requer-se a RETIFICAÇÃO do edital para exclusão da exigência de marca específica, garantindo a ampla participação de licitantes com produtos de qualidade equivalente.

[LOCAL], [DATA]

[NOME DO REPRESENTANTE LEGAL]
[CARGO]`,
  },
  {
    titulo: "Capital Social Excessivo",
    descricao: "Exigência de capital social mínimo de 30% do valor estimado do contrato, acima do limite legal de 10%.",
    fundamentacao: "Art. 69, §4° da Lei 14.133/2021 — Súmula TCU 275",
    severidade: "alta",
    icon: Building2,
    modeloImpugnacao: `IMPUGNAÇÃO AO EDITAL

PREGÃO ELETRÔNICO Nº [NÚMERO]

Ao Pregoeiro(a),

A empresa [NOME DA EMPRESA], inscrita no CNPJ nº [CNPJ], vem apresentar IMPUGNAÇÃO ao Edital, pelos seguintes fundamentos:

I - DOS FATOS

O edital exige capital social mínimo correspondente a 30% do valor estimado da contratação, o que ultrapassa significativamente o limite estabelecido em lei.

II - DO DIREITO

O Art. 69, §4°, da Lei nº 14.133/2021, estabelece que a exigência de capital mínimo ou patrimônio líquido mínimo não pode exceder 10% do valor estimado da contratação.

A Súmula TCU nº 275 reforça que é vedada a exigência de comprovação de atividade ou aptidão com limitações de tempo, local ou quaisquer outras não previstas em lei, que inibam a participação na licitação.

III - DO PEDIDO

Requer-se a adequação do percentual de capital social mínimo para o limite de 10% do valor estimado, conforme previsto na legislação vigente.

[LOCAL], [DATA]

[NOME DO REPRESENTANTE LEGAL]`,
  },
  {
    titulo: "Prazo de Impugnação Reduzido",
    descricao: "Edital publicado com prazo inferior ao mínimo legal para interposição de impugnação.",
    fundamentacao: "Art. 164, §1° da Lei 14.133/2021",
    severidade: "media",
    icon: FileWarning,
    modeloImpugnacao: `IMPUGNAÇÃO AO EDITAL

Ao Pregoeiro(a),

A empresa [NOME DA EMPRESA] vem apresentar IMPUGNAÇÃO ao Edital, tendo em vista que o prazo para interposição de impugnação é inferior ao mínimo legal.

FUNDAMENTO: O Art. 164, §1°, da Lei nº 14.133/2021, estabelece prazo mínimo de 3 (três) dias úteis antes da data fixada para abertura da sessão pública.

PEDIDO: Requer-se a republicação do edital com adequação dos prazos legais.

[LOCAL], [DATA]
[REPRESENTANTE LEGAL]`,
  },
  {
    titulo: "Cláusula de Subcontratação Vedada",
    descricao: "Edital veda completamente a subcontratação sem justificativa, podendo restringir a competitividade.",
    fundamentacao: "Art. 122 da Lei 14.133/2021 — Acórdão TCU 1.045/2019",
    severidade: "media",
    icon: Scale,
    modeloImpugnacao: `IMPUGNAÇÃO AO EDITAL

Ao Pregoeiro(a),

A empresa [NOME DA EMPRESA] vem impugnar o edital na parte em que veda integralmente a subcontratação.

FUNDAMENTO: O Art. 122 da Lei nº 14.133/2021 permite a subcontratação parcial do objeto, desde que limitada a percentual previamente estabelecido. A vedação total, sem justificativa, pode restringir a competitividade (Acórdão TCU 1.045/2019).

PEDIDO: Requer-se a permissão de subcontratação parcial, até o limite de 30% do objeto contratual.

[LOCAL], [DATA]
[REPRESENTANTE LEGAL]`,
  },
  {
    titulo: "Atestado com Quantitativo Desproporcional",
    descricao: "Exigência de atestado de capacidade técnica com 70% do quantitativo licitado.",
    fundamentacao: "Art. 67, §1° da Lei 14.133/2021 — Recomendação: máx. 50%",
    severidade: "alta",
    icon: ShieldAlert,
    modeloImpugnacao: `IMPUGNAÇÃO AO EDITAL

Ao Pregoeiro(a),

A empresa [NOME DA EMPRESA] vem impugnar o edital quanto à exigência de atestado de capacidade técnica com quantitativo mínimo de 70%.

FUNDAMENTO: Conforme Art. 67, §1°, da Lei nº 14.133/2021, e jurisprudência consolidada do TCU, a exigência de quantitativos nos atestados deve ser limitada a parcelas de maior relevância e valor significativo, sendo recomendado o máximo de 50% do quantitativo licitado.

A exigência de 70% é manifestamente desproporcional e restringe indevidamente a competitividade.

PEDIDO: Requer-se a redução do percentual exigido nos atestados para no máximo 50% do quantitativo licitado.

[LOCAL], [DATA]
[REPRESENTANTE LEGAL]`,
  },
];

const severidadeConfig = {
  alta: { label: "Alta", border: "border-l-destructive", badge: "bg-destructive/15 text-destructive" },
  media: { label: "Média", border: "border-l-warning", badge: "bg-warning/15 text-warning" },
  baixa: { label: "Baixa", border: "border-l-accent", badge: "bg-accent/15 text-accent" },
};

export default function RadarRiscos() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAlerta, setSelectedAlerta] = useState<RiscoAlerta | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGerarImpugnacao = (alerta: RiscoAlerta) => {
    setSelectedAlerta(alerta);
    setModalOpen(true);
    setCopied(false);
  };

  const handleCopy = () => {
    if (selectedAlerta) {
      navigator.clipboard.writeText(selectedAlerta.modeloImpugnacao);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="p-6 lg:p-8 space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-foreground tracking-tight">Radar de Oportunidades & Riscos</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Alertas de cláusulas abusivas com base na jurisprudência do TCU
        </p>
      </div>

      <div className="glass-card p-4 flex items-center gap-3 border-l-4 border-l-primary">
        <AlertTriangle className="w-5 h-5 text-primary shrink-0" />
        <p className="text-sm text-foreground">
          <strong>{alertas.filter(a => a.severidade === "alta").length} alertas de alta severidade</strong> detectados nos editais em análise. Recomenda-se ação imediata.
        </p>
      </div>

      <div className="space-y-4">
        {alertas.map((alerta) => {
          const config = severidadeConfig[alerta.severidade];
          return (
            <div key={alerta.titulo} className={cn("glass-card p-5 border-l-4", config.border)}>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                  <alerta.icon className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="text-sm font-semibold text-foreground">{alerta.titulo}</h3>
                    <span className={cn("text-[10px] px-2 py-0.5 rounded-full font-medium", config.badge)}>
                      {config.label}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-2">{alerta.descricao}</p>
                  <p className="text-xs text-primary font-mono mb-3">{alerta.fundamentacao}</p>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleGerarImpugnacao(alerta)}
                    className="gap-1.5 text-xs border-primary/30 text-primary hover:bg-primary/10 hover:text-primary"
                  >
                    <Gavel className="w-3.5 h-3.5" /> Gerar Impugnação
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal de Impugnação */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] bg-card border-border">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-foreground">
              <Gavel className="w-5 h-5 text-primary" />
              Modelo de Impugnação
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              {selectedAlerta?.titulo} — {selectedAlerta?.fundamentacao}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 space-y-4">
            <div className="bg-secondary/50 border border-border rounded-lg p-5 max-h-[50vh] overflow-y-auto">
              <pre className="text-xs text-foreground whitespace-pre-wrap leading-relaxed font-mono">
                {selectedAlerta?.modeloImpugnacao}
              </pre>
            </div>
            <div className="flex items-center gap-3">
              <Button onClick={handleCopy} className="gradient-cobalt text-primary-foreground glow-cobalt gap-2">
                {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copiado!" : "Copiar Texto"}
              </Button>
              <p className="text-xs text-muted-foreground">
                Substitua os campos entre [colchetes] pelos dados da sua empresa.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
