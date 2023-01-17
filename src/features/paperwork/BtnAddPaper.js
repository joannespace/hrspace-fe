import { Box, IconButton, Tooltip } from "@mui/material";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import NoteAddIcon from "@mui/icons-material/NoteAdd";

function BtnAddPaper() {
  const navigate = useNavigate();
  const params = useParams();

  return (
    <Box>
      <IconButton
        onClick={() => navigate(`/employee/${params.id}/paperwork/create`)}
      >
        <Tooltip title="Create new paperwork">
          <NoteAddIcon fontSize="large" color="primary" />
        </Tooltip>
      </IconButton>
    </Box>
  );
}

export default BtnAddPaper;
