import React, { useEffect, useState } from "react";
import {
  CardHeader,
  CardBody,
  Typography,
  Input,
  Button,
  CardFooter,
} from "@material-tailwind/react";
import ErrorInputMessage from "@/components/UI/ErrorInputMessage";
import { useFormik } from "formik";
import * as Yup from "yup";
import { RequestChangePassService } from "@/service/AccountService";
import { toast } from "react-toastify";
import Resetpassword from "./ResetPassWord";

const Schema = Yup.object().shape({
  username2: Yup.string().required("Tên đăng nhập không được để trống !"),
});

const initialValues = {
  username2: "",
};

const ForgetPass = () => {
  const [step, setStep] = useState(1);
  const {
    requestResetPassRes,
    requestResetPassErr,
    requestResetPassIsLoading,
    requestResetPassAction,
  } = RequestChangePassService();

  useEffect(() => {
    if (requestResetPassRes) {
      toast.success(requestResetPassRes, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setStep(2);
    } else if (requestResetPassErr) {
      toast.error(requestResetPassErr.data, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }, [requestResetPassRes, requestResetPassErr]);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Schema,
    onSubmit: (values) => {
      requestResetPassAction({ username2: values.username2 });
    },
  });

  if (step === 2) {
    return (
      <Resetpassword
        switchToRequest={() => {
          setStep(1);
        }}
      />
    );
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <CardHeader
        variant="gradient"
        color="blue"
        className="mb-4 grid h-28 place-items-center"
      >
        <Typography variant="h3" color="white">
          Quên mật khẩu
        </Typography>
      </CardHeader>
      <CardBody className="flex flex-col gap-4">
        <Input
          type="text"
          label="Tên tài khoản"
          size="lg"
          id="username2"
          name="username2"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username2}
        />
        {formik.touched.username2 && formik.errors.username2 ? (
          <ErrorInputMessage value={formik.errors.username2} />
        ) : null}
      </CardBody>
      <CardFooter className="pt-0">
        <Button
          variant="gradient"
          fullWidth
          type="submit"
          disabled={requestResetPassIsLoading}
        >
          {requestResetPassIsLoading ? "Loading..." : "Xác nhận"}
        </Button>
      </CardFooter>
    </form>
  );
};

export default ForgetPass;
