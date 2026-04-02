import PropTypes from 'prop-types';
import './Modal.css';

function Modal({ onClose }) {
    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div
                className="modal-content"
                onClick={(event) => event.stopPropagation()}
            >
                <h2>Meal planner tips</h2>
                <p>Add your meals one by one and build a simple daily meal plan.</p>
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
