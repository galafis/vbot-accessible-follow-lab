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
