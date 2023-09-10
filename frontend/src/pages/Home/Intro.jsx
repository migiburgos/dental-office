import React from "react";
import { Container, Box, Grid, Typography, Button } from "@mui/material";
import styled from "@emotion/styled";

const Image = styled.img`
  width: 100%;
`;

export default function Intro() {
  return (
    <Container
      maxWidth="lg"
      sx={{ position: "relative", marginTop: "6rem", marginBottom: "8rem" }}
    >
      {/* <Box sx={{ bgcolor: "#cfe8fc", height: "200vh" }} /> */}
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={0}>
          <Grid
            item
            xs={7}
            sx={{
              //   background: "yellow",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h2"
              sx={{ fontWeight: "bold", marginBottom: "3rem" }}
            >
              Jose's Dental Clinic
            </Typography>
            <Typography
              variant="h5"
              sx={{ fontWeight: "regular", marginBottom: "4rem" }}
            >
              Welcome to Jose’s Dental Clinic – your trusted destination for
              top-notch dental care. Our experienced team is dedicated to
              crafting healthy, beautiful smiles in a welcoming,
              state-of-the-art environment.
            </Typography>
            <Button
              variant="contained"
              size="large"
              sx={{ width: 256, maxWidth: "100%", height: 64 }}
            >
              Schedule Appointment
            </Button>
          </Grid>
          <Grid
            item
            xs={5}
            sx={{
              //   background: "orange",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingLeft: "2rem",
            }}
          >
            <Image
              src={"/intro_photo.png"}
              Image
              alt={"intro_photo"}
              loading="lazy"
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
