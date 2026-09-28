"use client";

import { useEffect } from "react";

type AnalyticsValue = string | number | boolean | undefined;
type AnalyticsPayload = Record<string, AnalyticsValue>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function trackAnalyticsEvent(eventName: string, payload: AnalyticsPayload = {}) {
  const cleanPayload = Object.fromEntries(
    Object.entries(payload).filter(([, value]) => value !== undefined),
  );

  const usesTagManager = Boolean(process.env.NEXT_PUBLIC_GTM_ID);

  if (usesTagManager) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: eventName, ...cleanPayload });
    return;
  }

  if (window.gtag) {
    window.gtag("event", eventName, cleanPayload);
  }
}

export function PageAnalytics({
  eventName,
  payload,
}: {
  eventName: string;
  payload?: AnalyticsPayload;
}) {
  useEffect(() => {
    trackAnalyticsEvent(eventName, payload);
  }, [eventName, payload]);

  return null;
}

export default function AnalyticsTracker() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest("a");
      if (!(anchor instanceof HTMLAnchorElement)) return;

      const eventName = anchor.dataset.analyticsEvent;
      if (eventName) {
        trackAnalyticsEvent(eventName, {
          slug: anchor.dataset.analyticsSlug,
          category: anchor.dataset.analyticsCategory,
          author: anchor.dataset.analyticsAuthor,
          label: anchor.dataset.analyticsLabel || anchor.textContent?.trim(),
          destination: anchor.href,
        });
        return;
      }

      try {
        const url = new URL(anchor.href, window.location.href);
        if (url.origin !== window.location.origin) {
          trackAnalyticsEvent("outbound_click", {
            label: anchor.textContent?.trim(),
            destination: url.href,
          });
        }
      } catch {
        // Ignore malformed URLs.
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
