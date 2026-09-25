# Playwright Banking Tests

Automated tests for the Way2Automation Banking application using Playwright.

## Prerequisites

- Node.js 20+
- npm

## Installation

```bash
npm install
npx playwright install
```

## Running Tests

```bash
# Run all tests (all browsers)
npm test

# Run tests in Chromium only
npx playwright test --project=chromium

# Run tests with UI mode
npx playwright test --ui

# Run a specific test
npx playwright test -g "Add a new customer"

# View HTML report
npx playwright show-report
```

## Test Scenarios

1. **Launch banking application successfully** - Verifies the login page loads
2. **Navigate to Bank Manager Login** - Opens the Bank Manager section
3. **Add a new customer** - Creates a customer via Bank Manager
4. **Open an account for the newly added customer** - Creates an account for the customer
5. **Navigate to Customer Login** - Opens the Customer Login section
6. **Select the created customer and verify successful login** - Logs in as the created customer

## Project Structure

```
tests/
├── example.spec.ts          # Main test file
└── test-data/
    └── customerData.ts      # Test data (firstName, lastName, postCode)
```

## Configuration

- `playwright.config.ts` - Playwright configuration (browsers, retries, reporters)
- `package.json` - Dependencies and scripts