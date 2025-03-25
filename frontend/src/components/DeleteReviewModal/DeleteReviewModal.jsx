import { useModal } from '../../context/Modal';
import { useDispatch } from 'react-redux';
import { deleteReviewThunk } from '../../store/review';
import './DeleteReviewModal.css';

function DeleteReviewModal({ reviewId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleDelete = async e => {
        e.preventDefault();

        try {
            await dispatch(deleteReviewThunk(reviewId));
            closeModal();
        } catch (error) {
            console.error('Error deleting review:', error);
        }
    };

    return (
        <div className="delete-review-modal">
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to delete this review?</p>
                <button onClick={handleDelete} className="delete-button">
                    Yes (Delete Review)
                </button>
                <button onClick={closeModal} className="keep-button">
                    No (Keep Review)
                </button>
        </div>
    );
}

export default DeleteReviewModal;
