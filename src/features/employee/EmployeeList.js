import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { Box, Typography } from "@mui/material";
import { Stack } from "@mui/system";

import { getEmployeeList } from "./employeeSlice";
import { generateFilterList } from "./config";
import TableList from "./TableList";
import SearchInput from "../../components/SearchInput";
import BtnAdd from "./BtnAdd";
import BtnFilter from "../../components/BtnFilter";
import useAuth from "../../hooks/useAuth";

function EmployeeList() {
  const auth = useAuth();
  const dispatch = useDispatch();

  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [searchName, setSearchName] = useState("");
  const [defaultValues, setDefaultValues] = useState({
    employmentStatus: ["Active"],
    department: [],
    employmentType: [],
  });

  const filterList = generateFilterList();

  const handleSubmit = (searchName) => {
    setSearchName(searchName);
  };

  useEffect(() => {
    dispatch(
      getEmployeeList({ page, limit, searchName, filter: defaultValues })
    );
  }, [dispatch, page, limit, searchName, defaultValues]);

  return (
    <Stack spacing={3}>
      <Stack
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        alignItems="center"
        spacing={2}
      >
        <Typography variant="h3" fontWeight="bold" color="secondary.darker">
          Employee List
        </Typography>

        <Box display={{ xs: "hidden", md: "flex" }} flexGrow={1} />

        {auth.user.role === "Admin" ? <BtnAdd /> : ""}
      </Stack>

      <Box display="flex" alignItems="center">
        <SearchInput handleSubmit={handleSubmit} flexGrow={1} />

        <BtnFilter
          submitType="employeeList"
          defaultValues={defaultValues}
          setDefaultValues={setDefaultValues}
          filterList={filterList}
        />
      </Box>

      <TableList
        limit={limit}
        page={page}
        setPage={setPage}
        setLimit={setLimit}
      />
    </Stack>
  );
}

export default EmployeeList;
