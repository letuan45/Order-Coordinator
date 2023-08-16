import React, { useState, useEffect } from "react";
import { Typography, Chip } from "@material-tailwind/react";
import Modal from "../UI/Modal";
import EmployeeFKList from "./EmployeeFKList";
import UpdateWarehouse from "./WarehouseForms/UpdateWarehouse";
import RemoveDataModal from "../UI/RemoveDataModal";
import { RemoveWarehouseService } from "@/service/WarehouseService";
import { toast } from "react-toastify";

const WarehouseItem = ({ item, afterUpdateWarehouse }) => {
  const [employeeListIsOpen, setEmployeeListIsOpen] = useState(false);
  const [updateWarehouseIsOpen, setUpdateWarehouseIsOpen] = useState(false);
  const [removeIsOpen, setRemoveIsOpen] = useState(false);

  const {
    removeWarehouseRes,
    removeWarehouseErr,
    removeWarehouseAction,
  } = RemoveWarehouseService();

  useEffect(() => {
    if (removeWarehouseErr) {
      toast.error(removeWarehouseErr.data, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else if (removeWarehouseRes) {
      toast.success("Xóa kho thành công!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      afterUpdateWarehouse();
    }
  }, [removeWarehouseRes, removeWarehouseErr]);

  const openEmployeeListHandler = () => {
    setEmployeeListIsOpen(true);
  };

  const closeEmployeeListHandler = () => {
    setEmployeeListIsOpen(false);
  };

  const openUpdateWarehouse = () => {
    setUpdateWarehouseIsOpen(true);
  };

  const closeUpdateWarehouse = () => {
    setUpdateWarehouseIsOpen(false);
  };

  const afterUpdateHandler = () => {
    afterUpdateWarehouse();
    closeUpdateWarehouse();
  };

  const closeRemoveHandler = () => {
    setRemoveIsOpen(false);
  };

  const removeEmployeeHandler = () => {
    removeWarehouseAction(item.id);
  };

  return (
    <tr>
      {/* Danh sách nhân viên trong kho */}
      {removeIsOpen && (
        <RemoveDataModal
          onClose={closeRemoveHandler}
          onAccept={removeEmployeeHandler}
        />
      )}
      {updateWarehouseIsOpen && (
        <Modal
          title={`Cập nhật kho: ${item.name}`}
          body={
            <UpdateWarehouse
              warehouse={item}
              afterUpdateWarehouse={afterUpdateHandler}
            />
          }
          size="sm"
          onClose={closeUpdateWarehouse}
        />
      )}
      {employeeListIsOpen && (
        <Modal
          title={`Danh sách nhân viên ${item.name}`}
          body={<EmployeeFKList warehouseId={item.id} />}
          size="md"
          onClose={closeEmployeeListHandler}
        />
      )}
      <td className="border-b border-blue-gray-50 py-3 px-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          {item.id}
        </Typography>
      </td>
      <td className="border-b border-blue-gray-50 py-3 px-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          {item.name}
        </Typography>
      </td>
      <td className="border-b border-blue-gray-50 py-3 px-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          {item.district.name}
        </Typography>
      </td>
      <td className="border-b border-blue-gray-50 py-3 px-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          {item.district.province.name}
        </Typography>
      </td>
      <td className="border-b border-blue-gray-50 py-3 px-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          {item.district.province.region.name}
        </Typography>
      </td>
      <td className="border-b border-blue-gray-50 py-3 px-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          {item.additionAddress}
        </Typography>
      </td>
      <td className="border-b border-blue-gray-50 py-3 px-4">
        <Chip
          value={item.active ? "Hoạt động" : "Ngừng hoạt động"}
          color={item.active ? "green" : "blue-gray"}
        />
      </td>
      <td className="border-b border-blue-gray-50 py-3 px-4">
        <Typography
          as="a"
          href="#"
          variant="small"
          color="blue"
          className="font-medium"
          onClick={(e) => {
            e.preventDefault();
            openUpdateWarehouse();
          }}
        >
          Sửa
        </Typography>
      </td>
      <td className="border-b border-blue-gray-50 py-3 px-4">
        <Typography
          as="a"
          href="#"
          variant="small"
          color="blue"
          className="font-medium"
          onClick={(e) => {
            e.preventDefault();
            openEmployeeListHandler();
          }}
        >
          Xem
        </Typography>
      </td>
    </tr>
  );
};

export default WarehouseItem;
