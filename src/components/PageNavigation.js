import { Breadcrumbs, Link, Typography } from "@mui/material";
import React from "react";

function PageNavigation({ previousPageName, hrefPrev, currentPageName }) {
  return (
    <Breadcrumbs aria-label="page-navigation">
      <Link underline="hover" color="inherit" href={hrefPrev}>
        {previousPageName}
      </Link>

      <Typography color="success.main" fontWeight={600}>
        {currentPageName}
      </Typography>
    </Breadcrumbs>
  );
}

export default PageNavigation;
