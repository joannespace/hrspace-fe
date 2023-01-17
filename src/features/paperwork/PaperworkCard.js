import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Link,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import styled from "@emotion/styled";

import { fDateCard } from "../../utils/formatTime";
import useAuth from "../../hooks/useAuth";
import BtnUploadFile from "../../components/BtnUploadFile";
import { PAPERWORK_STATUS } from "./config";
import { updatePaperwork } from "./paperworkSlice";
import { useTheme } from "@emotion/react";

function PaperworkCard({ paper }) {
  const theme = useTheme();
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useAuth();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectValue, setSelectValue] = useState(paper.paperworkStatus);

  const handleSubmit = (e) => {
    e.preventDefault();
    const update = { ...paper, paperworkStatus: selectValue };
    dispatch(updatePaperwork({ id: params.id, idPaper: paper._id, update }));
  };

  const handleSubmitFile = (value) => {
    const update = { ...paper, file: value };
    dispatch(updatePaperwork({ id: params.id, idPaper: paper._id, update }));
  };

  let content = contentGenerate({
    paper,
    selectValue,
    setSelectValue,
    handleSubmitFile,
    auth,
  });

  return (
    <Card
      variant="outlined"
      sx={{
        borderColor: "primary.main",
        borderRadius: 3,
        boxShadow: "1px 2px 2px grey",
        width: "330px",
        m: 2,

        p: 0.5,
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
        style={{ paddingBottom: 0.5 }}
      >
        {content.map((item, index) => {
          if (index % 2 === 0) {
            return (
              <StyledBoxWithBackground
                direction="row"
                key={index}
                style={{
                  backgroundColor:
                    theme.palette.mode === "dark" ? "#637381" : "",
                }}
              >
                <Box width="60%">
                  <Typography variant="h7" sx={{ mr: 1 }}>
                    {item.header}
                  </Typography>
                </Box>
                <Box width="40%">{item.value}</Box>
              </StyledBoxWithBackground>
            );
          } else {
            return (
              <StyledBoxWithBorder direction="row" key={index}>
                <Box width="60%">
                  <Typography variant="h7" sx={{ mr: 1 }}>
                    {item.header}
                  </Typography>
                </Box>
                <Box width="40%">{item.value}</Box>
              </StyledBoxWithBorder>
            );
          }
        })}
      </CardContent>

      <CardActions
        sx={{ display: "flex", flexDirection: "column", mb: 1, px: 2 }}
        disableSpacing
      >
        {auth.user.role === "Admin" && (
          <Button
            variant="contained"
            sx={{ mb: 1, fontWeight: "bold" }}
            fullWidth
            onClick={handleSubmit}
          >
            Update status
          </Button>
        )}
        <Button
          variant="outlined"
          fullWidth
          sx={{ mb: 1, fontWeight: "bold" }}
          onClick={() => {
            navigate(`/employee/${params.id}/paperwork/${paper._id}`);
            setOpenDialog(!openDialog);
          }}
        >
          View paperwork
        </Button>
      </CardActions>
    </Card>
  );
}

export default PaperworkCard;

function contentGenerate({
  paper,
  selectValue,
  setSelectValue,
  handleSubmitFile,
  auth,
}) {
  return [
    { header: "Paperwork Title", value: paper.paperworkTitle },
    { header: "Paperwork Type", value: paper.paperworkType },
    { header: "Start date", value: fDateCard(paper.startDate) },
    { header: "Last date", value: fDateCard(paper.lastDate) },
    {
      header: "Review decision",
      value: paper.reviewId?.reviewDecision
        ? paper.reviewId.reviewDecision
        : "N/A",
    },
    {
      header: "Paperwork Status",
      value: (
        <TextField
          name="paperworkStatus"
          value={selectValue}
          onChange={(e) => {
            setSelectValue(e.target.value);
          }}
          select
          sx={{
            "& .MuiSelect-select": {
              p: 0,
              px: 1,
            },
            "& .MuiInputBase-input": { width: "4rem" },
          }}
        >
          {PAPERWORK_STATUS.map((status, index) => {
            return (
              <MenuItem value={status} key={index} sx={{ overflow: "hidden" }}>
                {status}
              </MenuItem>
            );
          })}
        </TextField>
      ),
    },
    {
      header: "Paperwork File",
      value: paper.file?.name ? (
        <Link href={paper.file.url} target="_blank" textOverflow={"hidden"}>
          {paper.file.name}
        </Link>
      ) : auth.user.role === "Admin" ? (
        <BtnUploadFile handleSubmit={handleSubmitFile} />
      ) : (
        <></>
      ),
    },
  ];
}

const StyledBoxWithBackground = styled(Box)({
  backgroundColor: "#ede7f6",
  borderRadius: 8,
  padding: 10,
  marginBottom: 5,
  display: "flex",
  alignItems: "center",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "clip",
});

const StyledBoxWithBorder = styled(Box)({
  border: "1px solid #4527a0",
  borderRadius: 8,
  padding: 10,
  marginBottom: 5,
  display: "flex",
  alignItems: "center",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "clip",
});
