
Melhorias visuais e interativas para o Dashboard de Detail Licitações.

## O que será adicionado

**1. Animações de entrada**
- Cards e seções com `animate-fade-in` escalonado (stagger delay)
- Hover scale sutil nos cards de métrica

**2. Cards de métrica aprimorados**
- Indicador de tendência (seta ↑/↓) colorido ao lado da variação
- Mini sparkline (LineChart do Recharts) no rodapé de cada card mostrando últimos 7 dias
- Efeito glow sutil no ícone ao hover
- Borda animada que destaca no hover

**3. Novo card "Próximos Prazos"**
- Lista das 3 licitações com prazo crítico (<24h, <72h, <7d)
- Badge de urgência colorido + countdown
- Click leva para `/inbox`

**4. Gráfico Vitórias vs Derrotas — interativo**
- Tooltip customizado com taxa de vitória do mês
- Barras com gradiente cobalto/esmeralda
- Toggle de período (3M / 6M / 12M) via Tabs
- Animação de entrada nas barras (`isAnimationActive`)

**5. Novo gráfico "Distribuição por Portal" (donut)**
- PieChart do Recharts mostrando % de editais por portal (Compras.gov, BLL, BEC, ComprasNet)
- Legenda lateral com contagem

**6. Seção "Atividade Recente"**
- Timeline vertical com últimos 5 eventos (edital analisado, certidão renovada, impugnação gerada)
- Ícones Lucide + timestamp relativo

**7. Quick Actions bar**
- 3 botões grandes no topo: "Analisar Edital", "Ver Inbox", "Renovar Certidões"
- Navegação via `useNavigate` para rotas existentes

## Arquivos afetados

- `src/pages/Dashboard.tsx` — refatoração completa mantendo paleta cobalto/esmeralda dark mode
- Reutiliza componentes existentes: `Card`, `Badge`, `Button`, `Tabs`, `Tooltip` do shadcn
- Sem novas dependências (Recharts e Lucide já instalados)

## Layout final

```text
┌─────────────────────────────────────────────┐
│ Dashboard          [Quick Actions: 3 btns]  │
├─────────────────────────────────────────────┤
│ [Metric] [Metric] [Metric] [Metric]  ← spark│
├──────────────────────┬──────────────────────┤
│ Vitórias vs Derrotas │ Distribuição Portais │
│ (BarChart + Tabs)    │ (Donut)              │
├──────────────────────┼──────────────────────┤
│ Próximos Prazos      │ Atividade Recente    │
│ (lista clicável)     │ (timeline)           │
└──────────────────────┴──────────────────────┘
```
