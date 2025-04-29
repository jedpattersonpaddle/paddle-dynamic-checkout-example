"use client";
import {
  initializePaddle,
  InitializePaddleOptions,
  Paddle,
} from "@paddle/paddle-js";
import { useEffect, useState } from "react";
import type { CheckoutEventsData } from "@paddle/paddle-js/types/checkout/events";

export default function usePaddle(
  setCheckoutData?: (data: CheckoutEventsData) => void
): Paddle | undefined {
  const [paddle, setPaddle] = useState<Paddle>();

  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN;

    if (!token) {
      console.error("Paddle client token is not defined.");
      return;
    }

    initializePaddle({
      environment: "sandbox",
      token,
      eventCallback: (event) => {
        if (event.data && event.name && setCheckoutData) {
          setCheckoutData(event.data);
        }
      },
    } as InitializePaddleOptions)
      .then((paddleInstance) => {
        if (paddleInstance) {
          setPaddle(paddleInstance);
        } else {
          console.error("Failed to initialize Paddle.");
        }
      })
      .catch((error) => {
        console.error("Error initializing Paddle:", error);
      });
  }, [setCheckoutData]);

  return paddle;
}
