import * as yup from "yup";
import { fDate } from "../../utils/formatTime";

export const PAPERWORK_TYPES = [
  "Intern",
  "Probation",
  "Full-time",
  "Part-time",
];
export const PAPERWORK_STATUS = ["Pending", "Generated", "Signed"];

export const PAPERWORK_SCHEMA = yup.object({
  paperworkTitle: yup
    .string("Invalid Paperwork Title")
    .required("Paperwork Title is required"),
  startDate: yup.date("Invalid Fullname").required("Start date is required"),
  lastDate: yup
    .date("Invalid Fullname")
    .required("Last date is required")
    .min(yup.ref("startDate"), `Last Date must be greater than start date`),
  paperworkType: yup
    .string("Invalid Paperwork Type")
    .required("Paperwork Type is required")
    .oneOf(PAPERWORK_TYPES),
  paperworkStatus: yup
    .string("Invalid Paperwork Status")
    .required("Paperwork Status is required")
    .oneOf(PAPERWORK_STATUS),
  employeeId: yup
    .string("Invalid Current Employee ID")
    .required("Employee ID is required"),
  reviewId: yup.string("Invalid Related Review"),
  templateId: yup.string("Invalid Template"),
  file: yup.object(),
  content: yup.string("Invalid Content"),
  reviewGenerated: yup.boolean("Invalid Request").default(true),
});

const labelUI = [
  { label: "_id", ui: "Employee Code" },
  { label: "name", ui: "Employee Name" },
  { label: "email", ui: "Email" },
  { label: "role", ui: "Employee Role" },
  { label: "company", ui: "Company Name" },
  { label: "onboardDate", ui: "Onboarding Date" },
  { label: "title", ui: "Employee Title" },
  { label: "employmentStatus", ui: "Employment Status" },
  { label: "employmentType", ui: "employment Type" },
  { label: "department", ui: "Department" },
  { label: "paperwork", ui: "Paperwork" },
  { label: "gender", ui: "Gender" },
  { label: "birthday", ui: "Birthday" },
  { label: "phone", ui: "Phone Number" },
  { label: "personalEmail", ui: "Personal Email" },
  { label: "permanentAdd", ui: "Permanent Address" },
  { label: "perAddCity", ui: "Residential City/ Province" },
];
export function generateOptionsList(currentEmployee) {
  let employeeKeys = Object.keys(currentEmployee);
  const removeKeys = [
    "paperwork",
    "review",
    "userGenerated",
    "lineManager",
    "password",
  ];

  removeKeys.forEach((item) => {
    if (employeeKeys.includes(item)) {
      const index = employeeKeys.findIndex((key) => key === item);
      employeeKeys.splice(index, 1);
    }
  });

  let richTextOptions = employeeKeys.map((key) => {
    if (key === "company") {
      return { label: key, value: currentEmployee[key].companyName };
    } else if (key === "onboardDate" || key === "birthday") {
      return { label: key, value: fDate(currentEmployee[key]) };
    } else {
      return { label: key, value: currentEmployee[key] };
    }
  });

  labelUI.forEach((obj) => {
    richTextOptions.forEach((opt) => {
      if (obj.label === opt.label) {
        opt.ui = obj.ui;
      }
    });
  });

  return richTextOptions;
}
