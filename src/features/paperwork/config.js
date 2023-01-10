import * as yup from "yup";

export const PAPERWORK_TYPES = [
  "Intern",
  "Probation",
  "Full-time",
  "Part-time",
];
export const PAPERWORK_STATUS = ["Pending", "Generated", "Signed"];

// const minLastDay = new Date(Date.now() - 1000 * 60 * 60 * 24 * 365 * 18);
export const PAPERWORK_SCHEMA = yup.object({
  startDate: yup.date("Invalid Fullname").required("Start date is required"),
  lastDate: yup.date("Invalid Fullname").required("Last date is required"),
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
});

export function generateOptionsList(currentEmployee) {
  const employeeKeys = Object.keys(currentEmployee);

  const richTextOptions = employeeKeys.map((key) => {
    return { label: key, value: currentEmployee[key] };
  });

  return richTextOptions;
}
