import * as yup from "yup";
export const TEMPLATE_CATEGORY = [
  "Intern",
  "Probation",
  "Part-time",
  "Full-time",
];

export const TEMPLATE_SCHEMA = yup.object({
  templateName: yup
    .string("Invalid Template Name")
    .required("Template name is required"),
  category: yup
    .string("Invalid Category")
    .oneOf(TEMPLATE_CATEGORY)
    .required("Category is required"),
  creator: yup.string("Invalid Creator").required("Creator name is required"),
  content: yup.string("Invalid Content").required("Content is required"),
});
