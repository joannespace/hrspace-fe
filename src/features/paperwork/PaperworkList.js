import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import NoteAddIcon from "@mui/icons-material/NoteAdd";

import { getTemplateList } from "../template/templateSlice";
import { getPaperworkList } from "./paperworkSlice";
import PaperworkCard from "./PaperworkCard";
import useAuth from "../../hooks/useAuth";

function PaperworkList() {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    dispatch(getPaperworkList({ id: params.id }));
    dispatch(getTemplateList({}));
  }, [dispatch, params.id]);

  const { paperworkList, count } = useSelector((state) => state.paperwork);

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent={{ xs: "center", md: "flex-end" }}
      >
        <Typography variant="h6" fontWeight="bold" color="success.main">
          Total paperwork: {count}
        </Typography>

        {auth.user.role === "Admin" && (
          <Box>
            <IconButton
              onClick={() =>
                navigate(`/employee/${params.id}/paperwork/create`)
              }
            >
              <Tooltip title="Create new paperwork">
                <NoteAddIcon fontSize="large" color="primary" />
              </Tooltip>
            </IconButton>
          </Box>
        )}
      </Stack>

      <Stack
        direction={{ xs: "column", md: "row" }}
        flexWrap={{ xs: "none", md: "wrap" }}
      >
        {paperworkList.length !== 0 ? (
          paperworkList.map((paper) => {
            return <PaperworkCard key={paper._id} paper={paper} />;
          })
        ) : (
          <Typography variant="h6">
            No paperwork yet, create a new one
          </Typography>
        )}
      </Stack>
    </>
  );
}

export default PaperworkList;
