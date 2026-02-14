# Razorpay Easy Collections: Concept Note

**Author:** Manish Reddy Tirumala Reddy
**Date:** 2026-02-13
**Status:** Draft
**Version:** 6.0
**Product:** Native Razorpay Dashboard Feature
**Team:** No-Code Offerings POD, Payment Products Group, Domestic Online Payments BU

---

# 1. How will we announce this offering to the world?

## 1.1. How would you post this on the Product bulletin in Slack?

> **Razorpay Easy Collections is Live — Collect Payments with Ease**
>
> Today we're shipping **Razorpay Easy Collections** — a new feature on the Razorpay Dashboard that lets businesses manage their entire payment collection lifecycle: who to collect from, how much, when, and what happens after.
>
> **The problem it solves:**
> A school with 500 students collects tuition, transport, lab, and activity fees — with sibling discounts and scholarships — across quarterly installments. Today, the admin calculates each student's net fee in Excel, creates 500 Razorpay Payment Links manually, sends them via WhatsApp one-by-one, tracks payments in another Excel sheet, and prepares receipts in Word. Every quarter. 6-10 hours a week, just on fee administration.
>
> This isn't just a school problem. Gyms tracking 300 monthly memberships, housing societies chasing maintenance from 200 flats, coaching centres managing batch-wise course fees — they all do the same thing. Excel for who owes what, WhatsApp for reminders, manual reconciliation after payment.
>
> Easy Collections eliminates all of that.
>
> **What it does:**
>
> **1. Customer Billing Framework**
> - Customer profiles with standard OR custom billing structures (built on Razorpay's existing Customers functionality)
> - Configurable billing components (tuition, transport, lab fees — or membership, maintenance, retainer — whatever your business charges)
> - Discounts, waivers, credits — auto-applied with audit trail
> - Flexible payment schedules: one-time, monthly, quarterly, yearly, custom installments, or lump sum
> - Late payment engine: flat, percentage, or per-day charges with grace periods and caps
>
> **2. Built-in Communication Engine**
> - Auto-sends billing circulars with embedded Payment Links on pre-scheduled dates
> - Shares payment receipts instantly post-payment
> - Sends timely, personalized reminders via Email, WhatsApp, and SMS
>
> **3. Instant Reconciliation & Analytics**
> - On-time collections vs. overdues — real-time
> - Group-wise collection trends
> - Customer-wise payment dues and full payment history
> - Revenue analysis by billing category
>
> **Why this matters for Razorpay:**
> ~60K No-Code MTUs use Payment Links and Payment Pages to collect payments. But they manage the *who, how much, when, and follow-up* in Excel. Easy Collections brings that workflow into the Razorpay Dashboard — more workflow ownership = more payment volume = more NR. We launch with Education (33K merchants, 18.2% of MTUs) and expand to Fitness, Housing, Services, and beyond.
>
> **Access:** Razorpay Dashboard → Easy Collections

## 1.2. What would a 1-page press-release look like?

**Razorpay Launches Easy Collections — India's First Payment Collection Management System Built Into a Payment Platform**

*Schools, gyms, housing societies, and any business collecting recurring payments can now manage billing structures, installments, reminders, and receipts directly from the Razorpay Dashboard.*

Bengaluru, [Launch Date] — Razorpay today launched **Razorpay Easy Collections**, a payment collection management system built natively into the Razorpay Dashboard. Easy Collections eliminates the Excel spreadsheets, manual WhatsApp reminders, and disconnected tools that businesses rely on to manage recurring payments from their customers.

Consider a K-12 school with 1,200 students. Each grade has a different fee structure, 400 students have sibling discounts, 50 have merit scholarships. The accounts officer spends 8-10 hours every week calculating net fees in Excel, creating Payment Links one-by-one, and chasing parents on WhatsApp. With Easy Collections, the school imports its student roster, defines fee structures per grade, applies discounts, and the system auto-generates Payment Links per student per installment — sent via WhatsApp and email. When a parent pays, the system auto-updates the ledger, generates a receipt, and sends it instantly.

This pattern isn't unique to education. Gyms with monthly membership dues, housing societies collecting maintenance charges, coaching centres managing batch-wise course fees — they all face the same workflow gap. Easy Collections serves all of them with a generic billing engine and industry-specific templates.

Many educational institutions already use ERPs for school management but find their fee collection capabilities lacking. Easy Collections is designed to work alongside existing ERPs — either as a standalone billing solution or as the payment collection backbone that ERPs integrate with via Razorpay's payment infrastructure. Large institutions with full-featured ERPs will continue using them; Easy Collections serves the vast middle market that needs modern fee collection without the cost and complexity of a full ERP.

Key capabilities at launch: customer billing profiles (built on Razorpay's existing Customers functionality), configurable billing components, discounts and waivers with audit trail, flexible payment schedules, late payment charges, multichannel reminders, auto-generated receipts, and real-time collection analytics.

## 1.3. How will we enable Sales & Solutions on this offering?

**Universal pitch:**
"You already use Razorpay for payments. Easy Collections adds the management layer — who to collect from, how much, when, and what happens after payment. No Excel, no manual follow-ups."

**Education pitch:**
"Your school already uses Razorpay for fee collection. Now manage the entire fee lifecycle — student profiles, fee structures, installments, scholarships, reminders, receipts, analytics — all from the Dashboard."

**Demo flow (Education, 5 min):**
1. Open Easy Collections on Dashboard → select Education template (30s)
2. Import student roster via CSV — 500 students with name, parent contact, grade (30s)
3. Create fee structure for Class 6: Tuition ₹50K + Transport ₹8K + Lab ₹2K + Activities ₹2K = ₹62K/yr (60s)
4. Apply sibling discount (-10% for second child), merit scholarship (-₹5K for 3 students) (30s)
5. Set quarterly installments with due dates + late fee ₹500 after 10-day grace (60s)
6. System auto-generates Payment Links per student per installment, sends via WhatsApp + email (30s)
7. Show analytics: grade-wise collection rate, defaulter list, on-time vs. overdue (60s)

**Industry positioning:**

| Industry | Current Pain | Easy Collections Solution |
|----------|-------------|--------------------------|
| Education (schools, colleges, coaching) | Excel fee tracking, manual reminders, no installment intelligence | Student profiles, grade-wise fee structures, scholarship management, installment plans |
| Fitness (gyms, yoga, sports) | WhatsApp reminders for monthly dues, no freeze/pause tracking | Member profiles, plan-based billing, freeze handling, renewal reminders |

Link to detailed Sales Enablement doc: [To be created]

## 1.4. What would merchant-facing tech docs look like?

- Feature activation guide
- Industry template selection and customization
- Customer data import (CSV format specification)
- Billing structure configuration (components, discounts, schedules)
- Communication preferences setup (WhatsApp, SMS, email)
- Analytics dashboard walkthrough
- How Payment Links are auto-generated and sent

Link to razorpay.com/docs draft: [To be created]

## 1.5. Where would a merchant go to learn more?

- Getting Started: "Activate Easy Collections on your Razorpay Dashboard"
- How-to: "Create billing structures with multiple components"
- How-to: "Apply discounts, waivers, and benefits"
- How-to: "Set up payment schedules (monthly, quarterly, custom)"
- How-to: "Configure automatic payment reminders"
- How-to: "Read your collection analytics dashboard"
- Industry guides: "Fee collection for schools," "Membership billing for gyms"
- FAQ: "How do I access Easy Collections on my Dashboard?"
- FAQ: "Can I customize the template for my business?"

Link to knowledge base: [To be created]

---

# 2. What problem are we solving?

## 2.1. Describe the problem in detail

Millions of Indian businesses collect payments repeatedly from the same set of customers — schools from students, gyms from members, housing societies from residents, coaching centres from learners. Razorpay provides the payment rail (Payment Links, Payment Pages), but the **billing management layer** — the logic that determines who pays how much, when, in what schedule, with what discounts — lives entirely outside Razorpay in spreadsheets, manual messages, and disconnected tools.

This is a **recurring collection problem** that cuts across industries. Every business that collects from a known customer base faces the same five gaps:

**Gap 1: No billing structure intelligence.** Razorpay has no concept of a "bill" with components. A Payment Link is a flat amount. Businesses need to define what they charge for (tuition, transport, membership, maintenance), apply discounts (waivers, scholarships), and calculate a net payable per customer. Today this happens in Excel.

**Gap 2: No payment schedule management.** A school offering quarterly installments or a gym offering annual/monthly plans needs to calculate per-period amounts, generate payment links per customer per period, and track which payment maps to which period. There's no system to auto-generate schedule-aware payment links.

**Gap 3: No embedded communication.** When payments are due, admins manually send WhatsApp messages or emails one-by-one. No scheduled circulars, no escalating reminders. The effort scales linearly with customer count.

**Gap 4: No post-payment automation.** After payment, there's no auto-receipt, no auto-update to the customer's record. Manual matching of Razorpay payments to customer records is universal across industries.

**Gap 5: No collection analytics.** Businesses have no real-time view of how much is collected vs. due, which groups collect well vs. poorly, or which customers are serial defaulters.

**Quantified impact (representative):**

| Metric | School (500 students) | Gym (300 members) |
|--------|----------------------|-------------------|
| Admin hours/week on billing | 6-10 hrs | 4-6 hrs |
| Late payment rate (no reminders) | 15-25% | 20-35% |
| Revenue leakage (missed follow-ups) | 5-10% | 10-20% |
| Manual reconciliation events/month | 500+ | 300+ |

## 2.2. Who are we solving the problem for?

**Universal profile:** Any business that repeatedly collects payments from a known customer base.

**Launch priority:**

| Priority | Industry | Razorpay MTUs | Why This Order |
|----------|----------|---------------|----------------|
| **P0 (Launch)** | Education (schools, colleges, coaching) | ~33K (18.2% of No-Code MTUs) | Largest existing base; deepest workflow gap; highest NR potential |
| **P1 (Fast-follow)** | Fitness (gyms, yoga, sports) | ~5-8K (estimated) | Fast-growing; monthly billing = high payment frequency |
| **P2** | Housing Societies, Services, Coaching | ~10-15K combined (estimated) | Validates horizontal extensibility |

**Key personas:**

**"Priya" — School Admin (500 students).** Manages 8 fee components across grades, sibling discounts, scholarships. Spends 8 hrs/week on fee tracking in Excel. "I prepare 500 individual fee statements every quarter. Discounts are applied manually — errors happen every term."

**"Vikram" — Gym Owner (300 members).** Monthly, quarterly, and annual plans with personal training add-ons. Sends 300 WhatsApp messages every month. "30-40 members don't renew each month. I don't even know until the month ends."

**ERP landscape context (Education):** Many schools and colleges already use ERPs (Fedena, Entab, campus management systems) for operations like attendance, timetabling, and student records. However, these ERPs often have weak fee collection capabilities — limited payment gateway integration, no WhatsApp reminders, poor real-time analytics. Easy Collections is designed to complement these ERPs: the ERP handles school operations, Razorpay handles fee collection. For large institutions that invest in full-featured ERPs with robust fee modules, those ERPs will integrate with Razorpay as a payment gateway — which is already a supported use case. Easy Collections targets the vast middle market: schools that either don't use an ERP, or use one with inadequate fee collection.

## 2.3. How many such customers exist?

| Segment | Size | Description |
|---------|------|-------------|
| **TAM** | ~15-20M recurring-collection businesses in India | All businesses with fixed customer base + recurring charges |
| **SAM** | ~2-3M businesses collecting digitally or ready to | Businesses with digital payment readiness |
| **SOM (Year 1)** | ~60K No-Code MTUs already on Razorpay | Directly addressable — feature on their existing Dashboard |
| **SOM — Education** | ~33K education merchants on Razorpay | Launch vertical |
| **SOM — Fitness + Others** | ~15-25K merchants on Razorpay (estimated) | P1-P2 verticals |

**Revenue opportunity:**

| Revenue Stream | Calculation | Year 1 Estimate |
|----------------|-------------|-----------------|
| **Incremental GMV** | 10K active merchants × ₹5L avg incremental annual digital volume | +₹500 Cr GMV/year |
| **NR uplift** | At ~1.5% blended take rate | +₹7.5 Cr NR/year |
| **Reduced churn** | Workflow lock-in retains merchants on Razorpay | Retained NR |

## 2.4. Have we spoken to any customers?

| Date | Customer | Industry | Key Insight |
|------|----------|----------|-------------|
| [UNVALIDATED] | School, 500 students, Hyderabad | Education | "Sibling discounts across 400 pairs take me a full day to calculate each quarter." |
| [UNVALIDATED] | Gym, 300 members, Pune | Fitness | "30-40 members lapse every month because I can't send timely reminders." |
| [UNVALIDATED] | Coaching centre, 300 students, Delhi | Education | "I tried a fee management platform but they forced their own payment gateway. I want fee management on top of Razorpay." |

> **Gap:** These insights are synthesized from strategy-level research. Before review submission, conduct actual conversations with 2+ businesses from each P0 and P1 industry.

## 2.5. Any quantification of the problem?

| Data Point | Value | Source |
|------------|-------|--------|
| Total No-Code MTUs on Razorpay | ~59.8K (unique) | Internal data (FY26 Apr-Nov) |
| Education merchants (P0 launch) | ~33K (18.2% of No-Code MTUs) | Internal data (FY26) |
| No-Code SME NR | ₹60.9 Cr (FY26 Apr-Nov, ~₹7.5 Cr/mo) | Internal data |
| Education No-Code NR | ~₹1.5 Cr/mo | Internal data |
| Estimated Fitness/Housing/Services merchants | ~15-25K combined | [UNVALIDATED — needs data pull] |
| Admin hours/week on billing (cross-industry avg) | 4-10 hours | [UNVALIDATED — needs survey] |
| Late payment rate without automation | 15-35% | [UNVALIDATED] |

---

# 3. Is there any alternate solution to this problem?

**How businesses manage recurring collections today:**

| Solution | Who Uses It | Cost | Key Pain |
|----------|------------|------|----------|
| **Excel + Razorpay Payment Links + WhatsApp** | Everyone (universal default) | Free (but 4-10 hrs/week admin labor) | No automation; reconciliation errors; no analytics |
| **Razorpay Payment Pages** | Merchants already on Razorpay | Free (existing feature) | Merchant sets up different pricing structures on a Payment Page and shares the link; students/customers select their plan and pay. **Drawback:** Merchant has no visibility into who hasn't paid — tracking is entirely manual. No customer-level billing profiles, no reminders, no receipts, no analytics. Works for collecting payments but not for managing collections. |
| **Gymdesk / Mindbody** | Fitness only | $50-200/mo; poor India support | Expensive; poor UPI/WhatsApp; separate PG |
| **School ERPs (Fedena, Entab)** | Schools with full ERP budgets | ₹50K-₹5L/yr | Heavy; expensive; fee collection is one module among many; PG integration is add-on |

**Key insight:** Merchants already on Razorpay use Payment Links or Payment Pages for collection, but both lack the management layer — who paid, who didn't, how much is outstanding, when to follow up. Easy Collections adds this billing management layer natively on the Dashboard without asking merchants to switch to a new tool.

---

# 4. Is this solved by any of our competitors?

### Payment Gateway Competitors

| Capability | **Razorpay Easy Collections** | **Cashfree** | **Easebuzz** | **Stripe (Global benchmark)** |
|------------|------------------------------|-------------|-------------|-------------------------------|
| **Customer billing profiles** | Yes — built on existing Razorpay Customers | No — basic invoicing only | Limited — some fee tracking | Yes — Stripe Billing with Customer objects |
| **Billing components (line items)** | Yes — configurable per group | No | Limited | Yes — via Stripe Products + Prices |
| **Discounts & waivers** | Yes — family-linked, merit, early-bird, ad-hoc | No | Basic discounts | Yes — Coupons, Promotions |
| **Payment schedules** | Yes — monthly, quarterly, custom installments | No | Basic recurring | Yes — Subscription Schedules |
| **Auto Payment Link generation** | Yes — bulk per customer per period | No | Basic | N/A (uses Invoices + Hosted Pages) |
| **Communication engine (WhatsApp, SMS)** | Yes — scheduled circulars, reminders, escalation | No | Basic email | Email only (no WhatsApp/SMS) |
| **Auto receipts** | Yes — branded PDF via WhatsApp + email | No | Basic | Yes — auto-generated invoices |
| **Collection analytics** | Yes — real-time dashboard, group-wise, defaulter reports | No | Basic | Yes — Revenue analytics, MRR tracking |
| **Industry templates** | Yes — Education, Fitness (extensible) | No | Education-focused | No (generic SaaS billing) |
| **Late payment engine** | Yes — flat, %, per-day with grace + caps | No | Basic | Limited (retry logic only) |
| **India-first (UPI, WhatsApp, SMS)** | Yes | Yes (UPI) | Yes (UPI) | No — weak India payments |
| **Distribution** | ~60K No-Code MTUs on Dashboard | Growing merchant base | Smaller merchant base | Global; limited India SME reach |

**Why Stripe matters as a benchmark:** Stripe Billing is the gold standard globally for subscription and billing management. Easy Collections takes a similar philosophy — billing as a platform feature, not a bolt-on — but adapts it for Indian SMEs: no-code first (vs. API-first), WhatsApp/SMS communication (vs. email only), and industry templates (vs. generic SaaS billing).

**Why we win against Indian competitors:** Cashfree and Easebuzz are payment gateways first — their billing/invoicing features are basic add-ons. Easy Collections is a purpose-built billing management system native to the Razorpay Dashboard, with deeper workflow coverage (components, discounts, schedules, reminders, receipts, analytics) and zero switching cost for existing merchants.

### ERPs (Integration Partners)

ERPs are **partners, not competitors.** They handle school/business operations; Razorpay handles payment collection. The table below shows key ERPs and their relationship with Razorpay:

| ERP | Industry | Core Strength | Fee Collection Capability | Razorpay Partner? | Easy Collections Positioning |
|-----|----------|--------------|---------------------------|-------------------|------------------------------|
| **Fedena** | Education (K-12) | School management (attendance, timetable, exams) | Basic — limited PG integration, no WhatsApp reminders, no real-time analytics | Yes — Razorpay as PG option | Easy Collections as fee collection backbone for Fedena schools |
| **Entab** | Education (K-12) | Campus ERP (admissions, transport, HR) | Moderate — has fee module but weak communication and analytics | Yes — Razorpay as PG option | Targets schools where Entab's fee module is insufficient |
| **ECAS / MasterSoft** | Education (Higher Ed) | University management (enrollment, exams, placements) | Basic — fee collection is secondary module | Partial — some integrations exist | Easy Collections for colleges needing modern fee management |
| **Gymdesk / Mindbody** | Fitness | Member management, class scheduling, booking | Good for memberships but poor India support (no UPI, no WhatsApp) | No — use own PG | Easy Collections replaces their billing; gym keeps their scheduling tool |

**Market segmentation:**
- **Schools without ERPs** (majority of mid-market) → Easy Collections as standalone billing solution
- **Schools with ERPs but weak fee modules** → Easy Collections as the payment collection layer the ERP is missing
- **Large schools with full-featured ERPs** → Continue using their ERP's fee module + Razorpay as PG (existing use case, not our target)

---

# 5. How will we solve this problem?

## 5.1. Our proposed solution and the various phases/milestones involved

Razorpay Easy Collections is a **billing management layer on the Razorpay Dashboard** that lets businesses define who to collect from, how much, when, and automates everything after — payment link generation, reminders, receipts, and reconciliation.

The core idea is simple: a business defines its billing structure (what it charges for), assigns customers to groups (who pays what), sets a schedule (when they pay), and the system takes care of everything else — generating Razorpay Payment Links, sending them to customers, following up on overdue payments, issuing receipts, and showing real-time analytics.

It's built as a generic billing engine with industry-specific templates on top. The Education template pre-configures terminology (students, grades, tuition) and common billing components. The Fitness template does the same for gyms (members, plans, membership). But underneath, the engine is the same — so any business can customize it for their needs.

### Merchant Journey

This is the end-to-end experience for a merchant using Easy Collections:

```
Merchant logs into Razorpay Dashboard
    │
    ├─► Opens Easy Collections
    │   └─► Selects industry template (Education / Fitness / Custom)
    │       → Feature activates with pre-configured terminology and components
    │
    ├─► Initial Setup (one-time, ~10 minutes)
    │   ├─► Business profile: name, logo, address, GSTIN
    │   ├─► Review/customize billing components from template
    │   │   (e.g., Tuition, Transport, Lab — or Membership, Locker, PT)
    │   ├─► Create billing structures per group
    │   │   (e.g., "Class 6" = Tuition ₹50K + Transport ₹8K + Lab ₹2K)
    │   ├─► Configure discounts (sibling discount -10%, scholarship -₹5K)
    │   ├─► Create a pricing plan:
    │   │   (e.g., "Quarterly Installments" = 4 equal payments)
    │   │   Note: Pricing plans define the split logic (monthly, quarterly,
    │   │   custom installments, lump sum). Actual due dates are set when
    │   │   a billing cycle is initiated — not in the plan itself.
    │   ├─► Configure late payment rules (₹500 flat after 10-day grace)
    │   └─► Set communication preferences (WhatsApp + email, reminder timing)
    │
    ├─► Customer Onboarding (one-time + ongoing)
    │   ├─► Option A: CSV import (name, contact, group, custom fields)
    │   ├─► Option B: Use existing Razorpay Customers
    │   │   (Razorpay already has Customers functionality — Easy Collections
    │   │    extends it with billing-specific data. No duplicate management.)
    │   ├─► System auto-assigns billing structure based on group
    │   ├─► Admin applies per-customer discounts where needed
    │   ├─► System calculates net payable per customer
    │   └─► Link family/related accounts (siblings, family members)
    │
    ├─► Initiating a Billing Cycle
    │   │
    │   │   HOW A SCHOOL STARTS FEE COLLECTION:
    │   │   ────────────────────────────────────
    │   │   The school admin goes to Easy Collections → "Billing Cycles"
    │   │   section on the Dashboard and clicks "Start New Billing Cycle."
    │   │
    │   │   Step 1: Select scope
    │   │     → Choose which groups to bill (e.g., "All grades" or "Class 6-8 only")
    │   │     → Choose which pricing plan applies (e.g., "Q2 — Quarterly Installment")
    │   │
    │   │   Step 2: Set dates
    │   │     → Payment collection date: when Payment Links go out (e.g., Apr 1)
    │   │     → Due date: when payment is expected (e.g., Apr 15)
    │   │     → These dates are set HERE, not in the pricing plan — the plan
    │   │       only defines the split logic (quarterly = 4 equal payments).
    │   │       Each billing cycle gets its own collection and due dates.
    │   │
    │   │   Step 3: Review & confirm
    │   │     → System shows preview: 500 students, ₹X total expected,
    │   │       ₹Y after discounts, Payment Links will be sent via WhatsApp + email
    │   │     → Admin confirms → billing cycle is created
    │   │
    │   │   Alternatively, the admin can set up auto-initiation: billing cycles
    │   │   are created automatically on a recurring schedule (e.g., first of
    │   │   every quarter) with pre-configured dates. The admin just reviews
    │   │   and approves, or it runs fully automated.
    │   │
    │   │   HOW PAYMENT LINKS ARE GENERATED:
    │   │   ─────────────────────────────────
    │   │   Once a billing cycle is confirmed, the system:
    │   │   1. Takes each customer's billing structure (components + amounts)
    │   │   2. Applies all active discounts (waivers, credits, scholarships)
    │   │   3. Calculates net payable for the period
    │   │   4. Creates a Razorpay Payment Link for the exact net amount
    │   │      (using existing Payment Links API internally)
    │   │   5. Tags the Payment Link with customer ID, period, and components
    │   │   6. Sends the Payment Link to the customer via configured channels
    │   │      on the collection date
    │   │
    │   │   This happens in bulk — 500 students = 500 Payment Links created
    │   │   and dispatched automatically. No manual intervention.
    │   │
    │   ├─► T-15: System sends billing circular with Payment Link
    │   │       (WhatsApp + email)
    │   ├─► T-7: Pre-due reminder with same Payment Link
    │   ├─► T-0: Due-date reminder
    │   ├─► Customer clicks Payment Link → Razorpay Checkout → pays
    │   ├─► Payment captured → system automatically:
    │   │   ├─► Matches payment to customer + period
    │   │   ├─► Updates customer ledger
    │   │   ├─► Generates branded receipt (PDF)
    │   │   ├─► Sends receipt to customer (WhatsApp + email)
    │   │   └─► Updates dashboard in real-time
    │   ├─► T+3, T+7, T+15 (if unpaid): Escalating reminders
    │   └─► T+30: Admin alerted for manual escalation
    │
    ├─► Lifecycle Events
    │   ├─► Pause/freeze: halt billing (gym freeze, student LOA)
    │   ├─► Resume: restart billing, with optional pro-rata
    │   ├─► Plan change: customer moves to different group mid-cycle
    │   ├─► Exit: mark as graduated/exited; final settlement
    │   └─► Renewal: auto-prompt for upcoming renewals
    │
    └─► Ongoing Analytics
        ├─► Dashboard: on-time vs. overdue, group-wise trends
        ├─► Category revenue: which components perform well
        ├─► Defaulter reports: export for meetings
        └─► Period-end: GST summary, receipt register, collection report
```

### Functional Requirements

#### Customer Billing Framework

**Customer Profiles.** Easy Collections builds on Razorpay's existing Customers functionality. Every Razorpay Customer can have billing data attached — group assignment, billing structure, discounts, schedule, status, and custom fields. Businesses can create customers via CSV import, manual entry, or use their existing Razorpay Customers. No duplicate customer management.

**Customer Groups.** Customers are organized into groups (Grade 6, Gold Plan, Tower B) for bulk billing. Each group has a default billing structure. Individual customers can have overrides.

**Billing Components.** What you charge for — configurable line items like Tuition, Transport, Membership, Maintenance. Each component has an amount, type (recurring or one-time), and applicability rules (all customers vs. opted-in). Industry templates pre-populate common components; businesses add or remove as needed.

**Billing Structures.** A billing structure = set of components with amounts, assigned to a group. Example: "Class 6 Structure" = Tuition ₹50K + Transport ₹8K + Lab ₹2K = ₹60K/year.

**Discounts.** Discounts, waivers, and credits applied to customers. Types include: family/linked discount (sibling -10%), merit-based (scholarship -₹5K), early payment (-3%), commitment discount (annual plan -20%), category waiver (RTE waiver), and ad-hoc credits. Discounts can be recurring or one-time, have auto-apply rules, and maintain an audit trail.

**Pricing Plans.** Define how the total amount is split across payment periods. Types: one-time, monthly, quarterly, semi-annual, annual/lump sum, and custom installments (any number of payments, any amounts). A pricing plan defines the split logic but not the specific due dates — dates are set when a billing cycle is initiated. Different customers in the same group can be on different plans.

**Late Payment Engine.** Configurable charges for overdue payments: flat amount, percentage, or per-day. Includes grace period, cap, waiver capability, and per-group configuration. Auto-calculated and shown in reminders and receipts.

**Payment Handling.** Partial payments accepted (remainder stays outstanding). Advance payments credited to future periods. Pause/freeze halts billing temporarily with optional pro-rata on resume.

#### Communication Engine

**Billing Circulars.** Auto-generated and sent on schedule (e.g., 15 days before due). Contains customer name, billing breakdown, net amount, due date, and embedded Razorpay Payment Link. Sent via WhatsApp + email.

**Receipts.** Auto-generated on payment confirmation. Includes business logo, customer name, billing components paid, amount, transaction ID, receipt number, GST details. Delivered via WhatsApp + email as PDF.

**Reminders.** Configurable escalation: pre-due (T-7), due-date (T-0), overdue Day 3/7/15 (WhatsApp + SMS). Business can adjust timing, customize templates, set quiet hours. Industry-specific default tones.

#### Reconciliation & Analytics

**Collection Dashboard.** Real-time view: total expected vs. collected vs. overdue. Drill-down by group, then individual customer. Daily/weekly/monthly trends.

**Group-wise Trends.** Per group: collection rate, comparison across groups, month-over-month trends, schedule-wise default rate.

**Customer Ledger.** Full payment history per customer. Outstanding view with due dates and overdue days. Defaulter list (filterable, exportable).

**Revenue Analysis.** Component-wise collection, revenue mix, discount impact, net revenue (gross billing − discounts = expected vs. collected).

**Reports.** Universal: collection summary, defaulter report, receipt register, discount summary, GST summary. Industry-specific: grade-wise fee report (education), renewal/churn report (fitness).

#### Internal Razorpay Admin Panel Changes

For Phase 1, the only admin panel change required is:

**Feature activation control** — Enable/disable Easy Collections per merchant from the internal Razorpay Admin panel. This includes the ability to activate the feature for individual merchants or in bulk by merchant category. Additional admin capabilities (template management, communication monitoring, throttling controls, etc.) will be scoped and added in subsequent phases as the product scales.

### How templates work

A template pre-configures the generic engine with industry-appropriate defaults:

| Element | Education | Fitness |
|---------|-----------|---------|
| **Customer** | Student (+ Parent contact) | Member |
| **Group** | Grade / Section / Batch | Membership Plan / Tier |
| **Components** | Tuition, Transport, Lab, Uniform, Activities | Membership, Personal Training, Locker, Classes |
| **Discounts** | Sibling, Scholarship, RTE, Early-bird | Annual commitment, Referral, Corporate, Loyalty |
| **Default Schedule** | Quarterly installments | Monthly recurring |

Everything a template sets is editable. A coaching centre can start with the Education template and modify components, rename groups, change the schedule. The template saves setup time, not flexibility.

### Phased Delivery

**Phase 1: Billing Engine + Education Template (MVP)**
- Scope:
  - Easy Collections on Razorpay Dashboard (no-code)
  - Generic billing engine: customer profiles (on existing Razorpay Customers), groups, components, structures, discounts, pricing plans
  - Education template: student/grade/batch terminology, common fee components, sibling/scholarship discounts
  - All pricing plan types from Day 1: one-time, monthly, quarterly, semi-annual, annual, custom installments
  - Full late payment engine from Day 1
  - Partial payment and advance payment handling
  - Auto-generation of Razorpay Payment Links per customer per period
  - Basic receipt generation (PDF, email delivery)
  - Collection dashboard: expected vs. collected vs. overdue
  - Defaulter list (filterable, exportable)
  - Internal admin panel: feature activation (enable/disable per merchant)
- Templates: Education only
- Milestone: 100 institutions actively billing; all plan types validated

**Phase 2: Communication Engine + Fitness Template + API Support**
- Scope:
  - Scheduled billing circulars with embedded Payment Links (WhatsApp + email)
  - Reminder engine: pre-due, due-date, overdue escalation via WhatsApp + SMS
  - Branded receipts with business logo, GST details, WhatsApp delivery
  - Advanced discounts: early payment, loyalty/tenure, stacking rules, audit trail
  - Pause/freeze/resume lifecycle
  - Group-wise collection analytics
  - Fitness template: member/plan terminology, freeze handling, renewal reminders
  - **REST API:** Full API access for all Easy Collections operations (see Appendix 8.3 for API design). Enables platforms, ERPs, and SaaS products to integrate billing programmatically.
  - Admin panel enhancements: template management, throttling controls, billing disputes
- Milestone: 500 businesses across 2 industries; 70%+ using auto-reminders

**Phase 3: Full Analytics + More Templates + Scale**
- Scope:
  - Revenue analysis by billing category
  - Pro-rata billing for mid-period joins/exits
  - Multi-location/multi-branch support
  - GST summary, receipt register, discount summary exports
  - Industry-specific reports
  - Housing Society and Services templates
  - Custom template builder
- Milestone: 2,000+ businesses across 4+ industries; ₹100Cr+ annual GMV

## 5.2. How will we drive adoption?

| Gate | Criteria | Target |
|------|----------|--------|
| **Alpha** | 10 Education institutions (hand-picked); validate billing engine + education template | Core billing loop works; >80% create billing structure within 48 hrs |
| **Beta — Education** | 100 Education merchants via invite; self-serve onboarding | <10 min setup; <5 support tickets/institution |
| **GA — Education** | Feature visible to all Education merchants on Dashboard | 1,000+ activations; 500+ active |
| **Beta — Fitness** | 30 gyms/yoga studios via invite; Fitness template validation | Template covers 90%+ of billing needs without customization |
| **GA — All industries** | All templates available; Custom template builder live | 2,000+ businesses across industries |

**Distribution channels:**
1. **Razorpay Dashboard** — Easy Collections section directly on dashboard
2. **In-dashboard recommendation** — contextual banners in Payment Links section based on merchant's industry
3. **Targeted email** — segmented by industry
4. **Sales team** — industry-specific pitch decks
5. **Content + SEO** — "How to automate school fee collection," "Best gym membership billing software"
6. **YouTube walkthroughs** — per-industry demo videos
7. **ERP partnerships** — co-marketing with school/gym ERPs that lack fee collection (position Easy Collections as the payment layer their ERP needs)

## 5.3. How will we extend this launch in the future?

| Extension | Description | When |
|-----------|-------------|------|
| **AI Voice Agent for Fee Collection** | AI-powered voice agent that calls overdue customers, explains the outstanding amount, answers questions, and collects payment commitment or redirects to Payment Link. A separate feature that integrates with Easy Collections data. | Future (separate feature) |
| **Bank Mandate (UPI Autopay / eNACH)** | Recurring auto-debit via UPI mandate or eNACH for monthly/quarterly collections. Customer authorizes once, payments auto-deducted on schedule. | Post Phase 3 |
| **Pay-later / EMI** | Partner with lending providers for EMI options on large fee amounts | Future |
| **Accounting integration** | Tally / Zoho Books auto-export of collection data, receipts, and GST summaries | Post Phase 3 |
| **AI collection prediction** | Predict which customers are likely to default based on payment history patterns | Future |
| **Payer portal with login** | Dedicated portal where payers log in, see billing history, download receipts, manage preferences | Post Phase 3 |

## 5.4. Non-Goals / Out of Scope

- **Industry-specific operations:** No class scheduling (fitness), no visitor management (housing), no attendance (education). This is billing, not operations.
- **Full ERP:** No HR, inventory, or operations modules.
- **CRM/lead management:** Customer management starts at billing, not acquisition.
- **Cash/cheque tracking:** Phase 1-2 is digital-only. Manual cash marking is a future consideration.
- **Content/course hosting:** No LMS, video hosting, or learning management.
- **Custom payment gateway:** All payments flow through Razorpay.
- **Complex ERP-grade accounting:** Not a replacement for Tally/Zoho Books.

---

# 6. How will we measure impact?

## 6.1. What will success look like for this project?

We measure success on four dimensions — adoption, revenue impact, merchant value, and retention. These are the metrics that matter most:

| Metric | Target (6 months post-GA) | Why This Matters |
|--------|--------------------------|------------------|
| **Active merchants with billing structures** | 2,000+ (1,000+ Education, 300+ Fitness) | This is the primary adoption signal. A merchant with an active billing structure has committed to using Easy Collections for their collection workflow. If merchants aren't setting up billing structures, the product isn't solving a real enough problem. |
| **Incremental GMV through Easy Collections** | +₹200-500 Cr/year | Easy Collections should drive net-new payment volume — either by converting cash/cheque collections to digital, or by increasing payment compliance through reminders. If GMV doesn't grow, we're just reshuffling existing volume rather than expanding the pie. |
| **Overdue payment rate for merchants using Easy Collections** | <10% (down from 15-35%) | This is the core value proposition for merchants — automated reminders and structured billing should dramatically reduce late payments. If overdue rates don't drop, the communication engine isn't working or merchants aren't using it effectively. |
| **Merchant retention rate (90-day)** | >90% of activated merchants still active at 90 days | Retention tells us whether the product delivers sustained value, not just initial curiosity. If merchants churn within 90 days, the setup experience or ongoing value isn't strong enough. High retention also means compounding NR growth. |

## 6.2. Which OKR will this influence?

| OKR | Current | Target | Easy Collections Impact |
|-----|---------|--------|------------------------|
| SME No-Code NR | ₹7.5 Cr/mo | ₹11 Cr/mo | +₹0.5-1 Cr/mo from billing automation |
| SME No-Code MTUs | 48.5K | 60K | +3-5K incremental MTUs |
| New No-Code Offering Adoption | 0 | 3 launched, 5K MTUs | Easy Collections = 1 of 3; target 3-5K MTUs |
| Education Vertical NR | ₹1.5 Cr/mo | ₹2.1 Cr/mo | +₹0.3-0.5 Cr/mo |

## 6.3. How would we know if the solution is working?

High-level signals that tell us the product is delivering value:

| Signal | What It Tells Us | Target |
|--------|------------------|--------|
| **Merchants adopting and completing setup** | Merchants are finding the product, activating it, and completing the full setup flow (template → billing structure → customer import) | >70% activation-to-setup completion rate |
| **No critical merchant issues** | The product is stable and usable — merchants aren't hitting blockers, errors, or confusing workflows | <5 support tickets per 100 active merchants per month |
| **GMV flowing through Easy Collections** | Merchants are actively using Easy Collections to collect payments, not just setting it up and abandoning | Consistent month-over-month GMV growth through auto-generated Payment Links |
| **Merchants staying active month-over-month** | The product provides ongoing value — merchants come back each billing cycle, not just for initial setup | >80% of activated merchants generate ≥1 Payment Link per month |

## 6.4. What business observability should we build in?

| Metric | Alert Threshold |
|--------|----------------|
| Payment Link creation failures | >0.5% error rate |
| Webhook processing failures | Any unprocessed event |
| WhatsApp delivery rate | <95% |
| SMS delivery rate | <90% |
| Receipt generation failures | Any failure |
| Activation → setup funnel drop-off | >50% at any step |

## 6.5. Any NFRs alongside the functional scope?

| NFR | Requirement |
|-----|-------------|
| **Scale** | 10,000 businesses; 2M customer records; 5M Payment Links/year; 15M messages/year |
| **Latency** | Billing structure save: <1s; Payment Link creation: <2s; Dashboard load: <3s; Webhook processing: <5s |
| **Availability** | 99.95% uptime (Razorpay platform SLA) |
| **Cost** | Communication: <₹1.5/message blended; Infra: within existing Razorpay cloud |
| **Security** | Customer PII encrypted at rest and in transit; RBAC per business; OWASP Top 10; data isolation per business |
| **Compliance** | GST receipts; TRAI DND for SMS; WhatsApp template approval; IT Act 2000 + DPDP Act |

---

# 7. Are any approvals needed and do we have those?

## 7.1. Do we need API council approval?

**Yes — required.** Easy Collections creates internal APIs for the billing engine (customer billing profiles, structures, schedules, discounts, receipts). In Phase 2, these become external APIs. Key decisions needed: rate limits for batch Payment Link creation (1,000 customers × 12 months = 12,000 links/year per business), and webhook event naming for billing lifecycle events.

## 7.2. Do we need LRCTC approval?

| Type | Needed? | Status | Notes |
|------|---------|--------|-------|
| **Legal** | Yes | Not started | Customer data handling; receipt liability; communication consent |
| **Regulatory** | Yes | Not started | GST receipt compliance; TRAI DND for SMS |
| **Compliance** | Yes | Not started | Customer PII under DPDP Act; minor data (students); consent management |
| **Tech Compliance** | Yes | Not started | New data model; PII encryption; data retention |
| **Security** | Yes | Not started | Security review; RBAC; pen testing |

## 7.3. Is this a one-way door and hence needs leadership approval?

**Mostly two-way door.** Feature can be unpublished. One-way door elements: communication vendor contracts (6-12 months), customer data promises (PII obligations once stored).

| Reviewer | Review Date | Status |
|----------|-------------|--------|
| No-Code PM Lead | TBD | Not started |
| Payment Products Group Head | TBD | Not started |
| Dashboard & UX Team | TBD | Not started |
| Legal & Compliance | TBD | Not started |
| Security | TBD | Not started |

---

# 8. Appendix

## 8.1. Other Solutions Evaluated

### 8.1.1. Build Education-Only (Razorpay Edu)

Purpose-built fee management only for education. No generic engine, no industry templates.

**Pros:** Faster to build; deeper education UX; simpler product.

**Cons:** Misses cross-industry opportunity (~25K+ non-education merchants with the same problem); requires separate products for fitness, housing; duplicated engineering per vertical.

**Why rejected:** The billing engine (customers, components, discounts, schedules, reminders, receipts, analytics) is 85% identical across industries. Building generically with templates costs ~20% more effort but addresses 3-4x the market.

### 8.1.2. Build as Third-Party Partner App (OAuth)

Separate application using Razorpay OAuth APIs.

**Why rejected:** Weaker integration; separate brand trust; revenue share; slower onboarding. Deep Razorpay integration is the core advantage.

### 8.1.3. Extend Payment Pages with Billing Fields

Add billing management into Payment Pages.

**Why rejected:** Payment Pages are page-centric, not customer-centric. Billing requires customer profiles, ledgers, schedules, and lifecycle management. Abstraction mismatch.

## 8.2. Are we making any assumptions?

1. The billing engine's generic data model can support all target industries without per-industry schema changes — templates are configuration, not code.
2. Razorpay Dashboard can accommodate a new Easy Collections section.
3. Razorpay's WhatsApp BSP relationship can handle Easy Collections message templates.
4. Communication costs are sustainable within incremental NR generated.
5. 6-8 engineers can deliver Phase 1 (generic engine + Education template). Additional templates require incremental effort, not re-engineering.
6. Merchants will adopt a billing tool from their payment provider vs. a standalone vertical tool.
7. Regulatory landscape (DPDP Act, minor data for education) is navigable.
8. ERPs in education and fitness will integrate with Easy Collections rather than compete — their core value is operations, not payment collection.

## 8.3. Developer API Design (Phase 2)

In Phase 2, Easy Collections will expose a full REST API for all operations. This enables platforms, ERPs, and SaaS products to integrate billing programmatically — build their own billing UI while Razorpay handles collection, reminders, receipts, and reconciliation.

**Design principles:**
- Built on Razorpay Customers: No separate customer entity. Extends existing `cust_XXXXX` with billing data. Existing customers work without migration.
- Resource-oriented: Each concept (component, structure, group, schedule, discount) is a first-class API resource with full CRUD.
- Simple defaults, full flexibility: Create a billing structure in 1 API call with sensible defaults, or configure every detail for complex scenarios.
- Consistent with Razorpay conventions: Same auth (Basic Auth), same error format, same pagination (`count` + `skip`), same `notes` support.

**API Resource Overview:**

| Resource | Endpoint | Description |
|----------|----------|-------------|
| **Customers** | `GET/POST /v1/customers` | Existing Razorpay Customers API — no changes |
| **Billing Profiles** | `/v1/collections/customers/{id}` | Billing extension on a Razorpay Customer |
| **Components** | `/v1/collections/components` | Line items: "Tuition", "Membership", "Maintenance" |
| **Groups** | `/v1/collections/groups` | Logical grouping for bulk billing |
| **Structures** | `/v1/collections/structures` | Set of components with amounts |
| **Discounts** | `/v1/collections/discounts` | Discounts, waivers, credits |
| **Schedules** | `/v1/collections/schedules` | Payment schedule configuration |
| **Dues** | `/v1/collections/dues` | Individual payment obligations |
| **Receipts** | `/v1/collections/receipts` | Auto-generated receipts |
| **Webhooks** | Standard Razorpay webhooks | New events: `collection.due.created`, `collection.payment.received`, `collection.receipt.generated`, `collection.due.overdue` |

**Example: Assign billing to an existing customer**
```
POST /v1/collections/customers/cust_1Aa00000000004
{
  "group_id": "grp_ClassVI_A",
  "status": "active",
  "custom_fields": {
    "parent_name": "Priya Sharma",
    "admission_no": "2025-0042"
  }
}
```
→ Customer inherits the group's default billing structure and schedule. Zero configuration for the common case.

**Example: Create a billing structure**
```
POST /v1/collections/structures
{
  "name": "Class VI Fee Structure",
  "group_id": "grp_ClassVI_A",
  "components": [
    { "component_id": "comp_tuition", "amount": 5000000 },
    { "component_id": "comp_transport", "amount": 800000, "optional": true },
    { "component_id": "comp_lab", "amount": 200000 }
  ],
  "notes": {}
}
```

**SDKs & Tools (Phase 2 launch):**
- Postman Collection (importable, pre-configured)
- Node.js and Python SDKs (extending existing `razorpay` packages)
- API documentation (Stripe-style, on razorpay.com/docs)
- Additional SDKs (Java, PHP, Go) in Phase 3

## 8.4. Pricing Considerations

| Model | Description | Pros | Cons |
|-------|-------------|------|------|
| **Free** | No charge; NR from incremental payment volume | Maximum adoption; competitive moat | No direct revenue |
| **Freemium** | Free ≤50 customers; ₹499/mo for 50-500; ₹999/mo for 500+ | Balances adoption + revenue | Price sensitivity in SME |

**Recommendation:** Free for Phase 1-2 to maximize adoption. Evaluate freemium in Phase 3.

## 8.5. Risk Register

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Generic engine too generic — poor UX vs. vertical tools | Medium | Low adoption | Templates must feel native; beta-test with 10 merchants per industry |
| Only Education merchants activate | Medium | Market thesis invalidated | Validate Fitness demand in Phase 2 beta before GA |
| Communication costs blow up at scale | Medium | Negative unit economics | Start with email + WhatsApp; add SMS only for overdue escalation |
| Engineering over-abstraction slows Phase 1 | High | Delays | Phase 1 = engine + Education template only. Simple JSON templates. |
| Regulatory complexity (minor data, RERA) | Medium | Legal blockers | Consult Legal before Phase 2 launches |
| ERPs see us as competitor and resist integration | Low | Partnership friction | Position clearly as payment collection layer, not school management |

## 8.6. Template Architecture Detail

**What a template contains (JSON config, not code):**

```json
{
  "template_id": "education_k12",
  "display_name": "Education — Schools & Colleges",
  "terminology": {
    "customer": "Student",
    "contact": "Parent / Guardian",
    "group": "Grade / Section",
    "customer_id": "Admission Number"
  },
  "default_components": [
    {"name": "Tuition Fee", "type": "recurring", "required": true},
    {"name": "Transport Fee", "type": "recurring", "required": false},
    {"name": "Lab Fee", "type": "recurring", "required": false},
    {"name": "Activities", "type": "recurring", "required": false},
    {"name": "Admission Fee", "type": "one-time", "required": false}
  ],
  "default_discounts": [
    {"name": "Sibling Discount", "type": "family_linked", "default_value": "10%"},
    {"name": "Merit Scholarship", "type": "merit", "default_value": null},
    {"name": "RTE Waiver", "type": "government_waiver", "default_value": "100%"}
  ],
  "default_schedule": "quarterly",
  "custom_fields": [
    {"name": "Parent Name", "type": "text", "required": true},
    {"name": "Blood Group", "type": "select", "required": false}
  ],
  "reminder_tone": "formal_respectful",
  "reports": ["grade_wise_collection", "scholarship_summary"]
}
```

Template creates defaults; business customizes everything.

---

*Razorpay Template (Khilan Haria, Sep 2024)*
