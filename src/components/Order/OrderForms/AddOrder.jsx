import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import * as XLSX from "xlsx";
import { Button } from "@material-tailwind/react";
import { GetProductByIdList } from "@/service/ProductService";
import { toast } from "react-toastify";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import ImportedOrder from "../ImportedOrder";
import { NewOrderService } from "@/service/OrderService";
import { GetDistrictById } from "@/service/AddressService";
import { GetCustomerById } from "@/service/CustomerService";

const AddOrder = ({ afterCreateOrder }) => {
  const [data, setData] = useState([]);
  const [renderData, setRenderData] = useState([]);
  const [customer, setCustomer] = useState(null);
  const [district, setDistrict] = useState(null);
  const [additionAddress, setAdditionAddress] = useState("");
  const user = useSelector((state) => state.auth.user);
  const employeeId = user ? user.employee.id : null;

  const { newOrderResponse, newOrderError, newOrderIsLoading, newOrderAction } =
    NewOrderService();

  const {
    getCustomerByIdRes,
    getCustomerByIdError,
    getCustomerByIdIsLoading,
    getCustomerByIdAction,
  } = GetCustomerById();

  const {
    getDistrictByIdRes,
    getDistrictByIdIsLoading,
    getDistrictByIdError,
    getDistrictByIdAction,
  } = GetDistrictById();

  const {
    getProductByIdListRes,
    getProductByIdErr,
    getProductByIdListIsLoading,
    getProductByIdListAction,
  } = GetProductByIdList();

  useEffect(() => {
    if (getDistrictByIdRes) {
      setDistrict(getDistrictByIdRes);
    } else if (getDistrictByIdError) {
      toast.error("Không tìm thấy địa chỉ", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }, [getDistrictByIdRes, getDistrictByIdError]);

  useEffect(() => {
    if (getCustomerByIdRes) {
      setCustomer(getCustomerByIdRes);
    } else if (getCustomerByIdError) {
      toast.error("Không tìm thấy khách hàng", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }, [getCustomerByIdRes, getCustomerByIdError]);

  useEffect(() => {
    if (newOrderResponse) {
      toast.success("Tạo đơn hàng thành công!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      afterCreateOrder();
    } else if (newOrderError) {
      toast.error("Tạo đơn hàng thất bại!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }, [newOrderResponse, newOrderError]);

  useEffect(() => {
    if (data.length > 0) {
      const productIdListString = data
        .map((item) => item.productId + "")
        .join();
      getProductByIdListAction(productIdListString);
    }
  }, [data]);

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

  const onChangeUploadFile = (event) => {
    const reader = new FileReader();
    reader.readAsBinaryString(event.target.files[0]);
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);
      const customerId = parsedData[0]["Mã khách hàng"];
      const districtId = parsedData[0]["Mã huyện"];
      const additionAddressXlSX = parsedData[0]["Địa chỉ bổ sung"];
      if (additionAddressXlSX) setAdditionAddress(additionAddressXlSX);
      getDistrictByIdAction(districtId);
      getCustomerByIdAction(customerId);
      setData(
        parsedData.map((item) => {
          return { productId: item["Mã hàng"], amount: item["Số lượng"] };
        })
      );
    };
  };

  const importFileHandler = () => {
    if (!data || !renderData || renderData.length === 0 || !customer || !district) {
      toast.error("Thông tin không hợp lệ!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    const params = {
      employeeId: employeeId,
      customerId: customer.id,
      districtId: district.id,
      additionAddress: additionAddress,
    };
    const fetchData = { orderDetails: data };
    newOrderAction({ data: fetchData, params: params });
  };

  const isAllowedShowData = !getProductByIdListIsLoading && !!data && district && customer;
  const isLoading =
    getProductByIdListIsLoading &&
    newOrderIsLoading &&
    getDistrictByIdIsLoading &&
    getCustomerByIdIsLoading;

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
      {isAllowedShowData && data.length > 0 && (
        <ImportedOrder
          items={renderData}
          customer={customer}
          address={district}
          additionAddress={additionAddress}
        />
      )}
      {isLoading && <LoadingSpinner />}
      <div className="mt-4 flex justify-center">
        <Button onClick={importFileHandler}>
          {newOrderIsLoading ? "Loading..." : "Xác nhận"}
        </Button>
      </div>
    </div>
  );
};

export default AddOrder;
