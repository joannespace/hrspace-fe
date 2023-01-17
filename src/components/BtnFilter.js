import React from "react";
import { useForm } from "react-hook-form";

import { Button, Popover, Tooltip, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Stack } from "@mui/system";
import TuneIcon from "@mui/icons-material/Tune";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { FMultiCheckbox, FormProvider } from "./form";

function BtnFilter({
  submitType,
  setDefaultValues,
  defaultValues,
  filterList,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  let filterKeys = Object.keys(defaultValues);

  let valueKeys = []; //New
  filterKeys.forEach((key) => {
    if (defaultValues[key].length > 0) {
      return (valueKeys = [...valueKeys, [key]]);
    }
    return;
  });

  let resetValues =
    submitType === "employeeList"
      ? {
          employmentStatus: [],
          department: [],
          employmentType: [],
        }
      : submitType === "reviewList"
      ? { reviewDecision: [] }
      : {
          category: [],
          creator: [],
        };

  const methods = useForm({ defaultValues });

  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = methods;

  const onSubmit = (data) => {
    setDefaultValues(data);
    handleClose();
  };

  const handleReset = () => {
    reset(resetValues);
    setDefaultValues(resetValues);
    handleClose();
  };

  return (
    <>
      <Tooltip title="Filter employees">
        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          sx={{ position: "relative" }}
        >
          <TuneIcon fontSize="large" color="primary" />
          {valueKeys.length > 0 ? (
            <CheckCircleIcon
              fontSize="small"
              color="success"
              sx={{ position: "absolute", right: 10, bottom: 0 }}
            />
          ) : (
            <></>
          )}
        </Button>
      </Tooltip>
      <Popover
        id={open ? "filter-popover" : undefined}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Stack m={3} sx={{ display: "flex" }}>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            {filterList.map((filter) => {
              return (
                <div key={filter.title}>
                  <Typography variant="h6" fontWeight={600} color="primary">
                    {filter.title}
                  </Typography>

                  <FMultiCheckbox name={filter.name} options={filter.options} />
                </div>
              );
            })}
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              loading={isSubmitting}
            >
              Submit
            </LoadingButton>

            <LoadingButton
              type="button"
              fullWidth
              variant="outlined"
              loading={isSubmitting}
              sx={{ mt: 1 }}
              onClick={handleReset}
            >
              Reset
            </LoadingButton>
          </FormProvider>
        </Stack>
      </Popover>
    </>
  );
}

export default BtnFilter;
