import React, { useContext, useEffect, useState } from "react";
import { useInfiniteQuery, useQueries } from "@tanstack/react-query";
// Context
import { AppContext } from "../context/AppContext";
// Helpers
import { REPOSITORY, STATE_KEY_FOR_FILTERS } from "../constant";
import { fetchFilesExtension, fetchForkedUsers, fetchRepos } from "../../api/repos";

export default function useRepos() {
  const { state } = useContext(AppContext);
  const [dataForAllPages, setDataForAllPages] = useState([]);

  const { data, hasNextPage, fetchNextPage, isSuccess, isFetching, error } = useInfiniteQuery(
    ["searchRepos", state[STATE_KEY_FOR_FILTERS.SEARCH_FIELD]],
    async({ pageParam = 1 }) =>await fetchRepos(state[STATE_KEY_FOR_FILTERS.SEARCH_FIELD], pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        const maxPage = Math.floor(lastPage?.total_count / 5);
        const nextPage = allPages.length + 1;
        return nextPage <= maxPage ? nextPage : undefined;
      },
      enabled: state[STATE_KEY_FOR_FILTERS.SEARCH_FIELD].length > 0 && state[STATE_KEY_FOR_FILTERS.USER_TYPE_SELECTED] === REPOSITORY,
      refetchOnWindowFocus: false,
      retry: 1,
      cacheTime: 1000,
      staleTime: 5000,
    });

  const forkedUsersQuery = useQueries({
    queries: data?.pages?.length ? data.pages[[!data.pageParams.at(-1) ? 0 : data.pageParams.at(-1) - 1]].items.map(item => {
      return {
        queryFn: async () => await fetchForkedUsers(item.name, item.owner.login),
        queryKey: ["forks", item.id],
        retry: false,
        enabled: data && state[STATE_KEY_FOR_FILTERS.SEARCH_FIELD].length > 0,
        refetchOnWindowFocus: false,
        onSuccess: (successItem) => item["forkedUsers"] = successItem,
        staleTime: 5000,
        cacheTime: 1000,
      };
    }) : [],
  });

  const fileExtsQuery = useQueries({
    queries: data?.pages?.length ? data.pages[[!data.pageParams.at(-1) ? 0 : data.pageParams.at(-1) - 1]].items.map(item => {
      return {
        queryFn: async () => await fetchFilesExtension(item.name, item.owner.login),
        queryKey: ["filesExt", item.id],
        retry: false,
        refetchOnWindowFocus: false,
        enabled: data && state[STATE_KEY_FOR_FILTERS.SEARCH_FIELD].length > 0,
        onSuccess: (successItem) => item["filesExt"] = successItem || "Could Not Found Files Extension",
        staleTime: 5000,
        cacheTime: 1000,
      };
    }) : [],
  });

  //Effect To Update State
  useEffect(() => {
    if (!data?.pages) return;

    const nextItems = data.pages[!data.pageParams.at(-1) ? 0 : data.pageParams.at(-1) - 1]?.items;
    setDataForAllPages(prevArr => [...prevArr, ...nextItems]);
  }, [data]);

  //Effect To Reset State With Keep API Results Cached
  useEffect(() => {
    setDataForAllPages([]);
  }, [state[STATE_KEY_FOR_FILTERS.SEARCH_FIELD]]);

  //Effect To Track And Fetch Next Page When Scrolling
  useEffect(() => {
    let fetching = false;

    const onScroll = async (event) => {
      const { scrollHeight, scrollTop, clientHeight } = event.target.scrollingElement;

      if (!fetching && scrollHeight - scrollTop <= clientHeight) {
        fetching = true;
        if(hasNextPage){
          await fetchNextPage();
        }
        fetching = false;
      }
    };

    document.addEventListener("scroll", onScroll);
    return () => document.removeEventListener("scroll", onScroll);
  }, [hasNextPage]);

  const isAllFileExtsFinished = fileExtsQuery?.length ? fileExtsQuery.every(query => query.isFetching === true) : false;
  const isAllForkedUsersFinished = forkedUsersQuery.length ? forkedUsersQuery.every(query => query.isFetching === true) : false;

  return {
    isReposFetching: isFetching,
    reposData: dataForAllPages || [],
    isReposSuccess: isSuccess,
    reposError: error,
    fetchNextPage: fetchNextPage,
    isQueriesFetching: isAllFileExtsFinished || isAllForkedUsersFinished || isFetching,
    hasNextPage
  };
};
