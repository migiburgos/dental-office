import React, { useState } from "react";
import {
  Container,
  Typography,
  Tabs,
  Tab,
  Box,
  Button,
  Grid,
} from "@mui/material";
import styled from "@emotion/styled";
import { SectionTitle } from "../../components";

const Image = styled.img`
  width: 100%;
`;

export default function Services({ openModal }) {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Container
      maxWidth="lg"
      sx={{ position: "relative", marginBottom: "8rem" }}
    >
      <SectionTitle>Services</SectionTitle>

      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Dental Cleanings" />
          <Tab label="Check-ups" />
          <Tab label="Tooth Extractions" />
        </Tabs>
      </Box>

      <Box sx={{ flexGrow: 1, backgroundColor: "#EEEEEE", p: 8 }}>
        <Grid
          container
          spacing={0}
          sx={value % 2 && { flexDirection: "row-reverse" }}
        >
          <Grid
            item
            xs={7}
            sx={{
              //   background: "yellow",
              display: "flex",
              flexDirection: "column",
              //   justifyContent: "center",
            }}
          >
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", marginBottom: "2rem" }}
            >
              Dental Cleanings
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "regular",
                marginBottom: "4rem",
                lineHeight: "210%",
              }}
            >
              Dental cleanings, also known as dental prophylaxis, are essential
              for maintaining good oral hygiene. During this procedure, a dental
              hygienist carefully removes plaque, tartar, and stains from the
              teeth's surfaces.
            </Typography>
            <Button
              variant="contained"
              size="large"
              sx={{ width: 255, maxWidth: "100%" }}
              onClick={openModal}
            >
              Schedule Appointment
            </Button>
          </Grid>
          <Grid
            item
            xs={5}
            sx={[
              {
                // background: "orange",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                // paddingLeft: "2rem",
              },
              value % 2 ? { pr: 4 } : { pl: 4 },
            ]}
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
