import React, { useState, useContext, useEffect, useMemo } from "react";
import {Select, Input} from 'antd';
// Constants
import {
  REPOSITORY,
  SEARCH_FOR_Repositories,
  SEARCH_FOR_Repositories_OR_USERS,
  SEARCH_FOR_USERS,
  SELECT_SEARCH_TYPE,
  STATE_KEY_FOR_FILTERS,
  USER,
  USER_AND_REPOSITORY_OPTIONS,
} from "../../lib/constant";
// Context
import { AppContext } from "../../lib/context/AppContext";
// Hooks
import useDebounce from "../../lib/hooks/useDebounce";
// Styles
import styles from './DropDownWithSearch.module.scss';

const {Search} = Input;

export const DropDownWithSearch = () =>{
  const [searchText, setSearchText] = useState("");
  const {state, setUserType, setUserOrReposSearchField} = useContext(AppContext);

  // debounce searchText state by 0.5s
  const dSearchText = useDebounce(searchText, 1000);

  useEffect(()=> {
    setUserOrReposSearchField(dSearchText)
  },[dSearchText]);

  const showSearchPlaceHolder = useMemo(()=>{
    if(state[STATE_KEY_FOR_FILTERS.USER_TYPE_SELECTED] === USER){
      return SEARCH_FOR_USERS
    }

    if(state[STATE_KEY_FOR_FILTERS.USER_TYPE_SELECTED] === REPOSITORY){
      return SEARCH_FOR_Repositories
    }

    return SEARCH_FOR_Repositories_OR_USERS;
  },[state[STATE_KEY_FOR_FILTERS.USER_TYPE_SELECTED]]);

  return (
    <div className={styles['dd-search__container']}>
      <Select
        required
        placeholder={SELECT_SEARCH_TYPE}
        className={styles["search-type--dropdown"]}
        options={USER_AND_REPOSITORY_OPTIONS}
        value={state[STATE_KEY_FOR_FILTERS.USER_TYPE_SELECTED]}
        onChange={(value) => setUserType(value)}
      />

      <Search
        className={styles['dd-search__container--search-field']}
        allowClear
        placeholder={showSearchPlaceHolder}
        onChange={e => setSearchText(e.target.value)}
      />
    </div>
  )
};
