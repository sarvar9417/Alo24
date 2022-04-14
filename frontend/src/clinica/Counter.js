import React from "react";
import { Director } from "./sections/director/Director";
import { Reseption } from "./sections/reseption/Reseption";

export const Counter = ({ section }) => {
  switch (section) {
    case "Director":
      return <Director />;
    case "Reseption":
      return <Reseption />;
    default:
      return <h1>Topilmadi</h1>;
  }
};
