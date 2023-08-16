import React, { useEffect, useState } from "react";
import { Card, Typography } from "@material-tailwind/react";
import { GetStockService } from "@/service/StockService";
import { toast } from "react-toastify";
import LoadingSpinner from "../UI/LoadingSpinner";
import NoData from "../UI/NoData";

const TABLE_HEAD = ["Mã sản phẩm", "Tên sản phẩm", "Tồn kho"];

const StockDetailsList = ({ warehouseId }) => {
  const [renderItems, setRenderItems] = useState([]);
  const { getStockResponse, getStockIsLoading, getStockError } =
    GetStockService(warehouseId);

  useEffect(() => {
    if (getStockResponse) {
      setRenderItems(getStockResponse);
    } else if (getStockError) {
      toast.error("Không lấy được danh sách chi tiết tồn kho!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }, [getStockResponse, getStockError]);

  if(!getStockIsLoading && renderItems.length === 0) {
    return <NoData/>
  }

  return (
    <Card className="h-72 overflow-auto">
      {getStockIsLoading && <LoadingSpinner />}
      {!getStockIsLoading && (
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {!getStockIsLoading &&
              renderItems.map((item, index) => (
                <tr key={index}>
                  <td className="border-b border-blue-gray-50 py-3 px-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {item.stockId.product.id}
                    </Typography>
                  </td>
                  <td className="border-b border-blue-gray-50 py-3 px-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {item.stockId.product.name}
                    </Typography>
                  </td>
                  <td className="border-b border-blue-gray-50 py-3 px-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {item.quantity}
                    </Typography>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </Card>
  );
};

export default StockDetailsList;
