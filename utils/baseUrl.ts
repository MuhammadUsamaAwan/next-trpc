const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}/api/trpc`
  : `http://localhost:${process.env.PORT ?? 3000}/api/trpc`;

export default baseUrl;
