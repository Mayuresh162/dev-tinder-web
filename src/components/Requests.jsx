import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addRequests, removeRequest } from "../utils/requestSlice";
import UserCard from "./UserCard";

const Requests = () => {
  const requests = useSelector((state) => state.requests);
  const dispatch = useDispatch();

  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.log(err);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });

      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  console.log(requests);

  if (!requests) return;

  if (!Boolean(requests.length))
    return (
      <div className="text-center my-10">
        <h1>No Requests Found</h1>
      </div>
    );

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-white text-3xl">Connection Requests</h1>

      {requests.map((request) => {
        const {
          _id,
          firstName,
          lastName,
          imageUrl,
          age,
          gender,
          about,
          skills,
        } = request.fromUserId;

        return (
          <div
            key={_id}
            className=" flex justify-between items-center m-4 p-4 rounded-lg bg-base-300  mx-auto"
          >
            <UserCard
              user={{
                firstName,
                lastName,
                imageUrl,
                age,
                gender,
                about,
                skills,
              }}
              showActions={false}
            />
            <div>
              <button
                className="btn btn-primary mx-2"
                onClick={() => reviewRequest("rejected", request._id)}
              >
                Reject
              </button>
              <button
                className="btn btn-secondary mx-2"
                onClick={() => reviewRequest("accepted", request._id)}
              >
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Requests;
