import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { NewWarehouseSchema } from "@/utils/ValidationSchema";
import {
  Input,
  Textarea,
  Button,
} from "@material-tailwind/react";
import ErrorInputMessage from "@/components/UI/ErrorInputMessage";
import { toast } from "react-toastify";
import { CreateWarehouse } from "@/service/WarehouseService";
import {
  GetAllRegion,
  GetDistrict,
  GetProvince,
} from "@/service/AddressService";

const initialValues = {
  name: "",
  additionAddress: "",
};

const NewWarehouse = ({afterCreateAction}) => {
  const [districts, setDistricts] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [regions, setRegions] = useState([]);
  const [choosenDistrict, setChoosenDistrict] = useState(null);
  const [choosenProvince, setChoosenProvince] = useState(null);
  const [choosenRegion, setChoosenRegion] = useState(null);

  const {
    createWarehouseRes,
    createWarehouseIsLoading,
    createWarehouseErr,
    createWarehouseAction,
  } = CreateWarehouse();

  const { getAllRegionRes, getAllRegionErr } = GetAllRegion();
  const { getProvinceRes, getProvinceErr, getProvinceAction } = GetProvince();
  const { getDistrictRes, getDistrictErr, getDistrictAction } = GetDistrict();

  useEffect(() => {
    if(createWarehouseRes) {
      toast.success("Tạo mới kho thành công!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      afterCreateAction();
    } else if(createWarehouseErr) {
      toast.error("Tạo mới kho tất bại!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }

  }, [createWarehouseRes, createWarehouseErr]);

  useEffect(() => {
    if (getDistrictRes) {
      setDistricts(getDistrictRes);
    } else if (getDistrictErr) {
      toast.error("Không tải được danh sách Quận/Huyện", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }, [getDistrictRes, getDistrictErr]);

  useEffect(() => {
    if (getProvinceRes) {
      setProvinces(getProvinceRes);
    } else if (getProvinceErr) {
      toast.error("Không tải được danh sách tỉnh thành", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }, [getProvinceRes, getProvinceErr]);

  useEffect(() => {
    if (getAllRegionRes) {
      setRegions(getAllRegionRes);
    } else if (getAllRegionErr) {
      toast.error("Không tải được danh sách vùng miền!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }, [getAllRegionRes, getAllRegionErr]);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: NewWarehouseSchema,
    onSubmit: (values) => {
      if (!choosenDistrict || !choosenProvince || !choosenRegion) {
        toast.error("Hãy cung cấp đầy đủ địa chỉ!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      createWarehouseAction({ data: values, districtId: choosenDistrict});
    },
  });

  const changeRegionHandler = (e) => {
    const regionId = e.target.value;
    if (regionId !== choosenRegion) {
      setChoosenRegion(regionId);
      getProvinceAction({regionId: regionId});
      setChoosenDistrict(null);
      setChoosenProvince(null);
    }
  };

  const changeProvinceHandler = (e) => {
    const provinceId = e.target.value;
    if (provinceId !== choosenProvince) {
      setChoosenProvince(provinceId);
      getDistrictAction({provinceId: provinceId});
      setChoosenDistrict(null);
    }
  };

  const changeDistrictHandler = (e) => {
    const districtId = e.target.value;
    if (districtId !== choosenDistrict) {
      setChoosenDistrict(districtId);
    }
  };

  return (
    <form className="w-full" onSubmit={formik.handleSubmit}>
      <div className="my-3">
        <Input
          type="text"
          label="Tên kho"
          size="lg"
          id="name"
          name="name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
        {formik.touched.name && formik.errors.name ? (
          <ErrorInputMessage value={formik.errors.name} />
        ) : null}
      </div>
      <div className="my-3">
        <select
          value={choosenRegion ? choosenRegion : ""}
          className="h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200  focus:border-blue-400 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
          onChange={(e) => {
            changeRegionHandler(e);
          }}
        >
          <option className="text-base" value={0}>
            Chọn vùng miền
          </option>
          {regions.map((item) => (
            <option className="text-base" value={item.id} key={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <div className="my-3">
        <select
          value={choosenProvince ? choosenProvince : ""}
          className="h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200  focus:border-blue-400 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
          onChange={(e) => {
            changeProvinceHandler(e);
          }}
        >
          <option className="text-base" value={0}>
            Chọn Tỉnh
          </option>
          {provinces.map((item) => (
            <option className="text-base" value={item.id} key={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <div className="my-3">
        <select
          value={choosenDistrict ? choosenDistrict : ""}
          className="h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200  focus:border-blue-400 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
          onChange={(e) => {
            changeDistrictHandler(e);
          }}
        >
          <option className="text-base" value={0}>
            Chọn Quận/Huyện
          </option>
          {districts.map((item) => (
            <option className="text-base" value={item.id} key={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <div className="my-3">
        <Textarea
          label="Địa chỉ bổ sung"
          id="additionAddress"
          name="additionAddress"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.additionAddress}
        />
        {formik.touched.additionAddress && formik.errors.additionAddress ? (
          <ErrorInputMessage value={formik.errors.additionAddress} />
        ) : null}
      </div>
      <div className="flex w-full justify-end">
        <Button type="submit">
          {createWarehouseIsLoading ? "Loading..." : "Xác nhận"}
        </Button>
      </div>
    </form>
  );
};

export default NewWarehouse;
