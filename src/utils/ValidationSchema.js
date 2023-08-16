import * as Yup from "yup";

const phoneRegex = RegExp(/(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/);

export const SigninSchema = Yup.object().shape({
  username: Yup.string().required("Tên đăng nhập không được để trống !"),
  password: Yup.string().required("Mật khẩu không được để trống !"),
});

export const ResetPassSchema = Yup.object().shape({
  resetToken: Yup.string().required("Mã khôi phục không được để trống !"),
  password2: Yup.string().required("Mật khẩu không được để trống !"),
});

export const NewEmployeeSchema = Yup.object().shape({
  fullName: Yup.string().required("Tên nhân viên không được trống !"),
  email: Yup.string()
    .email("Không đúng định dạng email !")
    .required("Email nhân viên không được trống !"),
});

export const NewWarehouseSchema = Yup.object().shape({
  name: Yup.string().required("Tên kho không được trống !"),
  additionAddress: Yup.string().required("Địa chỉ bổ sung không được trống !"),
});

export const NewPartnerSchema = Yup.object().shape({
  name: Yup.string().required("Tên đối tác không được trống !"),
  phone: Yup.string()
    .matches(phoneRegex, "Số điện thoại không hợp lệ")
    .required("Số điện thoại không được để trống"),
});

export const UpdateAccountSchema = Yup.object().shape({
  re_password: Yup.string().required("Mật khẩu cũ không được để trống"),
  re_password2: Yup.string().required("Mật khẩu mới không được để trống !"),
});

export const NewProductSchema = Yup.object().shape({
  name: Yup.string().required("Tên kho không được trống !"),
  weight: Yup.number()
    .typeError("Hãy điền định dạng số !")
    .positive("Cân nặng không hợp lệ !")
    .required("Cân nặng không được để trống !"),
  price: Yup.number()
    .typeError("Hãy điền định dạng số !")
    .positive("Giá không hợp lệ !")
    .required("Giá không được để trống !"),
});

export const NewSupplierSchema = Yup.object().shape({
  name: Yup.string().required("Tên nhà cung cấp không được trống !"),
  phone: Yup.string()
    .matches(phoneRegex, "Số điện thoại không hợp lệ")
    .required("Số điện thoại không được để trống"),
});

export const NewCustomerSchema = Yup.object().shape({
  name: Yup.string().required("Tên khách hàng không được trống !"),
  phone: Yup.string()
    .matches(phoneRegex, "Số điện thoại không hợp lệ")
    .required("Số điện thoại không được để trống"),
  email: Yup.string()
    .email("Không đúng định dạng email !")
    .required("Email nhân viên không được trống !"),
});
