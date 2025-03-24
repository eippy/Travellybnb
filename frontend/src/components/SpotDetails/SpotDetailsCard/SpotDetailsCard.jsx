
import { faStar } from '@fortawesome/free-solid-svg-icons';
import './SpotDetailsCard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import OpenModalButton from '../../OpenModalButton/OpenModalButton';
import ReviewFormModal from '../ReviewFormModal/ReviewFormModal';
import DeleteReviewModal from '../../DeleteReviewModal/DeleteReviewModal';

function SpotDetailsCard({ spot }) {

    const reviews = useSelector(state => state.reviews.allReviews)
    const currentUser = useSelector(state => state.session.user);
    if (!spot) {
        return <div>Spot not found</div>;
    }

    const reserveClick = () => {
        alert('Feature coming soon');
    };


    const sortedReviews = [...reviews].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const avgRating = spot.avgStarRating ? parseFloat(spot.avgStarRating).toFixed(1) : "New"

    const formattedDate = (review) => {
        const date = new Date(review.createdAt)
        const months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ];
        const month = months[date.getMonth()];
        const year = date.getFullYear()
        return `${month} ${year}`
    }
    
    const reviewCount = sortedReviews.length
    const reviewText = reviewCount === 1 ? "Review" : "Reviews"

    const loggedUserNotOwner = spot.Owner && currentUser && currentUser.id !== spot.Owner.id;
    const reviewExists = sortedReviews.find(review => review.userId === currentUser?.id) !== undefined
    const showReviewButton = loggedUserNotOwner && !reviewExists

    return (
        <div className="spot-details-container">
            <h1>{spot.name}</h1>
            <div className="spot-location">{`${spot.city}, ${spot.state}, ${spot.country}`}</div>
            <div className="spot-images">
                <div className="main-image">
                    <img src={spot.SpotImages?.[0]?.url} alt="Main spot" />
                </div>

                <div className="additional-images">
                    {spot.SpotImages?.slice(1).map((image, idx) => (
                        <div key={idx} className="image-card">
                            <img src={image.url} alt={`${spot.name} image ${idx + 1}`} />
                        </div>
                    ))}
                </div>
            </div>

            <div className="spot-info">
                <div className="host-info">
                    <h2>{`Hosted by ${spot.Owner?.firstName} ${spot.Owner?.lastName}`}</h2>
                    <p className="description">{spot.description}</p>
                </div>

                <div className="booking-card">
                    <div className="price-info">
                        <span className="price">{`$${spot.price}`}</span>
                        <span className="per-night"> night</span>
                    </div>
                    <div className="rating-info">
                        <FontAwesomeIcon icon={faStar} className="star-icon" />
                        <span className="avg-rating">{avgRating}</span>
                        {reviewCount > 0 && (
                            <>
                                <span className="dot"> · </span>
                                <span className="review-count">{`${reviewCount} ${reviewText}`}</span>
                            </>
                        )}
                    </div>
                    <button className="reserve-button" onClick={reserveClick}>
                        Reserve
                    </button>
                </div>
            </div>
            <div className="reviews-section">
                <h2 className="reviews-header">
                    <FontAwesomeIcon icon={faStar} className="star-icon" />
                    <span className="avg-rating">{avgRating}</span>
                    {reviewCount > 0 && (
                        <>
                            <span className="dot"> · </span>
                            <span className="review-count">{`${reviewCount} ${reviewText}`}</span>
                        </>
                    )}
                </h2>
                {showReviewButton && (
                    <OpenModalButton
                        buttonText="Post Your Review"
                        modalComponent={<ReviewFormModal spotId={spot.id} />}
                        className="post-review-button"
                    />
                )}
                {reviewCount === 0 && loggedUserNotOwner ? (
                    <p className="no-reviews">Be the first to post a review!</p>
                ) : (
                    <div className="reviews-list">
                        {sortedReviews.map(review => (
                            <div key={review.id} className="review-item">
                                <h3 className="reviewer-name">{review.User?.firstName}</h3>
                                <div className="review-date">{formattedDate(review)}</div>
                                <p className="review-text">{review.review}</p>
                                {currentUser && currentUser.id === review.userId && (
                                    <OpenModalButton
                                        buttonText="Delete"
                                        modalComponent={<DeleteReviewModal reviewId={review.id} />}
                                        className="delete-review-button"
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default SpotDetailsCard;
