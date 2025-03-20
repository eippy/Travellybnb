import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import './SpotForm.css';
import { createNewSpotThunk } from "../../store/spots";

function SpotForm() {

    const [country, setCountry] = useState("")
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [description, setDescription] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [previewImage, setPreviewImage] = useState("");
    const [imageUrl1, setImageUrl1] = useState("");
    const [imageUrl2, setImageUrl2] = useState("");
    const [imageUrl3, setImageUrl3] = useState("");
    const [imageUrl4, setImageUrl4] = useState("");

    const dispatch = useDispatch();

    //Navigation hook
    const navigate = useNavigate();

    //Error Handling state
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const newErrors = {}
        if (!country) {
            newErrors.country = "Country is required"
        }
        if (!address) {
            newErrors.address = "Street address is required"
        }
        if (!city) {
            newErrors.city = "City is required"
        }
        if (!state) {
            newErrors.state = "State is required";
        }
        if (description.length < 30) {
            newErrors.description = "Description needs 30 or more characters"
        }
        if (!name) {
            newErrors.name = "Name is required"
        }
        if (!price || price <= 0) {
            newErrors.price = "Price must be greater than 0"
        }
        if (!previewImage) {
            newErrors.previewImage = "Preview image is required"
        }


        setErrors(newErrors);

    }, [country, address, city, state, description, name, price, previewImage])
     

    //FUNCTION TO HANDLE SUBMIT

    const handleSubmit =  (e) => {
        e.preventDefault();

        const spotData = {
            country,
            address,
            city,
            state,
            description,
            name,
            price,
            previewImage,
            imageUrl1,
            imageUrl2,
            imageUrl3,
            imageUrl4
        }
        const res = dispatch(createNewSpotThunk(spotData));
        if (res.errors) {
            setErrors(res.errors);
        } else {
            navigate(`/spots/${res.id}`)
        }
    }

    return (
        <div className="create-spot-container">
            <h1>Create a New Spot</h1>

            <form onSubmit={handleSubmit}>
                <div className="form-section">
                    <h2>Where's your place located?</h2>
                    <p>Guests will only get your exact address once they booked a reservation.</p>

                    <div className="form-group">
                        <label>Country</label>
                        <input
                            type="text"
                            value={country}
                            onChange={e => setCountry(e.target.value)}
                            placeholder="Country"
                        />
                        {errors.country && <p className="error">{errors.country}</p>}
                    </div>

                    <div className="form-group">
                        <label>Street Address</label>
                        <input
                            type="text"
                            value={address}
                            onChange={e => setAddress(e.target.value)}
                            placeholder="Address"
                        />
                        {errors.address && <p className="error">{errors.address}</p>}
                    </div>

                    <div className="form-group">
                        <label>City</label>
                        <input
                            type="text"
                            value={city}
                            onChange={e => setCity(e.target.value)}
                            placeholder="City"
                        />
                        {errors.city && <p className="error">{errors.city}</p>}
                    </div>

                    <div className="form-group">
                        <label>State</label>
                        <input
                            type="text"
                            value={state}
                            onChange={e => setState(e.target.value)}
                            placeholder="State"
                        />
                        {errors.state && <p className="error">{errors.state}</p>}
                    </div>
                </div>

                <div className="form-section">
                    <h2>Describe your place to guests</h2>
                    <p>
                        Mention the best features of your space, any special amentities like fast
                        wifi or parking, and what you love about the neighborhood.
                    </p>

                    <textarea
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        placeholder="Please write at least 30 characters"
                    />
                    {errors.description && <p className="error">{errors.description}</p>}
                </div>

                <div className="form-section">
                    <h2>Create a title for your spot</h2>
                    <p>
                        Catch guests' attention with a spot title that highlights what makes your
                        place special.
                    </p>

                    <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Name of your spot"
                    />
                    {errors.name && <p className="error">{errors.name}</p>}
                </div>

                <div className="form-section">
                    <h2>Set a base price for your spot</h2>
                    <p>
                        Competitive pricing can help your listing stand out and rank higher in
                        search results.
                    </p>

                    <input
                        type="number"
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                        placeholder="Price per night (USD)"
                        min="0"
                        step="0.01"
                    />
                    {errors.price && <p className="error">{errors.price}</p>}
                </div>

                <div className="form-section">
                    <h2>Liven up your spot with photos</h2>
                    <p>Submit a link to at least one photo to publish your spot.</p>

                    <div className="form-group">
                        <input
                            type="text"
                            value={previewImage}
                            onChange={e => setPreviewImage(e.target.value)}
                            placeholder="Preview Image URL"
                        />
                        {errors.previewImage && <p className="error">{errors.previewImage}</p>}
                    </div>

                    <div className="form-group">
                        <input
                            type="text"
                            value={imageUrl1}
                            onChange={e => setImageUrl1(e.target.value)}
                            placeholder="Image URL"
                        />
                    </div>

                    <div className="form-group">
                        <input
                            type="text"
                            value={imageUrl2}
                            onChange={e => setImageUrl2(e.target.value)}
                            placeholder="Image URL"
                        />
                    </div>

                    <div className="form-group">
                        <input
                            type="text"
                            value={imageUrl3}
                            onChange={e => setImageUrl3(e.target.value)}
                            placeholder="Image URL"
                        />
                    </div>

                    <div className="form-group">
                        <input
                            type="text"
                            value={imageUrl4}
                            onChange={e => setImageUrl4(e.target.value)}
                            placeholder="Image URL"
                        />
                    </div>
                </div>

                <button type="submit">Create Spot</button>
            </form>
        </div>
    );
}

export default SpotForm