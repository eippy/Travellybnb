//ACTION TYPES

const GET_ALL_SPOTS = "spots/getAllSpots";
const GET_SPOT_DETAILS = "spots/getSpotDetails"

//ACTION CREATOR

const getAllSpots = (spots) => ({
    type: GET_ALL_SPOTS,
    payload: spots
});

const getSpotDetails = (spot) => ({
    type: GET_SPOT_DETAILS,
    payload: spot
})

//THUNK

export const spotsThunk = () => async (dispatch) => {
    try {
        const res = await fetch('/api/spots');
        if (res.ok) {
            const data = await res.json();
            dispatch(getAllSpots(data));
        } else {
            throw res;
        }
    } catch (error) {
        console.error("Can not retrieve spots:", error)
    }
};

export const spotDetailsThunk = (spotId) => async (dispatch) => {
    try {
        const res = await fetch(`/api/spots/${spotId}`)
        if (res.ok) {
            const data = await res.json();
            dispatch(getSpotDetails(data))
        } else {
            throw res;
        }
    } catch (error) {
        console.error("Can not retrieve spot details:", error)
    }
}

//REDUCER

const initialState = {
    allSpots: [],
    byId: {},
    currentSpot: null
};

const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_SPOTS: {

            if (!action.payload) return state;
            
            const allSpots = action.payload.map(spot => spot.id)
            const byId = {}
            action.payload.forEach(spot => {
                byId[spot.id] = spot;
            });
            return {
                ...state,
                allSpots,
                byId
            };
        }
        case GET_SPOT_DETAILS: {
            return {
                ...state,
                currentSpot: action.payload
            }
        }   
        default:
            return state;
    }
}





export default spotsReducer