import React, { useState } from "react";
import DatePicker from "react-datepicker";

const Datepicker = ({ label, date, onDateChange }) => {
  return (
    <div className="w-full h-full flex items-center">
      <label>{label}</label>
      <DatePicker
        dateFormat="dd/MM/yyyy"
        className="my-2 ml-2 h-10 w-full rounded-md border-2 border-blue-gray-100 px-4 py-3 focus:border-blue-500 focus:outline-0 text-black"
        selected={date}
        onChange={(date) => onDateChange(date)}
      />
    </div>
  );
};

export default Datepicker;
