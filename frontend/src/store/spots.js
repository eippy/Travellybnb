import { csrfFetch } from "./csrf";
//ACTION TYPES


const GET_ALL_SPOTS = 'spots/getAllSpots';
const GET_SPOT_DETAILS = 'spots/getSpotDetails';
const CREATE_SPOT = 'spots/createSpots'
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
//THUNK

export const spotsThunk = () => async( dispatch)=> {
    try {
        const res = await csrfFetch('/api/spots');
        if (res.ok) {
            const data = await res.json();
            dispatch(getAllSpots(data));
        } else {
            throw res;
        }
    } catch (error) {
        console.error('Can not retrieve spots:', error);
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
            const spot = await res.json();
            dispatch(createSpot(spot));
            return spot;
        } else {
            throw res;
        }
        
    } catch (error) {
        return {errors: { submit: "Error has occurred while creating a spot"}}
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
        default:
            return state;
    }
};

export default spotsReducer;
