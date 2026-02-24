# Quiz Funnel: "What solar system does your caravan actually need?"

*Build on Typeform. ~2 minutes. 8 questions. Result page with personalised recommendation + guide upsell.*

---

## Quiz Setup

**Title:** What solar system does your caravan actually need?
**Subtitle:** Answer 8 quick questions and get a personalised recommendation for your exact setup.
**Estimated time:** 2 minutes

---

## Questions

### Q1: What type of caravan do you have?

*Single select. Image cards if possible.*

- Popup camper / camper trailer
- Standard caravan (under 20ft)
- Large caravan (20ft+) or fifth wheeler
- Motorhome / bus conversion

**Scoring:** This affects weight/roof space considerations in the result copy but doesn't change the tier recommendation directly.

---

### Q2: How do you mainly travel?

*Single select.*

- Weekends and long weekends
- Week-long trips, a few times a year
- Months at a time (big trips, grey nomad lifestyle)
- Full-time on the road

**Scoring:**
- Weekends → Weekender tier (1 point)
- Week-long → Tourer tier (2 points)
- Months → Tourer/Full-timer (3 points)
- Full-time → Full-timer tier (4 points)

---

### Q3: What's your camping style?

*Single select.*

- Mostly caravan parks (powered sites)
- Mix of parks and free camping
- Mostly free camping
- Off-grid as much as possible

**Scoring:**
- Caravan parks → 0 points (less solar needed)
- Mix → 1 point
- Mostly free → 2 points
- Off-grid → 3 points

---

### Q4: Which appliances do you need to run off-grid?

*Multi-select. This is the key power estimation question.*

- Fridge (compressor, 12V)
- LED lights
- Phone/tablet chargers
- TV (12V)
- Laptop
- Diesel heater
- CPAP machine
- Coffee machine (via inverter)
- Microwave (via inverter)
- Hair dryer (via inverter)
- Air conditioning

**Scoring (estimated daily Wh contribution):**
- Fridge: +1,440 Wh
- LED lights: +150 Wh
- Phone/tablet chargers: +90 Wh
- TV: +180 Wh
- Laptop: +130 Wh
- Diesel heater: +180 Wh
- CPAP: +360 Wh
- Coffee machine: +150 Wh (short use, high draw)
- Microwave: +200 Wh (short use, very high draw)
- Hair dryer: +200 Wh (short use, very high draw)
- Air conditioning: +8,000 Wh (flags as "this needs a 48V system" in results)

---

### Q5: Do you already have any solar or battery setup?

*Single select.*

- Nothing — starting from scratch
- Basic factory setup (small AGM battery, maybe a small panel)
- Some aftermarket upgrades but it's not enough
- Full system that's not performing well

**Scoring:** Doesn't change tier, but changes result copy:
- "Nothing" → full system recommendation
- "Factory setup" → upgrade recommendation with note about what to keep/replace
- "Some upgrades" → gap analysis framing
- "Not performing" → troubleshooting framing + system review recommendation

---

### Q6: What's your biggest concern?

*Single select. This is for result page copy personalisation, not tier scoring.*

