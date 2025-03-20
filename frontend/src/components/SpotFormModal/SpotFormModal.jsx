import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './SpotFormModal.css';

function SpotFormModal() {

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

    const handleSubmit = (e) => {
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
    }

    return (
        <>
        
        
        </>
    )
}