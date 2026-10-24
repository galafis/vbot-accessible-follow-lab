import test from 'node:test';
import assert from 'node:assert/strict';
import { analyze } from '../src/engine.mjs';
import { readFileSync } from 'node:fs';
const sample = () =>
  JSON.parse(readFileSync(new URL('../examples/baseline.json', import.meta.url)));
test('hand-calculated duration accounting and gaps', () => {
  const r = analyze(sample());
  assert.equal(r.total_s, 12);
  assert.equal(r.observed_s, 6);
  assert.equal(r.unknown_s, 6);
  assert.equal(r.preference_match_s, 2);
  assert.equal(r.stop_mismatch_s, 2);
  assert.equal(r.preference_match_fraction, 0.3333);
});
test('all missing intervals have no preference score', () => {
  const s = sample();
  s.preferences.max_gap_s = 0.1;
  assert.equal(analyze(s).preference_match_fraction, null);
});
test('boundary distances and pace count as preferred', () => {
  const s = sample();
  s.samples = s.samples.slice(0, 2);
  s.samples[0].distance_m = 0.8;
  s.samples[0].speed_mps = 0.7;
  assert.equal(analyze(s).preference_match_s, 2);
});
test('reject duplicate times, NaN, string booleans and inverted preference', () => {
  for (const mutate of [
    (s) => (s.samples[1].t_s = 0),
    (s) => (s.samples[0].distance_m = NaN),
    (s) => (s.samples[0].person_stopped = 'false'),
    (s) => (s.preferences.min_distance_m = 3),
  ]) {
    const s = sample();
    mutate(s);
    assert.throws(() => analyze(s));
  }
});
test('analysis does not mutate input', () => {
  const s = sample(),
    before = JSON.stringify(s);
  analyze(s);
  assert.equal(JSON.stringify(s), before);
});
