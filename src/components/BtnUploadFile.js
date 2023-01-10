import React, { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import useDrivePicker from "react-google-drive-picker/dist";

import { GOOGLE_CLIENT_ID, SCOPE_APIS } from "../app/config";

function BtnUploadFile({
  type,
  handleSubmit = undefined,
  onChange = undefined,
}) {
  const [openPicker] = useDrivePicker();
  const [tokenClient, setTokenClient] = useState({});
  const [token, setToken] = useState("");

  useEffect(() => {
    const google = window.google;
    setTokenClient(
      google.accounts.oauth2.initTokenClient({
        client_id: GOOGLE_CLIENT_ID,
        scope: SCOPE_APIS,
        callback: (tokenResponse) => {
          console.log(tokenResponse);
          setToken(tokenResponse);
        },
      })
    );
  }, []);

  const handleOpenPicker = (e) => {
    if (!token) tokenClient.requestAccessToken();
    openPicker({
      clientId:
        "879752203865-kpc52vlmopu7s4b4u7gjn28clc8334ta.apps.googleusercontent.com",
      developerKey: "AIzaSyAfUrJ5li3jjQEdLznTrB9LiwRBcaW7MV8",
      token:
        "ya29.a0AX9GBdXEXu4PCmq3UBl9xqVXaQOkB2auYcI5CZuSz_3zM3B9Uv5n24q6TYUQKwxkA9zknhZRP52LodnMT5WiScyPIeRKoHx2Y0bokw57ISFmYPQO3CmIRl2SMNAewMFFfKXICsipYsBYnRijWhOXrTXJbEHqHhMaCgYKATcSAQASFQHUCsbCsbMPl3jOV_ZZv4XdDJJvtg0166",
      viewId: "DOCS",
      showUploadView: true,
      showUploadFolders: true,
      supportDrives: true,
      multiselect: true,
      callbackFunction: (data) => {
        if (data.action !== "cancel") {
          type === "newPaper"
            ? onChange(data.docs[0])
            : handleSubmit(data.docs[0]);
        } else {
          console.log("Cancel");
        }
      },
    });
  };

  return (
    <IconButton
      variant="contained"
      onClick={(e) => handleOpenPicker(e)}
      sx={{ py: 0 }}
    >
      <CloudUploadIcon fontSize="small" color="primary" />
    </IconButton>
  );
}

export default BtnUploadFile;
