/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import ListHeader from "./components/ListHeader";
import axios from "axios";
import ListItem from "./components/ListItem";
import Auth from "./components/Auth";
import { useCookies } from "react-cookie";

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [tasks, setTasks] = useState([]);

  const authToken = cookies.AuthToken;
  const userEmail = cookies.Email;

  //! GET DATA FROM DATABASE
  const getData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/todos/${userEmail}`
      );

      setTasks(response.data);
    } catch (error) {
      console.log("Error :: getData ::", error);
    }
  };

  useEffect(() => {
    if (authToken) {
      getData();
    }
  }, []);

  const sortedTasks = tasks?.sort(
    (a, b) => new Date(a.data) - new Date(b.data)
  );

  // console.log(sortedTasks)
  //! sortedTasks --> Array of objects

  return (
    <div className=" relative min-h-screen  flex items-center flex-wrap bg-gradient-to-r from-sky-500 to-indigo-500">
      <div className="h-max mx-auto p-4  bg-indigo-600 shadow-xl rounded-lg ">
        {!authToken && <Auth />}
        {authToken && (
          <>
            <ListHeader listName={"🌍 Plan your day"} getData={getData} />

            <p className="text-end font-mono pb-2 text-purple-400 ">
              <span className="">Welcome back</span>{" "}
              <span className="shadow p-1 text-indigo-400 rounded-full">
                {userEmail}
              </span>
            </p>

            {sortedTasks?.map((task) => (
              <ListItem key={task.id} task={task} getData={getData} />
            ))}

            <p className="font-serif pt-4 text-black/50">
              &#169; Do Well & Happy Coding :-){" "}
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
