# Wrabit Webapp 🐇

Wrabit is a platform for building a daily writing habit. The more you write, the more we donate to mental health research.

## Getting Started

### Requirements

For now the following are required:

- Stripe (for payments)
- Sentry (for errors)

### Environment

```env
// URL for the backend
API_ENDPOINT="http://localhost:8080"

// Key for your Stripe test account
STRIPE_KEY="pk_test_XXXXXXXXXXXXXXXXXXXX"

// Stripe plan for the monthly subscription
MONTHLY_PLAN_ID="plan_FsvZtUpz9xw0Tx"

// Stripe plan for the yearly subscription
YEARLY_PLAN_ID="plan_FtuSSAndZnWxET"

// Sentry DSN to send errors to
SENTRY_DSN="https://XXXXXXXXXXXXXXXXXXXX@sentry.io/XXXXXX"
```

### Setup

1. Create required accounts (see above)
2. Copy `.env.example` to `.dev.env` and fill out the fields
3. Install dependencies with `yarn`
4. Run `yarn dev`
