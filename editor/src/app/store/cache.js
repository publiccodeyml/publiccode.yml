import { createAction, handleActions } from "redux-actions";

export const SET_YAML = "SET_YAML";
export const RESET_YAML = "RESET_YAML";
export const SET_VERSIONS = "SET_VERSIONS";

export const saveYaml = createAction(SET_YAML);
export const clearYaml = createAction(RESET_YAML);
export const setVersions = createAction(SET_VERSIONS);

const initialState = {
  yml: null,
  versions: null
};

const reducer = handleActions(
  {
    SET_YAML: (state, action) => {
      return {
        ...state,
        yml: action.payload
      };
    },
    RESET_YAML: (state, action) => {
      return {
        ...state,
        yml: null
      };
    },
    SET_VERSIONS: (state, action) => {
      return {
        ...state,
        versions: action.payload
      };
    }
  },
  initialState
);
export default reducer;
