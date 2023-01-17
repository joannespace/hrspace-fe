import * as yup from "yup";
import { fDate } from "../../utils/formatTime";

export const EMPLOYEE_ROLES = ["Admin", "Manager", "Employee"];

export const EMPLOYEE_TYPES = ["Intern", "Probation", "Full-time", "Part-time"];

export const COMPANY_DEPARTMENT = [
  "Sales",
  "Marketing",
  "Engineering",
  "Human Resources",
  "Finance",
  "Management",
];

export const PROVINCES = [
  "An Giang",
  "Bà Rịa-Vũng Tàu",
  "Bạc Liêu",
  "Bắc Kạn",
  "Bắc Giang",
  "Bắc Ninh",
  "Bến Tre",
  "Bình Dương",
  "Bình Định",
  "Bình Phước",
  "Bình Thuận",
  "Cà Mau",
  "Cao Bằng",
  "Cần Thơ",
  "Đà Nẵng",
  "Đắk Lắk",
  "Đắk Nông",
  "Điện Biên",
  "Đồng Nai",
  "Đồng Tháp",
  "Gia Lai",
  "Hà Giang",
  "Hà Nam",
  "Hà Nội",
  "Hà Tây",
  "Hà Tĩnh",
  "Hải Dương",
  "Hải Phòng",
  "Hòa Bình",
  "TP. Hồ Chí Minh",
  "Hậu Giang",
  "Hưng Yên",
  "Khánh Hòa",
  "Kiên Giang",
  "Kon Tum",
  "Lai Châu",
  "Lào Cai",
  "Lạng Sơn",
  "Lâm Đồng",
  "Long An",
  "Nam Định",
  "Nghệ An",
  "Ninh Bình",
  "Ninh Thuận",
  "Phú Thọ",
  "Phú Yên",
  "Quảng Bình",
  "Quảng Nam",
  "Quảng Ngãi",
  "Quảng Ninh",
  "Quảng Trị",
  "Sóc Trăng",
  "Sơn La",
  "Tây Ninh",
  "Thái Bình",
  "Thái Nguyên",
  "Thanh Hóa",
  "Thừa Thiên Huế",
  "Tiền Giang",
  "Trà Vinh",
  "Tuyên Quang",
  "Vĩnh Long",
  "Vĩnh Phúc",
  "Yên Bái",
];

export const maxBirthday = new Date(
  Date.now() - 1000 * 60 * 60 * 24 * 365 * 18
);

export const EMPLOYEE_INFO_SCHEMA = yup.object({
  name: yup.string("Invalid Fullname").required("Fullname is required"),
  email: yup.string().email("Invalid Email").required("Email is required"),
  role: yup.string("Invalid Role").required("Role is required"),
  company: yup.string("Invalid Company").required("Company is required"),
  password: yup.string().min(8, "Password must be at least 8 characters"),
  onboardDate: yup.date("Invalid Date").required("Onboarding Date is required"),
  title: yup.string("Invalid Title").required("Title is required"),
  employmentStatus: yup
    .string("Invalid Employment Status")
    .required("Employment Status is required")
    .oneOf(["Active", "Resigned"]),
  employmentType: yup
    .string("Invalid Employment Type")
    .required("Employment Type is required")
    .oneOf(EMPLOYEE_TYPES),
  department: yup
    .string("Invalid Department")
    .required("Department is required")
    .oneOf(COMPANY_DEPARTMENT),
  lineManager: yup
    .string("Invalid Line Manager")
    .required("Line Manager is required"),
  grossSalary: yup.number("Invalid Salary"),
  gender: yup
    .string("Invalid Gender")
    .required("Gender is required")
    .oneOf(["Male", "Female"]),
  birthday: yup
    .date("Invalid Date")
    .required("Birthday is required")
    .max(maxBirthday, `Birthday must be before ${fDate(maxBirthday)}`),
  phone: yup
    .number("Invalid Phone Number")
    .required("Phone Number is required")
    .min(9, "Phone number must be at least 9 numbers"),
  personalEmail: yup.string().email("Invalid Email"),
  permanentAdd: yup
    .string("Invalid Permanent Address")
    .required("Permanent Address is required"),
  perAddCity: yup
    .string("Invalid Permanent City Adress")
    .required("Permanent Address is required"),
});

export function generateFilterList() {
  return [
    {
      title: "Employment Status",
      name: "employmentStatus",
      options: ["Active", "Resigned"],
    },
    {
      title: "Department",
      name: "department",
      options: COMPANY_DEPARTMENT,
    },
    {
      title: "Employment Type",
      name: "employmentType",
      options: EMPLOYEE_TYPES,
    },
  ];
}
