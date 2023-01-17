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

export const ATTITUDE_SCORE = [undefined, 1, 2, 3, 4, 5, 6, 7, 8, 9];

export const WORK_QUALITY_SCORE = [undefined, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const minReviewDate = new Date(Date.now() + 1000 * 60 * 60 * 24);

export const REVIEW_SCHEMA = yup.object({
  reviewTitle: yup
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
    .required("Review date is required")
    .max(minReviewDate, "Review date must be today or previous days"),
  paperworkId: yup
    .string("Invalid Paperwork ID")
    .required("Paperwork ID is required"),
  attitude: yup.number("Attitude score must be a number").oneOf(ATTITUDE_SCORE),
  workQuality: yup
    .number("Work quality score must be a number")
    .oneOf(WORK_QUALITY_SCORE),
  reviewDecision: yup.string("Invalid Review Decision").oneOf(REVIEW_DECISION),
  extendTime: yup.string("Invalid Extend Time"),
  improvement: yup.string("Invalid Improvement Input"),
});
