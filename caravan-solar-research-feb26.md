# Deep Research Report: Caravan Solar & Electrical Systems in Australia
## Opportunity Assessment for a Beginner-Friendly Digital Product

---

## 1. What Do People Actually Need to Know?

### Core Decisions in Setting Up Solar on a Caravan

The decision chain for a caravan solar setup follows a predictable pattern, and most beginners get lost because nobody lays it out sequentially:

1. **Power audit** -- What appliances will you run, for how long, each day? This determines everything downstream.
2. **Battery chemistry and capacity** -- Lithium (LiFePO4) vs AGM, and how many amp-hours.
3. **Solar panel type and wattage** -- Fixed roof-mount, portable/folding, or both. Monocrystalline vs polycrystalline.
4. **Charge controller** -- MPPT vs PWM, and what amperage rating.
5. **DC-DC charger** -- How to charge from the vehicle alternator while driving.
6. **Inverter** -- Size and type (pure sine wave) for running 240V appliances.
7. **Wiring** -- Cable sizing, fusing, Anderson plugs, bus bars.
8. **Monitoring** -- Battery monitors, shunt-based systems, Bluetooth apps.

### Typical System Components

A standard caravan solar/electrical system consists of:

- **Solar panels** (roof-mounted and/or portable) connected via MC4 connectors
- **Solar charge controller** (MPPT or PWM) regulating voltage from panels to battery
- **Battery bank** (lithium or AGM deep cycle) storing energy
- **DC-DC charger** (e.g., REDARC BCDC) for alternator charging while driving
- **Inverter** converting 12V DC to 240V AC for household appliances
- **Battery monitor** (e.g., Victron SmartShunt, BMV-712) showing state of charge
- **Wiring, fuses, bus bars, isolators** connecting everything safely
- **Anderson plugs** for external portable panel connection

### System Sizes by Use Case

| Use Case | Solar | Battery | Inverter | Typical Cost (DIY) |
|----------|-------|---------|----------|-------------------|
| **Weekender** (lights, phone, fridge) | 200W fixed | 100-200Ah lithium | 1000W or none | $1,500-$2,500 |
| **Regular tourer** (fridge, TV, laptops, lights) | 300-400W fixed + portable | 200-300Ah lithium | 2000W | $3,000-$5,000 |
| **Full-timer / off-grid** (all above + microwave, coffee machine) | 400-600W fixed + 200W portable | 300-400Ah lithium | 3000W | $5,000-$8,000 |
| **High-demand off-grid** (air conditioning, induction) | 800-1000W+ or 48V system | 400Ah+ lithium or 48V system | 3000-5000W | $8,000-$15,000+ |

