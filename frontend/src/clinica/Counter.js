import React from "react";
import { Director } from "./sections/director/Director";
import { Reseption } from "./sections/reseption/Reseption";
import { Cashier } from "./sections/cashier/Cashier";

export const Counter = ({ section }) => {
  switch (section) {
    case "Director":
      return <Director />;
    case "Reseption":
      return <Reseption />;
    case "Cashier":
      return <Cashier />;
    default:
      return <h1>Topilmadi</h1>;
  }
};
