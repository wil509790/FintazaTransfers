export const env = process.env.PLAID_ENVIRONNEMENT
export const plaidSecret = process.env.PLAID_SECRET_KEY
export const plaidClient = process.env.PLAID_CLIENT_ID
export const plaidClientName = process.env.PLAID_CLIENT_NAME
export const plaidBaseUrl =
  env === 'sandbox'
    ? 'https://sandbox.plaid.com'
    : env === 'development'
    ? 'https://development.plaid.com'
    : 'https://production.plaid.com'
