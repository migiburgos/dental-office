import React from "react";
import Intro from "./Intro";
import Services from "./Services";
import { AuthModal } from "../../components";
import { useModal } from "../../hooks";

export default function Home() {
  const { isModalShowing, openModal, closeModal } = useModal();
  return (
    <>
      <AuthModal isModalShowing={isModalShowing} closeModal={closeModal} />
      <Intro openModal={openModal} />
      <Services openModal={openModal} />
    </>
  );
}
