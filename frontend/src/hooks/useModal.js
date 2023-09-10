import { useState } from "react";

export default function useModal() {
  const [isModalShowing, setIsModalShowing] = useState(false);
  const openModal = () => setIsModalShowing(true);
  const closeModal = () => setIsModalShowing(false);
  return { isModalShowing, openModal, closeModal };
}
