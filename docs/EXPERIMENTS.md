# Reproducible experiments · Experimentos reproduzíveis

All examples are synthetic, deterministic and versioned. The visible interface, command-line engine and expected files share the same input. Each example asks a different question; some intentionally show limited evidence or poor language coverage.

### Walk with gaps / Percurso com lacunas

Too far, a stop mismatch and an unobserved interval.

Distância excessiva, parada desencontrada e um intervalo sem observação.

- Input: [examples/baseline.json](../examples/baseline.json)
- Expected core output: [examples/expected.json](../examples/expected.json)
- Reproduced result: **6 s observed · 6 s unknown · 2 s matched**

```sh
node cli.mjs examples/baseline.json
node study.mjs examples/baseline.json
```

### Steady companion / Ritmo consistente

Eight observed intervals and a matched pause.

Oito intervalos observados e uma pausa acompanhada.

- Input: [examples/steady-follow.json](../examples/steady-follow.json)
- Expected core output: [examples/steady-follow.expected.json](../examples/steady-follow.expected.json)
- Reproduced result: **16 s observed · 0 s unknown · 16 s matched**

```sh
node cli.mjs examples/steady-follow.json
node study.mjs examples/steady-follow.json
```

### What was not seen / O que não foi visto

Remove intermediate samples and watch the evidence shrink.

Retire observações intermediárias e veja a evidência diminuir.

- Input: [examples/observation-gap.json](../examples/observation-gap.json)
- Expected core output: [examples/observation-gap.expected.json](../examples/observation-gap.expected.json)
- Reproduced result: **8 s observed · 8 s unknown · 8 s matched**

```sh
node cli.mjs examples/observation-gap.json
node study.mjs examples/observation-gap.json
```

### A pause to review / A pausa precisa de revisão

The person stopped while the record still reports robot movement.

A pessoa parou; o registro ainda indica movimento do robô.

- Input: [examples/stop-review.json](../examples/stop-review.json)
- Expected core output: [examples/stop-review.expected.json](../examples/stop-review.expected.json)
- Reproduced result: **16 s observed · 0 s unknown · 12 s matched**

```sh
node cli.mjs examples/stop-review.json
node study.mjs examples/stop-review.json
```

### Different preferences / Preferências diferentes

The same walk under narrower distance and pace preferences.

O mesmo percurso sob limites mais estreitos de distância e ritmo.

- Input: [examples/personal-preferences.json](../examples/personal-preferences.json)
- Expected core output: [examples/personal-preferences.expected.json](../examples/personal-preferences.expected.json)
- Reproduced result: **16 s observed · 0 s unknown · 4 s matched**

```sh
node cli.mjs examples/personal-preferences.json
node study.mjs examples/personal-preferences.json
```

## What the checks establish

`npm run check` runs 18 tests and checks all five expected-output files. Domain/insight tests include independently derived cases and invariants. Golden expected files detect regressions; they are generated reference outputs, not independent scientific validation. Browser presentation is reviewed separately.

## What remains open

No physical Vbot trial was performed. Native feature behavior, battery/load response, participant experience and public benefit remain to be evaluated on a specific device under an authorized plan. Documentation and reproducibility make those future questions reviewable; they do not answer them.

## Português

Os cinco cenários são fictícios e reproduzíveis. Cada um explicita uma pergunta e o arquivo de resultado esperado. Os testes incluem casos com cálculos independentes e invariantes; as saídas de referência detectam regressões. Resultados em software não substituem medições físicas ou avaliação de benefício social.
