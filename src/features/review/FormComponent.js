import React, { useEffect } from "react";
import { Alert } from "@mui/material";
import { Stack } from "@mui/system";

import { FDatePicker, FSelect, FTextField } from "../../components/form";
import {
  ATTITUDE_SCORE,
  EXTENSION_TIME,
  REVIEW_DECISION,
  WORK_QUALITY_SCORE,
} from "./config";
import { useDispatch, useSelector } from "react-redux";
import { getPaperworkList } from "../paperwork/paperworkSlice";
import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { getEmployeeList } from "../employee/employeeSlice";

function FormComponent({ methods }) {
  const dispatch = useDispatch();
  const auth = useAuth();
  const params = useParams();
  const {
    formState: { errors },
    watch,
  } = methods;

  const { employeeList } = useSelector((state) => state.employee);

  let managerList = employeeList.filter(
    (employee) =>
      employee.role === "Manager" ||
      ("Admin" && employee.employmentStatus === "Active")
  );
  const { paperworkList } = useSelector((state) => state.paperwork);

  useEffect(() => {
    dispatch(getPaperworkList({ id: params.id, type: "review" }));
    dispatch(getEmployeeList({}));
  }, [dispatch, params, auth]);

  const decisionResult = watch("reviewDecision");

  return (
    <Stack direction="column" spacing={2}>
      {!!errors.responseError && (
        <Alert severity="info">{errors.responseError.message}</Alert>
      )}

      <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
        <FSelect name="reviewer" label="Reviewer">
          <option value={undefined}></option>
          {managerList.map((person) => {
            return (
              <option key={person._id} value={person._id}>
                {person.name}
              </option>
            );
          })}
        </FSelect>
        <FTextField name="reviewee" label="Reviewee" disabled />
      </Stack>

      <FTextField name="reviewTitle" label="Review Title" />

      <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
        <FDatePicker name="reviewDate" label="ReviewDate" />
        <FSelect
          name="paperworkId"
          label="Related Paperwork"
          disabled={auth.user.role !== "Admin" ? true : false}
        >
          <option value={undefined}></option>
          {paperworkList.map((paperwork) => {
            return (
              <option key={paperwork._id} value={paperwork._id}>
                {paperwork.paperworkTitle}
              </option>
            );
          })}
        </FSelect>
      </Stack>

      <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
        <FSelect name="attitude" label="Attitude Score">
          {ATTITUDE_SCORE.map((score) => {
            return (
              <option key={score} value={score}>
                {score}
              </option>
            );
          })}
        </FSelect>

        <FSelect name="workQuality" label="Work Quality Score">
          {WORK_QUALITY_SCORE.map((score) => {
            return (
              <option key={score} value={score}>
                {score}
              </option>
            );
          })}
        </FSelect>
      </Stack>

      <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
        <FSelect name="reviewDecision" label="Review Decision">
          <option value={undefined}></option>
          {REVIEW_DECISION.map((score) => {
            return (
              <option key={score} value={score}>
                {score}
              </option>
            );
          })}
        </FSelect>
        <FSelect
          name="extendTime"
          label="Extension Time"
          disabled={decisionResult === "Extend" ? false : true}
        >
          <option value={undefined}></option>
          {EXTENSION_TIME.map((score) => {
            return (
              <option key={score} value={score}>
                {score}
              </option>
            );
          })}
        </FSelect>
      </Stack>
      <FTextField name="improvement" label="Improvement" />
    </Stack>
  );
}

export default FormComponent;
