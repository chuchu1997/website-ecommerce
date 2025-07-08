/** @format */
"use client";
import React, { useState } from "react";

const FreeConsultation: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Phone Number Submitted:", phoneNumber);
  };

  return (
    <div className="border border-dashed border-gray-400 p-4 rounded-md bg-white">
      <div className="flex items-center gap-2 mb-4">
        <div className="bg-orange-500 text-white px-4 py-2 font-bold text-sm rounded-md">
          TƯ VẤN MIỄN PHÍ
        </div>
      </div>
      <p className="text-gray-700">
        Gọi{" "}
        <span className="text-orange-500 font-bold text-lg">0987.822.944</span>{" "}
        để được tư vấn hoặc yêu cầu CaCo gọi lại
      </p>
      <form onSubmit={handleSubmit} className="mt-4">
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-700 mb-2">
          Số điện thoại:
        </label>
        <div className="grid grid-cols-1 items-center gap-2">
          <input
            type="text"
            id="phone"
            placeholder="Ví dụ: 0987654321"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <button
            type="submit"
            className="bg-orange-500 text-white px-4 py-2 rounded-md font-bold hover:bg-orange-600">
            GỬI TƯ VẤN
          </button>
        </div>
      </form>
    </div>
  );
};

export default FreeConsultation;
