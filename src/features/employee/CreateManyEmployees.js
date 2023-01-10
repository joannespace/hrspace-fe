import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { LoadingButton } from "@mui/lab";
import {
  Alert,
  Button,
  Container,
  Input,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";

import useAuth from "../../hooks/useAuth";
import { createManyEmployees } from "./employeeSlice";

function CreateManyEmployees({ setOpenDialog }) {
  const dispatch = useDispatch();
  const auth = useAuth();
  const [textValue, setTextValue] = useState();
  const [formData, setFormData] = useState();

  const handleUploadFile = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("file", formData);

    dispatch(createManyEmployees(data));

    setFormData();
    setTextValue();
    setOpenDialog(false);
  };

  return (
    <Container>
      <Stack spacing={3}>
        <Alert severity="info">
          Please notice to follow strictly the download file format, do not
          change any header titles
        </Alert>

        <Stack spacing={2}>
          <Typography>Step 1: Download the sample upload file</Typography>

          <Link
            href="https://drive.google.com/file/d/18hAkdIZL41keekRIt6k-FqLJI8beGlX7/view?usp=sharing"
            target="_blank"
            rel="noreferrer"
            align="center"
          >
            <Button variant="contained" sx={{ width: 0.5 }}>
              DOWNLOAD FILE
            </Button>
          </Link>
        </Stack>

        <Stack spacing={2}>
          <Typography>
            Step 2: Upload the template file filled with required content
          </Typography>

          <Stack spacing={2} alignItems="center">
            <Input
              type="text"
              value={textValue}
              sx={{ width: "50%" }}
              disabled
            />

            <Button
              variant="contained"
              fullWidth
              sx={{ width: 0.5, m: "auto", textAlign: "center" }}
              component="label"
            >
              UPLOAD FILE
              <form encType="multipart/form-data">
                <input
                  hidden
                  accept="text/csv"
                  type="file"
                  onChange={(e) => {
                    const newFile = e.target.files[0];
                    setTextValue(newFile.name);
                    setFormData(newFile);
                  }}
                />
              </form>
            </Button>
          </Stack>
        </Stack>

        <Stack spacing={2}>
          <Typography>
            Step 3: Submit your file and wait for its to load
          </Typography>

          {auth.user.role === "Admin" && (
            <Box display="flex">
              <LoadingButton
                variant="contained"
                component="label"
                sx={{ width: "50%", m: "auto" }}
                type="submit"
                onClick={(e) => handleUploadFile(e)}
              >
                Submit file
              </LoadingButton>
            </Box>
          )}
        </Stack>
      </Stack>
    </Container>
  );
}

export default CreateManyEmployees;
