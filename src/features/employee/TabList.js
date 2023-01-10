import React from "react";
import { Tab, Tabs } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

function TabList({ currentTab, setCurrentTab }) {
  const navigate = useNavigate();
  const params = useParams();

  return (
    <Tabs
      value={currentTab}
      onChange={(e, newTab) => setCurrentTab(newTab)}
      indicatorColor="secondary"
      sx={{
        "& .MuiTabs-flexContainer": {
          flexDirection: "row",
          justifyContent: { xs: "center", md: "flex-start" },
        },
      }}
    >
      <Tab
        value="information"
        label="Information"
        onClick={() => navigate(`/employee/${params.id}`)}
      />
      <Tab
        value="paperwork"
        label="Paperwork"
        onClick={() => navigate(`/employee/${params.id}/paperwork`)}
      />
      <Tab
        value="review"
        label="Review"
        onClick={() => navigate(`/employee/${params.id}/review`)}
      />
    </Tabs>
  );
}

export default TabList;
