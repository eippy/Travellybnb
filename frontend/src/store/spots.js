import { csrfFetch } from "./csrf";
//ACTION TYPES


const GET_ALL_SPOTS = 'spots/getAllSpots';
const GET_SPOT_DETAILS = 'spots/getSpotDetails';
const CREATE_SPOT = 'spots/createSpots'
const UPDATE_SPOT = 'spots/updateSpot'
const DELETE_SPOT = 'spots/deleteSpot'
//ACTION CREATOR

const getAllSpots = (spots) => ({
    type: GET_ALL_SPOTS,
    payload: spots,
});

const getSpotDetails = (spot) => ({
    type: GET_SPOT_DETAILS,
    payload: spot,
});

const createSpot = (spot) => ({
    type: CREATE_SPOT,
    payload: spot
})
const updateSpot = (spot) => ({
    type: UPDATE_SPOT,
    payload: spot
})
const deleteSpot = (spotId) => ({
    type: DELETE_SPOT,
    payload: spotId
})
//THUNK

export const spotsThunk = () => async( dispatch)=> {
    try {
        const res = await csrfFetch('/api/spots');
        if (res.ok) {
            const data = await res.json();
            dispatch(getAllSpots(data));
            return data.Spots
        } else {
            throw res;
        }
    } catch (error) {
        return null;
    }
};

export const spotDetailsThunk = (spotId) => async dispatch => {
    try {
        const res = await csrfFetch(`/api/spots/${spotId}`);
        if (res.ok) {
            const data = await res.json();
            dispatch(getSpotDetails(data));
            return data;
        } else {
            throw res;
        }
    } catch (error) {
        console.error('Can not retrieve spot details:', error);
    }
};

export const createNewSpotThunk = (spotData) => async (dispatch) => {
    try {
        const res = await csrfFetch('/api/spots', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(spotData),
        })
        if (res.ok) {
            const newSpot = await res.json();
            dispatch(createSpot(newSpot));
            return newSpot;
        } else {
            throw res;
        }
       
    } catch (error) {
        return {errors: { submit: "Error has occurred while creating a spot"}}
    }
}

export const updateSpotThunk = (spotData, spotId) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/spots/${spotId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(spotData)
        })

        if (res.ok) {
            const newSpot = await res.json();
            dispatch(updateSpot(newSpot));
            return newSpot;
        } else {
            throw res;
        }
    } catch (error) {
        return {errors: { submit: "Error has occured while updating the spot"}}
    }
}

export const deleteSpotThunk = (spotId) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/spots/${spotId}`, {
            method: 'DELETE'
        })

        if (res.ok) {
            dispatch(deleteSpot(spotId))
            return { success: true}
        } else {
            throw res;
        }
    } catch (error) {
        return { errors: { message: 'Failed to delete spot' }}
    }
}
//REDUCER

const initialState = {
    allSpots: [],
    byId: {},
    currentSpot: null,
};

const spotsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_ALL_SPOTS: {
            const spotsArr = action.payload.Spots
            newState = { ...state }
            newState.allSpots = spotsArr;
            let newByIdGetAllSpots = {};
            for (let spot of spotsArr) {
                newByIdGetAllSpots[spot.id] = spot
            }
            newState.byId = newByIdGetAllSpots
            return newState
        }
        case GET_SPOT_DETAILS: {
            newState = { ...state }
            newState.currentSpot = action.payload;
            newState.byId[action.payload.id] = action.payload;
            return newState
        }
        case CREATE_SPOT: {
            newState = { ...state }
            newState.allSpots = [...state.allSpots, action.payload]
            newState.byId[action.payload.id] = action.payload
            return newState
        }
        case UPDATE_SPOT: {
            newState = { ...state };
            newState.allSpots = state.allSpots.map(spot =>
                spot.id === action.payload.id )
            newState.byId = { ...state.byId };
            newState.byId[action.payload.id] = action.payload
            return newState;
        }
        case DELETE_SPOT: {
            const spotId = action.payload;
            newState = { ...state };
            newState.allSpots = state.allSpots.filter(spot => spot.id !== spotId)
            const newById = { ...state.byId }
            delete newById[spotId];
            newState.byId = newById
            return newState
        }
        default:
            return state;
    }
};

export default spotsReducer;
