import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { Box } from "@mui/system";
import { getEmployeeList } from "../employee/employeeSlice";
import BtnGenerateReset from "./BtnGenerateReset";

import BtnDeleteUser from "./BtnDeleteUser";
import useAuth from "../../hooks/useAuth";

function UserTable({ limit, page, setPage, setLimit }) {
  const auth = useAuth();
  const dispatch = useDispatch();
  const { employeeList, count } = useSelector((state) => state.employee);

  useEffect(() => {
    dispatch(getEmployeeList({ page, limit }));
  }, [dispatch, page, limit]);

  return (
    <TableContainer component={Paper} sx={{ mt: 2, borderRadius: 1 }}>
      <Table aria-label="employee table">
        <TableHead sx={{ backgroundColor: "primary.light" }}>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>No.</TableCell>

            <TableCell
              sx={{ width: { xs: "20%", sm: "15%" }, fontWeight: "bold" }}
            >
              Fullname
            </TableCell>

            <TableCell
              sx={{
                display: { xs: "none", md: "table-cell" },
                fontWeight: "bold",
              }}
            >
              Email
            </TableCell>

            <TableCell
              sx={{
                display: { xs: "none", md: "table-cell" },
                fontWeight: "bold",
              }}
            >
              Role
            </TableCell>

            <TableCell
              sx={{
                display: { xs: "15%", md: "table-cell" },
                fontWeight: "bold",
              }}
            >
              Password Action
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {employeeList.map((employee, index) => {
            return (
              <TableRow
                key={employee._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {page * limit + 1 + index}
                </TableCell>

                <TableCell
                  sx={{
                    width: { xs: "20%", sm: "25%" },
                    fontWeight: 500,
                    color: "success.main",
                  }}
                >
                  {employee.name}
                </TableCell>

                <TableCell
                  sx={{
                    display: { xs: "none", md: "table-cell" },
                  }}
                >
                  {employee.email}
                </TableCell>

                <TableCell
                  sx={{
                    display: { xs: "none", md: "table-cell" },
                  }}
                >
                  <Chip
                    variant="filled"
                    label={employee.role}
                    color={
                      employee.role === "Admin"
                        ? "success"
                        : employee.role === "Manager"
                        ? "secondary"
                        : "default"
                    }
                  />
                </TableCell>

                <TableCell
                  sx={{
                    display: { xs: "15%", md: "table-cell" },
                  }}
                >
                  <Box display="flex">
                    {employee.userGenerated ? (
                      <BtnGenerateReset type="Reset" employee={employee} />
                    ) : (
                      <BtnGenerateReset type="Generate" employee={employee} />
                    )}
                    <Box display="flex" flexGrow={1} />
                    {employee._id === auth.user._id ? (
                      <></>
                    ) : (
                      <BtnDeleteUser employee={employee} />
                    )}
                  </Box>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <TablePagination
        rowsPerPageOptions={[10, 25, 35]}
        component="div"
        count={count}
        rowsPerPage={limit}
        page={page}
        onPageChange={(e, newPage) => {
          console.log(newPage);
          setPage(newPage);
        }}
        onRowsPerPageChange={(e) => {
          setLimit(+e.target.value);
          setPage(0);
        }}
      />
    </TableContainer>
  );
}

export default UserTable;
