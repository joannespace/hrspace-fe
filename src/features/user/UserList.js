import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import BtnFilter from "../../components/BtnFilter";
import SearchInput from "../../components/SearchInput";
import { getEmployeeList } from "../employee/employeeSlice";
import { getUserList } from "./userSlice";
import UserTable from "./UserTable";

function UserList() {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [searchName, setSearchName] = useState("");
  const [defaultValues, setDefaultValues] = useState({ userActivation: [] });
  const dispatch = useDispatch();
  const handleSubmit = (searchName) => {
    setSearchName(searchName);
  };

  useEffect(() => {
    dispatch(
      getEmployeeList({ page, limit, searchName, filter: defaultValues })
    );
    dispatch(getUserList({ page, limit }));
  }, [dispatch, page, limit, searchName, defaultValues]);

  const filterList = generateFilterList();
  return (
    <Stack spacing={3}>
      <Stack
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        alignItems="center"
        spacing={2}
      >
        <Typography variant="h3" fontWeight="bold" color="secondary.darker">
          User Activation
        </Typography>

        <Box display={{ xs: "hidden", md: "flex" }} flexGrow={1} />
      </Stack>
      <Box display="flex" alignItems="center">
        <SearchInput handleSubmit={handleSubmit} flexGrow={1} />
        <BtnFilter
          submitType="userList"
          defaultValues={defaultValues}
          setDefaultValues={setDefaultValues}
          filterList={filterList}
        />
      </Box>

      <UserTable
        limit={limit}
        page={page}
        setPage={setPage}
        setLimit={setLimit}
      />
    </Stack>
  );
}

export default UserList;

function generateFilterList() {
  return [
    {
      title: "User Activation",
      name: "userActivation",
      options: ["Activated", "Inactivated"],
    },
  ];
}
