# Paddle Dynamic Checkout Page

A modern checkout page implementation using Paddle for payment processing, built with Next.js and TypeScript.

## Tech Stack

- **Frontend Framework**: Next.js 15.3.1 (React 19)
- **Styling**: TailwindCSS 4
- **Language**: TypeScript

## Prerequisites

- Node.js (latest LTS version recommended)
- A Paddle account with:
  - Vendor ID
  - API keys
  - Configured products

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/jedpattersonpaddle/paddle-dynamic-checkout-example
   cd paddle-dynamic-checkout-example
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. Create a `.env.local` file in the root directory and add your Paddle configuration:

   ```env
   NEXT_PUBLIC_PADDLE_CLIENT_TOKEN=your_client_id
   NEXT_PUBLIC_PADDLE_ENV="sandbox" or "production"
   ```

4. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Configuration

### Paddle Setup

1. Sign up for a [Paddle account](https://paddle.com)
2. Get your Vendor ID and API keys from the Paddle dashboard
3. Configure your products in the Paddle dashboard
4. Update the checkout configuration in `src/checkout-config.ts`

## Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fjedpattersonpaddle%2Fpaddle-dynamic-checkout-example&env=NEXT_PUBLIC_PADDLE_CLIENT_TOKEN,NEXT_PUBLIC_PADDLE_ENV&envDescription=API%20keys%20needed%20for%20Paddle%20integration&envLink=https%3A%2F%2Fgithub.com%2Fjedpattersonpaddle%2Fpaddle-dynamic-checkout-example%2Fblob%2Fmain%2F.env.example&project-name=paddle-dynamic-checkout-example&repository-name=paddle-dynamic-checkout-example)

### Manual Deployment

1. Build the project:

   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm run start
   ```

## Development

- The main checkout page is located in `src/app/page.tsx`
- Paddle configuration is in `src/checkout-config.ts`
- Custom hooks for Paddle integration are in `src/hooks/`
- Utility functions are in `src/lib/`

## Testing

Before going live:

1. Test the checkout flow in Paddle's sandbox environment
2. Verify all error handling and success callbacks
3. Test different payment methods and currencies
4. Ensure proper handling of failed transactions

## Security

- Never commit your Paddle API keys to the repository
- Use environment variables for all sensitive configuration
- Follow Paddle's security best practices
- Keep dependencies updated

## Support

For Paddle-specific questions, refer to the [Paddle Documentation](https://developer.paddle.com/).
For Next.js questions, check the [Next.js Documentation](https://nextjs.org/docs).

## License

This project is licensed under the MIT License - see the LICENSE file for details.
