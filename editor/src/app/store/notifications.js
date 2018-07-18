import { createAction, handleActions } from "redux-actions";

export const ADD_NOTIFICATION = "ADD_NOTIFICATION";
export const RESET_NOTIFICATIONS = "RESET_NOTIFICATIONS";

export const notify = createAction(ADD_NOTIFICATION);
export const clearNotifications = createAction(RESET_NOTIFICATIONS);

const initialState = {
  item: null
};

const reducer = handleActions(
  {
    ADD_NOTIFICATION: (state, action) => {
      return {
        ...state,
        item: action.payload
      };
    },
    RESET_NOTIFICATIONS: (state, action) => initialState
  },
  initialState
);
export default reducer;

