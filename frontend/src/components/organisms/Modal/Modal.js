import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { ReactComponent as CloseIcon } from 'assets/svg/close.svg';

const overlayClassName = 'fixed inset-0 bg-black bg-opacity-75 z-50';
const modalClassName =
  'fixed left-1/2 top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-full max-w-2xl py-5 px-4 bg-white shadow-md rounded-lg z-50';
const closeBtnClassName = 'fixed p-1 top-0.5 right-0.5 text-red-800 hover:text-red-600';

const Modal = ({ children, handleClose = () => {}, isOverlay = true }) => {
  return ReactDOM.createPortal(
    <>
      {isOverlay && <span className={overlayClassName} />}
      <div className={modalClassName}>
        <button type="button" className={closeBtnClassName} onClick={handleClose}>
          <CloseIcon />
        </button>
        <div>{children}</div>
      </div>
    </>,
    document.getElementById('modal-container')
  );
};

Modal.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),

  handleClose: PropTypes.func,
  isOverlay: PropTypes.bool,
};

export default Modal;
