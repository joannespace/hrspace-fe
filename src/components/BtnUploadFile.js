import React, { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import useDrivePicker from "react-google-drive-picker/dist";

import { GOOGLE_CLIENT_ID, GOOGLE_SECRET_KEY, SCOPE_APIS } from "../app/config";

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
    const initialize = () => {
      return google?.accounts.oauth2.initTokenClient({
        client_id: GOOGLE_CLIENT_ID,
        scope: SCOPE_APIS,
        callback: (tokenResponse) => {
          setToken(tokenResponse);
        },
      });
    };

    setTokenClient(initialize());

    const timer = setInterval(
      () => initialize().requestAccessToken(),
      15 * 10 ** 5
    );

    return () => {
      clearInterval(timer);
    };
  }, [token]);

  const handleOpenPicker = (e) => {
    if (!token.access_token) tokenClient.requestAccessToken();
    openPicker({
      clientId: GOOGLE_CLIENT_ID,
      developerKey: GOOGLE_SECRET_KEY,
      token: token.access_token,
      viewId: "DOCS",
      showUploadView: true,
      showUploadFolders: true,
      supportDrives: true,
      multiselect: true,
      callbackFunction: (data) => {
        if (data.action !== "cancel") {
          console.log(data);
          type === "paperwork"
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
