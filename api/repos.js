import { END_POINT } from "../lib/constant";
import axios from "axios";

export const config = {
  headers: {
    "Content-type": "application/json",
    "Authorization": `Bearer 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`, // Personal Access Token To Trigger Github Search API
  },
};

const extractFilesExtension = (data) =>{
  const filesExt = new Set(null);
  data?.tree.filter(item => item.type === "blob").forEach(item => {

    if(!item.path?.split(".")?.length) return;

    //Check For The Length Of Extension Files
    if(item.path?.split(".").slice(-1)[0]?.length < 10){
      filesExt.add(item.path?.split(".")?.slice(-1)?.join(""));
    }

  });
  return [...filesExt];
};

export const fetchRepos = async (username, pageNum = 1) => {
  if(username.length === 0) return;
  const response = await axios.get(`${ END_POINT }/search/repositories?q=is:public+name:${ username }+forks:>=4&per_page=5&page=${pageNum}`, config);
  return response.data
};

export const fetchForkedUsers = async (repoName, OwnerName) => {
  if(repoName.length === 0) return;

  const response = await axios.get(`${ END_POINT }/repos/${OwnerName}/${repoName}/forks`, config);
  const findLastUsersForked = response.data.slice(0,3).map(item => ({name: item.owner.login, profileLink : item.html_url, repoName :item.name}));
  return findLastUsersForked;
};

export const fetchFilesExtension = async (repoName, ownerName) => {
  if(repoName.length === 0) return;
  const response = await axios.get(`${ END_POINT }/repos/${ownerName}/${repoName}/git/trees/master?recursive=1`, config);

  return extractFilesExtension(response.data)
};
