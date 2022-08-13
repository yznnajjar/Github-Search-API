import { END_POINT } from "../lib/constant";

export const fetchRepos = async (username, pageNum = 1) => {
  console.log({pageNum},"Fetch Repos");
  if(!username.length) return;
  const response = await fetch(`${ END_POINT }/search/repositories?q=is:public+name:${ username }&per_page=10&page=${pageNum}`);
  return response.json()
};

export const fetchForkedUsers = async ({repoName, OwnerName}) => {
  const response = await fetch(`${ END_POINT }/repos/${OwnerName}/${repoName}/forks`);
  return response.json().then(res=> res.items);
};

export const fetchFilesExtension = async (repoName, OwnerName) => {
  const response = await fetch(`${ END_POINT }/repos/${OwnerName}/${repoName}/git/trees/master?recursive=1`);
  return response.json();
};
