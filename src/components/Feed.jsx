import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((state) => state.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) return;

  if (!Boolean(feed.length))
    return (
      <div className="flex justify-center">
        <h1 className="flex justify-center my-10">No new users founds!</h1>;
      </div>
    );

  return (
    <div className="flex justify-center">
      <UserCard user={feed[0]} showActions={true} />
    </div>
  );
};

export default Feed;
