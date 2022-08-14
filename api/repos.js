import { END_POINT } from "../lib/constant";
import axios from "axios";

export const fetchRepos = async (username, pageNum = 1) => {
  if(username.length === 0) return;
  const response = await axios.get(`${ END_POINT }/search/repositories?q=is:public+name:${ username }+forks:>=4&per_page=10&page=${pageNum}`);
  return response.data
};

export const fetchForkedUsers = async (repoName, OwnerName) => {
  if(repoName.length === 0) return;

  const response = await axios.get(`${ END_POINT }/repos/${OwnerName}/${repoName}/forks`);
  const findLastUsersForked = response.data.slice(0,3).map(item => ({name: item.owner.login, profileLink : item.html_url, repoName :item.name}));
  return findLastUsersForked;
};

export const fetchFilesExtension = async (repoName, ownerName) => {
  if(repoName.length === 0) return;
  const response = await axios.get(`${ END_POINT }/repos/${ownerName}/${repoName}/git/trees/master?recursive=1`);
  if(response?.data){
    const filesExt = new Set(null);
    response.data?.tree.filter(item => item.type === "blob").forEach(item => {
      console.log(item.path?.split(".").slice(-1)[0],"item.path?.split(\".\").slice(-1)[0]");
      if(item.path?.split(".").slice(-1)[0]?.length < 10 && item.path?.split(".")?.length > 1){
       filesExt.add(item.path?.split(".")?.slice(-1)?.join(""));
      }
    });
    return [...filesExt];
  }
};
