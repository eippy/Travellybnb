
import './spotCard.css'

const SpotCard = ({ spot }) => {
    return (
        <div className="card-container">
            <div className="spotImage-container">
                <img className="spotImage" src={spot.previewImage} />
            </div>
            <div className="info-container">
                <div className="location-rating-container spot-text">
                    <span>{`${spot.city}, ${spot.state}`}</span>
                    <span>{`${parseFloat(spot.avgRating).toFixed(1)}` }</span>
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
}
export default SpotCard;