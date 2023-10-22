import React from 'react';
import ReactResponsiveModal from 'react-responsive-modal';
import cn from 'classnames';
import 'react-responsive-modal/styles.css';
import styles from './Modal.module.scss';

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  className?: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, closeModal, children, className }) => {
  return (
    <ReactResponsiveModal open={isOpen} onClose={closeModal} showCloseIcon={false}
      classNames={{
        overlay: styles.customOverlay,
        modal: cn(styles.customModal, className),
      }
      }>
      {children}
    </ReactResponsiveModal>
  );
};

export default Modal;
