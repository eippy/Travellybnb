import React from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { deleteSpotThunk } from '../../store/spots';
import './DeleteSpotModal.css';

function DeleteSpotModal({ spotId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleDelete = async () => {
        await dispatch(deleteSpotThunk(spotId));
        closeModal();
    };

    return (
        <div>
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to remove this spot?</p>

            <div>
                <button className="delete-confirm-button" onClick={handleDelete}>
                    Yes (Delete Spot)
                </button>

                <button className="delete-cancel-button" onClick={closeModal}>
                    No (Keep Spot)
                </button>
            </div>
        </div>
    );
}

export default DeleteSpotModal;
