import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Button from './Button';
import { FaPlus } from 'react-icons/fa';
import { createPortal } from 'react-dom';

interface ModalProps {
  children: React.ReactNode;
  hasBgColor?: boolean;
  isModalOpen: boolean;
  onClose: () => void;
}
const Modal = ({ isModalOpen, children, hasBgColor = true, onClose }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  // 모달창이 외부를 클릭하면 모달창 닫기
  const handleClickOutside = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };
  // 모달창이 열린상태일 경우, esc 키를 누르면 모달창 닫기
  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      window.addEventListener('keydown', handleKeydown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, []);

  return createPortal(
    <ModalStyle $hasBgColor={hasBgColor} onClick={handleClickOutside}>
      <div className="modal-body" ref={modalRef}>
        <div className="modal-content">{children}</div>
      </div>
      <Button size="medium" scheme="transparent" onClick={onClose}>
        <FaPlus />
      </Button>
    </ModalStyle>,
    document.body,
  );
};
const ModalStyle = styled.div<{ $hasBgColor: boolean }>`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
  .modal-body {
    max-width: 80%;
    background-color: #fff;
    /* padding: 56px 32px; */
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  > button {
    position: absolute;
    top: 2em;
    right: 2em;
    svg {
      transform: rotate(45deg);
      font-size: 2em;
      fill: #fff;
    }
  }
`;

export default Modal;
