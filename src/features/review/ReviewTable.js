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
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fDate } from "../../utils/formatTime";
import { getEmployeeDetails } from "../employee/employeeSlice";

function ReviewTable({ limit, page, setPage, setLimit }) {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);

  const { reviewList, count } = useSelector((state) => state.review);

  useEffect(() => {
    dispatch(getEmployeeDetails(params.id));
  }, [dispatch, params.id]);

  return (
    <>
      <TableContainer component={Paper} sx={{ mt: 2, borderRadius: 1 }}>
        <Table aria-label="simple table">
          <TableHead sx={{ backgroundColor: "primary.light" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>No.</TableCell>

              <TableCell
                sx={{ width: { xs: "15%", sm: "20%" }, fontWeight: "bold" }}
              >
                Review Title
              </TableCell>

              <TableCell
                sx={{
                  display: { xs: "15%", md: "table-cell" },
                  fontWeight: "bold",
                }}
              >
                Review Date
              </TableCell>

              <TableCell
                sx={{
                  display: { xs: "15%", md: "table-cell" },
                  fontWeight: "bold",
                }}
              >
                Review Decision
              </TableCell>

              <TableCell
                sx={{
                  display: { xs: "none", md: "table-cell" },
                  fontWeight: "bold",
                }}
              >
                Reviewer
              </TableCell>

              <TableCell
                sx={{
                  display: { xs: "none", md: "table-cell" },
                  fontWeight: "bold",
                }}
              >
                Related Paperwork
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {reviewList
              .slice(page * limit, page * limit + limit)
              .map((review, index) => (
                <TableRow
                  key={review._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {page * limit + 1 + index}
                  </TableCell>

                  <TableCell
                    onClick={() => {
                      setOpenDialog(!openDialog);
                      navigate(`/employee/${params.id}/review/${review._id}`);
                    }}
                    sx={{
                      cursor: "pointer",
                      color: "success.dark",
                      fontWeight: "600",
                      ":hover": {
                        textDecoration: "underline",
                      },
                    }}
                  >
                    {review.reviewTitle}
                  </TableCell>

                  <TableCell sx={{ display: { xs: "15%", md: "table-cell" } }}>
                    {fDate(review.reviewDate)}
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={
                        review.reviewDecision ? review.reviewDecision : "N/A"
                      }
                      color={
                        review.reviewDecision === "Pass"
                          ? "success"
                          : "secondary"
                      }
                      sx={{ width: { xs: 1, md: 0.5 } }}
                    />
                  </TableCell>

                  <TableCell
                    sx={{
                      fontWeight: "500",
                      display: { xs: "none", md: "table-cell" },
                    }}
                  >
                    {review.reviewer?.name}
                  </TableCell>

                  <TableCell
                    sx={{
                      display: { xs: "none", md: "table-cell" },
                      cursor: "pointer",
                      fontWeight: "500",
                      color: "secondary.darker",
                    }}
                    onClick={() => {
                      navigate(
                        `/employee/${params.id}/paperwork/${review.paperworkId._id}`
                      );
                    }}
                  >
                    {review.paperworkId.paperworkTitle}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>

        <TablePagination
          rowsPerPageOptions={[10, 25, 35]}
          component="div"
          count={count}
          rowsPerPage={limit}
          page={page}
          onPageChange={(e, newPage) => {
            setPage(newPage);
          }}
          onRowsPerPageChange={(e) => {
            setLimit(+e.target.value);
            setPage(0);
          }}
        />
      </TableContainer>
    </>
  );
}

export default ReviewTable;
