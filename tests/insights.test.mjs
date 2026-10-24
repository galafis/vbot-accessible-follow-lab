import test from 'node:test';
import assert from 'node:assert/strict';
import { study } from '../src/insights.mjs';
import { readFileSync } from 'node:fs';
const sample = () =>
  JSON.parse(readFileSync(new URL('../examples/baseline.json', import.meta.url)));
test('evidence is observed time over total; gaps are not preference failures', () => {
  const r = study(sample());
  assert.equal(r.evidence_fraction, 0.5);
  assert.equal(r.longest_gap_s, 6);
  assert.equal(r.reason_seconds.stop_mismatch, 2);
});
test('narrowing the distance band cannot increase matches', () => {
  const r = study(sample());
  assert(r.comparisons[0].match_s <= r.comparisons[1].match_s);
  assert(r.comparisons[1].match_s <= r.comparisons[2].match_s);
});
test('no observed intervals produce no observed distance range', () => {
  const s = sample();
  s.preferences.max_gap_s = 0.1;
  assert.equal(study(s).observed_distance_range_m, null);
});
