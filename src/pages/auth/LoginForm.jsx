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
import { SigninSchema } from "@/utils/ValidationSchema";
import { LoginService } from "@/service/AuthService";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { authActions } from "@/store";
import { useNavigate } from "react-router-dom";
import ErrorInputMessage from "@/components/UI/ErrorInputMessage";

const initialValues = {
  username: "",
  password: "",
};

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loginResponse, loginError, loginIsLoading, loginAction } =
    LoginService();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch(authActions.clearUser());
    }
  }, []);

  useEffect(() => {
    if (loginError) {
      toast.error(loginError.data + " !", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else if (loginResponse) {
      dispatch(authActions.login({ employee: loginResponse }));
      navigate("/dashboard/home");
    }
  }, [loginResponse, loginError]);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: SigninSchema,
    onSubmit: (values) => {
      loginAction(values);
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
          Đăng nhập
        </Typography>
      </CardHeader>
      <CardBody className="flex flex-col gap-4">
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
      </CardBody>
      <CardFooter className="pt-0">
        <Button
          variant="gradient"
          fullWidth
          type="submit"
          disabled={loginIsLoading}
        >
          {loginIsLoading ? "Loading..." : "Đăng nhập"}
        </Button>
      </CardFooter>
    </form>
  );
};

export default LoginForm;
