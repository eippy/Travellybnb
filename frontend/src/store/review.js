import { csrfFetch } from './csrf';


// ACTION TYPES
const GET_SPOT_REVIEWS = 'reviews/getAllReviews';
const ADD_REVIEW = 'reviews/addReview';
const DELETE_REVIEW = 'reviews/deleteReview';

// ACTION CREATORS
const getSpotReviews = reviews => ({
    type: GET_SPOT_REVIEWS,
    payload: reviews,
});

const addReview = review => ({
    type: ADD_REVIEW,
    payload: review,
});

export const deleteReview = reviewId => ({
    type: DELETE_REVIEW,
    payload: reviewId,
});
// THUNKS
export const getSpotReviewsThunk = spotId => async dispatch => {
    try {
        const res = await csrfFetch(`/api/spots/${spotId}/reviews`);

        if (res.ok) {
            const data = await res.json();
            dispatch(getSpotReviews(data));
        } else {
            throw res;
        }
    } catch (error) {
        const errors = await error.json();
        return errors;
    }
};

export const createReviewThunk = (spotId, reviewData) => async (dispatch, getState) => {
    try {
        const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reviewData),
        });
        if (res.ok) {
            const newReview = await res.json();
            const { user } = getState().session;
            const reviewWithUser = {
                ...newReview,
                User: {
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                },
            };

            dispatch(addReview(reviewWithUser));
        } else {
            throw res;
        }
    } catch (error) {
        const errors = await error.json();
        return errors;
    }
};

export const deleteReviewThunk = reviewId => async dispatch => {
    try {
        const res = await csrfFetch(`/api/reviews/${reviewId}`, {
            method: 'DELETE',
        });

        if (res.ok) {
            dispatch(deleteReview(reviewId));
            return true;
        } else {
            throw res;
        }
    } catch (error) {
        const errors = await error.json();
        return errors;
    }
};
// REDUCERS
const initialState = {
    allReviews: [],
    byId: {},
};

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
        case ADD_REVIEW: {
            newState = { ...state };
            newState.allReviews = [action.payload, ...state.allReviews];

            newState.byId = {
                ...newState.byId,
                [action.payload.id]: action.payload,
            };
            return newState;
        }
        case DELETE_REVIEW: {
            newState = { ...state };
            newState.allReviews = state.allReviews.filter(review => review.id !== action.payload);
            const newById = { ...state.byId };
            delete newById[action.payload];
            newState.byId = newById;

            return newState;
        }
        default:
            return state;
    }
};

export default reviewsReducer;
