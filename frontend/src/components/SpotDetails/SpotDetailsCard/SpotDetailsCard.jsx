import React from "react";
import './SpotDetailsCard.css'

function SpotDetailsCard({ spot }) {
    if (!spot) {
        return <div>Spot not found</div>;
    }

    const reserveClick = () => {
        alert('Feature coming soon');
    };

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
                        <span className="per-night"> / night</span>
                    </div>
                    <button className="reserve-button" onClick={reserveClick}>
                        Reserve
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SpotDetailsCard;
