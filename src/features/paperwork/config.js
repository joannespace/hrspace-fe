import * as yup from "yup";

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

export function generateOptionsList(currentEmployee) {
  let employeeKeys = Object.keys(currentEmployee);
  const removeKeys = ["company", "lineManager", "paperwork", "review"];

  employeeKeys.forEach((key) => {
    if (removeKeys.includes(key)) {
      const index = employeeKeys.indexOf(key);
      employeeKeys.splice(index, 1);
      return employeeKeys;
    }
  });

  let richTextOptions = employeeKeys.map((key) => {
    return { label: key, value: currentEmployee[key] };
  });

  return richTextOptions;
}
