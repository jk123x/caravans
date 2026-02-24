# Caravan Project — Session Notes

## Session 1 (Feb 24)

### Decisions Made

- **First product: Solar & Electrical beginner's guide.** Strongest gap in the market. Evergreen (no seasonal dependency). High perceived value. No beginner-friendly digital competitor exists.
- **New brand for all caravan stuff.** Not under GoingSolo or SolarMath. Domain TBD.
- **Format TBD.** Could be PDF guide, calculator + guide, or something else. Figuring it out as we learn more.
- **Approach: move fast.** Low-stakes product ("yolo full steam ahead"). If there's a mistake in a caravan guide it's not life or death. Ship, test, iterate.
- **Also exploring regional guides.** Solar is the first product. Regional dry season guides (FNQ, Kimberley, NT) could follow, timed for May-Oct travel season.

### Key Insight from Market Research

The "huge gap in the market" framing was oversold. Apps (WikiCamps) and physical books (Camps Australia Wide) serve the location/planning market well. The actual gap is narrower:
- $15-49 digital price tier is empty
- Solar/electrical specifically has no beginner-friendly digital product
- Regional planning guides (curated, printable) don't exist as purchasable products
- But you're NOT competing with WikiCamps or Camps on location databases

### Research Completed

- `caravan-market-research-feb26.md` - Full competitive landscape, search data, pricing, product gap analysis
- `caravan-solar-research-feb26.md` - Deep dive on solar systems, brands, forums, calculators, YouTube landscape

---

## Session 2 (Feb 24 — Build Session)

### Major Decisions

- **Product is a $49 PDF decision-making guide**, not a textbook. "The Beginner's Guide to Caravan Solar"
- **Stripe for payment, NOT Gumroad.** Gumroad converted poorly for GoingSolo. 60+ Australians definitely won't know it. On-site checkout via Stripe.
- **SolarMath stays separate** but cross-links. Caravan solar calculator on SolarMath as lead magnet, guide links to it, SolarMath links to guide.
- **Brand name deferred to tomorrow.** Plan recommends descriptive (caravansolarguide.com.au). Everything parameterised for easy swap.
- **Chapter 0 free download** — proven strategy from GoingSolo. Power audit as the free piece that creates a natural gap for the paid guide.
- **Three-way ad test:** quiz funnel (33%) vs Chapter 0 download (33%) vs direct purchase (33%). $5-10/day.
- **Written for complete beginners.** Not people who enjoy learning about electricity. People who want someone to just tell them what to buy.

### Content Voice — Refined Through Iteration

Key insights from iterating on the guide content:

1. **Don't assume the reader wants to learn.** The guide's competitor isn't Collyn Rivers — it's asking Dave in the Facebook group. We're the mate who gives one clear answer.

2. **Don't create electricity anxiety.** Main content is confident: "do this, buy this, you're good." Never mention safety/danger as its own topic. Safety is woven into the language through casual confidence.

3. **Checklists are the safety net.** Anxious readers (and electricity makes people anxious) can scan the mistakes list and tick through checklists. The checklists subtly touch on safety. The main content doesn't.

4. **Frame consequences as wasted money, not danger.** "This mistake costs $500-$800" not "this is a fire risk."

5. **Don't constantly assume negative thoughts.** "It's really simple" not "It's simpler than it sounds." Build confidence, don't keep reminding them they might be scared.

6. **TL;DR callout boxes on everything.** The whole guide should be skimmable in 5 minutes. Each component section has a "just tell me what to buy" box at the top.

7. **Explicitly state we're not sponsored.** "This guide isn't affiliated with any brand or retailer" — pre-empts scepticism about recommendations.

### What's Built

- Next.js landing page (placeholder quality, port 4323)
- All 6 guide sections drafted and iterated in markdown
- Chapter 0 free download drafted
- 3 checklists (Before You Buy, Installer Brief, First Week With Solar)
- 3 worksheets (Power Audit, System Sizing, Shopping List)
- Quiz flow fully specced (8 questions, scoring, results, upsell)
- Preview page at localhost:4323/preview renders all content

### What's Next

1. Jay finishes reviewing guide content (Sections 3-6 haven't been reviewed yet)
2. Brand decision → domain registration
3. Design PDF in Canva
4. Polish landing page with actual brand
5. Stripe + Typeform setup
6. Ads live
