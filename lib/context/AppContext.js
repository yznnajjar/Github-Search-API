import React, { createContext, useCallback, useMemo, useReducer } from "react";
import { STATE_KEY_FOR_FILTERS } from "../constant";

const SET_SEARCH_FIELD = "SET_SEARCH_FIELD";
const SET_USER_TYPE = "SET_USER_TYPE";

const initialState = {
  [STATE_KEY_FOR_FILTERS.USER_TYPE_SELECTED] : "",
  [STATE_KEY_FOR_FILTERS.SEARCH_FIELD]       : "",
};

const Reducer = (state, action) => {
  switch (action.type) {
    case SET_USER_TYPE:
      return {
        ...state,
        [STATE_KEY_FOR_FILTERS.USER_TYPE_SELECTED] : action.payload
      };
    case SET_SEARCH_FIELD:
      return {
        ...state,
        [STATE_KEY_FOR_FILTERS.SEARCH_FIELD] : action.payload
      };
    default:
      return state;
  }
};

const AppProvider = ({children, defaultInitialState = {}}) => {
  const [state, dispatch] = useReducer(Reducer, {...initialState, ...defaultInitialState});

  const setUserType = useCallback((payload)=>{
    dispatch({type: SET_USER_TYPE, payload});
  },[]);

  const setUserOrReposSearchField = useCallback((payload)=>{
    dispatch({type: SET_SEARCH_FIELD, payload});
  },[]);

  const contextValue = useMemo(() => ({
    state,
    setUserType,
    setUserOrReposSearchField
  }), [state]);

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export const AppContext = createContext(initialState);

export default AppProvider;
