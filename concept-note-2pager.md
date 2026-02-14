# Razorpay Easy Collections — Concept Note (2-Pager)

**Author:** Manish Reddy Tirumala Reddy | **POD:** No-Code Offerings | **Status:** Draft v6.0

---

## 1. Persona

### Primary: "Priya" — School/Institution Admin

- **Profile:** Accounts officer at a K-12 school with 500+ students
- **Industry:** Education (~33K merchants, 18.2% of No-Code MTUs)
- **Daily reality:** Manages 8 fee components across grades — tuition, transport, lab, uniform, activities — with sibling discounts and merit scholarships applied manually
- **Tools today:** Excel for fee calculation, Razorpay Payment Links created one-by-one, WhatsApp for reminders, Word for receipts
- **Time spent:** 6-10 hrs/week on fee administration alone
- **Quote:** *"I prepare 500 individual fee statements every quarter. Discounts are applied manually — errors happen every term."*

### Secondary: "Vikram" — Gym/Fitness Owner

- **Profile:** Gym owner managing 300 members across monthly, quarterly, and annual plans
- **Industry:** Fitness (~5-8K estimated merchants)
- **Daily reality:** Tracks membership renewals, personal training add-ons, locker fees. Sends 300 WhatsApp messages manually each month.
- **Time spent:** 4-6 hrs/week on billing and follow-ups
- **Quote:** *"30-40 members don't renew each month. I don't even know until the month ends."*

### Horizontal Pattern

Schools, gyms, housing societies, coaching centres, and any business collecting recurring payments from a known customer base — all share the same workflow gap. ~60K No-Code MTUs on Razorpay face this today.

---

## 2. Problem Statement

**Razorpay provides the payment rail, but the billing management layer lives entirely in Excel.**

Businesses that repeatedly collect from the same customers face five gaps:

| Gap | What's Missing | Impact |
|-----|---------------|--------|
| **No billing structure intelligence** | Razorpay has no concept of a "bill" with components (tuition + transport + lab). Payment Links are flat amounts. Businesses calculate net payable per customer in Excel. | Manual errors every billing cycle |
| **No payment schedule management** | No system to auto-generate schedule-aware Payment Links (quarterly installments, monthly dues). Admins create links one-by-one. | 500 students = 500 manual links per quarter |
| **No embedded communication** | Reminders sent manually via WhatsApp, one-by-one. Effort scales linearly with customer count. No scheduled circulars or escalation logic. | 15-35% late payment rates |
| **No post-payment automation** | No auto-receipts, no auto-ledger update. Manual matching of payments to customer records is universal. | 500+ manual reconciliation events/month |
| **No collection analytics** | No real-time view of collected vs. due, no group-wise trends, no defaulter tracking. | Revenue leakage of 5-20% from missed follow-ups |

**Quantified pain:**

| Metric | School (500 students) | Gym (300 members) |
|--------|----------------------|-------------------|
| Admin hours/week on billing | 6-10 hrs | 4-6 hrs |
| Late payment rate (no automation) | 15-25% | 20-35% |
| Revenue leakage (missed follow-ups) | 5-10% | 10-20% |

**Competitive context:** Stripe Billing solves this globally (API-first). Classplus and Jodo solve it for Indian education (but force their own PG). No Indian payment gateway offers a no-code billing management layer natively on the dashboard.

---

## 3. Broad Solution

**Razorpay Easy Collections** — a billing management layer on the Razorpay Dashboard that lets businesses define *who* to collect from, *how much*, *when*, and automates everything after.

### Core Architecture

A **generic billing engine** with **industry-specific templates** on top:

