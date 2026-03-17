# Ad Testing Strategy — Phase 1 Demand Validation

## Quick Reference

| | |
|---|---|
| **Channel** | Meta only |
| **Budget** | $28/day ($20 quiz, $8 ch0). Direct paused 10 Mar |
| **Campaigns** | 2 active: Quiz + Chapter 0. Direct paused |
| **Angle** | D "Just Tell Me" only (B "Mate Who Knows" shelved for Phase 2) |
| **Ads** | 2 images per campaign (V2B dark slate + V4A yellow). Teal killed 10 Mar |
| **Targeting** | 55-75, Australia, caravan/camping/solar interests |
| **Images** | V2B (dark slate, original), V4A (yellow w/ caravan illustration) |

## Ad Copy Variants (from ad-copy-paste.txt)

| Ad | Funnel | Destination |
|---|---|---|
| D1 | Direct purchase | caravansolar.au |
| D2 | Quiz | caravansolar.au/quiz |
| D3 | Chapter 0 | caravansolar.au/free-guide |

## UTM Template

```
?utm_source=facebook&utm_medium=paid&utm_campaign=demand-test-v1&utm_content={ad-name}
```

Ad name values: `d1-tellme-direct`, `d2-tellme-quiz`, `d3-tellme-ch0`

## Campaign Setup

### Campaign 1: Caravan Direct ($10/day)
- **Images**: V2B + V4A + V4C (Meta rotates)
- **Objective**: Sales, optimise for Purchase
- **Ad**: D1
- **CTA**: Learn More
- **Destination**: `caravansolar.au?utm_source=facebook&utm_medium=paid&utm_campaign=demand-test-v1&utm_content=d1-tellme-direct`
- **Fallback**: If 0 conversions after 4 days, switch to Landing Page Views objective

### Campaign 2: Caravan Chapter 0 ($8/day)
- **Images**: V2B + V4A + V4C (Meta rotates)
- **Objective**: Leads, optimise for Lead event
- **Ad**: D3
- **CTA**: Download
- **Destination**: `caravansolar.au/free-guide?utm_source=facebook&utm_medium=paid&utm_campaign=demand-test-v1&utm_content=d3-tellme-ch0`

### Campaign 3: Caravan Quiz ($15/day)
- **Images**: V2B + V4A + V4C (Meta rotates)
- **Objective**: Leads, optimise for Lead event
- **Ad**: D2
- **CTA**: Learn More
- **Destination**: `caravansolar.au/quiz?utm_source=facebook&utm_medium=paid&utm_campaign=demand-test-v1&utm_content=d2-tellme-quiz`

### Campaign Objective Fix (4 March)
Originally all 3 campaigns were set to Sales/Purchase because Meta wouldn't allow changing objective after publish. Duplicated quiz + chapter 0 campaigns with correct Leads objective. Needs a full rewire check to confirm everything is connected correctly.

### Shared Settings
- **Placements**: Advantage+
- **Location**: Australia
- **Age**: 55-75
- **Interests** (OR): Caravanning, Caravan, Camping, RV, WikiCamps Australia, Jayco, REDARC, Solar panels, Motorhome, Free camping, Grey nomad
- **Exclusions**: Custom Audience from Pixel (site visitors)
- **Creative**: 3 images per ad (V2B dark slate, V4A yellow, V4C teal)

## Success Metrics

| Campaign | Green | Yellow | Red |
|---|---|---|---|
| Direct purchase | Any purchase (CPP < $49) | CTR 1%+, 80+ LPVs, 0 purchases | CTR < 0.5% after 7 days |
| Chapter 0 | 20+ email signups | 10-19 signups | Under 10 signups |
| Quiz | 50%+ completion, 30%+ email capture | Decent starts, high drop-off | CTR < 0.5%, few starts |

## Evaluation Schedule

- **Days 1-3**: Hands off (learning phase). Only intervene if technically broken.
- **Day 4**: Check CTR. Kill any ad below 0.3% CTR with 500+ impressions.
- ~~**Day 7**: Review all metrics. Reallocate budget if clear winner/loser.~~ **Done 10 Mar.** Paused Direct, killed teal, shifted budget to quiz.
- ~~**Day 10**: If direct purchase has 0 sales with 60+ LPVs, pause and redistribute.~~ N/A, Direct paused.
- ~~**Day 14 (17 Mar)**: 100 subscriber check-in.~~ Done. 100 subs, 1 purchase. Gated quiz results, added refund guarantee, rewrote email CTAs (v2). Kit automations paused (trial ended, need Creator plan).
- **~31 Mar**: Go/no-go decision. If funnel changes don't convert, project abandoned.

## Pre-Launch Checklist

- [ ] Create ad image (guide mockup, shopping list screenshot, or text-on-image)
- [ ] Review and finalise 6 ad copy variants (B1, D1, B2, D2, B3, D3)
- [ ] Verify Meta Pixel (Pixel Helper on all 3 landing pages + success page)
- [ ] End-to-end Stripe test purchase ($49, refund after)
- [ ] Test Chapter 0 flow (email -> confirm page -> PDF -> Kit tag)
- [ ] Test quiz flow (complete quiz -> email -> Kit tags -> results + upsell)
- [x] Fix Kit tag whitelist bug (tier regex in config.ts)

## Future: Test "Australian" in Ad Copy

Current ad copy is geographically neutral — the .au domain and AUD price are the only Australian signals. The landing pages now explicitly say "Australian" in multiple places, but the ads (the first touchpoint) don't.

**Why it matters:** Most solar/RV content online is American. Explicitly saying "Australian" in the ad copy instantly signals relevance and differentiates from the generic stuff. It's a selling point, not just a geographic qualifier — Australian sun hours, Australian brands (REDARC, Enerdrive), Australian retailers.

**Test idea:** Duplicate a top-performing ad and add "Australian" to the primary text. E.g. "Built for Australian caravanners" or "Australian brands, Australian conditions." Compare CTR against the existing neutral version. Low effort, potentially meaningful signal.
