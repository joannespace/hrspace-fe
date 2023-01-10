import React, { useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { useDispatch } from "react-redux";

import { getTemplateList } from "./templateSlice";
import ReviewTableList from "./TemplateTableList";
import BtnAddTemplate from "./BtnAddTemplate";
import SearchInput from "../../components/SearchInput";
import BtnFilter from "../../components/BtnFilter";
import { TEMPLATE_CATEGORY } from "./config";

function TemplateList() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [searchName, setSearchName] = useState("");
  const [defaultValues, setDefaultValues] = useState({
    category: TEMPLATE_CATEGORY,
  });

  const filterList = generateFilterList();

  useEffect(() => {
    dispatch(
      getTemplateList({ page, limit, searchName, filter: defaultValues })
    );
  }, [dispatch, page, limit, searchName, defaultValues]);

  const handleSubmit = (searchName) => {
    setSearchName(searchName);
  };

  return (
    <Stack spacing={3}>
      <Stack
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        alignItems="center"
        spacing={1}
      >
        <Typography variant="h3" fontWeight="bold" color="secondary.darker">
          Template List
        </Typography>
        <Box display={{ xs: "hidden", md: "flex" }} flexGrow={1} />

        <BtnAddTemplate />
      </Stack>
      <Box display="flex" alignItems="center">
        <SearchInput handleSubmit={handleSubmit} flexGrow={1} />
        <BtnFilter
          submitType="templateList"
          defaultValues={defaultValues}
          setDefaultValues={setDefaultValues}
          filterList={filterList}
        />
      </Box>

      <ReviewTableList
        limit={limit}
        page={page}
        setPage={setPage}
        setLimit={setLimit}
      />
    </Stack>
  );
}

export default TemplateList;

function generateFilterList() {
  return [
    {
      title: "Category",
      name: "category",
      options: TEMPLATE_CATEGORY,
    },
  ];
}
