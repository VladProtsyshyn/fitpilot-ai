import PropTypes from 'prop-types';
import './Modal.css';

function Modal({ onClose }) {
    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <p>This is a modal window.</p>
                <button type="button" onClick={onClose}>
                    Close modal
                </button>
            </div>
        </div>
    );
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default Modal;