Sources: [Home and RV Off-Grid Power Guide](https://www.homeandrv.com.au/blog/off-grid-caravan-power-guide-12v-48v), [REDARC Off-Grid Guide](https://www.redarcelectronics.com/au/discover/how-much-solar-power-for-a-campervan/), [Sungold RV Power Calculator](https://www.sungoldsolar.com/rv-power-calculator-caravan-solar-guide/)

### Progression from Basic to Advanced

**Stage 1 -- Factory default**: Single 100-150Ah AGM, maybe 1x 120W panel, no inverter. Good for powered sites only.

**Stage 2 -- Basic upgrade**: Swap AGM for 200Ah lithium, add 200-300W solar, DC-DC charger, small inverter. Can do 1-2 nights free camping.

**Stage 3 -- Confident off-grid**: 400W+ solar (fixed + portable), 300Ah lithium, MPPT controller, 2000W+ inverter, battery monitor. Can free camp indefinitely in good sun.

**Stage 4 -- Full independence**: 48V systems entering the market for running air conditioning off-grid. Brands like OzXCorp, used by manufacturers including Retreat, Mountain Trail, Spinifex, Wonderland, Sunseeker, and Australian Off Road. Can run AC all day while maintaining 100% state of charge. This is the emerging high-end trend.

### Common Expensive Mistakes

1. **Undersizing the battery bank** -- Buying a single 100Ah AGM and expecting it to run a fridge overnight. An AGM can only safely discharge to 50%, giving just 50Ah usable. A $400 battery that does half what you need.

2. **Not enough solar for the battery size** -- Installing a 200Ah lithium bank with only 200W of panels. Rule of thumb: ~200W of solar per 100 usable Ah. Under-panelled systems mean chronically undercharged batteries and shortened lifespan.

3. **Ignoring the angle of attack** -- Flat roof-mounted panels in southern Australia during winter can drop to 14% efficiency. A 450W rooftop array may produce only 230W in real-world conditions (roughly 15 amps instead of 30). [Source: RV Daily](https://rvdaily.com.au/caravan-solar-youre-doing-it-wrong/)

4. **Mixing battery chemistries** -- Connecting lithium with AGM or gel causes imbalance, shortened lifespan, and potential safety issues.

5. **Undersized cabling** -- Skimping on cable gauge causes dangerous overheating. 12V systems run high current, so cable sizing matters far more than in household 240V wiring.

6. **Undersized chargers** -- A 5A or 10A charger on a 250Ah battery means waiting days to fully recharge.

7. **Shading ignorance** -- A single shadow from an air conditioner or antenna can cut a panel's output by half. Dust reduces production by 20%.

8. **Not fusing individual panels** -- New AS/NZS 3001.2:2022 standard requires individual fusing before panels are connected in parallel, to prevent one faulty panel from taking out the entire string.

---

## 2. The Collyn Rivers Factor

### What He Covers

Collyn Rivers publishes through his own imprint (RV Books, [rvbooks.com.au](https://rvbooks.com.au/)) and has six titles, with two directly relevant:

**"Caravan and Motorhome Electrics: The Complete Guide"**
- 198 pages, 38 chapters
- Covers: terminology, basic electrics, power requirements, safety, 12/24V wiring, mains wiring, batteries, charging systems (solar, alternator, generator, fuel cells), inverters, energy monitoring, appliances, refrigeration, air conditioning, circuit breakers, fuses
- Latest edition: April 2020 (ISBN: 9780648319085)
- **Pricing**: Paperback ~$31.75 AUD on [Booktopia](https://www.booktopia.com.au/caravan-motorhome-electrics-collyn-rivers/book/9780648319085.html), Kindle ebook available on [Amazon AU](https://www.amazon.com.au/Caravan-Motorhome-Electrics-complete-guide-ebook/dp/B0829QL4X7)

**"Solar That Really Works!"**
- 82 pages, focused specifically on solar for RVs, caravans, campervans, boats, cabins
- Covers: energy calculations, solar availability by location in Australia/NZ, realistic panel output expectations, cable sizing, what can/can't be powered by solar
- 5th edition
- **Pricing**: Kindle $11.99 AUD, paperback ~$23.91 AUD on [Amazon AU](https://www.amazon.com.au/Solar-That-Really-Works-campervans/dp/0648319032)

### Reading Level and Accessibility

Rivers' books are marketed as "written in plain English." He explains both the "how" and the "why." Multiple reviews praise him for being concise and avoiding jargon. The Wanderer (Campervan & Motorhome Club of Australia) calls him "without doubt, the foremost authority in Australia on this subject."

However, the claim of accessibility is relative. Rivers is an accomplished engineer, and his idea of "plain English" is still engineering-minded explanation. He covers theory thoroughly, which is valuable for understanding but can be overwhelming for someone who just wants to know "what should I buy and how do I wire it?"

### Review Sentiment

**Goodreads**: 3.0/5 from 6 ratings. Polarised: 66% gave 4 stars, 33% gave 1 star. No written reviews. [Source: Goodreads](https://www.goodreads.com/book/show/49796076-caravan-and-motorhome-electrics)

**Amazon complaints** (from review analysis):
- "This book was not what I expected and didn't help me as someone who wanted the basics" -- a reviewer looking for step-by-step practical guidance
- "Good background and theory book but not the complete guide it claims to be if your need is a practical manual for projects"
- "Very out of date" (from a non-Australian reviewer, though the AU/NZ focus is actually a feature, not a bug for this market)

### Where He Falls Short for Beginners

1. **No decision framework** -- He explains how things work, but doesn't guide a beginner through "here's what to buy for your situation." No worksheets, no "if you're a weekender, start here" pathways.
2. **No visual step-by-step installation** -- Theory-heavy, light on practical "do this, then this" wiring walkthroughs with photos.
3. **No shopping lists** -- Doesn't recommend specific products or brands (by design, as he aims to be vendor-neutral, but beginners want someone to just tell them).
4. **No printable tools** -- No power audit worksheet, no sizing calculator, no installation checklist.
5. **Published in 2020** -- The 48V revolution, new battery chemistries, and updated AS/NZS 3001.2:2022 standards aren't covered. The lithium market has changed dramatically since then.
6. **Two separate books** -- You need both "Caravan and Motorhome Electrics" ($31.75) and "Solar That Really Works" ($23.91) to cover the full picture -- $55+ for both, and still no practical decision-making tools.

### The Gap

Rivers is the textbook. What's missing is the workbook -- the practical, "here's what to do" companion that translates his (and similar) knowledge into action for someone who isn't an engineer.

---

## 3. YouTube Landscape

### Key Australian Caravan/Solar Content Creators

**Stephen Browne / The Browne Town** ([thebrownetown.com](https://thebrownetown.com/), YouTube: @TheBrowneTown)
- Electrician by trade
- Produces detailed comparison tables and reviews (lithium batteries, solar panels, DC-DC chargers, inverters, fridges)
- His [lithium battery comparison](https://thebrownetown.com/lithium-battery-comparison/) covers REDARC, Enerdrive, Revolution Power, Invicta, Victron, DCS, Amptron, Kings, iTechworld
- His [fixed solar panel comparison](https://thebrownetown.com/fixed-solar-panel-comparison/) is similar in depth
- This is probably the closest thing to what you'd be competing with, but it's product-comparison content, not a beginner's educational guide

**Wild Touring** (158K subscribers)
- Western Australian family travel content
- Covers off-grid setups as part of broader travel content, not dedicated solar education

**Caravan Adventure Aus** (48.9K subscribers)
- Bryce Connole & Chelsea Wood
- Nomadic lifestyle documentation, includes setup content

**Trip In A Van** (259.1K Instagram followers)
- Large audience, travel-first content with some technical content
- Partners with Enerdrive (brand-specific content)

**Mowgli Adventures** (international, large reach)
- Graham is a marine electrical engineer with 20+ years experience
- Published the "Campervan Electrics Handbook"
- YouTube channel, blog, Facebook group reaching 1M+ users/year
- Very comprehensive wiring diagrams (free, from 100W to 800W)
- More van-focused than caravan-focused, and UK/international rather than Australian

**EXPLORIST.life** (Nate Yarbrough, US-based)
- Brand ambassador for Victron and Battle Born Batteries
- Sells interactive wiring diagrams and component kits ($2,494-$2,593 for kits)
- Sets the gold standard for DIY solar education, but US-focused. No Australian electrical standards, products, or conditions covered.

### What Gets the Most Views

Solar setup tours ("our complete electrical setup revealed"), battery comparison videos, "how much solar do you actually need" explainers, and mistake/regret videos consistently perform well. The pattern is clear: people want to see real-world systems and learn from others' mistakes.

### What's Selling Alongside Videos

- **EXPLORIST.life**: Full wiring diagram packages and component kits (US market)
- **Zero Grid** (Landon, Australian electrician): Downloadable wiring diagrams at $29 AUD (from $49), custom wiring diagram service, and a $299 "No Bullsh*t Caravan Electrical Report" (40-point AS3001 compliance check with personalised video walkthrough)
- **Mowgli Adventures**: Campervan Electrics Handbook
- **The Browne Town**: Blog content with affiliate links (comparison tables drive product purchases)

### What's Missing from YouTube

1. **Structured beginner curriculum** -- YouTube videos are scattered fragments. Nobody has created a "start here, go through in order, finish with a working system" series for the Australian market.
2. **Printable companion materials** -- Video is great for seeing how things work, but useless when you're standing at Jaycar trying to remember what cable size you need. Written/printable guides fill this gap.
3. **Australian-specific content** -- Most thorough solar education content is US-based (EXPLORIST.life, Parked in Paradise). Australian sun hours, products (REDARC, Enerdrive), electrical standards (AS/NZS 3001.2:2022), and retailer landscape are different.
4. **Decision-support tools** -- Calculators, worksheets, and shopping lists that a viewer can take away and use.

---

## 4. Common Questions & Pain Points

### From The Grey Nomads Forum, DIY Solar Power Forum, Caravaners Forum, and Whirlpool

The most frequently asked questions cluster around these themes:

**Battery Chemistry Confusion**
- "Should I go lithium or stick with AGM?"
- "Is lithium worth the extra cost?"
- "Can I just swap my AGM for lithium?"
- Answer most people eventually reach: Lithium is worth it. A 100Ah lithium gives ~80-100Ah usable vs ~50Ah from AGM. Lithium lasts 10+ years vs 3-5 for AGM. But you can't just swap -- the charge profile is completely different, and under the new AS/NZS 3001.2:2022 standard, changing from lead-acid to lithium is classified as an "alteration" requiring compliance with the new standard.

**Panel Sizing**
- "How much solar do I actually need?"
- "Is 200W enough?"
- "Series or parallel wiring?"
- Series wiring can have output seriously reduced by shading of one panel; parallel generally works better for caravans where partial shading is common.

**Charge Controller Confusion**
- "Do I need MPPT or is PWM fine?"
- MPPT harvests 5-30% more energy than PWM, but the advantage is reduced in hotter climates (relevant for much of Australia). For systems under ~200W with simple setups, PWM can be fine. Above that, MPPT is the standard recommendation.

**Wiring Anxiety**
- "What cable size do I need?"
- "How do I connect everything together?"
- "Do I need an electrician or can I DIY?"
- Under Australian standards, like-for-like repairs are fine for DIY. Alterations (adding circuits, changing battery chemistry, adding panels) technically require compliance with AS/NZS 3001.2:2022 and consultation with a qualified professional.

**Real-World Output Disappointment**
- "My 400W panels are only giving me 200W"
- This is the number one source of frustration. Flat roof-mounted panels rarely achieve rated output. Temperature, angle, dust, and shading all reduce actual yield significantly.

### Expensive Mistakes Reported

- Buying a cheap PWM controller for a large system (losing 20-30% of potential energy harvest)
- Running undersized cables that overheat
- Installing fixed panels without an external Anderson plug for portable panels
- Buying AGM batteries and then upgrading to lithium 12 months later (wasted $400-800)
- Not installing a battery monitor and running batteries too flat
- Buying a non-pure-sine-wave inverter that damages sensitive electronics

### What People Wish They'd Known

- "Start with more battery capacity than you think you need"
- "Portable panels are almost more important than roof panels"
- "A battery monitor is essential, not optional"
- "Add a 20-25% buffer to your power audit calculations"
- "Dust and shade destroy your solar output"

Sources: [Grey Nomads Forum](https://thegreynomads.activeboard.com/f618611/solar-power/), [DIY Solar Power Forum](https://diysolarforum.com/threads/simple-setup-here-in-australia.80426/), [RV Daily](https://rvdaily.com.au/caravan-solar-youre-doing-it-wrong/)

---

## 5. Product & Brand Landscape

### Major Brands in Australian Caravan Solar

**REDARC** (Australian, Adelaide-based)
- The most trusted brand in the Australian 12V market
- Known for the BCDC range of DC-DC chargers (the industry standard)
- All-in-one approach: Manager30 handles solar, alternator, and 240V charging in one unit
- Fully sealed units, robust build quality
- Offers fixed solar panels and solar blankets
- Extensive educational content: [how-to guides](https://www.redarcelectronics.com/au/discover/how-to-power-a-caravan-off-grid/), installation videos, sizing guides
- Price positioning: premium

**Victron Energy** (Netherlands, est. 1975)
- The go-to for custom, scalable systems
- Excellent app ecosystem: VictronConnect (Bluetooth monitoring), VRM portal (remote web monitoring)
- Requires more components and more knowledge to configure vs REDARC
- Popular with full-timers and heavy-demand users
- SmartShunt, BlueSolar MPPT controllers, MultiPlus inverter/chargers
- Products available through Solar 4 RVs, Zero Grid, Energy Connections, and others in Australia

**Enerdrive** (Australian, now owned by Dometic)
- "Powerhouse in battery management and charging"
- Best warranty in the game: 5-year warranty + lifetime tech support from Australian-based senior technicians
- eSystem range of pre-wired power boards: plug-and-play solution for DIY installs
- Strikes a balance between quality and price (cheaper than REDARC for equivalent functionality)
- Partners with Trip In A Van for marketing
- 180W panels considered good value

**Renogy** (Chinese, strong AU presence via au.renogy.com)
- Budget-friendly entry point
- 200Ah lithium battery from $477 AUD (on sale from $530)
- 200W monocrystalline panel from $221 AUD
- Complete power kits from $1,536 AUD
- Good educational content: [beginners guide to solar panels](https://au.renogy.com/blog/beginners-guide-to-solar-panels/)
- Positioned as the "good enough" option for budget-conscious buyers

**Other notable brands**: Invicta, DCS, Amptron, Revolution Power, Kings (budget), iTechworld, BMPRO

### Brand Educational Content

**REDARC**: Comprehensive blog/discover section with articles like "How to power a caravan off-grid," "Choosing the right solar system," installation tutorials. High-quality but product-specific (naturally steers you toward REDARC products).

**Enerdrive**: Comprehensive guides through partners like Zone RV, CaravansPlus. The eSystem DIY guide on [CaravansPlus](https://www.caravansplus.com.au/guides/enerdrive-esystem-power-boards-the-ultimate-diy-guide-for-caravan-enthusiasts-a-149.html) is very good.

**Renogy AU**: Blog with buyer's guides and beginner content. Decent but shallow compared to REDARC.

**Victron**: Primarily technical documentation. The VictronConnect ecosystem is the education -- the app teaches by showing you your system in real-time.

### Retailers and Their Content

**Solar 4 RVs** ([solar4rvs.com.au](https://www.solar4rvs.com.au/)): Australian family-owned, considered the leading specialist. Offers the SPEC solar calculator, buyer guides, FAQ pages. Good educational content, but obviously oriented toward selling their products.

**Caravan RV Camping** ([caravanrvcamping.com.au](https://www.caravanrvcamping.com.au/)): Solar calculator tool, buyer's guides, appliance power draw information. One of the better retailer educational resources.

**My Generator** ([mygenerator.com.au](https://www.mygenerator.com.au/)): Solar calculator with Australian city sun hours data, battery management system buying guide.

**Jaycar**: Offers basic DIY components and general electronics education, but nothing specific to caravan solar at a meaningful depth. Their "portable power system design" page is generic.

### Independent Guides

There are effectively **zero** independent, comprehensive, beginner-friendly guides that aren't either:
(a) a product sales funnel,
(b) Collyn Rivers' books, or
(c) scattered blog posts / forum threads.

This is the gap.

---

## 6. Sizing and Calculator Tools

### Australian-Specific Calculators

**Camping Solar Calculator** ([campingsolarcalculator.com.au](https://campingsolarcalculator.com.au/))
- Free
- Pre-loaded with sun hours for major Australian cities
- Inputs: power draw (watts or amps), daily usage hours, system voltage (12V/24V/48V), peak sun hours, battery type
- Outputs: panel wattage, battery capacity, wire gauge, fuse sizing, charge controller, inverter size
- Warning alerts if existing equipment is insufficient
- This is the closest thing to a standalone tool in the market

**Solar 4 RVs SPEC Calculator** ([solar4rvs.com.au](https://www.solar4rvs.com.au/buying/buyer-guides/assessing-your-solar-needs/solar-power-estimate-calculator-spec-for-caravans/))
- Created 2014
- Considers power consumption, travel destinations, PV performance data
- Results can be emailed for a personalised system quote (lead generation tool)

**Caravan RV Camping Solar Calculator** ([caravanrvcamping.com.au](https://www.caravanrvcamping.com.au/page/solar-calculator/))
- Allows experimenting with different panel sizes/configurations
- Tells you how long you can camp off-grid without solar

**My Generator Solar Calculator** ([mygenerator.com.au](https://www.mygenerator.com.au/solar-calculator))
- Australian capital city sun hours data
- Battery bank size and type input
- Tells you number of camping days possible

**Solar Camping Australia** ([solarcampingaustralia.com.au](https://solarcampingaustralia.com.au/panel-selection-calculator/))
- Panel selection calculator
- Input appliance amperage and hours of use

### International Calculators

**FarOutRide** ([faroutride.com/van-electrical-calculator](https://faroutride.com/van-electrical-calculator)): Very well-designed interactive tool, but van-focused and North American.

**EXPLORIST.life**: Embedded tools within their guides, US-focused.

**Mowgli Adventures** ([mowgli-adventures.com](https://mowgli-adventures.com/rv-solar-calculator/)): RV solar calculator, UK-based but broadly applicable.

### What a Useful Calculator Needs

Based on all existing tools, the essential inputs would be:

- **Appliance list** with watts and daily hours (pre-populated with common caravan appliances: compressor fridge, LED lights, TV, phone chargers, laptop, water pump, diesel heater, microwave, coffee machine, hair dryer, air conditioner)
- **Location** (Australian city/region, mapped to average peak sun hours by season)
- **Travel style** (weekender / regular tourer / full-timer)
- **Battery type** (lithium vs AGM, with automatic DoD adjustment)
- **Days of autonomy** (how many cloudy days you want to survive without solar)
- **Existing equipment** (what you already have, so it can show what to add)

Outputs should include:
- Daily Wh requirement
- Recommended battery capacity (Ah)
- Recommended solar wattage
- Charge controller size (amps)
- Inverter size (watts)
- Cable gauge recommendations
- A shopping list with specific product suggestions

### Could a Calculator Be a Lead Magnet or Standalone Product?

A calculator is an excellent **lead magnet** -- probably the best possible one for this market. Here's why:

1. **Immediate utility** -- Someone can use it right now and get value
2. **Naturally leads to the guide** -- Once they know their numbers, they need to understand what the numbers mean and how to act on them
3. **Shareability** -- "Use this free calculator to size your caravan solar system" is highly shareable in Facebook groups
4. **Data capture** -- Email to get your results is a standard and accepted exchange

As a standalone paid product, a calculator alone has limited ceiling (the free options are already decent). But as a **feature within a paid guide** (interactive worksheets, a personalised system sizing tool), it adds significant value.

---

## 7. What Should the Guide Actually Cover?

### Recommended Structure: "The Complete Beginner's Guide to Caravan Solar & Electrical"

**Part 1: Understanding Your Power (The Foundation)**

1. **How 12V power actually works** -- Volts, amps, watts, amp-hours explained in plain language with caravan-specific examples. Not a physics lesson. "Think of it like water through a pipe."
2. **Your power audit** -- Step-by-step worksheet: list every appliance, its wattage, hours of daily use. Pre-filled example for a typical setup. Total daily Wh calculation. **Include a printable Power Audit Worksheet.**
3. **What type of traveller are you?** -- Decision tree: weekender / tourer / full-timer / high-demand off-gridder. Each pathway leads to a different recommended system tier.

**Part 2: The Components (What Each Piece Does)**

4. **Batteries explained** -- Lithium vs AGM vs Gel. Depth of discharge, cycle life, real-world cost comparison over 5 years. Why lithium wins for most people despite higher upfront cost. Clear recommendation.
5. **Solar panels explained** -- Fixed vs portable vs blankets. Monocrystalline vs polycrystalline. Why rated wattage is a lie (real-world output in Australian conditions). Why you need both fixed AND portable.
6. **Charge controllers** -- MPPT vs PWM. When PWM is fine (small simple systems in hot climates) and when you must go MPPT. Sizing rules.
7. **DC-DC chargers** -- Why you need one, how alternator charging works, the REDARC BCDC as industry standard, alternatives.
8. **Inverters** -- Pure sine wave vs modified sine wave (always pure sine). Sizing for your actual loads. Surge capacity.
9. **Monitoring** -- Battery monitors, shunts, Bluetooth apps. Why flying blind kills batteries.
10. **Wiring essentials** -- Cable sizing rules of thumb, fusing every positive cable, Anderson plugs, bus bars. **Include a Cable Sizing Reference Card.**

**Part 3: Designing Your System**

11. **Sizing your system** -- Using your power audit numbers to calculate battery capacity, solar wattage, controller size, inverter size. Worked examples for each traveller tier. **Include an interactive/printable System Sizing Worksheet.**
12. **Choosing your products** -- Brand comparison: REDARC vs Victron vs Enerdrive vs Renogy. What each is best for. Specific product recommendations at each price tier. **Include a Shopping List Template.**
13. **Reading a wiring diagram** -- How to read the diagrams you'll encounter. Common symbols.

**Part 4: Installation**

14. **Before you start** -- Australian standards (AS/NZS 3001.2:2022) explained simply. What you can DIY, what needs a professional. Tools you'll need.
15. **Installation walkthrough** -- Step-by-step with diagrams: mounting panels, running cables, connecting controller, wiring battery bank, installing DC-DC charger, wiring inverter, installing monitoring. **Include an Installation Checklist.**
16. **Testing and commissioning** -- How to verify everything works. First-charge procedure. What to check.

**Part 5: Living With Your System**

17. **Daily management** -- Reading your battery monitor, optimal charging habits, managing loads.
18. **Seasonal adjustments** -- Winter vs summer output in different parts of Australia. When you need to supplement with a generator. Sun hour data by region.
19. **Troubleshooting** -- Common problems and fixes. "My batteries aren't charging." "My inverter is tripping." "My panels aren't producing what they should."
20. **Upgrading** -- When and how to add capacity. Future-proofing decisions. The 48V trend explained.

### Essential Diagrams and Visuals

- System overview diagram (how all components connect)
- Wiring diagrams for each system tier (weekender through full-timer)
- Battery bank wiring (series vs parallel)
- Solar panel wiring (series vs parallel vs series-parallel)
- Anderson plug wiring detail
- Fuse and bus bar layout
- Cable sizing reference table
- Sun hours map of Australia by season
- Decision flowcharts (battery choice, panel choice, controller choice)

### Printable Worksheets and Tools

1. **Power Audit Worksheet** -- Pre-populated appliance list with common caravan items and their typical wattage. Fill in hours of use. Calculates daily Wh.
2. **System Sizing Worksheet** -- Takes power audit output, applies battery DoD, sun hours, system losses. Outputs required battery, solar, controller, inverter specs.
3. **Shopping List Template** -- For each system tier, a fillable shopping list with component categories, recommended products, quantity, and price columns.
4. **Installation Checklist** -- Step-by-step tick boxes for the full installation process.
5. **Pre-Trip Power Check Checklist** -- Quick reference card for checking your system before heading out.
6. **Brand Comparison Quick Reference** -- One-page REDARC vs Victron vs Enerdrive vs Renogy at a glance.

### Technical Detail Level

The right level is: **enough to make confident purchasing and installation decisions, not enough to design a system from first principles.** The reader should finish the guide knowing exactly what to buy, why, and how to install it (or brief an installer). They should NOT need to understand Ohm's law in depth, calculate voltage drop manually, or read technical datasheets.

The key differentiator vs Collyn Rivers: **this guide tells you what to do, not just how things work.**

---

## 8. Price Point Research

### Professional Installation Costs

- **Basic installation** (panels, mounts, wiring to existing system): from $990 AUD ([QuickTech](https://quicktech.com.au/caravan-solar-panels/))
- **Existing system upgrades**: from $750 AUD
- **Full system install** (panels + battery + DC-DC + inverter + wiring + monitoring): $2,000-$5,000+ in labour alone, depending on complexity
- **Custom 48V system install**: $5,000-$10,000+ in labour

### Typical DIY System Costs (Components Only)

| System Level | Components | Approximate Cost (AUD) |
|-------------|-----------|----------------------|
| **Basic weekender** | 200W panel, PWM controller, 100Ah lithium, basic wiring | $1,200-$1,800 |
| **Mid-range tourer** | 400W panels, MPPT controller, 200Ah lithium, DC-DC charger, 2000W inverter, monitoring | $3,000-$5,000 |
| **Full off-grid** | 600W panels, MPPT, 300-400Ah lithium, DC-DC, 3000W inverter, full monitoring | $5,000-$8,000 |
| **Premium off-grid** | 800W+ panels, Victron ecosystem, 400Ah+ lithium, MultiPlus, GX monitoring | $8,000-$15,000 |

Specific component prices (from Renogy AU, which sits at the budget-to-mid range):
- 200W monocrystalline panel: $221 AUD
- 200Ah LiFePO4 battery: $478-$810 AUD
- DC-DC battery charger (20/40A): $153 AUD
- 2000-3000W pure sine wave inverter: $243+ AUD
- Complete 200Ah power kit: $1,536 AUD (on sale from $1,988)

For premium brands (REDARC, Victron, Enerdrive), add 30-100% to these figures.

### What This Means for Guide Pricing

The economics strongly favour a premium-priced guide:

1. **The savings context**: A guide that prevents even ONE mistake (wrong battery chemistry, undersized cables, buying AGM then upgrading to lithium) saves $400-$1,000+.
2. **The DIY vs professional context**: If the guide enables confident DIY installation, it saves $2,000-$5,000 in professional installation labour on a mid-range system.
3. **Total system investment**: Someone spending $3,000-$10,000 on components is highly motivated to get it right. A $49-$99 guide is trivial in this context.

### Pricing Strategy Recommendation

**Core guide**: $49-$79 AUD
- Complete ebook/PDF guide
- All printable worksheets
- Wiring diagrams for each system tier
- Brand comparison tables
- Shopping list templates

**Premium bundle**: $99-$149 AUD
- Everything above
- Interactive solar sizing calculator (web-based tool)
- Video walkthroughs of key installation steps
- Access to updates (new products, standard changes)
- Possibly a private community or Q&A access

**Lead magnet (free)**: Solar Sizing Calculator
- Captures email
- Delivers genuine value
- Natural upsell to the full guide ("Now you know what you need, here's how to install it")

For reference, the competitive landscape:
- Collyn Rivers' two books together: ~$55 AUD (but no worksheets, tools, or product recommendations)
- Zero Grid wiring diagrams: $29-$49 each
- Zero Grid electrical report: $299 (service, not guide)
- EXPLORIST.life wiring kits: $2,494+ USD (US market, includes physical components)
- Grey Nomad 101 DVD: $75 (outdated format)

A $49-$79 guide sits in a comfortable no-brainer zone: less than a single solar panel, less than a single hour of professional installer labour, and dramatically more actionable than the existing alternatives.

---

## Summary of the Opportunity

The gap in this market is clear and significant:

**What exists**: Collyn Rivers' engineering-level textbooks. Scattered YouTube content (mostly travel-first, not education-first). Brand-specific buyer guides that are thinly veiled sales funnels. Free calculators that give numbers without context. Forum threads full of conflicting advice.

**What doesn't exist**: A single, comprehensive, beginner-friendly guide written specifically for the Australian market that takes someone from "I know nothing about solar" to "I've confidently installed a working system" -- with the worksheets, diagrams, product recommendations, and decision frameworks to actually get it done.

**Why the timing is right**: 900,000+ registered RVs in Australia. $11.2 billion annual traveller expenditure. The industry is in a technology transition (AGM to lithium, 12V to 48V, new AS/NZS 3001.2:2022 standards). Facebook groups are flooded with the same questions on repeat. The demographic (grey nomads + increasingly younger travellers) has both the money and the motivation.

The person who creates this guide doesn't need to be an electrician. They need to be a good translator: taking expert knowledge and making it accessible, actionable, and specific. That's exactly what a well-researched digital product can do.

---

Sources:
- [RV Daily - Caravan Solar: You're Doing It Wrong](https://rvdaily.com.au/caravan-solar-youre-doing-it-wrong/)
- [Home and RV - Off-Grid Caravan Power Guide](https://www.homeandrv.com.au/blog/off-grid-caravan-power-guide-12v-48v)
- [REDARC - How to Power a Caravan Off Grid](https://www.redarcelectronics.com/au/discover/how-to-power-a-caravan-off-grid/)
- [REDARC - New Caravan Standards](https://www.redarcelectronics.com/au/discover/new-caravan-standards/)
- [Camping Solar Calculator Australia](https://campingsolarcalculator.com.au/)
- [Solar 4 RVs - SPEC Calculator](https://www.solar4rvs.com.au/buying/buyer-guides/assessing-your-solar-needs/solar-power-estimate-calculator-spec-for-caravans/)
- [Caravan RV Camping - Buyer's Guide](https://www.caravanrvcamping.com.au/buyers-guide-to-caravan-solar-panels-and-systems/)
- [Booktopia - Collyn Rivers Caravan Electrics](https://www.booktopia.com.au/caravan-motorhome-electrics-collyn-rivers/book/9780648319085.html)
- [RV Books - Collyn Rivers](https://rvbooks.com.au/)
- [Goodreads - Caravan and Motorhome Electrics](https://www.goodreads.com/book/show/49796076-caravan-and-motorhome-electrics)
- [Amazon AU - Solar That Really Works](https://www.amazon.com.au/Solar-That-Really-Works-campervans/dp/0648319032)
- [The Browne Town - Lithium Battery Comparison](https://thebrownetown.com/lithium-battery-comparison/)
- [The Browne Town - Fixed Solar Panel Comparison](https://thebrownetown.com/fixed-solar-panel-comparison/)
- [Zero Grid - Wiring Diagrams](https://www.zerogrid.com.au/collections/off-grid-wiring-diagram/suitable_caravan)
- [Zero Grid - Electrical Report](https://www.zerogrid.com.au/products/the-no-bullsh-t-caravan-motorhome-electrical-report)
- [EXPLORIST.life - DIY Solar](https://explorist.life/diy-campervan-solar/)
- [QuickTech - Caravan Solar Installation](https://quicktech.com.au/caravan-solar-panels/)
- [Renogy AU](https://au.renogy.com/)
- [Enerdrive](https://enerdrive.com.au/)
- [My Generator - Solar Calculator](https://www.mygenerator.com.au/solar-calculator)
- [Grey Nomads Forum - Solar Power](https://thegreynomads.activeboard.com/f618611/solar-power/)
- [DIY Solar Power Forum - Australia](https://diysolarforum.com/threads/simple-setup-here-in-australia.80426/)
- [Victron Energy Australia](http://www.victronenergy.net.au/)
- [CaravansPlus - Enerdrive eSystem Guide](https://www.caravansplus.com.au/guides/enerdrive-esystem-power-boards-the-ultimate-diy-guide-for-caravan-enthusiasts-a-149.html)
- [Feedspot - Top 25 Australian Caravan Creators](https://rvfinder.com.au/rv-finders-top-25-australian-caravan-content-creators-to-follow-in-2025/)
- [Camplify - Top 21 Camping Facebook Groups](https://www.camplify.com.au/blog/top-21-facebook-groups-for-camping-and-caravanning-in-australia)
- [The Grey Nomads](https://www.thegreynomads.com.au/)
- [Ausmotion - AS3001.2 Legal Requirement](https://ausmotion.com/2024/06/28/is-as3001-2-a-legal-requirement/)
- [Sungold - RV Power Calculator Guide](https://www.sungoldsolar.com/rv-power-calculator-caravan-solar-guide/)
- [Caravancampingsales - 48V Caravan Brigade](https://www.caravancampingsales.com.au/editorial/details/charge-of-the-48v-caravan-brigade-133151/)

*Researched February 2026*