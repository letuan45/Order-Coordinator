import React, { useEffect, useState } from "react";
import { Typography, Input, Button, Checkbox } from "@material-tailwind/react";
import {
  CreatePriceService,
  GetPartnersDeliveryPrices,
  UpdatePriceService,
} from "@/service/PartnerService";
import { toast } from "react-toastify";

const DeliveryPrices = ({ partnerId }) => {
  const [price1, setPrice1] = useState("");
  const [price2, setPrice2] = useState("");
  const [price3, setPrice3] = useState("");
  const [priceIsActive1, setPriceisActive1] = useState(true);
  const [priceIsActive2, setPriceisActive2] = useState(true);
  const [priceIsActive3, setPriceisActive3] = useState(true);
  const [priceIsChanged1, setPriceIsChanged1] = useState(false);
  const [priceIsChanged2, setPriceIsChanged2] = useState(false);
  const [priceIsChanged3, setPriceIsChanged3] = useState(false);
  const [price1Id, setPrice1Id] = useState();
  const [price2Id, setPrice2Id] = useState();
  const [price3Id, setPrice3Id] = useState();
  const {
    getPricesResponse,
    getPricesIsLoading,
    getPricesError,
    reloadPrices,
  } = GetPartnersDeliveryPrices(partnerId);
  const {
    createPriceResponse,
    createPriceError,
    createPriceIsLoading,
    createPriceAction,
  } = CreatePriceService();

  const {
    updatePriceResponse,
    updatePriceError,
    updatePriceIsLoading,
    updatePriceAction,
  } = UpdatePriceService();

  useEffect(() => {
    if (updatePriceResponse) {
      toast.success("Hiệu chỉnh giá thành công", {
        position: toast.POSITION.TOP_RIGHT,
      });
      reloadPrices();
    } else if (updatePriceError) {
      toast.error("Hiệu chỉnh giá thất bại!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }, [updatePriceResponse, updatePriceError]);

  useEffect(() => {
    if (createPriceResponse) {
      toast.success("Tạo giá thành công", {
        position: toast.POSITION.TOP_RIGHT,
      });
      reloadPrices();
    } else if (createPriceError) {
      toast.error("Tạo giá thất bại!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }, [createPriceResponse, createPriceError]);

  useEffect(() => {
    if (getPricesError) {
      toast.error("Tải bảng giá thất bại!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else if (getPricesResponse) {
      if (getPricesResponse.filter((item) => item.deliveryType.id === 1)[0]) {
        setPrice1(
          getPricesResponse.filter((item) => item.deliveryType.id === 1)[0]
            .price
        );
        setPriceisActive1(
          getPricesResponse.filter((item) => item.deliveryType.id === 1)[0]
            .active
        );
        setPriceIsChanged1(true);

        setPrice1Id(
          getPricesResponse.filter((item) => item.deliveryType.id === 1)[0].id
        );
      }
      if (getPricesResponse.filter((item) => item.deliveryType.id === 2)[0]) {
        setPrice2(
          getPricesResponse.filter((item) => item.deliveryType.id === 2)[0]
            .price
        );
        setPriceisActive2(
          getPricesResponse.filter((item) => item.deliveryType.id === 2)[0]
            .active
        );
        setPriceIsChanged2(true);

        setPrice2Id(
          getPricesResponse.filter((item) => item.deliveryType.id === 2)[0].id
        );
      }
      if (getPricesResponse.filter((item) => item.deliveryType.id === 3)[0]) {
        setPrice3(
          getPricesResponse.filter((item) => item.deliveryType.id === 3)[0]
            .price
        );
        setPriceisActive3(
          getPricesResponse.filter((item) => item.deliveryType.id === 3)[0]
            .active
        );
        setPriceIsChanged3(true);

        setPrice3Id(
          getPricesResponse.filter((item) => item.deliveryType.id === 3)[0].id
        );
      }
    }
  }, [getPricesResponse, getPricesError]);

  const errorValidator = () => {
    toast.error("Giá không hợp lệ!", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const addPriceHandler = (price, partnerId, priceTypeId) => {
    if (isNaN(price)) {
      errorValidator();
      return;
    }
    createPriceAction({
      partnerId: partnerId,
      deliveryTypeId: priceTypeId,
      deliveryPrice: +price.trim(),
    });
  };

  const updatePriceHandler = (price, priceId, priceIsActive) => {
    if (isNaN(price)) {
      errorValidator();
      return;
    }
    updatePriceAction({
      priceId: priceId,
      active: priceIsActive,
      price: price,
    });
  };

  return (
    <div>
      <Typography variant="h5" color="blue-gray" className="font-normal">
        Giá nội tỉnh
      </Typography>
      {price1 && priceIsChanged1 ? (
        <div className="my-3 flex items-center justify-center">
          <Input
            type="text"
            label="Giá vận chuyển trong tỉnh"
            size="lg"
            id="price1"
            name="price1"
            onChange={(e) => {
              if (e.target.value.length === 0) {
                setPrice1(" ");
                return;
              }
              setPrice1(e.target.value);
            }}
            value={price1}
          />
          <Checkbox
            label="Active"
            checked={priceIsActive1}
            onChange={() => {
              setPriceisActive1((oldState) => !oldState);
            }}
          />
          <Button
            className="ml-4 block w-5/6"
            onClick={updatePriceHandler.bind(
              this,
              price1,
              price1Id,
              priceIsActive1
            )}
          >
            Thay đổi
          </Button>
        </div>
      ) : (
        <div className="my-3 flex items-center justify-center">
          <Input
            type="text"
            label="Giá vận chuyển trong tỉnh"
            size="lg"
            id="price1"
            name="price1"
            onChange={(e) => {
              if (e.target.value.length === 0) {
                setPrice1(" ");
                return;
              }
              setPrice1(e.target.value);
            }}
            value={price1}
          />
          <Button
            className="ml-4 w-5/6"
            onClick={addPriceHandler.bind(this, price1, partnerId, 1)}
          >
            Thêm giá
          </Button>
        </div>
      )}
      <Typography variant="h5" color="blue-gray" className="font-normal">
        Giá nội vùng
      </Typography>
      {price2 && priceIsChanged2 ? (
        <div className="my-3 flex items-center justify-center">
          <Input
            type="text"
            label="Giá vận chuyển khác tỉnh, cùng miền"
            size="lg"
            id="price2"
            name="price2"
            onChange={(e) => {
              if (e.target.value.length === 0) {
                setPrice2(" ");
                return;
              }
              setPrice2(e.target.value);
            }}
            value={price2}
          />
          <Checkbox
            label="Active"
            checked={priceIsActive2}
            onChange={() => {
              setPriceisActive2((oldState) => !oldState);
            }}
          />
          <Button
            className="ml-4 w-5/6"
            onClick={updatePriceHandler.bind(
              this,
              price2,
              price2Id,
              priceIsActive2
            )}
          >
            Thay đổi
          </Button>
        </div>
      ) : (
        <div className="my-3 flex items-center justify-center">
          <Input
            type="text"
            label="Giá vận chuyển khác tỉnh, cùng miền"
            size="lg"
            id="price2"
            name="price2"
            onChange={(e) => {
              if (e.target.value.length === 0) {
                setPrice2(" ");
                return;
              }
              setPrice2(e.target.value);
            }}
            value={price2}
          />
          <Button
            className="ml-4 w-5/6"
            onClick={addPriceHandler.bind(this, price2, partnerId, 2)}
          >
            Thêm giá
          </Button>
        </div>
      )}
      <Typography variant="h5" color="blue-gray" className="font-normal">
        Giá liên vùng
      </Typography>
      {price3 && priceIsChanged3 ? (
        <div className="my-3 flex items-center justify-center">
          <Input
            type="text"
            label="Giá vận chuyển khác vùng miền"
            size="lg"
            id="price3"
            name="price3"
            onChange={(e) => {
              if (e.target.value.length === 0) {
                setPrice3(" ");
                return;
              }
              setPrice3(e.target.value);
            }}
            value={price3}
          />
          <Checkbox
            label="Active"
            checked={priceIsActive3}
            onChange={() => {
              setPriceisActive3((oldState) => !oldState);
            }}
          />
          <Button
            className="ml-4 w-5/6"
            onClick={updatePriceHandler.bind(
              this,
              price3,
              price1Id,
              priceIsActive3
            )}
          >
            Thay đổi
          </Button>
        </div>
      ) : (
        <div className="my-3 flex items-center justify-center">
          <Input
            type="text"
            label="Giá vận chuyển khác vùng miền"
            size="lg"
            id="price3"
            name="price3"
            onChange={(e) => {
              if (e.target.value.length === 0) {
                setPrice3(" ");
                return;
              }
              setPrice3(e.target.value);
            }}
            value={price3}
          />
          <Button
            className="ml-4 w-5/6"
            onClick={addPriceHandler.bind(this, price3, partnerId, 3)}
          >
            Thêm giá
          </Button>
        </div>
      )}
    </div>
  );
};

export default DeliveryPrices;
