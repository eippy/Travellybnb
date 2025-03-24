import { csrfFetch } from "./csrf";

// ACTION TYPES
const GET_SPOT_REVIEWS = 'reviews/getAllReviews'

// ACTION CREATORS
const getSpotReviews = (reviews) => ({
    type: GET_SPOT_REVIEWS,
    payload: reviews
});

// THUNKS
export const getSpotReviewsThunk = (spotId) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/spots/${spotId}/reviews`)

        if (res.ok) {
            const data = await res.json();
            dispatch(getSpotReviews(data))
        } else {
            throw res;
        }
    } catch (error) {
        return error; 
    }
}

// REDUCERS
const initialState = {
    allReviews: [],
    byId: {}
}

const reviewsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_SPOT_REVIEWS: {
            const reviewsArr = action.payload.Reviews;
            newState = { ...state };
            newState.allReviews = reviewsArr;

            let newByIdGetAllReviews = {};
            for (let review of reviewsArr) {
                newByIdGetAllReviews[review.id] = review;
            }
            newState.byId = newByIdGetAllReviews;

            return newState;
        }
        default:
            return state;
    }
}




export default reviewsReducer;