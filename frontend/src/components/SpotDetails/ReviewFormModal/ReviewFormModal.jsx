import { useModal } from '../../../context/Modal';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createReviewThunk, getSpotReviewsThunk } from '../../../store/review';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import './ReviewFormModal.css';

function ReviewFormModal({ spotId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [review, setReview] = useState('');
    const [stars, setStars] = useState(0);
    const [errors, setErrors] = useState({});
    const [hoveredStar, setHoveredStar] = useState(0);
    const [serverError, setServerError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const reviewData = { review, stars };

        try {
            const res = await dispatch(createReviewThunk(spotId, reviewData));
            if (!res.errors) {
                await dispatch(getSpotReviewsThunk(spotId));
                closeModal();
            } else {
                setErrors(res.errors);
            }
        } catch (res) {
            const data = await res.json();
            if (data && data.message) {
                setServerError(data.message);
            } else if (data && data.errors) {
                setErrors(data.errors);
            }
        }
    };
    const validReview = review.length >= 10 && stars > 0;

    return (
        <>
            <h1>How was your stay?</h1>

            {serverError && <p className="error server-error">{serverError}</p>}

            {errors.review && <p className="error">{errors.review}</p>}
            {errors.stars && <p className="error">{errors.stars}</p>}

            <form onSubmit={handleSubmit}>
                <textarea
                    placeholder="Leave your review here..."
                    value={review}
                    onChange={e => setReview(e.target.value)}
                    rows={6}
                />

                <div className="stars-input">
                    {[1, 2, 3, 4, 5].map(num => (
                        <FontAwesomeIcon
                            key={num}
                            icon={num <= (hoveredStar || stars) ? fasStar : farStar}
                            className="star-icon"
                            onClick={() => setStars(num)}
                            onMouseEnter={() => setHoveredStar(num)}
                            onMouseLeave={() => setHoveredStar(0)}
                        />
                    ))}
                    <span>Stars</span>
                </div>

                <button type="submit" disabled={!validReview} className="submit-review-button">
                    Submit Your Review
                </button>
            </form>
        </>
    );
}

export default ReviewFormModal;
