import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Tab, Tabs } from "@mui/material";
import { Box } from "@mui/system";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import TopicIcon from "@mui/icons-material/Topic";

import EmployeeList from "../features/employee/EmployeeList";
import UserList from "../features/user/UserList";
import TemplateList from "../features/template/TemplateList";
import BtnAvatar from "../components/BtnAvatar";
import styled from "@emotion/styled";
import BtnLogout from "./BtnLogout";
import BtnToggle from "./BtnToggle";

function TabSideBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [value, setValue] = useState(location.pathname.split("/")[1]);
  const handleChange = (newTab) => {
    setValue(newTab);
    navigate(`/${newTab}`);
  };

  const tabItems = generateTabs();

  return (
    <Box
      sx={{
        backgroundColor: "primary.main",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flexGrow: 1,
        py: { xs: 1, md: 5 },
      }}
    >
      <BtnAvatar />
      <StyledTabs value={value} onChange={(e, value) => handleChange(value)}>
        {tabItems.map((tab) => {
          return (
            <StyledTab
              onClick={() => {
                handleChange(tab.value);
              }}
              label={tab.label}
              key={tab.value}
              value={tab.value}
              icon={tab.icon}
              iconPosition="start"
            />
          );
        })}
      </StyledTabs>

      <BtnToggle />

      <Box display="flex" flexGrow={1}></Box>

      <BtnLogout />
    </Box>
  );
}

export default TabSideBar;
const generateTabs = (auth) => {
  return [
    {
      value: "employee",
      label: "Employee",
      href: "/employee",
      component: <EmployeeList />,
      icon: <ContactMailIcon />,
    },
    {
      value: "users",
      label: "Users",
      href: "/users",
      component: <UserList />,
      icon: <ManageAccountsIcon />,
    },
    {
      value: "template",
      label: "Template",
      href: "/template",
      component: <TemplateList />,
      icon: <TopicIcon />,
    },
  ];
};

const StyledTabs = styled((props) => <Tabs {...props} />)({
  "& .MuiTabs-flexContainer": {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
});

const StyledTab = styled((props) => <Tab {...props} />)(({ theme }) => ({
  minWidth: "100%",
  padding: "0 2rem",
  fontWeight: theme.typography.fontWeightRegular,
  fontSize: theme.typography.pxToRem(15),
  marginRight: theme.spacing(1),
  color: "rgba(255, 255, 255, 0.7)",
  display: "flex",
  justifyContent: "flex-start",
  "&.Mui-selected": {
    backgroundColor: "#f8f9fd",
    borderRadius: "0 1rem 1rem 0",
  },
}));
