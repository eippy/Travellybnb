import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { spotDetailsThunk } from '../../store/spots';
import SpotDetailsCard from './SpotDetailsCard';

function SpotDetails() {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(true)
    const spot = useSelector(state => state.spotsReducer.currentSpot);
   


    useEffect(() => {
        dispatch(spotDetailsThunk(spotId));
        setIsLoaded(true);
    }, [dispatch, spotId]);

    if (!isLoaded) {
        return <div>Loading...</div>
    }

    

   

    return (
        <div className="spot-details-container">
            <SpotDetailsCard spot={spot} />
        </div>
    );
}

export default SpotDetails;
