import React,{useEffect, useContext} from 'react';
import { useQuery } from '@tanstack/react-query';
import {message} from 'antd';
// Context
import { AppContext } from "../context/AppContext";
// Helpers
import { STATE_KEY_FOR_FILTERS, USER } from "../constant";
import { fetchUsers } from "../../api/users";

export default function useUser() {
  const { state } = useContext(AppContext);

  const {isFetching, error, data, isSuccess, isError} = useQuery(
    ["searchUsers", state[STATE_KEY_FOR_FILTERS.SEARCH_FIELD]],
    () => fetchUsers(state[STATE_KEY_FOR_FILTERS.SEARCH_FIELD]),
    {
      enabled: state[STATE_KEY_FOR_FILTERS.SEARCH_FIELD].length > 0 && state[STATE_KEY_FOR_FILTERS.USER_TYPE_SELECTED] === USER,
      refetchOnWindowFocus: false,
      retry: false,
      cacheTime : 100,
      staleTime: 5000
    });

  useEffect(()=>{
    if(isError){
      message.error('Could Not Find Any Data');
    }
  },[isError]);
  return {
    isUserFetching : isFetching,
    userData : data,
    isUserSuccess : isSuccess,
    userError : error,
    isUserError : isError
  }
};
