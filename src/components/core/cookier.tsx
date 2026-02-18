"use client";

import React from "react";
import { CookieConsent } from "../cookie-consent";

export default function Cookier() {
  return (
    <CookieConsent
      variant={"small"}
      onAcceptCallback={() => console.log("Accepted")}
      onDeclineCallback={() => console.log("Declined")}
    />
  );
}
