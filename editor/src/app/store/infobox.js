import { createAction, handleActions } from "redux-actions";

export const SHOW_INFO = "SHOW_INFO";
export const HIDE_INFO = "HIDE_INFO";

export const show = createAction(SHOW_INFO);
export const hide = createAction(HIDE_INFO);

const initialState = {
  title: null,
  description: null,
  visible: false
};

const reducer = handleActions(
  {
    SHOW_INFO: (state, action) => {
      console.log(action);
      return {
        ...state,
        title: action.payload.title,
        description: action.payload.description,
        visible: true
      };
    },
    HIDE_INFO: (state, action) => initialState
  },
  initialState
);
export default reducer;
