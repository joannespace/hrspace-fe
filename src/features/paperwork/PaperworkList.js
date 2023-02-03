import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Stack, Typography } from "@mui/material";
import { getTemplateList } from "../template/templateSlice";
import { getPaperworkList } from "./paperworkSlice";
import PaperworkCard from "./PaperworkCard";
import useAuth from "../../hooks/useAuth";
import BtnAddPaper from "./BtnAddPaper";

function PaperworkList() {
  const params = useParams();
  const dispatch = useDispatch();

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

        {auth.user.role === "Admin" && <BtnAddPaper />}
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
