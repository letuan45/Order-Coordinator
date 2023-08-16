import React, { useState } from "react";
import { Button, Avatar, Typography, Card } from "@material-tailwind/react";
import Modal from "../UI/Modal";
import StockDetailsList from "./StockDetailsList";

const StockItem = ({ item }) => {
  const [detailsListIsOpen, setDetailsListIsOpen] = useState(false);
  return (
    <div className="h-50 rounded-lg bg-blue-gray-100 p-5 shadow-lg hover:shadow-xl">
      {detailsListIsOpen && (
        <Modal
          title={`Chi tiết tồn kho #${item.id}`}
          body={<StockDetailsList warehouseId={item.id}/>}
          size="sm"
          onClose={() => {
            setDetailsListIsOpen(false);
          }}
        />
      )}
      <div className="mb-2 flex items-center justify-between gap-4">
        <Avatar
          size="md"
          variant="circular"
          src="https://cdn-icons-png.flaticon.com/512/407/407826.png"
          alt="tania andrew"
          className="bg-green-400"
        />
        <Button
          variant="gradient"
          color="blue"
          size="sm"
          className="font-medium capitalize"
          onClick={() => {setDetailsListIsOpen(true);}}
        >
          Xem tồn kho
        </Button>
      </div>
      <Typography
        variant="h6"
        color="blue-gray"
        className="mb-2 flex items-center gap-2 font-medium"
      >
        <span>{item.name}</span> •{" "}
        <a href="#" className="text-sm text-blue-gray-700">
          @id: {item.id}
        </a>
      </Typography>
      <Typography variant="small" color="black" className="font-normal">
        Địa chỉ • {item.additionAddress}, Quận/Huyện: {item.district.name},
        Tỉnh/Thành phố: {item.district.province.name}
      </Typography>
      <div className="mt-6 flex items-center gap-8 border-t border-blue-gray-50 pt-4">
        <Typography
          variant="small"
          color="gray"
          className="flex items-center gap-1 text-xs font-normal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            className="-mt-0.5 h-3.5 w-3.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
            />
          </svg>
          Kho miền: {item.district.province.region.name}
        </Typography>
        {item.active && (
          <Typography
            as="a"
            href="#"
            variant="small"
            color="gray"
            className="flex items-center gap-1 text-xs font-normal"
          >
            <span className="h-3 w-3 rounded-full bg-green-500" />
            Đang hoạt động
          </Typography>
        )}
        {!item.active && (
          <Typography
            as="a"
            href="#"
            variant="small"
            color="gray"
            className="flex items-center gap-1 text-xs font-normal"
          >
            <span className="h-3 w-3 rounded-full bg-blue-gray-500" />
            Ngừng hoạt động
          </Typography>
        )}
      </div>
    </div>
  );
};

export default StockItem;
