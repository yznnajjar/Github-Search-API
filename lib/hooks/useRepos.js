import React, { useContext, useEffect } from "react";
import { useInfiniteQuery, useQueries, useQuery } from "@tanstack/react-query";
// Context
import { AppContext } from "../context/AppContext";
// Helpers
import { REPOSITORY, STATE_KEY_FOR_FILTERS } from "../constant";
import { fetchForkedUsers, fetchRepos } from "../../api/repos";

export default function useRepos(pageNum) {
  const { state } = useContext(AppContext);

  const {data, hasNextPage, fetchNextPage, isSuccess, isFetching, error} = useInfiniteQuery(
    ["searchRepos", state[STATE_KEY_FOR_FILTERS.SEARCH_FIELD]],
    ({ pageParam = 1 }) => fetchRepos(state[STATE_KEY_FOR_FILTERS.SEARCH_FIELD], pageParam),
    {
      getNextPageParam: (lastPage, allPages) =>{
        console.log({lastPage, allPages});
        if(!lastPage?.length) return;

        const maxPage = lastPage.total_count / 10;
        console.log({maxPage});
        const nextPage = allPages['page'][0].total_count + 1;
        console.log(nextPage <= maxPage ? nextPage : undefined, "^".repeat(10))
        return nextPage <= maxPage ? nextPage : undefined;
      },
      enabled: state[STATE_KEY_FOR_FILTERS.SEARCH_FIELD].length > 0 && state[STATE_KEY_FOR_FILTERS.USER_TYPE_SELECTED] === REPOSITORY,
      refetchOnWindowFocus: false,
      retry: 1,
      cacheTime: 100,
      staleTime: 5000,
    });

  return {
    isReposFetching : isFetching,
    reposData : data,
    isReposSuccess : isSuccess,
    reposError : error,
    fetchNextPage: fetchNextPage
  }
};
