import { number, object, string } from "yup";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const signUpSchema = object({
  phone: string()
    // .length(10, "Số điện thoại không đúng")
    .matches(phoneRegExp, "Số điện thoại không đúng")
    .required(),
  password: string().min(8, "Mật khẩu phải tối thiểu 8 ký tự").required(),
  repassword: string().min(8, "Mật khẩu phải tối thiểu 8 ký tự").required(),
});

export const fillProfileSchema = object({
  fullname: string().required("Bạn phải điền đầy đủ tên"),
  age: number().min(18, "Bạn chưa đủ tuổi đăng ký ứng dụng").required("Tuổi không hợp lệ"),
  district: string().min(1, "Quận không hợp lệ").required(),
  ward: string().min(1, "Phường không hợp lệ").required(),
});

export function onInputChange<FieldType>(
  field: keyof FieldType,
  setDataForm: any,
  dataForm: FieldType
) {
  return function (value: any) {
    setDataForm({
      ...dataForm,
      [field]: value,
    });
  };
}
