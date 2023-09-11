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
import ButtonSchedule from "../../components/ButtonSchedule";
import { useSelector } from "react-redux";

const Image = styled.img`
  width: 100%;
`;

export default function Services() {
  const services = useSelector((state) => state.services.data);
  const isServicesLoading = useSelector((state) => state.services.loading);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const handleChange = (event, newValue) => {
    setSelectedIndex(newValue);
  };
  return (
    <Container
      maxWidth="lg"
      sx={{ position: "relative", marginBottom: "8rem" }}
    >
      <SectionTitle>Services</SectionTitle>

      {isServicesLoading && <Typography variant="h1">Loading</Typography>}

      {services && (
        <>
          <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
            <Tabs value={selectedIndex} onChange={handleChange}>
              {services.map((s, i) => (
                <Tab key={i} label={s.title} />
              ))}
            </Tabs>
          </Box>

          <Box sx={{ flexGrow: 1, backgroundColor: "#EEEEEE", p: 8 }}>
            <Grid
              container
              spacing={0}
              sx={{ flexDirection: selectedIndex % 2 ? "row-reverse" : "row" }}
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
                  {services[selectedIndex].title}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "regular",
                    marginBottom: "4rem",
                    lineHeight: "210%",
                  }}
                >
                  {services[selectedIndex].description}
                </Typography>
                <ButtonSchedule />
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
                  },
                  selectedIndex % 2 ? { pr: 4 } : { pl: 4 },
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
        </>
      )}
    </Container>
  );
}
