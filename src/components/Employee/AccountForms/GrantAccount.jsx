import React, { useState, useEffect } from "react";
import { GetAllRole, GrantUserRole } from "@/service/AccountService";
import { CheckHasAccountService } from "@/service/EmployeeService";
import { GetRoleByEmployee } from "@/service/AccountService";
import { toast } from "react-toastify";
import { Select, Option, Button } from "@material-tailwind/react";
import { useSelector } from "react-redux";

const GrantAccount = ({ employeeId, afterGrantAction }) => {
  const user = useSelector((state) => state.auth.user);
  const isNotAlowedGrant = user && user.employee.id === employeeId;
  const [renderRoles, setRenderRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const { getAllRoleRes, getAllRoleError } = GetAllRole();
  const { checkHasAccountResponse, checkHasAccountAction } =
    CheckHasAccountService();
  const {
    getRoleByEmployeeRes,
    getRoleByEmployeeErr,
    getRoleByEmployeeAction,
  } = GetRoleByEmployee();
  const {
    grantUserRoleRes,
    grantUserRoleErr,
    grantUserRoleIsLoading,
    changeUserRoleAction,
  } = GrantUserRole();

  useEffect(() => {
    checkHasAccountAction(employeeId);
  }, []);

  useEffect(() => {
    if (getRoleByEmployeeRes) {
      setSelectedRole(getRoleByEmployeeRes.id);
    }
  }, [getRoleByEmployeeRes, getRoleByEmployeeErr]);

  useEffect(() => {
    if (checkHasAccountResponse === true) {
      getRoleByEmployeeAction(employeeId);
    }
  }, [checkHasAccountResponse]);

  useEffect(() => {
    if (grantUserRoleRes) {
      toast.success("Thay đổi quyền tài khoản thành công!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      afterGrantAction();
    } else if (grantUserRoleErr) {
      toast.error("Thay đổi quyền thất bại!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }, [grantUserRoleRes, grantUserRoleErr]);

  useEffect(() => {
    if (getAllRoleError) {
      toast.error("Không tải được danh sách quyền!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else if (getAllRoleRes) {
      setRenderRoles(getAllRoleRes);
    }
  }, [getAllRoleRes, getAllRoleError]);

  if (checkHasAccountResponse === false) {
    return <p className="text-center">Nhân viên không có tài khoản</p>;
  }

  const submitGrantHandler = (e) => {
    e.preventDefault();
    if(isNotAlowedGrant) {
      toast.error("Không thể phân quyền trên tài khoản của bạn", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    const data = { employeeId: employeeId, roleId: selectedRole };
    changeUserRoleAction(data);
  };

  return (
    <form onSubmit={submitGrantHandler}>
      {renderRoles.length > 0 && (
        <div className="mt-2 mb-12 w-full">
          <Select
            label="Phân quyền"
            onChange={(e) => setSelectedRole(e)}
            value={selectedRole + ""}
          >
            {renderRoles.map((item) => (
              <Option value={item.id + ""} key={item.id}>
                {item.name}
              </Option>
            ))}
          </Select>
        </div>
      )}
      <div
        className="flex w-full justify-center"
        disabled={grantUserRoleIsLoading}
      >
        <Button type="submit">
          {grantUserRoleIsLoading ? "Loading..." : "Xác nhận"}
        </Button>
      </div>
    </form>
  );
};

export default GrantAccount;
