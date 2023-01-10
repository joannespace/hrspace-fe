import { Button, Card, Grid, Icon, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import LineAxisIcon from "@mui/icons-material/LineAxis";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import IntegrationInstructionsIcon from "@mui/icons-material/IntegrationInstructions";
import React from "react";
import { useNavigate } from "react-router-dom";

const partnerLogos = [
  {
    name: "AnyMind",
    logoSource:
      "https://cdn-contents.anymindgroup.com/corporate/wp-uploads/2020/04/AnyMind-logo-for-website-1024x538.jpg",
  },
  {
    name: "AnyMind",
    logoSource:
      "https://cdn-contents.anymindgroup.com/corporate/wp-uploads/2020/04/AnyMind-logo-for-website-1024x538.jpg",
  },
  {
    name: "AnyMind",
    logoSource:
      "https://cdn-contents.anymindgroup.com/corporate/wp-uploads/2020/04/AnyMind-logo-for-website-1024x538.jpg",
  },
  {
    name: "AnyMind",
    logoSource:
      "https://cdn-contents.anymindgroup.com/corporate/wp-uploads/2020/04/AnyMind-logo-for-website-1024x538.jpg",
  },
  {
    name: "AnyMind",
    logoSource:
      "https://cdn-contents.anymindgroup.com/corporate/wp-uploads/2020/04/AnyMind-logo-for-website-1024x538.jpg",
  },
  {
    name: "AnyMind",
    logoSource:
      "https://cdn-contents.anymindgroup.com/corporate/wp-uploads/2020/04/AnyMind-logo-for-website-1024x538.jpg",
  },
];

const productIntroduction = [
  {
    icon: LineAxisIcon,
    bgcolor: "primary.lighter",
    iconBgColor: "primary.main",
    title: "Visualized Dashboard",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam auctor dolor eget nisl consequat, ac efficitur turpis finibus. .",
  },
  {
    icon: AccessTimeIcon,
    bgcolor: "secondary.lighter",
    iconBgColor: "secondary.main",
    title: "Time Saving",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam auctor dolor eget nisl consequat, ac efficitur turpis finibus. .",
  },
  {
    icon: IntegrationInstructionsIcon,
    bgcolor: "success.lighter",
    iconBgColor: "success.main",
    title: "All-in-one platform",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam auctor dolor eget nisl consequat, ac efficitur turpis finibus. .",
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
            spacing={{ xs: 0, md: 2 }}
            direction="row"
            flexWrap="wra"
            justifyContent="center"
            mt={1}
          >
            {partnerLogos.map((logo, index) => {
              return (
                <Grid item key={index} xs={3} md={1.5}>
                  <img src={logo.logoSource} alt={logo.name} width="100%" />
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
