"use client";

import Script from "next/script";
import { useConsent } from "./ConsentProvider";

/**
 * Loads optional third-party scripts ONLY after the matching consent.
 * IDs are public identifiers (not secrets) read from NEXT_PUBLIC_* env vars;
 * when they are empty nothing is loaded at all.
 */
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const SAFE_ID = /^[A-Za-z0-9-]{4,40}$/;

export function ConsentScripts() {
  const { consent, ready } = useConsent();
  if (!ready) return null;

  return (
    <>
      {consent.analytics && GA_ID && SAFE_ID.test(GA_ID) ? (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`}
          </Script>
        </>
      ) : null}

      {consent.marketing && PIXEL_ID && SAFE_ID.test(PIXEL_ID) ? (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${PIXEL_ID}');fbq('track','PageView');`}
        </Script>
      ) : null}
    </>
  );
}
