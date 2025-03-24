import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { spotsThunk } from '../../store/spots';
import SpotCard from './SpotCard';
import './SpotsList.css'

function SpotsList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isLoaded, setIsLoaded] = useState(false)
    const spots = useSelector(state => state.spots.allSpots)
    useEffect(() => {
        
        const getSpots = async () => {
            await dispatch(spotsThunk());
            setIsLoaded(true);
        }

        if (!isLoaded) {
            getSpots();
        }


    }, [isLoaded, dispatch])


    const gotToSpotDetail = (e, spot) => {
        e.preventDefault();
        navigate(`/spots/${spot.id}`)
    }
    
    if (!isLoaded) {
        return <div>Loading...</div>
    }
    return (
        <div>
            <div className='card-list-container'>
            {
                spots.map((spot, idx) => (
                    <div className='card-container'
                        key={`${idx}-${spot.id}`}
                        onClick={(e)=> gotToSpotDetail(e, spot)}>
                        <SpotCard spot={spot} />
                        </div>
                ))
            }
            </div>
        </div>
    );
}

export default SpotsList;