```
┌─────────────────────────────────────────────────────┐
│              RAZORPAY DASHBOARD                      │
│  ┌───────────────────────────────────────────────┐  │
│  │           EASY COLLECTIONS                     │  │
│  │                                                │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐    │  │
│  │  │Education │  │ Fitness  │  │ Custom   │    │  │
│  │  │Template  │  │ Template │  │ Template │    │  │
│  │  └────┬─────┘  └────┬─────┘  └────┬─────┘    │  │
│  │       └──────────────┼──────────────┘          │  │
│  │              ┌───────▼────────┐                │  │
│  │              │ BILLING ENGINE │                │  │
│  │              │  • Customers   │                │  │
│  │              │  • Components  │                │  │
│  │              │  • Structures  │                │  │
│  │              │  • Discounts   │                │  │
│  │              │  • Schedules   │                │  │
│  │              │  • Late fees   │                │  │
│  │              └───────┬────────┘                │  │
│  │       ┌──────────────┼──────────────┐          │  │
│  │  ┌────▼─────┐  ┌────▼─────┐  ┌────▼─────┐    │  │
│  │  │ Auto PL  │  │ Comms    │  │Analytics │    │  │
│  │  │Generation│  │ Engine   │  │Dashboard │    │  │
│  │  └──────────┘  └──────────┘  └──────────┘    │  │
│  └───────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
```

### What It Does (End-to-End)

1. **Setup (one-time, ~10 min):** Select industry template → define billing components → create structures per group → configure discounts, schedules, late fees
2. **Customer onboarding:** CSV import or use existing Razorpay Customers → auto-assign billing structures → calculate net payable per customer
3. **Billing cycle:** Initiate cycle → system bulk-generates Razorpay Payment Links per customer per period → dispatches via WhatsApp + email on schedule
4. **Automated follow-up:** Pre-due reminders (T-7) → due-date (T-0) → escalating overdue reminders (T+3, T+7, T+15) → admin alert (T+30)
5. **Post-payment:** Auto-match payment to customer → update ledger → generate branded receipt → send via WhatsApp + email → update dashboard in real-time
6. **Analytics:** Collection rate, group-wise trends, defaulter lists, revenue by component — all real-time

### Phased Delivery

| Phase | Scope | Milestone |
|-------|-------|-----------|
| **Phase 1 (MVP)** | Billing engine + Education template + auto PL generation + basic receipts + collection dashboard | 100 institutions actively billing |
| **Phase 2** | Communication engine (circulars, reminders) + Fitness template + REST API for ERP integration | 500 businesses across 2 industries |
| **Phase 3** | Full analytics + Housing/Services templates + custom template builder + multi-branch support | 2,000+ businesses; ₹100 Cr+ annual GMV |

---

## 4. Impact Metrics

### Metric Trajectory — 3 Month / 6 Month / FY27 End (Mar '27)

