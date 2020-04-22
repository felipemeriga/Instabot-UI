import * as types from "../actions/types";


const initialState = {
    data: {
        content: [],
        pageable: {},
        totalElements: 0,
        last: false,
        totalPages: 1,
        size: 5,
        number: 0,
        first: true,
        sort: {},
        numberOfElements: 0,
        empty: false
    },
    selected: {},
    loading: false,
    error: false,
    message: ""
};

export default function categoryTable(state = initialState, action = {}) {
    switch (action.type) {
        case types.CATEGORY_TABLE['GET']:
            return {
                ...state,
                loading: true,
                error: false
            };
        case types.CATEGORY_TABLE['GET_SUCCESS']:
            return {
                ...state,
                data: action.payload,
                loading: false,
                error: false
            };
        case types.CATEGORY_TABLE['GET_ERROR']:
            return {
                ...state,
                data: initialState.data,
                loading: false,
                error: true,
                message: action.payload.apierror.message
            };
        case types.CATEGORY_TABLE['POST']:
            return {
                ...state,
                loading: true,
                error: false
            };
        case types.CATEGORY_TABLE['POST_SUCCESS']:
            // state.data.content.push(action.payload);
            return {
                ...state,
                loading: false,
                error: true
            };
        case types.CATEGORY_TABLE['POST_ERROR']:
            return {
                ...state,
                loading: false,
                error: true,
                message: action.payload.apierror.message
            };
        case types.CATEGORY_TABLE['PUT']:
            return {
                ...state,
                selected: action.payload,
                loading: true,
                error: false
            };
        case types.CATEGORY_TABLE['PUT_SUCCESS']:
            const elementsIndex = state.data.content.findIndex(element => element.id === action.payload.id);
            state.data.content[elementsIndex] = action.payload;
            return {
                ...state,
                loading: false,
                error: true
            };
        case types.CATEGORY_TABLE['PUT_ERROR']:
            return {
                ...state,
                loading: false,
                error: true,
                message: action.payload.apierror.message
            };
        case types.CATEGORY_TABLE['DELETE']:
            return {
                ...state,
                selected: action.payload,
                loading: true,
                error: false
            };
        case types.CATEGORY_TABLE['DELETE_SUCCESS']:
            const deleteIndex = state.data.content.findIndex(element => element.id === state.selected.id);
            state.data.content.splice(deleteIndex,1);
            return {
                ...state,
                loading: false,
                error: true
            };
        default:
            return state;
    }
}