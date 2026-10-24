# Method and contract · Método e contrato

## Input / Entrada

Every scenario is a JSON object with `version: 1`. Numeric strings, non-finite numbers and truthy substitutes for booleans are refused. The engine does not modify input. Extra fields are ignored; use synthetic data in public examples.

preferences: finite min_distance_m/max_distance_m (max >= min), max_speed_mps >= 0, max_gap_s > 0. samples: at least two, strictly increasing non-negative t_s, finite non-negative distance_m/speed_mps, strict booleans person_stopped/robot_moving. Unknown extra fields are ignored.

## Algorithm / Algoritmo

Intervals use the preceding observation (zero-order hold). Intervals exceeding max_gap_s count entirely as unknown. Only fully observed intervals contribute to preference scores. The final sample has zero duration. No interpolation or clinical outcome is inferred.

## Independent calculation / Cálculo independente

Baseline: 12 s total, 6 s observed and 6 s unknown; 2 s match the selected preferences; 2 s show a stop mismatch. The score is 2/6 = 0.3333 over observed time, not 2/12. A 6 s gap contributes no evidence of successful following.

## Interpretation / Interpretação

Uses manually entered distance, pace and stop observations. No UWB, LiDAR or camera API is assumed. Not a guide dog or mobility aid.

PT: A entrada usa JSON na versão 1. As unidades estão nos nomes dos campos. Erros de contrato interrompem a análise. Campos adicionais não viram evidência. A implementação e os exemplos não demonstram desempenho do robô nem benefício social já validado.

## Derived comparisons in v0.2

The evidence fraction is observed_seconds / total_seconds. Preference match is matched_seconds / observed_seconds; the latter is null when no interval is observed. Reason durations can overlap, so their sum is not a partition of observed time. The graphic shows a piecewise-constant observed distance, leaves gaps unknown and uses a separate interval-status strip.

Distance sensitivity preserves the center of the chosen band and multiplies its half-width by 0.5, 1 and 1.5, clamping the lower edge at zero. Pace and gap limits stay fixed. A wider band cannot reduce matched duration under those fixed conditions. This is a preference comparison, not a proposed universal comfort distance.

Core analysis is O(n) in samples. Comparisons run three additional passes. The last sample establishes the final interval endpoint and has no duration itself.

PT: A fração de evidência divide tempo observado pelo total; a taxa de preferência divide tempo correspondente pelo observado. Durações por motivo podem se sobrepor. A sensibilidade mantém o centro da faixa e muda sua amplitude. A última amostra só fecha o intervalo.
