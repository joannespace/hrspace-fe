import * as yup from "yup";

// export const REVIEW_FORM_HEADERS = [
//   {
//     name: "reviewName",
//     label: "Review Title",
//     type: "text",
//   },
//   {
//     name: "reviewer",
//     label: "Reviewer",
//     type: "select",
//   },
//   {
//     name: "reviewee",
//     label: "Reviewee",
//     type: "select",
//   },
//   {
//     name: "paperworkId",
//     label: "Related Paperwork",
//     type: "select",
//   },
//   {
//     name: "reviewDate",
//     label: "Review Date",
//     type: "date",
//   },

//   {
//     name: "attitude",
//     label: "Attitude",
//     type: "number",
//   },
//   {
//     name: "workQuality",
//     label: "Work Quality",
//     type: "number",
//   },
//   {
//     name: "reviewDecision",
//     label: "Review Decision",
//     type: "text",
//   },
//   {
//     name: "extendTime",
//     label: "Extension Time",
//     type: "text",
//   },
// ];

export const REVIEW_DECISION = ["Pending", "Pass", "Extend", "Renew"];

export const EXTENSION_TIME = ["1 month", "2 months"];

export const ATTITUDE_SCORE = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export const WORK_QUALITY_SCORE = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export const REVIEW_SCHEMA = yup.object({
  reviewName: yup
    .string("Invalid Reviewer Title")
    .required("Reviewer Title is required"),
  reviewer: yup
    .string("Invalid Reviewer ID")
    .required("Reviewer ID is required"),
  reviewee: yup
    .string("Invalid Reviewee ID")
    .required("Reviewee ID is required"),
  reviewDate: yup
    .date("Invalid Review Date")
    .required("Review date is required"),
  paperworkId: yup
    .string("Invalid Paperwork ID")
    .required("Paperwork ID is required"),
  attitude: yup
    .number("Attitude score must be a number")
    .required("Attitude score is required")
    .oneOf(ATTITUDE_SCORE),
  workQuality: yup
    .number("Work quality score must be a number")
    .required("Work quality score is required")
    .oneOf(WORK_QUALITY_SCORE),
  reviewDecision: yup
    .string("Invalid Review Decision")
    .required("Review decision is required")
    .oneOf(REVIEW_DECISION),
  extendTime: yup.string("Invalid Extend Time"),
  improvement: yup.string("Invalid Improvement Input"),
});
