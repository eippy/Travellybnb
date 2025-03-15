import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { spotsThunk } from '../../store/spots';

function SpotsList() {
    const dispatch = useDispatch();
    const { allSpots, byId } = useSelector(state => state.spots);

    useEffect(() => {
        dispatch(spotsThunk());
    }, [dispatch]);

    return (
        <div>
            {allSpots.map(spotId => {
                const spot = byId[spotId];
                return (
                    <Link to={`/spots/${spot.id}`} key={spot.id}>
                        <div>
                            <img src={spot.previewImage} />
                        </div>
                        <div>
                            <div>
                                {spot.city}, {spot.state}
                            </div>
                            <div>
                                <div>
                                    <span>{parseFloat(spot.avgRating || 0).toFixed(1)}</span>
                                </div>
                            </div>
                            <div>
                                ${spot.price} <span>/ night</span>
                            </div>
                        </div>
                        <div>{spot.name}</div>
                    </Link>
                );
            })}
        </div>
    );
}

export default SpotsList;
