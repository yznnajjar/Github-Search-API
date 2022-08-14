import { END_POINT } from "../lib/constant";
import axios from 'axios';
import { config } from "./repos";

export const fetchUsers = async (username) => {
  const res = await axios.get(`${ END_POINT }/search/users?q=user:${ username }`,config);
  return res.data?.items || "";
};
