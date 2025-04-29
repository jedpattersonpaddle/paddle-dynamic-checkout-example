import { Metadata } from "next";
import CheckoutClient from "./client";
import { checkoutConfig } from "@/config";

export const metadata: Metadata = {
  title: `Checkout | ${checkoutConfig.companyName}`,
};

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ priceId: string }>;
}) {
  const { priceId } = await params;

  return <CheckoutClient priceId={priceId} config={checkoutConfig} />;
}
