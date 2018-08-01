import { createAction, handleActions } from "redux-actions";

export const RESET_YAML = "RESET_YAML";
export const clearYaml = createAction(RESET_YAML);

const initialState = {
  sections: null,
  groups: null,
  countryFields: null,
  allFields: null,
  blocks: null,
  elements: null,
  county: null,
  values: null,
  languages: null,
  currentValues: {},
  currentLanguage: null
};

const reducer = handleActions(
  {
    ON_IMPORT: (state, action) => {
      return {
        ...state,
        yml: null
      };
    },
    ON_GENERATE: (state, action) => {
      return {
        ...state,
        yml: null
      };
    },
    ON_CHANGE_LANGUAGE: (state, action) => {
      return {
        ...state,
        yml: null
      };
    }
  },
  initialState
);
export default reducer;
