/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { X } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

function Modal({ mode, setShowModal, task, getData }) {
  // const mode = "create";
  const editMode = mode === "edit" ? true : false;
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [data, setData] = useState({
    user_email: editMode ? task.user_email : cookies.Email,
    title: editMode ? task.title : "",
    progress: editMode ? task.progress : 50,
    data: editMode ? "" : new Date(),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData({ ...data, [name]: value });
  };

  // console.log(data);

  const postData = async (e) => {
    e.preventDefault();
    if (editMode) return;
    try {
      const response = await axios.post("http://localhost:3000/todos", {
        ...data,
      });

      if (response.data) {
        setShowModal(false);
        getData();
      }
    } catch (error) {
      console.log("ERROR :: POSTDATA ::", error);
    }
  };

  const editData = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:3000/todos/${task.id}`,
        {
          ...data,
        }
      );

      if (response.data) {
        // console.log(response.data);
        setShowModal(false);
        getData();
      }
    } catch (error) {
      console.log("ERROR :: EDITDATA ::", error);
    }
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center flex-wrap">
      <div className="bg-white p-8 flex flex-col h-max w-[70vh] rounded-xl shadow-lg justify-center flex-wrap">
        <div className="flex justify-between p-4 mt-2 w-full">
          <h3 className="font-bold text-2xl">Let&apos;s {mode} your task</h3>
          <button
            className="hover:text-red-700 text-2xl  p-1 "
            onClick={() => setShowModal(false)}
          >
            {" "}
            <X />
          </button>
        </div>

        <form
          className="flex flex-col flex-wrap"
          onSubmit={(e) => (editMode ? editData(e) : postData(e))}
        >
          <input
            required
            maxLength={30}
            placeholder="your task goes here"
            name="title"
            value={data.title}
            onChange={handleChange}
            className="p-1 border-2 border-black/20 rounded"
          />
          <br />
          <label htmlFor="range" className="text-slate-800">
            Drag to select your current progress
          </label>
          <input
            required
            type="range"
            id="range"
            min="0"
            max="100"
            name="progress"
            value={data.progress}
            onChange={handleChange}
            className="m-3 overflow-hidden"
          />
          <input
            type="submit"
            className="p-2 border-2 mt-2 rounded-lg hover:bg-green-400 border-green-700 bg-green-300"
          />
        </form>
      </div>
    </div>
  );
}
export default Modal;
