import React, { useState } from "react";
import VTE from "./VTE";
import SVK from "./SVK";
import CPS from "./CPS";
import LPQ from "./LPQ";

export default function ServiceArea() {
  return (
    <div className="container">
      <CPS />
      <LPQ />
      <VTE />
      <SVK />
    </div>
  );
}
