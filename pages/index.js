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
  } = useRepos();

  return (
    <Layout>
      <div className={ styles["home-page__container"] }>
        <DropDownWithSearch />
        { isReposFetching && <Spin /> }
        { isUserSuccess || isReposSuccess && (
          <UsersAndReposTable
            data={ isReposSuccess ? reposData : userData }
            isReposSuccess={ isReposSuccess }
          />
        )
        }
      </div>
    </Layout>
  );
};

export default Home;
