import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { FormProvider, FTextField } from "../../components/form";
import BtnGroupView from "./BtnGroupView";
import { EMPLOYEE_INFO_SCHEMA } from "./config";

function EmployeeInformation() {
  let defaultValues = { name: "Hello" };
  const methods = useForm({
    defaultValues,
  });

  const { handleSubmit } = methods;
  const onSubmit = () => {
    console.log("On Submit");
  };
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <FTextField name="name" label="Name" />
      <BtnGroupView />
    </FormProvider>
  );
}

export default EmployeeInformation;
