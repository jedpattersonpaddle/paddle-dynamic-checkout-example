"use client";

import { useEffect, useState } from "react";
import type { CheckoutEventsData } from "@paddle/paddle-js/types/checkout/events";
import { useSearchParams } from "next/navigation";
import usePaddle from "@/hooks/usePaddle";
import type { Config } from "@/lib/types";

export default function CheckoutClient({
  priceId,
  config,
}: {
  priceId: string;
  config: Config;
}) {
  const searchParams = useSearchParams();
  const [checkoutData, setCheckoutData] = useState<CheckoutEventsData | null>(
    null
  );
  const paddle = usePaddle(setCheckoutData);
  const [quantity, setQuantity] = useState<number>(1);
  const discountCode = searchParams.get("code") as string | null;

  useEffect(() => {
    if (paddle) {
      paddle.Checkout.open({
        items: [{ priceId, quantity }],
        discountCode,
        settings: {
          successUrl: `${window.location.origin}/success`,
          displayMode: "inline",
          variant: "one-page",
          frameTarget: "paddle-checkout-frame",
          frameInitialHeight: 450,
          frameStyle:
            "width: 100%; background-color: transparent; border: none",
        },
      });
    }
  }, [paddle, priceId, discountCode, quantity]);

  useEffect(() => {
    if (paddle && checkoutData) {
      paddle.Checkout.updateItems([{ priceId, quantity }]);
    }
  }, [paddle, priceId, quantity]);

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const getCurrencySymbol = (currencyCode: string) => {
    switch (currencyCode) {
      case "GBP":
        return "£";
      case "USD":
        return "$";
      case "EUR":
        return "€";
      default:
        return `${currencyCode} `;
    }
  };

  const formatPrice = (amount: number, currencyCode: string = "GBP") => {
    return `${getCurrencySymbol(currencyCode)}${amount.toFixed(2)}`;
  };

  if (!paddle) return null;

  return (
    <div className="min-h-screen w-full  relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/50" />

      <div className="relative w-full min-h-screen">
        <div className="max-w-[1400px] mx-auto p-4 sm:p-6 lg:p-8 h-full">
          <div className="flex flex-col lg:flex-row lg:items-start gap-8 xl:gap-16">
            {/* Left Container - Price Section */}
            <div className="w-full lg:w-[500px] lg:py-12">
              <div className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-2">
                      {config.companyName}
                    </h2>
                    <h3 className="text-4xl font-bold text-gray-900">
                      {formatPrice(
                        checkoutData?.totals?.total || 0,
                        checkoutData?.currency_code
                      )}
                    </h3>
                    <h4 className="text-sm text-gray-500 mt-1">Due today</h4>
                  </div>

                  <p className="text-gray-500 text-sm">
                    All prices in{" "}
                    <span className="font-medium">
                      {checkoutData?.currency_code || "GBP"}
                    </span>
                  </p>
                </div>

                <div className="space-y-6">
                  <table className="w-full">
                    <tbody className="divide-y divide-gray-100">
                      {/* Quantity Selector Row */}
                      <tr>
                        <td className="py-4">
                          <div className="flex items-center">
                            <div className="flex items-center border rounded-lg mr-4 bg-white shadow-sm">
                              <button
                                onClick={decreaseQuantity}
                                className="px-3 py-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-l-lg transition-colors"
                              >
                                -
                              </button>
                              <span className="px-4 py-2 font-medium min-w-[40px] text-center">
                                {quantity}
                              </span>
                              <button
                                onClick={increaseQuantity}
                                className="px-3 py-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-r-lg transition-colors"
                              >
                                +
                              </button>
                            </div>
                            <span className="text-gray-700 font-medium">
                              License
                            </span>
                          </div>
                        </td>
                        <td className="py-4 text-right font-medium text-gray-700">
                          {formatPrice(
                            ((checkoutData?.items?.[0]?.totals?.subtotal || 0) /
                              (quantity === 0 ? 1 : quantity)) *
                              quantity,
                            checkoutData?.currency_code
                          )}
                        </td>
                      </tr>

                      <tr>
                        <td className="py-4 text-gray-500">Subtotal</td>
                        <td className="py-4 text-right font-medium text-gray-700">
                          {formatPrice(
                            checkoutData?.totals?.subtotal || 0,
                            checkoutData?.currency_code
                          )}
                        </td>
                      </tr>

                      {checkoutData?.totals?.discount &&
                      checkoutData.totals.discount > 0 ? (
                        <tr>
                          <td className="py-4 text-green-600">Discount</td>
                          <td className="py-4 text-right font-medium text-green-600">
                            -
                            {formatPrice(
                              checkoutData?.totals?.discount || 0,
                              checkoutData?.currency_code
                            )}
                          </td>
                        </tr>
                      ) : null}

                      <tr>
                        <td className="py-4 text-gray-500">Taxes</td>
                        <td className="py-4 text-right text-gray-500">
                          {formatPrice(
                            checkoutData?.totals?.tax || 0,
                            checkoutData?.currency_code
                          )}
                        </td>
                      </tr>

                      <tr className="border-t-2 border-gray-200">
                        <td className="py-4 font-semibold text-gray-900">
                          Total price (due today)
                        </td>
                        <td className="py-4 text-right font-semibold text-gray-900">
                          {formatPrice(
                            checkoutData?.totals?.total || 0,
                            checkoutData?.currency_code
                          )}
                        </td>
                      </tr>

                      {checkoutData?.recurring_totals && (
                        <tr>
                          <td className="py-4 text-gray-500">Then</td>
                          <td className="py-4 text-right text-gray-500">
                            {formatPrice(
                              checkoutData?.recurring_totals?.total || 0,
                              checkoutData?.currency_code
                            )}{" "}
                            every{" "}
                            {checkoutData?.items?.[0]?.billing_cycle
                              ?.interval === "year"
                              ? "year"
                              : "month"}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Right Container - Payment Section */}
            <div className="flex-1 lg:py-12">
              <div className="bg-white rounded-2xl shadow-xl ring-1 ring-gray-200 p-6 lg:p-8">
                <div className="text-lg font-semibold text-gray-900 mb-8">
                  Payment Details
                </div>
                <div className="paddle-checkout-frame" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