- Wasting money on the wrong gear
- Not having enough power off-grid
- The wiring and installation side of things
- Understanding what I actually need (I'm overwhelmed)

**Result copy mapping:**
- Wrong gear → emphasise brand comparison and shopping lists
- Not enough power → emphasise power audit and sizing worksheets
- Wiring/installation → note that the guide covers decisions not installation, recommend consulting an installer
- Overwhelmed → emphasise step-by-step nature and decision framework

---

### Q7: What's your budget range for the full solar system?

*Single select.*

- Under $2,000
- $2,000 – $5,000
- $5,000 – $10,000
- Whatever it takes to get it right

**Scoring:**
- Under $2K → Budget-conscious, Renogy/Enerdrive recommended
- $2-5K → Sweet spot for Tourer tier, mix of brands
- $5-10K → Full-timer range, premium brands available
- Whatever it takes → Premium recommendation, Victron/REDARC

---

### Q8: Where in Australia do you mainly travel?

*Multi-select. Affects sun hours estimate in result.*

- Northern Australia (NT, Top End, FNQ)
- Central Australia (Red Centre, Outback)
- Eastern seaboard (QLD, NSW, VIC coast)
- Western Australia
- South Australia
- Tasmania
- All over (doing a lap!)

**Sun hours mapping:**
- Northern: 5.5-6.0 avg (excellent)
- Central: 6.0-6.5 avg (best in AU)
- Eastern seaboard: 4.5-5.0 avg (good, drops in winter)
- WA: 5.0-5.5 avg (good)
- SA: 5.0-5.5 avg (good)
- Tassie: 3.5-4.0 avg (plan for winter deficit)
- All over: use 5.0 as conservative average

---

## Email Capture Screen

**Appears after Q8, before results.**

"Your personalised solar recommendation is ready. Enter your email to get the full breakdown."

Fields:
- First name
- Email address

Button: "See My Recommendation"

Small print: "We'll send you a copy of your results. No spam, unsubscribe anytime."

---

## Result Page — Tier-Based

### Result Calculation Logic

**Total tier score = Q2 score + Q3 score**

- 1-2 points → **Weekender**
- 3-5 points → **Tourer** (most people land here)
- 6-7 points → **Full-timer**

If Q4 includes air conditioning → override with special result (48V system needed).

Estimated daily Wh from Q4 is displayed in the result for reference.

---

### Weekender Result

**Headline:** "You're a Weekender — here's what you need"

**System recommendation:**
- 200W fixed solar panel
- 100-200Ah lithium battery
- PWM or 20A MPPT charge controller
- 20A DC-DC charger
- 1000W pure sine wave inverter (optional)
- Battery monitor

**Estimated budget:** $1,500 – $2,500
**Estimated daily use:** [calculated from Q4] Wh

**Copy:** "Good news — your setup is straightforward. A modest solar panel and a decent lithium battery will keep you comfortable for 2-3 nights off-grid. The DC-DC charger tops you up on driving days. This is the most cost-effective tier to get right."

---

### Tourer Result

**Headline:** "You're a Regular Tourer — here's what you need"

**System recommendation:**
- 300-400W fixed solar + 160-200W portable panel
- 200-300Ah lithium battery
- 30-40A MPPT charge controller
- 40A DC-DC charger
- 2000W pure sine wave inverter
- Bluetooth battery monitor

**Estimated budget:** $3,000 – $5,000
**Estimated daily use:** [calculated from Q4] Wh

**Copy:** "This is the sweet spot for most Australian caravanners. Enough solar and battery to free camp indefinitely in good weather, with a portable panel for flexibility. The 2000W inverter runs everything except heavy appliances like air con."

---

### Full-timer Result

**Headline:** "You're a Full-timer — here's what you need"

**System recommendation:**
- 400-600W fixed solar + 200W+ portable panel
- 300-400Ah lithium battery
- 40-50A MPPT charge controller
- 40-60A DC-DC charger
- 3000W pure sine wave inverter
- Bluetooth battery monitor with history

**Estimated budget:** $5,000 – $8,000+
**Estimated daily use:** [calculated from Q4] Wh

**Copy:** "You need a serious system for full-time living. The good news is it's a solved problem — plenty of full-timers run exactly this setup across Australia. The 3000W inverter handles your microwave and coffee machine (one at a time), and 400W+ of solar keeps the batteries topped up."

---

### All Results — Guide Upsell Block

**Appears below every result:**

---

**Get the complete guide with everything you need to buy with confidence.**

The quiz gives you the overview. The guide gives you:

✓ Power Audit Worksheet (calculate your exact daily usage)
✓ Brand comparisons (REDARC vs Victron vs Enerdrive vs Renogy)
✓ Ready-to-use shopping lists for your exact tier
✓ System sizing worksheets (verify every component spec)
✓ The 7 expensive mistakes that cost people $500–$2,000

**The Beginner's Guide to Caravan Solar — $49**

[Get the Guide →] (links to landing page or direct checkout)

---

## Typeform Implementation Notes

- Use Typeform's Logic feature to show different result screens based on score
- Calculate the estimated Wh from Q4 appliance selections using hidden fields
- Tag contacts by tier (weekender/tourer/fulltime) for future email segmentation
- Track completion rate to identify drop-off questions
- The email capture between Q8 and results is standard Typeform practice
- Consider adding a "Share your result" social sharing option on the result page

## Facebook Pixel Integration

- Add Typeform's Facebook Pixel integration
- Fire events on: quiz start, email capture, result page view, guide link click
- This lets you build retargeting audiences from quiz takers who didn't buy
