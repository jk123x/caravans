# Section 5: Checking Your Sizing

*~3 pages. Light on maths, heavy on "does this look right?" Worked example, then a simple worksheet.*

---

> **TL;DR: If you're buying from the shopping lists in Section 4, the sizing is already done for you. This section is a double-check for peace of mind, or for people whose setups don't fit neatly into one tier. If you trust the shopping list, skip to Section 6.**

## The Quick Sanity Check

Before you buy, run your system through these three checks. If all three pass, your system is balanced and you're good to go.

**Check 1: Solar vs Battery**
Your total solar watts should be roughly 1.5 to 2 times your battery's Ah rating.

- 200Ah battery → 300-400W of solar ✓
- 300Ah battery → 450-600W of solar ✓

If your solar is below this ratio, it'll take longer to charge. If it's way above, you're spending more on panels than you need to.

**Check 2: Controller vs Solar**
Your charge controller amps should be about one-third of your total solar wattage.

- 400W solar → 30-40A controller ✓
- 600W solar → 40-50A controller ✓

**Check 3: Inverter vs Biggest Appliance**
Your inverter should be at least 2 times the wattage of the biggest single appliance you'll run.

- Biggest appliance is a 1000W microwave → 2000W inverter ✓
- Biggest appliance is a 65W laptop → 1000W inverter is plenty ✓

**All three checks pass? You're done. Go buy it.**

---

## The Longer Version (Only If You Need It)

Most people don't need this section — the shopping lists have the sizing done for you. But if your setup doesn't match a tier neatly, or you just want to double-check, here's how each number is calculated.

### Worked Example: Dave and Sarah

Daily power use: **2,700 watt-hours** (from Section 2, with the 25% buffer)

**Battery:**
They need a battery big enough to get through the night and handle a cloudy day.

2,700 watt-hours ÷ 12 volts = 225 amp-hours minimum. Adding a buffer for a cloudy day: about 300-400Ah. They go with **2× 200Ah lithium batteries (400Ah total)**.

**Solar panels:**
They need enough solar to replace what they use each day, factoring in that panels don't produce their rated output.

In central/northern Australia they get about 5-5.5 hours of good sun per day. Their panels will produce about 65% of their rated wattage in real conditions.

2,700 ÷ 5.5 hours ÷ 0.65 = about 760W from solar alone. But their DC-DC charger helps a lot on driving days, so they don't need 100% from solar. They go with **400W on the roof + a 200W portable** (600W total) and let the driving days make up the difference.

**Charge controller:**
400W roof panels ÷ 12V × 1.25 safety margin = 42A. They buy a **50A MPPT controller**.

**DC-DC charger:**
They're tourers who drive regularly. A **40A** charger gives them about 160Ah on a 4-hour driving day — a big chunk of their daily use.

**Inverter:**
Their biggest 240V appliance is a microwave at about 1,000W. With a safety margin: **2000W pure sine wave**.

**Dave and Sarah's final system:**

| Component | What They Bought |
|-----------|-----------------|
| Battery | 2× 200Ah lithium (400Ah total) |
| Solar (roof) | 2× 200W panels (400W) |
| Solar (portable) | 1× 200W folding panel |
| Charge controller | 50A MPPT |
| DC-DC charger | 40A |
| Inverter | 2000W pure sine wave |
| Battery monitor | Victron SmartShunt |
| **Total cost** | **~$4,500 - $5,500** |

---

## Sun Hours by Region

If you're doing the longer sizing calculation, you need to know how much sun you'll get. Here are average daily peak sun hours across Australia:

| Where You Travel | Good Season | Poor Season | Average |
|-----------------|:-----------:|:-----------:|:-------:|
| Northern AU (Darwin, Cairns, Top End) | 5.5-6.5 | 5.0-6.0 | 5.5-6.0 |
| Central AU (Alice Springs, Red Centre) | 6.5-7.5 | 5.0-5.5 | 6.0-6.5 |
| Eastern seaboard (Sydney, Brisbane, Melbourne) | 5.5-6.5 | 3.0-3.5 | 4.5-5.0 |
| Western Australia (Perth, Pilbara) | 6.0-7.0 | 3.5-4.0 | 5.0-5.5 |
| South Australia (Adelaide, Flinders) | 6.0-7.0 | 3.5-4.0 | 5.0-5.5 |
| Tasmania | 5.0-5.5 | 2.5-3.0 | 3.5-4.0 |

If you travel up north in winter (like most grey nomads do), you're getting excellent sun year-round. If you stay in the southeast through winter, you'll get less output — worth sizing up slightly if that's your plan.

---

Use the **System Sizing Worksheet** at the back if you want to run through these calculations with your own numbers.

Next section: the mistakes that cost people serious money, and how to make sure you don't make them.
