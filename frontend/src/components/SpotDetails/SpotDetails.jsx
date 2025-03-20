import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { spotDetailsThunk } from '../../store/spots';

function SpotDetails() {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const spot = useSelector(state => state.spots.currentSpot);

    useEffect(() => {
        dispatch(spotDetailsThunk(spotId));
    }, [dispatch, spotId]);

    if (!spot) return null;

    const reserveClick = () => {
        alert('Feature coming soon'); // need to alert them instead of console.log
    };

    console.log("spot data", spot)
    console.log("preview image:", spot.previewImage)
    console.log("spot images", spot.SpotImages)

    return (
        <div>
            <h1>{spot.name}</h1>
            <div>
                {spot.city}, {spot.state}, {spot.country}
            </div>

            <div>
                <div>
                    <img src={spot.SpotImages?.[0]?.url}/>
                </div>

                {spot.SpotImages &&
                    spot.SpotImages.slice(1).map((image, idx) => (
                        <div key={idx}>
                            <img src={image.url} alt={`${spot.name} image ${idx + 1}`} />
                        </div>
                    ))}
            </div>

            <div>
                <div>
                    <h2>
                        Hosted by {spot.Owner.firstName} {spot.Owner.lastName}
                    </h2>
                    <p>{spot.description}</p>
                </div>

                <div>
                    <div>
                        <span>${spot.price}</span>/ night
                    </div>
                    <button onClick={reserveClick}>Reserve</button>
                </div>
            </div>
        </div>
    );
}

export default SpotDetails;
