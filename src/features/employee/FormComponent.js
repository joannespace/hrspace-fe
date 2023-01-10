import React, { useState } from "react";
import { useSelector } from "react-redux";

import { IconButton, InputAdornment, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { FDatePicker, FSelect, FTextField } from "../../components/form";

import {
  COMPANY_DEPARTMENT,
  EMPLOYEE_ROLES,
  EMPLOYEE_TYPES,
  PROVINCES,
} from "./config";

function FormComponent({ type = undefined }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showSalary, setShowSalary] = useState(false);

  const { employeeList } = useSelector((state) => state.employee);

  let managerList = employeeList.filter(
    (employee) =>
      employee.role === "Manager" && employee.employmentStatus === "Active"
  );

  return (
    <Stack spacing={2}>
      <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
        <FTextField label="Fullname" name="name" />
        <FTextField label="Company" name="company" disabled />
      </Stack>

      <Typography
        variant="h6"
        fontWeight="600"
        color="success.darker"
        textAlign="center"
        width={1}
      >
        Work information
      </Typography>
      <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
        <FSelect label="Role" name="role">
          <option value=""> </option>
          {EMPLOYEE_ROLES.map((role) => {
            return (
              <option key={role} value={role}>
                {role}
              </option>
            );
          })}
        </FSelect>
        <FTextField label="Email" name="email" type="email" />
        <FTextField
          label="Password"
          name="password"
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ display: type ? "block" : "none" }}
        />
        <FDatePicker name="onboardDate" label="Onboarding Date" />
      </Stack>

      <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
        <FTextField label="Title" name="title" type="text" />
        <FSelect label="Employment Status" name="employmentStatus">
          <option value="Active">Active</option>
          <option value="Resigned">Resigned</option>
        </FSelect>
        <FSelect label="Employment Type" name="employmentType">
          {EMPLOYEE_TYPES.map((type) => {
            return (
              <option key={type} value={type}>
                {type}
              </option>
            );
          })}
        </FSelect>
      </Stack>

      <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
        <FSelect label="Department" name="department">
          <option value={""}> </option>
          {COMPANY_DEPARTMENT.map((dep) => {
            return (
              <option key={dep} value={dep}>
                {dep}
              </option>
            );
          })}
        </FSelect>

        <FSelect label="Line Manager" name="lineManager">
          <option value={""}> </option>
          {managerList.map((employee) => {
            return (
              <option key={employee._id} value={employee._id}>
                {employee.name}
              </option>
            );
          })}
        </FSelect>
        <FTextField
          label="Gross Salary"
          name="grossSalary"
          type={showSalary ? "number" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowSalary(!showSalary)}
                  edge="end"
                >
                  {showSalary ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Typography
        variant="h6"
        fontWeight="600"
        color="success.darker"
        textAlign="center"
        width={1}
      >
        Personal information
      </Typography>
      <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
        <FSelect label="Gender" name="gender">
          <option value="Female">Female</option>
          <option value="Male">Male</option>
        </FSelect>
        <FDatePicker label="Birthday" name="birthday" />
        <FTextField label="Phone Number" name="phone" type="text" />
      </Stack>

      <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
        <FTextField label="Personal Email" name="personalEmail" type="email" />
        <FTextField label="Permanent Address" name="permanentAdd" type="text" />
        <FSelect label="City/Province Address" name="perAddCity">
          <option value={""}> </option>
          {PROVINCES.map((province) => {
            return (
              <option key={province} value={province}>
                {province}
              </option>
            );
          })}
        </FSelect>
      </Stack>
    </Stack>
  );
}

export default FormComponent;
