import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { spotsThunk, deleteSpotThunk } from '../../store/spots';
import SpotCard from '../SpotsList/SpotCard/SpotCard';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import DeleteSpotModal from '../DeleteSpotModal/DeleteSpotModal';
import './ManageSpots.css';

function ManageSpots() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector(state => state.session.user);

    const allSpots = useSelector(state => state.spots.allSpots);

    const userSpots = allSpots?.filter(spot => spot.ownerId === user?.id);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const getSpots = async () => {
            dispatch(spotsThunk());
            setIsLoaded(true);
        };

        if (!isLoaded) {
            getSpots();
        }
    }, [dispatch, isLoaded]);

    const handleSpotClick = spotId => {
        navigate(`/spots/${spotId}`);
    };


    return (
        <div className="manage-spots-container">
            <h1>Manage Spots</h1>

            {userSpots.length === 0 ? (
                <div>
                    <p>You have no spots yet.</p>
                    <Link to="/spots/new" className="create-spot-button">
                        Create a New Spot
                    </Link>
                </div>
            ) : (
                <>
                    <Link to="/spots/new" className="create-spot-button">
                        Create a New Spot
                    </Link>

                    <div className="spots-grid">
                        {userSpots.map(spot => (
                            <div key={spot.id} className="spot-tile">
                                <div onClick={() => handleSpotClick(spot.id)}>
                                    <SpotCard spot={spot} />
                                </div>

                                <div>
                                    <button
                                        className="update-button"
                                        onClick={e => {
                                            e.stopPropagation();
                                            navigate(`/spots/${spot.id}/edit`);
                                        }}
                                    >
                                        Update
                                    </button>

                                    <OpenModalButton
                                        buttonText="Delete"
                                        className="delete-button"
                                        onButtonClick={e => e.stopPropagation()}
                                        modalComponent={<DeleteSpotModal spotId={spot.id} />}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default ManageSpots;
