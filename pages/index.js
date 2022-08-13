import React  from "react";
// Components
import { Layout, DropDownWithSearch, UsersAndReposTable } from "../components";
// Hooks
import useUser from "../lib/hooks/useUser";
// Styles
import styles from "../styles/Home.module.scss";

const Home = () => {
  const { userData, isUserSuccess } = useUser();
  // const { isReposFetching, reposData, isReposSuccess, reposError, fetchNextPage } = useRepos();


  return (
    <Layout>
      <div className={ styles["home-page__container"] }>
        <DropDownWithSearch />
        {isUserSuccess && <UsersAndReposTable data={userData}/>}
      </div>
    </Layout>
  );
};

export default Home;
