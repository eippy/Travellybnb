import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { spotDetailsThunk, updateSpotThunk } from '../../store/spots';
import './SpotForm.css';

function UpdateSpotForm() {
    const { spotId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const currentSpot = useSelector(state => state.spots.currentSpot);

    
    const [country, setCountry] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [errors, setErrors] = useState({});
    const [isLoaded, setIsLoaded] = useState(true);


    
    useEffect(() => {
        const loadSpotDetails = async () => {
            await dispatch(spotDetailsThunk(spotId));
            setIsLoaded(false);
        };

        loadSpotDetails();
    }, [dispatch, spotId]);

    useEffect(() => {
        if (currentSpot) {
            setCountry(currentSpot.country || '');
            setAddress(currentSpot.address || '');
            setCity(currentSpot.city || '');
            setState(currentSpot.state || '');
            setDescription(currentSpot.description || '');
            setName(currentSpot.name || '');
            setPrice(currentSpot.price ? currentSpot.price.toString() : '');
        }
    }, [currentSpot]);

    useEffect(() => {
        const newErrors = {};
        if (!country) newErrors.country = 'Country is required';
        if (!address) newErrors.address = 'Street address is required';
        if (!city) newErrors.city = 'City is required';
        if (!state) newErrors.state = 'State is required';
        if (description.length < 30)
            newErrors.description = 'Description needs 30 or more characters';
        if (!name) newErrors.name = 'Name is required';
        if (!price || parseFloat(price) <= 0) newErrors.price = 'Price must be greater than 0';

        setErrors(newErrors);
    }, [country, address, city, state, description, name, price]);

    const handleSubmit = async e => {
        e.preventDefault();


        const spotData = {
            address,
            city,
            state,
            country,
            lat: 1,
            lng: 2,
            name,
            description,
            price: parseFloat(price),
        };

        try {
            const response = await dispatch(updateSpotThunk(spotData, spotId));

            if (!response.errors) {
                navigate(`/spots/${spotId}`);
            } else {
                setErrors(response.errors);
            }
        } catch (error) {
            setErrors({ submit: 'Failed to update spot' });
        }
    };

    if (isLoaded) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="create-spot-container">
            <h2>Update your Spot</h2>

            <form onSubmit={handleSubmit}>
                <div className="form-section">
                    <h3>Where&apos;s your place located?</h3>
                    <p>Guests will only get your exact address once they booked a reservation.</p>

                    <div className="form-group">
                        <label>Country</label>
                        <input
                            type="text"
                            value={country}
                            onChange={e => setCountry(e.target.value)}
                            placeholder="Country"
                        />
                        {errors.country && <p className="spot-form-error">{errors.country}</p>}
                    </div>

                    <div className="form-group">
                        <label>Street Address</label>
                        <input
                            type="text"
                            value={address}
                            onChange={e => setAddress(e.target.value)}
                            placeholder="Address"
                        />
                        {errors.address && <p className="spot-form-error">{errors.address}</p>}
                    </div>

                    <div className="form-group">
                        <label>City</label>
                        <input
                            type="text"
                            value={city}
                            onChange={e => setCity(e.target.value)}
                            placeholder="City"
                        />
                        {errors.city && <p className="spot-form-error">{errors.city}</p>}
                    </div>

                    <div className="form-group">
                        <label>State</label>
                        <input
                            type="text"
                            value={state}
                            onChange={e => setState(e.target.value)}
                            placeholder="State"
                        />
                        {errors.state && <p className="spot-form-error">{errors.state}</p>}
                    </div>
                </div>

                <div className="form-section">
                    <h3>Describe your place to guests</h3>
                    <p>
                        Mention the best features of your space, any special amenities like fast
                        wifi or parking, and what you love about the neighborhood.
                    </p>

                    <textarea
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        placeholder="Please write at least 30 characters"
                    />
                    {errors.description && <p className="spot-form-error">{errors.description}</p>}
                </div>

                <div className="form-section">
                    <h3>Create a title for your spot</h3>
                    <p>
                        Catch guests&apos; attention with a spot title that highlights what makes
                        your place special.
                    </p>

                    <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Name of your spot"
                    />
                    {errors.name && <p className="spot-form-error">{errors.name}</p>}
                </div>

                <div className="form-section">
                    <h3>Set a base price for your spot</h3>
                    <p>
                        Competitive pricing can help your listing stand out and rank higher in
                        search results.
                    </p>

                    <div className="price-input">
                        <span className="dollar-sign">$</span>
                        <input
                            type="number"
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                            placeholder="Price per night (USD)"
                        />
                    </div>
                    {errors.price && <p className="spot-form-error">{errors.price}</p>}
                </div>

                <button type="submit" className="spot-form-button">
                    Update Spot
                </button>
            </form>
        </div>
    );
}

export default UpdateSpotForm;