# Retiring-Trader Buyout Play

> **Thesis:** Essex + SE England has hundreds of 60+ sole-trader and small-limited ceilings/partitions guys winding down — either retiring by choice or creeping late on accounts. Their client Rolodex is worth more to them at exit than it is to HMRC. Buying (or licensing) that Rolodex plus a written handover letter from them to their clients = instant warm-leads for EC Dunn.
>
> **Unit economics:** Typical sole-trader Rolodex = 40–150 active/past clients. Conversion rate on "my guy is retiring, I'm recommending E C Dunn Ltd to carry on your work" = ~20–30% try one job. Of those, ~60% repeat. Even a mid-size Rolodex pays back the buyout fee in 3–6 months.
>
> **Ethics:** This is a genuine retirement-succession play, not a predatory one. The retiring trader gets cash + a referral royalty + the satisfaction of his clients being looked after. Everyone wins.

---

## Methodology — Companies House target scan

### Step 1 — Bulk download filter

Use Companies House free search or bulk API. Filter:

**Primary SIC codes:**
- `43320` — Joinery installation
- `43390` — Other building completion & finishing
- `43990` — Other specialised construction activities n.e.c.
- `43341` — Painting (overlaps with some small ceilings guys who've diversified)

**Geography — postcodes:**
- Essex: CM, CO, IG, RM, SS
- East London: E, EC (commercial)
- North London: N, NW
- South London: SE, SW
- Surrey: GU, KT, RH
- Kent: BR, CT, DA, ME, TN
- Sussex: BN, RH, TN
- Hampshire: GU, PO, RG, SO

**Company status filters:**
- Active
- Active – proposal to strike off
- Small / micro-entity accounts filed

**Signal filters (highest priority):**
- Filed accounts show turnover under £200k (one-man-band territory)
- Single director
- Director's date of birth implies age 58+
- Late accounts warning on the listing
- Nature of business mentions `ceiling`, `partition`, `drylining`, `plastering`, `interior fit-out`

### Step 2 — Enrichment

For each target, pull:
- Director name + DOB
- Registered office (often home address — don't cold-call unless you've written first)
- Companies House filing history
- Cross-check LinkedIn for retirement signals ("slowing down", "handing over", "last project")
- Cross-check Facebook business page for activity drop-off

### Step 3 — Prioritisation

| Tier | Signal | Action |
|---|---|---|
| A | Age 62+ · turnover declining · late accounts | Letter within 7 days |
| B | Age 58–61 · steady small turnover · near Essex | Letter within 14 days |
| C | Any age · active proposal to strike off | Letter within 48 hours (business is ending — act fast) |

Target volume: 50 letters in first wave.

---

## Letter template — retirement succession proposal

> **Send via post (not email).** Retiring small-contractor directors respond to a physical letter far more than to cold email. Cost: ~£0.90 stamp × 50 letters = £45. ROI >500× if one Rolodex converts.

```
E C Dunn Ltd
7 Lodysons Close
Orsett, Essex

[Date]

[Director name]
[Company name]
[Registered office]

Dear [first name],

I'm Reece Dunn, writing on behalf of my father Edward's firm E C Dunn
Ltd — a ceilings and partitions contractor based here in Essex. We've
been trading 25 years and we're always looking to take care of clients
who are coming through to us from other tradesmen in the area.

I don't know your personal plans, so apologies in advance if this isn't
relevant. But if you're thinking about winding down [company name] or
handing over at some point in the next year or two, I wondered if you'd
be open to a short conversation.

What we do in these situations:

1. We pay a one-off sum for a warm introduction letter from you to your
   existing clients — saying you trust us to carry on their ceiling and
   partition work.

2. We pay you a referral royalty — usually 5% of the value — on any job
   that comes to us from your former client list in the first 24 months.

3. We look after the clients properly. 25 years, 500+ projects, and a
   lot of our work is still repeat business with the people we first
   worked for in the early 2000s. Your clients would be in the same
   hands.

No obligation. If you're not ready to wind down, or this isn't the right
fit, I completely understand. But if it is interesting, I'd love to come
and have a cup of tea with you and your wife one afternoon and talk
through what it might look like.

My direct number is 07778 321 064 and my email is
hello@ecdunnltd.co.uk.

With respect,

Reece Dunn
Partnerships, E C Dunn Ltd
ecdunnltd.co.uk
```

---

## Post-letter process

### If they reply positively

1. **Home visit** within 2 weeks. Edward + Reece together. Two hours, cup of tea, no pressure.
2. **Walk their Rolodex** — they list their top clients, you estimate what each is worth annually.
3. **Agree terms** — one-off payment (£2K–£5K for a 40-150 client book is typical) + 5% royalty 24 months.
4. **Handover letter** — they sign a letter on their letterhead to each client: *"I'm retiring. For any future ceiling, partition or drylining work, I've asked E C Dunn Ltd to look after you. Their number is 07778 321 064."*
5. **Optional: buy their tools / van / signage** if he wants rid — pay fair market, don't lowball.
6. **6-month and 12-month check-in calls** to the retired trader. Shows respect, keeps him as a reference.

### If they don't reply (>60% won't)

- Move on. Don't pursue. Don't double-letter within 3 months.
- Quarterly refresh of the Companies House scan — new retirement signals appear monthly.

### If they reply "not for sale but thanks"

- Send a polite "understood, door stays open, here's my number if the plan changes" reply.
- Add to a warm list for 12-month re-contact.

---

## Companies House search URLs (click to start)

- Main search: https://find-and-update.company-information.service.gov.uk/
- Advanced search: https://find-and-update.company-information.service.gov.uk/advanced-search
- Bulk data downloads: https://download.companieshouse.gov.uk/en_output.html
- API docs (for when we build the scraping skill this weekend): https://developer-specs.company-information.service.gov.uk/
