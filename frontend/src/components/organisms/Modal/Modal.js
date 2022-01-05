import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { ReactComponent as CloseIcon } from 'assets/svg/close.svg';

const modalOuterClassName = 'fixed inset-0 flex flex-col items-center justify-center z-50';
const modalBoxClassName =
  'relative shrink-0 bg-white shadow-md rounded-lg overflow-auto w-full max-w-2xl';
const closeBtnClassName = 'absolute p-1 top-0.5 right-0.5 text-red-800 hover:text-red-600';

const Modal = ({ children, handleClose = () => {}, isOverlay = true }) => {
  return ReactDOM.createPortal(
    <div className={`${modalOuterClassName} ${isOverlay && 'bg-black bg-opacity-75'}`}>
      <div className={modalBoxClassName}>
        <button type="button" className={closeBtnClassName} onClick={handleClose}>
          <CloseIcon />
        </button>
        <div className="py-5 px-4">{children}</div>
      </div>
    </div>,
    document.getElementById('modal-container')
  );
};

Modal.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),

  handleClose: PropTypes.func,
  isOverlay: PropTypes.bool,
};

export default Modal;
