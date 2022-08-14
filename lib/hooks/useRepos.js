import React, { useContext } from "react";
import { useInfiniteQuery, useQueries } from "@tanstack/react-query";
// Context
import { AppContext } from "../context/AppContext";
// Helpers
import { REPOSITORY, STATE_KEY_FOR_FILTERS } from "../constant";
import { fetchFilesExtension, fetchForkedUsers, fetchRepos } from "../../api/repos";

export default function useRepos() {
  const { state } = useContext(AppContext);

  const { data, hasNextPage, fetchNextPage, isSuccess, isFetching, error } = useInfiniteQuery(
    ["searchRepos", state[STATE_KEY_FOR_FILTERS.SEARCH_FIELD]],
    ({ pageParam = 1 }) => fetchRepos(state[STATE_KEY_FOR_FILTERS.SEARCH_FIELD], pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        if (!lastPage?.length) return;

        const maxPage = lastPage.total_count / 10;
        const nextPage = allPages["page"][0].total_count + 1;
        return nextPage <= maxPage ? nextPage : undefined;
      },
      enabled: state[STATE_KEY_FOR_FILTERS.SEARCH_FIELD].length > 0 && state[STATE_KEY_FOR_FILTERS.USER_TYPE_SELECTED] === REPOSITORY,
      refetchOnWindowFocus: false,
      retry: 1,
      cacheTime: 100,
      staleTime: 5000,
    });

  const forkedUsersQuery = useQueries({
    queries: (data && data.pages[0]?.items) ? data.pages[0].items.map(item => {
      return {
        queryFn: async () =>await fetchForkedUsers(item.name, item.owner.login),
        queryKey: ["forks", item.id],
        retry: false,
        enabled: data && data?.pages[0]?.items && state[STATE_KEY_FOR_FILTERS.SEARCH_FIELD].length > 0,
        refetchOnWindowFocus: false,
        onSuccess: (successItem) => item['forkedUsers'] = successItem,
        staleTime : 5000,
        cacheTime : 10
      };
    }) : [],
  });

  const fileExtsQuery = useQueries({
    queries: (data && data.pages[0]?.items) ? data.pages[0].items.map(item => {
      return {
        queryFn: async() => await fetchFilesExtension(item.name, item.owner.login),
        queryKey: ["filesExt", item.id],
        retry: false,
        refetchOnWindowFocus: false,
        enabled: data && data?.pages[0]?.items && state[STATE_KEY_FOR_FILTERS.SEARCH_FIELD].length > 0,
        onSuccess: (successItem) => item['filesExt'] = successItem || "Could Not Found Files Extension",
        staleTime : 5000,
        cacheTime : 10
      };
    }) : [],
  });


  const isAllFileExtsFinished = fileExtsQuery?.length ? fileExtsQuery.every(query => query.isFetching === true) : false;
  const isAllForkedUsersFinished = forkedUsersQuery.length ? forkedUsersQuery.every(query => query.isFetching === true) : false;

  return {
    isReposFetching: isFetching,
    reposData: data?.pages[0]?.items || [],
    isReposSuccess: isSuccess,
    reposError: error,
    fetchNextPage: fetchNextPage,
    isQueriesFetching : isAllFileExtsFinished || isAllForkedUsersFinished,
  };
};
