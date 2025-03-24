import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import './spotCard.css';

const SpotCard = ({ spot }) => {
    const rating = () => {
        if (!spot.avgRating) {
            return 'New';
        }
        return parseFloat(spot.avgRating).toFixed(1);
    };

    return (
        <div className="card-container">
            <div className="spotImage-container">
                <img className="spotImage" src={spot.previewImage} />
            </div>
            <div className="info-container">
                <div className="location-rating-container spot-text">
                    <span>{`${spot.city}, ${spot.state}`}</span>
                    <span><FontAwesomeIcon icon={faStar}/>{rating()}</span>
                </div>
                <div className="name-container">
                    <p className="spot-text">{spot.name}</p>
                </div>
                <div className="price-container">
                    <span className="spot-text">{`$${spot.price} night`}</span>
                </div>
            </div>
        </div>
    );
};
export default SpotCard;
