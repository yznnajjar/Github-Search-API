import { END_POINT } from "../lib/constant";
import axios from 'axios';

export const fetchUsers = async (username) => {
  const res = await axios.get(`${ END_POINT }/search/users?q=user:${ username }`);
  return res.data?.items || "";
};
