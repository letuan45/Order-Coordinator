import React, { useEffect, useState } from "react";
import { Input, Select, Option, Button } from "@material-tailwind/react";
import { useFormik } from "formik";
import { SigninSchema } from "@/utils/ValidationSchema";
import ErrorInputMessage from "@/components/UI/ErrorInputMessage";
import { GetAllRole, RegiserService } from "@/service/AccountService";
import { toast } from "react-toastify";
import { CheckHasAccountService } from "@/service/EmployeeService";

const initialValues = {
  username: "",
  password: "",
};

const RegisterForm = ({ employeeId, afterAction }) => {
  const { getAllRoleRes, getAllRoleError } = GetAllRole();
  const [renderRoles, setRenderRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const { registerRes, registerErr, registerIsLoading, registerAction } =
    RegiserService();

  const { checkHasAccountResponse, checkHasAccountAction } =
    CheckHasAccountService();

  useEffect(() => {
    checkHasAccountAction(employeeId);
  }, []);

  useEffect(() => {
    if (registerRes) {
      toast.success("Cấp tài khoản thành công!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      afterAction();
    } else if (registerErr) {
      console.log(registerErr);
      toast.error(registerErr.data, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }, [registerRes, registerErr]);

  useEffect(() => {
    if (getAllRoleError) {
      toast.error("Không lấy được danh sách quyền!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else if (getAllRoleRes) {
      setRenderRoles(getAllRoleRes);
    }
  }, [getAllRoleRes, getAllRoleError]);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: SigninSchema,
    onSubmit: (values) => {
      if (!selectedRole) {
        toast.error("Hãy phân quyền cho tài khoản!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        return;
      }
      const data = { ...values };
      const params = { roleId: selectedRole, employeeId: employeeId };
      registerAction({ data: data, params: params });
    },
  });

  if (checkHasAccountResponse === true) {
    return <p className="text-center">Nhân viên này đã có tài khoản!</p>;
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="my-2">
        <Input
          type="text"
          label="Tên tài khoản"
          size="lg"
          id="username"
          name="username"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
        />
        {formik.touched.username && formik.errors.username ? (
          <ErrorInputMessage value={formik.errors.username} />
        ) : null}
      </div>
      <div className="my-2">
        <Input
          type="password"
          label="Mật khẩu"
          size="lg"
          id="password"
          name="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password ? (
          <ErrorInputMessage value={formik.errors.password} />
        ) : null}
      </div>
      {renderRoles.length > 0 && (
        <div className="my-2">
          <Select label="Phân quyền" onChange={(e) => setSelectedRole(e)}>
            {renderRoles.map((item) => (
              <Option value={item.id + ""} key={item.id}>
                {item.name}
              </Option>
            ))}
          </Select>
        </div>
      )}
      <div className="flex w-full justify-center">
        <Button type="submit" disabled={registerIsLoading}>
          {registerIsLoading ? "Loading..." : "Tạo tài khoản"}
        </Button>
      </div>
    </form>
  );
};

export default RegisterForm;
