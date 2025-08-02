import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { BASE_URL } from "../utils/constants";
import { addConnections } from "../utils/connectionSlice";
import UserCard from "./UserCard";

const Connections = () => {
  const connections = useSelector((state) => state.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      // Handle Error Case
      console.error(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;

  if (!Boolean(connections.length))
    return (
      <div className="text-center my-10">
        <h1>No Connections Found</h1>
      </div>
    );

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-white text-3xl">Connections</h1>

      {connections.map((connection) => {
        const {
          _id,
          firstName,
          lastName,
          imageUrl,
          age,
          gender,
          about,
          skills,
        } = connection;

        return (
          <div
            key={_id}
            className="flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto"
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
            <Link to={"/chat/" + _id}>
              <button className="btn btn-primary">Chat</button>
            </Link>
          </div>
        );
      })}
    </div>
  );
};
export default Connections;
