import { useState } from 'react';

const useModal = (initialState = false) => {
  const [isModalOpen, setIsModalOpen] = useState(initialState);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return {
    isModalOpen,
    handleOpenModal,
    handleCloseModal,
  };
};

export default useModal;
