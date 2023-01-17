import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Stack } from "@mui/system";
import { Box, Typography } from "@mui/material";

import { REVIEW_DECISION } from "./config";
import { getReviewList } from "./reviewSlice";
import ReviewTable from "./ReviewTable";

import SearchInput from "../../components/SearchInput";
import BtnFilter from "../../components/BtnFilter";
import BtnAddReview from "./BtnAddReview";

function EmployeeReview() {
  const params = useParams();
  const dispatch = useDispatch();

  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [searchName, setSearchName] = useState("");
  const [defaultValues, setDefaultValues] = useState({ reviewDecision: [] });
  const [openDialog, setOpenDialog] = useState(false);

  const { count } = useSelector((state) => state.review);

  const handleSubmit = (searchName) => {
    setSearchName(searchName);
  };

  useEffect(() => {
    dispatch(
      getReviewList({
        id: params.id,
        page,
        limit,
        searchName,
        filter: defaultValues,
      })
    );
  }, [dispatch, params.id, page, limit, searchName, defaultValues]);

  const filterList = [
    {
      title: "By Status",
      name: "reviewDecision",
      options: REVIEW_DECISION,
    },
  ];

  return (
    <>
      <Stack direction={{ xs: "column", md: "row" }} alignItems="center">
        <Box display="flex" flexGrow={1}>
          <SearchInput handleSubmit={handleSubmit} flexGrow={1} />
          <BtnFilter
            submitType="reviewList"
            defaultValues={defaultValues}
            setDefaultValues={setDefaultValues}
            filterList={filterList}
          />
        </Box>

        <Box
          display="flex"
          flexGrow={1}
          alignItems="center"
          justifyContent="flex-end"
        >
          <Typography variant="h6" fontWeight="bold" color="success.dark">
            Total reviews: {count}
          </Typography>
          <BtnAddReview openDialog={openDialog} setOpenDialog={setOpenDialog} />
        </Box>
      </Stack>

      <ReviewTable
        page={page}
        limit={limit}
        setPage={setPage}
        setLimit={setLimit}
      />
    </>
  );
}

export default EmployeeReview;
