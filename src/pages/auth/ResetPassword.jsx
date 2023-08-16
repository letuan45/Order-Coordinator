import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useEffect } from "react";
import { useFormik } from "formik";
import { ResetPassSchema } from "@/utils/ValidationSchema";
import { LoginService } from "@/service/AuthService";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { authActions } from "@/store";
import { useNavigate } from "react-router-dom";
import ErrorInputMessage from "@/components/UI/ErrorInputMessage";
import { ResetPasswordService } from "@/service/AccountService";

const initialValues = {
  resetToken: "",
  password2: "",
};

const Resetpassword = ({switchToRequest}) => {
  const {
    resetPasswordRes,
    resetPasswordErr,
    resetPasswordIsLoading,
    resetPasswordAction,
  } = ResetPasswordService();

  useEffect(() => {
    if (resetPasswordRes) {
      toast.success("Đặt lại mật khẩu thành công !", {
        position: toast.POSITION.TOP_RIGHT,
      });
      switchToRequest();
    } else if (resetPasswordErr) {
      toast.error("Đặt lại mật khẩu thất bại !", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }, [resetPasswordRes, resetPasswordErr]);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: ResetPassSchema,
    onSubmit: (values) => {
      resetPasswordAction({
        resetToken: values.resetToken,
        newPassword: values.password2,
      });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <CardHeader
        variant="gradient"
        color="blue"
        className="mb-4 grid h-28 place-items-center"
      >
        <Typography variant="h3" color="white">
          Đặt lại mật khẩu
        </Typography>
      </CardHeader>
      <CardBody className="flex flex-col gap-4">
        <Input
          type="text"
          label="Mã khôi phục từ email"
          size="lg"
          id="resetToken"
          name="resetToken"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.resetToken}
        />
        {formik.touched.resetToken && formik.errors.resetToken ? (
          <ErrorInputMessage value={formik.errors.resetToken} />
        ) : null}
        <Input
          type="password"
          label="Mật khẩu mới"
          size="lg"
          id="password2"
          name="password2"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password2}
        />
        {formik.touched.password2 && formik.errors.password2 ? (
          <ErrorInputMessage value={formik.errors.password2} />
        ) : null}
      </CardBody>
      <CardFooter className="pt-0">
        <Button
          variant="gradient"
          fullWidth
          type="submit"
          disabled={resetPasswordIsLoading}
        >
          {resetPasswordIsLoading ? "Loading..." : "Xác nhận"}
        </Button>
      </CardFooter>
    </form>
  );
};

export default Resetpassword;
