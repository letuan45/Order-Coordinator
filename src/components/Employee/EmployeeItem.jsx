import React, { useEffect, useState } from "react";
import { Typography, Chip } from "@material-tailwind/react";
import { CheckHasAccountService } from "@/service/EmployeeService";
import Modal from "../UI/Modal";
import { toast } from "react-toastify";
import EditEmployeeForm from "./EditEmployeeForm";
import AccountManager from "./AccountManager";
import { TrashIcon } from "@heroicons/react/24/solid";
import RemoveDataModal from "../UI/RemoveDataModal";
import { RemoveEmployeeService } from "@/service/EmployeeService";

const EmployeeItem = ({ item, afterUpdateAction }) => {
  const [editEmployeeIsOpen, setEditEmployeeIsOpen] = useState(false);
  const [accountEmployeeIsOpen, setAccountEmployeeIsOpen] = useState(false);
  const [removeIsOpen, setRemoveIsOpen] = useState(false);
  const [hasAccount, setHasAccount] = useState("...");

  let dateData = new Date(item.dateOfBirth);
  dateData = new Date(dateData).toISOString().split("T")[0].split("-");
  const day = dateData[2];
  const month = dateData[1];
  const year = dateData[0];

  const { removeEmployeeRes, removeEmployeeErr, removeEmployeeAction } =
    RemoveEmployeeService();

  useEffect(() => {
    if (removeEmployeeErr) {
      toast.error(removeEmployeeErr.data, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else if (removeEmployeeRes) {
      toast.success("Xóa nhân viên thành công!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      afterUpdateAction();
    }
  }, [removeEmployeeRes, removeEmployeeErr]);

  const { checkHasAccountResponse, checkHasAccountAction } =
    CheckHasAccountService();

  useEffect(() => {
    if (item) {
      checkHasAccountAction(item.id);
    }
  }, [item]);

  useEffect(() => {
    if (checkHasAccountResponse !== null) {
      if (checkHasAccountResponse) {
        setHasAccount("Có");
      } else {
        setHasAccount("Không");
      }
    }
  }, [checkHasAccountResponse]);

  const openEditEmployeeHandler = () => {
    setEditEmployeeIsOpen(true);
  };

  const closeEditEmployeeHandler = () => {
    setEditEmployeeIsOpen(false);
  };

  const openAccountEmployeeHandler = () => {
    setAccountEmployeeIsOpen(true);
  };

  const closeAccountEmployeeHandler = () => {
    setAccountEmployeeIsOpen(false);
  };

  const afterRegisterHandler = () => {
    setHasAccount("Có");
    closeAccountEmployeeHandler();
  };

  const afterChangePassHandler = () => {
    closeAccountEmployeeHandler();
  };

  const closeRemoveHandler = () => {
    setRemoveIsOpen(false);
  };

  const removeEmployeeHandler = () => {
    removeEmployeeAction(item.id);
  };

  return (
    <tr>
      {editEmployeeIsOpen && (
        <Modal
          title="Sửa nhân viên"
          size="xm"
          body={
            <EditEmployeeForm
              item={item}
              afterUpdateAction={() => {
                afterUpdateAction();
                setEditEmployeeIsOpen(false);
              }}
            />
          }
          onClose={closeEditEmployeeHandler}
        />
      )}
      {removeIsOpen && (
        <RemoveDataModal
          onClose={closeRemoveHandler}
          onAccept={removeEmployeeHandler}
        />
      )}
      {accountEmployeeIsOpen && (
        <Modal
          title="Tài khoản nhân viên"
          size="xm"
          body={
            <AccountManager
              employeeId={item.id}
              afterRegisterAction={afterRegisterHandler}
              afterChangePassAction={afterChangePassHandler}
            />
          }
          onClose={closeAccountEmployeeHandler}
        />
      )}
      <td className="border-b border-blue-gray-50 py-3 px-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          {item.fullName}
        </Typography>
      </td>
      <td className="border-b border-blue-gray-50 py-3 px-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          {item.email}
        </Typography>
      </td>
      <td className="border-b border-blue-gray-50 py-3 px-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          {day + "/" + month + "/" + year}
        </Typography>
      </td>
      <td className="border-b border-blue-gray-50 py-3 px-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          {item.gender ? "Nam" : "Nữ"}
        </Typography>
      </td>
      <td className="border-b border-blue-gray-50 py-3 px-4">
        <Chip
          value={item.active ? "Đang làm việc" : "Đã nghỉ"}
          color={item.active ? "green" : "blue-gray"}
        />
      </td>
      <td className="border-b border-blue-gray-50 py-3 px-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          {item.warehouse.name}
        </Typography>
      </td>
      <td className="border-b border-blue-gray-50 py-3 px-4">
        <Chip
          value={hasAccount}
          color={hasAccount === "Có" ? "blue" : "blue-gray"}
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
            openEditEmployeeHandler();
          }}
        >
          Sửa
        </Typography>
        <Typography
          as="a"
          href="#"
          variant="small"
          color="red"
          className="font-medium"
          onClick={(e) => {
            e.preventDefault();
            setRemoveIsOpen(true);
          }}
        >
          Xóa
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
            openAccountEmployeeHandler(true);
          }}
        >
          Tùy chỉnh
        </Typography>
      </td>
    </tr>
  );
};

export default EmployeeItem;
