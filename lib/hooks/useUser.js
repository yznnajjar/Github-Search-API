import React,{useContext} from 'react';
import { useQuery } from '@tanstack/react-query';
// Context
import { AppContext } from "../context/AppContext";
// Helpers
import { STATE_KEY_FOR_FILTERS, USER } from "../constant";
import { fetchUsers } from "../../api/users";

export default function useUser() {
  const { state } = useContext(AppContext);

  const {isFetching, error, data, isSuccess} = useQuery(
    ["searchUsers", state[STATE_KEY_FOR_FILTERS.SEARCH_FIELD]],
    () => fetchUsers(state[STATE_KEY_FOR_FILTERS.SEARCH_FIELD]),
    {
      enabled: state[STATE_KEY_FOR_FILTERS.SEARCH_FIELD].length > 0 && state[STATE_KEY_FOR_FILTERS.USER_TYPE_SELECTED] === USER,
      refetchOnWindowFocus: false,
      retry: 1,
      cacheTime : 100,
      staleTime: 5000
    });

  return {
    isUserFetching : isFetching,
    userData : data,
    isUserSuccess : isSuccess,
    userError : error
  }
};