*Assumes Phase 1 (MVP + Education) ships Q1 FY27 (Apr '26). Timelines below are post-launch.*

**Adoption & Scale**

| Metric | 3 Months (Jul '26) | 6 Months (Oct '26) | FY27 End (Mar '27) | Rationale |
|--------|--------------------|--------------------|---------------------|-----------|
| Active merchants (billing structures live) | 150-250 | 600-900 | 2,000+ | Alpha/Beta → Education GA → Fitness GA + others |
| — Education | 150-250 | 500-700 | 1,000+ | P0 vertical; 33K addressable MTUs on Razorpay |
| — Fitness + Others | — | 100-200 | 500+ | Fitness template ships in Phase 2 (Q2-Q3) |
| Incremental MTUs from Easy Collections | +500-800 | +1,500-2,000 | +3,000-5,000 | New merchants acquired + reactivated dormant MTUs |
| Cumulative SME No-Code MTUs | ~49K | ~50-50.5K | 60K+ (FY27 OKR) | Easy Collections is one of multiple MTU growth levers |

**Revenue**

| Metric | 3 Months (Jul '26) | 6 Months (Oct '26) | FY27 End (Mar '27) | Rationale |
|--------|--------------------|--------------------|---------------------|-----------|
| Incremental NR from Easy Collections | +₹0.08-0.15 Cr/mo | +₹0.25-0.4 Cr/mo | +₹0.5-1 Cr/mo | Ramps with active merchant count and payment volume per merchant |
| Cumulative SME No-Code NR | ~₹7.6-7.7 Cr/mo | ~₹8-8.5 Cr/mo | ₹11 Cr/mo (FY27 OKR) | Easy Collections contributes ~10-15% of the ₹3.5 Cr/mo NR gap |
| Education Vertical NR | ~₹1.55-1.6 Cr/mo | ~₹1.7-1.8 Cr/mo | ₹2.1 Cr/mo (FY27 OKR) | Education is launch vertical; fastest NR ramp |
| Annualized GMV run-rate through Easy Collections | ₹30-60 Cr | ₹120-200 Cr | ₹400-500 Cr | 10K merchants x ₹5L avg at steady state; early months are lower |

**Merchant Value & Health**

| Metric | 3 Months (Jul '26) | 6 Months (Oct '26) | FY27 End (Mar '27) | Rationale |
|--------|--------------------|--------------------|---------------------|-----------|
| Overdue payment rate (merchants using EC) | 20-25% | 12-15% | <10% | Phase 1 has basic reminders; Phase 2 adds full comms engine with escalation — that's when overdue drops sharply |
| 90-day merchant retention | 80-85% | 85-90% | >90% | Early cohorts include hand-held alpha users; retention improves as onboarding and templates mature |
| Activation-to-setup completion | 60-65% | 70%+ | 75%+ | Setup flow optimized iteratively based on funnel data |
| Support tickets per 100 merchants/month | 8-10 | 5-7 | <5 | Ticket volume drops as FAQs, templates, and UX improve |

### OKR Alignment (FY27)

| OKR | Current | FY27 Target | Easy Collections Contribution | % of Target |
|-----|---------|-------------|-------------------------------|-------------|
| SME No-Code NR | ₹7.5 Cr/mo | ₹11 Cr/mo | **+₹0.5-1 Cr/mo** by Mar '27 | ~15-28% of ₹3.5 Cr gap |
| SME No-Code MTUs | 48.5K | 60K | **+3-5K** incremental MTUs | ~26-43% of 11.5K gap |
| New No-Code offerings launched | 0 | 3 | **1 of 3** target offerings | — |
| Education Vertical NR | ₹1.5 Cr/mo | ₹2.1 Cr/mo | **+₹0.3-0.5 Cr/mo** by Mar '27 | ~50-83% of ₹0.6 Cr gap |

### Revenue Build-Up (Monthly NR from Easy Collections)

```
₹ Cr/mo
1.0 ┤                                                          ╭──── Mar '27
    │                                                     ╭────╯     ₹0.7-1.0
0.8 ┤                                                ╭────╯
    │                                           ╭────╯
0.6 ┤                                      ╭────╯
    │                                 ╭────╯
0.4 ┤                            ╭────╯          Phase 3: Scale
    │                       ╭────╯               (Fitness GA, analytics,
0.2 ┤                  ╭────╯                     more templates)
    │             ╭────╯  Phase 2: Comms +
0.1 ┤        ╭────╯       Fitness Beta
    │   ╭────╯
0.0 ┤───╯ Phase 1: MVP + Education
    └──┬──────┬──────┬──────┬──────┬──────┬──────┬──────┬──────┬──
      Apr    May    Jun    Jul    Aug    Sep    Oct    Nov   ...  Mar
      '26    '26    '26    '26    '26    '26    '26    '26        '27
```

### Key Assumptions Behind the Ramp

1. **3-month numbers are conservative** — Alpha (10 merchants) + Beta (100-200) with hand-held onboarding. NR is minimal because merchant base is small and only Education template is live.
2. **6-month inflection** — Education GA drives bulk adoption. Phase 2 comms engine (auto-reminders, WhatsApp circulars) is the biggest unlock for overdue reduction and merchant retention.
3. **FY27-end targets assume** Phase 3 ships by Q3-Q4 with Fitness GA, analytics, and at least one more template. If Phase 2 delays by >1 month, FY27-end NR target drops to ₹0.5-0.7 Cr/mo.
4. **NR per merchant** ramps from ~₹500/mo (early, low-volume) to ~₹3,000-5,000/mo at steady state as merchants move more collections digitally and billing cycles compound.

---

*Razorpay Easy Collections — Billing management for India's 60K+ No-Code merchants.*
