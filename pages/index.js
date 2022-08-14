import React from "react";
import { Spin } from "antd";
// Components
import { Layout, DropDownWithSearch, UsersAndReposTable } from "../components";
// Hooks
import useUser from "../lib/hooks/useUser";
import useRepos from "../lib/hooks/useRepos";
// Styles
import styles from "../styles/Home.module.scss";

const Home = () => {
  const { userData, isUserSuccess } = useUser();

  const {
    isReposFetching,
    reposData,
    isReposSuccess,
    isQueriesFetching
  } = useRepos();

  return (
    <Layout>
      <div className={ styles["home-page__container"] }>
        <DropDownWithSearch />
        { isReposFetching || isQueriesFetching && <Spin /> }
          <UsersAndReposTable
            data={ isReposSuccess ? reposData : userData }
            isReposSuccess={ isReposSuccess }
            isQueriesFetching={isQueriesFetching}
          />
      </div>
    </Layout>
  );
};

export default Home;
