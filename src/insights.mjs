import { analyze } from './engine.mjs';
import { round } from './contract.mjs';
export function study(s) {
  const analysis = analyze(s);
  const duration = analysis.total_s;
  const reasonSeconds = {};
  for (const row of analysis.intervals)
    for (const reason of row.reasons)
      reasonSeconds[reason] = round((reasonSeconds[reason] ?? 0) + row.duration_s);
  const observed = analysis.observed_s;
  const distances = s.samples
    .slice(0, -1)
    .filter((r, i) => s.samples[i + 1].t_s - r.t_s <= s.preferences.max_gap_s);
  const comparisons = [0.5, 1, 1.5].map((factor) => {
    const center = (s.preferences.min_distance_m + s.preferences.max_distance_m) / 2;
    const half = ((s.preferences.max_distance_m - s.preferences.min_distance_m) * factor) / 2;
    const preferences = {
      ...s.preferences,
      min_distance_m: Math.max(0, center - half),
      max_distance_m: center + half,
    };
    const result = analyze({ ...s, preferences });
    return {
      factor,
      min_m: round(preferences.min_distance_m),
      max_m: round(preferences.max_distance_m),
      match_s: result.preference_match_s,
      match_fraction: result.preference_match_fraction,
    };
  });
  return {
    analysis,
    evidence_fraction: duration ? round(observed / duration) : null,
    reason_seconds: reasonSeconds,
    longest_gap_s: Math.max(
      0,
      ...analysis.intervals
        .filter((r) => r.reasons.includes('observation_gap'))
        .map((r) => r.duration_s),
    ),
    observed_distance_range_m: distances.length
      ? [
          Math.min(...distances.map((r) => r.distance_m)),
          Math.max(...distances.map((r) => r.distance_m)),
        ]
      : null,
    comparisons,
  };
}
