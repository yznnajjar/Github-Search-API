import React, { useContext } from "react";
import { Spin } from "antd";
// Components
import { Layout, DropDownWithSearch, UsersAndReposTable } from "../components";
// Hooks
import useUser from "../lib/hooks/useUser";
import useRepos from "../lib/hooks/useRepos";
// Constants
import { REPOSITORY, STATE_KEY_FOR_FILTERS, USER } from "../lib/constant";
import { AppContext } from "../lib/context/AppContext";
// Styles
import styles from "../styles/Home.module.scss";

const Home = () => {
  const { state } = useContext(AppContext);
  const { userData } = useUser();
  const {
    isReposFetching,
    reposData,
    isReposSuccess,
    isQueriesFetching,
  } = useRepos();

  return (
    <Layout>
      <div className={ styles["home-page__container"] }>
        <DropDownWithSearch />
        { isReposFetching || isQueriesFetching && <Spin /> }
        { state[STATE_KEY_FOR_FILTERS.USER_TYPE_SELECTED] === USER && (
          <UsersAndReposTable
            data={ userData } />
        ) }
        { state[STATE_KEY_FOR_FILTERS.USER_TYPE_SELECTED] === REPOSITORY && (
          <UsersAndReposTable
            data={ reposData }
            isReposSuccess={ isReposSuccess }
            isQueriesFetching={ isQueriesFetching }
          />
        ) }
      </div>
    </Layout>
  );
};

export default Home;
