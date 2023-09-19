import React from "react";
import { Container, Box, Grid, Typography, Button } from "@mui/material";
import styled from "@emotion/styled";
import { SectionTitle } from "../../components";
import ButtonSchedule from "../../components/ButtonSchedule";

const Image = styled.img`
  width: 100%;
`;

export default function Intro() {
  return (
    <Container
      maxWidth="lg"
      sx={{
        position: "relative",
        mt: 12,
        mb: 16,
      }}
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
            <SectionTitle>Jose's Dental Clinic</SectionTitle>
            <Typography variant="h5" sx={{ fontWeight: "regular", mb: 8 }}>
              Welcome to Jose’s Dental Clinic – your trusted destination for
              top-notch dental care. Our experienced team is dedicated to
              crafting healthy, beautiful smiles in a welcoming,
              state-of-the-art environment.
            </Typography>
            <ButtonSchedule type={"large"} />
          </Grid>
          <Grid
            item
            xs={5}
            sx={{
              //   background: "orange",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              pl: 4,
            }}
          >
            <Image
              src={
                "https://dental-office-static-data-store.s3.us-west-2.amazonaws.com/intro_photo.webp"
              }
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
