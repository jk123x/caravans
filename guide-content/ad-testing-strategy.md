# Ad Testing Strategy — Phase 1 Demand Validation

## Quick Reference

| | |
|---|---|
| **Channel** | Meta only |
| **Budget** | $30/day for 14 days ($420 total) |
| **Campaigns** | 3: Direct purchase + Chapter 0 + Quiz ($10/day each) |
| **Angle** | D "Just Tell Me" only (B "Mate Who Knows" shelved for Phase 2) |
| **Ads** | 3 total (1 per campaign) |
| **Targeting** | 55-75, Australia, caravan/camping/solar interests |
| **Image** | V2B (dark slate) |

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
- **Objective**: Sales, optimise for Purchase
- **Ad**: D1
- **CTA**: Learn More
- **Destination**: `caravansolar.au?utm_source=facebook&utm_medium=paid&utm_campaign=demand-test-v1&utm_content=d1-tellme-direct`
- **Fallback**: If 0 conversions after 4 days, switch to Landing Page Views objective

### Campaign 2: Caravan Chapter 0 ($10/day)
- **Objective**: Leads, optimise for Lead event
- **Ad**: D3
- **CTA**: Download
- **Destination**: `caravansolar.au/free-guide?utm_source=facebook&utm_medium=paid&utm_campaign=demand-test-v1&utm_content=d3-tellme-ch0`

### Campaign 3: Caravan Quiz ($10/day)
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
- **Creative**: V2B image (dark slate) across all 3 ads

## Success Metrics

| Campaign | Green | Yellow | Red |
|---|---|---|---|
| Direct purchase | Any purchase (CPP < $49) | CTR 1%+, 80+ LPVs, 0 purchases | CTR < 0.5% after 7 days |
| Chapter 0 | 20+ email signups | 10-19 signups | Under 10 signups |
| Quiz | 50%+ completion, 30%+ email capture | Decent starts, high drop-off | CTR < 0.5%, few starts |

## Evaluation Schedule

- **Days 1-3**: Hands off (learning phase). Only intervene if technically broken.
- **Day 4**: Check CTR. Kill any ad below 0.3% CTR with 500+ impressions.
- **Day 7**: Review all metrics. Reallocate budget if clear winner/loser.
- **Day 10**: If direct purchase has 0 sales with 60+ LPVs, pause and redistribute.
- **Day 14**: Final assessment. Compile data and decide what to scale/kill/iterate.

## Pre-Launch Checklist

- [ ] Create ad image (guide mockup, shopping list screenshot, or text-on-image)
- [ ] Review and finalise 6 ad copy variants (B1, D1, B2, D2, B3, D3)
- [ ] Verify Meta Pixel (Pixel Helper on all 3 landing pages + success page)
- [ ] End-to-end Stripe test purchase ($49, refund after)
- [ ] Test Chapter 0 flow (email -> confirm page -> PDF -> Kit tag)
- [ ] Test quiz flow (complete quiz -> email -> Kit tags -> results + upsell)
- [x] Fix Kit tag whitelist bug (tier regex in config.ts)
