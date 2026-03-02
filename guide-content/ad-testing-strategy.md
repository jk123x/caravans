# Ad Testing Strategy — Phase 1 Demand Validation

## Quick Reference

| | |
|---|---|
| **Channel** | Meta only |
| **Budget** | $30/day for 14 days ($420 total) |
| **Campaigns** | 3: Direct purchase + Chapter 0 + Quiz ($10/day each) |
| **Angles** | B "Mate Who Knows" + D "Just Tell Me" |
| **Ads** | 6 total (2 per campaign, 1 per angle) |
| **Targeting** | 55-75, Australia, caravan/camping/solar interests |

## Ad Copy Variants (from fb-ad-copy.md)

| Ad | Angle | Funnel | Destination |
|---|---|---|---|
| B1 | Mate Who Knows | Direct purchase | caravansolar.au |
| D1 | Just Tell Me | Direct purchase | caravansolar.au |
| B2 | Mate Who Knows | Quiz | caravansolar.au/quiz |
| D2 | Just Tell Me | Quiz | caravansolar.au/quiz |
| B3 | Mate Who Knows | Chapter 0 | caravansolar.au/free-guide |
| D3 | Just Tell Me | Chapter 0 | caravansolar.au/free-guide |

## UTM Template

```
?utm_source=facebook&utm_medium=paid&utm_campaign=demand-test-v1&utm_content={ad-name}
```

Ad name values: `b1-mate-direct`, `d1-tellme-direct`, `b2-mate-quiz`, `d2-tellme-quiz`, `b3-mate-ch0`, `d3-tellme-ch0`

## Campaign Setup

### Campaign 1: Direct Purchase ($10/day)
- **Objective**: Sales, optimise for Purchase
- **Ads**: B1 + D1
- **CTA**: Learn More
- **Destination**: `caravansolar.au?utm_source=facebook&utm_medium=paid&utm_campaign=demand-test-v1&utm_content={ad-name}`
- **Fallback**: If 0 conversions after 4 days, switch to Landing Page Views objective

### Campaign 2: Chapter 0 Download ($10/day)
- **Objective**: Leads, optimise for Lead event
- **Ads**: B3 + D3
- **CTA**: Download or Learn More
- **Destination**: `caravansolar.au/free-guide?utm_source=...`

### Campaign 3: Quiz ($10/day)
- **Objective**: Leads, optimise for Lead event
- **Ads**: B2 + D2
- **CTA**: Learn More
- **Destination**: `caravansolar.au/quiz?utm_source=...`

### Shared Settings
- **Placements**: Advantage+
- **Location**: Australia
- **Age**: 55-75
- **Interests** (OR): Caravanning, Caravan, Camping, RV, WikiCamps Australia, Jayco, REDARC, Solar panels, Motorhome, Free camping, Grey nomad
- **Exclusions**: Custom Audience from Pixel (site visitors)
- **Creative**: Same single image across all 6 ads

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
