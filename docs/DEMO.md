# Guided walkthrough · Guia de exploração

## English

### Start with a concrete question

How much of a recorded walk matches the participant's chosen preferences?

1. Open [the featured example](https://galafis.github.io/vbot-accessible-follow-lab/?lang=en&example=stop-review).
2. Read the short scenario description and the four result cards.
3. The expected starting result is **16 s observed · 0 s unknown · 12 s matched**.
4. Read the graphic together with the explanation. Unknown, rejected or unconfirmed values are useful evidence rather than something to hide.
5. Use the guided controls. Restore the example to recover the original assumptions.
6. Switch to another story in the five-card example selector. Compare the table in [EXPERIMENTS](EXPERIMENTS.md).
7. Download an HTML report for a self-contained, printable copy; download CSV for the visible evidence table; download JSON for the complete calculated study. These files stay on your computer until you choose to share them.

### Go deeper

1. Time-weighted distance, pace and stop observations with explicit unknown intervals.
2. A distance-band chart, review timeline and observed-evidence denominator.
3. Sensitivity to narrower and wider participant-selected distance bands.
4. Quick controls for distance, pace and maximum observation gap.
5. A 16-second steady walk, missing observations and stop-mismatch counterexamples.

For full scenario changes, open **Advanced: edit the scenario**. Applying invalid JSON or invalid domain data reports an error instead of accepting the changes. Local guided changes recompute through the same domain implementation used by the command line.

### Accessibility and small screens

All primary controls have labels, buttons work by keyboard and the layout adapts to a narrow screen. Charts have accessible titles and adjacent explanations/tables. Colors support text labels rather than replacing them. These implementation choices do not establish conformance certification or a completed screen-reader audit.

## Português

Abra [o exemplo em português](https://galafis.github.io/vbot-accessible-follow-lab/?lang=pt&example=stop-review), leia a descrição e os quatro indicadores. O resultado inicial é **16 s observados · 0 s desconhecidos · 12 s de preferência**.

Examine o gráfico e a explicação, ajuste um controle e use **Restaurar este exemplo** para recuperar a hipótese inicial. Selecione outro cenário para comparar. Os botões baixam relatório HTML imprimível, tabela CSV ou análise JSON. O modo avançado fica recolhido para que o estudo possa ser explorado sem editar código.

As alterações são cálculos de software e não ações sobre o robô. A execução com hardware usará apenas funções e práticas permitidas pelo fabricante.
