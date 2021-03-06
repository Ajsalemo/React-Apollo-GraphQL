// * --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import { combineReducers } from 'redux';

// Types
import { TOGGLE_DARK_MODE_ON, TOGGLE_DARK_MODE_OFF } from './types';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const toggleDarkMode = (state = { dark_mode: false }, action) => {
    switch (action.type) {
        case TOGGLE_DARK_MODE_ON:
            return {
                dark_mode: true
            }
        case TOGGLE_DARK_MODE_OFF:
            return {
                dark_mode: false
            }
        default:
            return state;
    }
};

// ----------------------------------------------------------------------------------------------------- //

const rootReducer = combineReducers({
    toggleDarkMode
});

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

export default rootReducer;

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

