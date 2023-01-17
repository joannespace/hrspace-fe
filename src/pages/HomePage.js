import React from "react";
import { useNavigate } from "react-router-dom";

import { Button, Card, Grid, Icon, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import LineAxisIcon from "@mui/icons-material/LineAxis";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import IntegrationInstructionsIcon from "@mui/icons-material/IntegrationInstructions";

const partnerLogos = [
  {
    name: "Amazon",
    logoSource: `https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1200px-Amazon_logo.svg.png`,
  },
  {
    name: "Google",
    logoSource:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png",
  },
  {
    name: "Meta",
    logoSource:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/1280px-Meta_Platforms_Inc._logo.svg.png",
  },
  {
    name: "Pinterest",
    logoSource: `https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Pinterest_Logo.svg/2560px-Pinterest_Logo.svg.png`,
  },
];

const productIntroduction = [
  {
    icon: LineAxisIcon,
    bgcolor: "primary.lighter",
    iconBgColor: "primary.main",
    title: "All-in-one platform",
    content:
      "All information relating to personel is compiled in one-platform.",
  },
  {
    icon: AccessTimeIcon,
    bgcolor: "secondary.lighter",
    iconBgColor: "secondary.main",
    title: "Paperwork master",
    content: "Generate paperwork with just a click.",
  },
  {
    icon: IntegrationInstructionsIcon,
    bgcolor: "success.lighter",
    iconBgColor: "success.main",
    title: "Integrate with Gmail",
    content: "Increase your experience and limit transfer among the softwares.",
  },
];
function Homepage() {
  const navigate = useNavigate();
  return (
    <>
      <Box>
        <img
          src="https://hrnews.pl/storage/2020/02/HR_clickmeeting-1024x406.jpg"
          alt="banner"
          width="100%"
        />
      </Box>

      <Box mr={3} ml={3} sx={{ maxWidth: "100%" }}>
        <Stack my={3} alignItems="center" justifyContent="center" p={2}>
          <Typography variant="h5" fontWeight="550" textAlign="center">
            More than <span style={{ color: "green" }}>1,000+</span> companies
            believe in our solution
          </Typography>

          <Grid
            container
            spacing={{ xs: 3, md: 3 }}
            direction={{ xs: "column", md: "row" }}
            justifyContent="center"
            alignItems={{ xs: "center", md: "center" }}
            my={1}
          >
            {partnerLogos.map((logo, index) => {
              return (
                <Grid
                  item
                  key={index}
                  xs={12}
                  md={2}
                  sx={{ mt: 3, height: "100px" }}
                >
                  <img
                    src={logo.logoSource}
                    alt={logo.name}
                    width="150px"
                    style={{ display: "inline-block" }}
                  />
                </Grid>
              );
            })}
          </Grid>

          <Typography color="GREY.600">...and many more</Typography>
        </Stack>

        <Stack spacing={2} my={5} alignItems="center" p={2}>
          <Typography
            variant="h4"
            fontWeight="550"
            color="primary.darker"
            textAlign="center"
          >
            Everything you need to manage your team
          </Typography>

          <Typography
            variant="h6"
            fontWeight="300"
            color="success.dark"
            textAlign="center"
          >
            Redefining your Human Resouces management
          </Typography>

          <Grid
            container
            spacing={{ xs: 0, md: 4 }}
            direction={{ xs: "column", md: "row" }}
            justifyContent={{ xs: "none", md: "center" }}
            mt={1}
            mx={4}
          >
            {productIntroduction.map((intro, index) => {
              return (
                <Grid
                  item
                  key={index}
                  xs={12}
                  md={4}
                  mb={{ xs: 3, md: "none" }}
                >
                  <Card
                    sx={{
                      p: 4,
                      minHeight: "100%",
                      bgcolor: intro.bgcolor,
                      boxShadow: "5px 5px 5px #DFE3E8",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mb: 2,
                      }}
                    >
                      <Icon
                        component={intro.icon}
                        fontSize="large"
                        sx={{
                          mr: 2,
                          p: 1,
                          width: "3rem",
                          height: "3rem",
                          borderRadius: 1,
                          color: "white",
                          backgroundColor: intro.iconBgColor,
                        }}
                      />

                      <Typography variant="h5" fontWeight="600">
                        {intro.title}
                      </Typography>
                    </Box>

                    <Typography variant="h6" textAlign="justify" color="GREY">
                      {intro.content}
                    </Typography>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Stack>
      </Box>
      <Stack
        spacing={5}
        my={5}
        alignItems="center"
        justifyContent="center"
        p={2}
        sx={{ backgroundColor: "primary.lighter", minHeight: "30vh" }}
      >
        <Typography
          variant="h4"
          fontWeight="550"
          color="primary.darker"
          textAlign="center"
        >
          Time flies, don't hestitate to join us now
        </Typography>

        <Button
          variant="contained"
          size="large"
          sx={{ fontWeight: "bolder", fontSize: "20px", width: "15rem" }}
          onClick={() => navigate("/register")}
        >
          Sign up
        </Button>
      </Stack>
    </>
  );
}

export default Homepage;
