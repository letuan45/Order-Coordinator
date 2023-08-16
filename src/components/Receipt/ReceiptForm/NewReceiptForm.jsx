import { NewReceiptService } from "@/service/ReceiptService";
import { Button } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import ImportedReceipt from "./ImportedReceipt";
import { GetProductByIdList } from "@/service/ProductService";
import { toast } from "react-toastify";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import { GetWarehouseService } from "@/service/WarehouseService";
import { GetASupplierService } from "@/service/SupplierService";
import { useSelector } from "react-redux";

const NewReceiptForm = ({afterCreateReceipt}) => {
  const [data, setData] = useState([]);
  const [renderData, setRenderData] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const employeeId = user ? user.employee.id : null;
  const [supplier, setSupplier] = useState(null);
  const [warehouse, setWarehouse] = useState(null);

  const {
    newReceiptResponse,
    newReceiptError,
    newReceiptIsLoading,
    newReceiptAction,
  } = NewReceiptService();

  const {
    getProductByIdListRes,
    getProductByIdErr,
    getProductByIdListIsLoading,
    getProductByIdListAction,
  } = GetProductByIdList();

  const {
    getWareHouseRes,
    getWarehouseIsLoading,
    getWarehouseErr,
    getWarehouseAction,
  } = GetWarehouseService();

  const {
    getASupplierResponse,
    getASupplierIsLoading,
    getASupplierError,
    getASupplierAction,
  } = GetASupplierService();

  useEffect(() => {
    if (getWareHouseRes) {
      setWarehouse(getWareHouseRes);
    } else if (getWarehouseErr) {
      toast.error("Không tìm được kho", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }, [getWareHouseRes, getWarehouseErr]);

  useEffect(() => {
    if(newReceiptResponse) {
      toast.success("Nhập hàng thành công!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      afterCreateReceipt();
    } else if(newReceiptError) {
      toast.error("Nhập hàng thất bại!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }, [newReceiptResponse, newReceiptError]);

  useEffect(() => {
    if (getASupplierResponse) {
      setSupplier(getASupplierResponse);
    } else if (getASupplierError) {
      toast.error("Không tìm được nhà cung cấp", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }, [getASupplierResponse, getASupplierError]);

  useEffect(() => {
    if (getProductByIdListRes) {
      const dataList = [];
      for (const index in data) {
        const item = data[index];
        const responseItem = getProductByIdListRes[index];
        dataList.push({
          item,
          name: responseItem.name,
          price: responseItem.price,
        });
      }
      setRenderData(dataList);
    } else if (getProductByIdErr) {
      toast.error(getProductByIdErr.data, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }, [getProductByIdListRes, getProductByIdErr, data]);

  const importFileHandler = () => {
    if(!data || !renderData || renderData.length === 0 || !supplier || !warehouse) {
      toast.error("Thông tin không hợp lệ!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    
    const params = {
      employeeId: employeeId,
      supplierId: supplier.id,
      warehouseId: warehouse.id,
    };
    const fetchData = { receiptDetails: data };
    newReceiptAction({data: fetchData, params: params});
  };

  useEffect(() => {
    if (data.length > 0) {
      const productIdListString = data
        .map((item) => item.productId + "")
        .join();
      getProductByIdListAction(productIdListString);
    }
  }, [data]);

  const onChangeUploadFile = (event) => {
    const reader = new FileReader();
    reader.readAsBinaryString(event.target.files[0]);
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);
      const supplierId = parsedData[0]["Mã nhà cung cấp"];
      const warehouseId = parsedData[0]["Mã kho"];

      getWarehouseAction(warehouseId);
      getASupplierAction(supplierId);
      setData(
        parsedData.map((item) => {
          return { productId: item["Mã hàng"], amount: item["Số lượng"] };
        })
      );
    };
  };

  const isAllowedShowData =
    supplier && warehouse && !getProductByIdListIsLoading && data;
  const isLoading =
    getProductByIdListIsLoading &&
    getWarehouseIsLoading &&
    getASupplierIsLoading;

  return (
    <div>
      <input
        type="file"
        className="text-grey-500 file:text-md w-full rounded-full border-2
            p-2 text-sm file:mr-5
            file:rounded-full file:border-0
            file:bg-blue-50 file:py-2
            file:px-6 file:font-medium file:text-blue-700
            hover:file:cursor-pointer hover:file:bg-amber-50
            hover:file:text-amber-700
          "
        accept=".xlsx"
        onChange={onChangeUploadFile}
      />
      {isLoading && <LoadingSpinner />}
      {isAllowedShowData && data.length > 0 && (
        <ImportedReceipt
          items={renderData}
          supplier={supplier}
          warehouse={warehouse}
        />
      )}
      <div className="mt-4 flex justify-center">
        <Button onClick={importFileHandler}>
          {newReceiptIsLoading ?  "Loading..." : "Xác nhận"}
        </Button> 
      </div>
    </div>
  );
};

export default NewReceiptForm;
