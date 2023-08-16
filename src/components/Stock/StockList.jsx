import React from "react";
import NoData from "../UI/NoData";
import StockItem from "./StockItem";

const StockList = ({ items }) => {
  if (!items || items.length === 0) {
    return <NoData />;
  }

  return <div className="grid grid-cols-3 p-4 gap-4">
    {items.map(item => <StockItem key={item.id} item={item} />)}
  </div>;
};

export default StockList;
