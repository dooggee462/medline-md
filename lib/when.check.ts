/**
 * Verificare pentru conversia orei Moldovei.
 * Se rulează cu:  npm run verifica:ore
 */
import assert from "node:assert/strict";
import { localToTimestamp } from "./when.ts";

const utc = (s: string) => Date.parse(s);

// vara, ora de vară: +3
assert.equal(localToTimestamp("2026-07-10", "21:00"), utc("2026-07-10T18:00:00Z"));
// iarna, ora standard: +2
assert.equal(localToTimestamp("2026-12-10", "21:00"), utc("2026-12-10T19:00:00Z"));
// ultima duminică din octombrie 2026: ceasul dă înapoi la 4:00 locale
assert.equal(localToTimestamp("2026-10-25", "02:00"), utc("2026-10-24T23:00:00Z"));
assert.equal(localToTimestamp("2026-10-25", "21:00"), utc("2026-10-25T19:00:00Z"));
// ultima duminică din martie: ceasul sare înainte
assert.equal(localToTimestamp("2026-03-29", "21:00"), utc("2026-03-29T18:00:00Z"));
// date greșite
assert.equal(localToTimestamp("", "21:00"), null);
assert.equal(localToTimestamp("2026-10-16", ""), null);

// șase ore înainte de o vizită de sâmbătă la 21:00 înseamnă 15:00
const vizita = localToTimestamp("2026-10-17", "21:00")!;
assert.equal(vizita - 6 * 3600_000, localToTimestamp("2026-10-17", "15:00"));
assert.equal(vizita - 2 * 3600_000, localToTimestamp("2026-10-17", "19:00"));

console.log("ora Moldovei: toate verificările trec");
