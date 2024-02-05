/* eslint-disable react/prop-types */

import TickIcon from "./TickIcon";
import ProgressBar from "./ProgressBar";
import { useState } from "react";
import Modal from "./Modal";
import axios from "axios";

function ListItem({ task, getData }) {
  //! task --> Object

  const [showModal, setShowModal] = useState(false);

  const deleteItem = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/todos/${task.id}`
      );

      if (response.data) {
        getData();
      }
    } catch (error) {
      console.log("ERROR :: DELETEDATA ::", error);
    }
  };
  return (
    <div className="mt-3 flex justify-between items-center shadow w-full">
      <div className=" h-full flex w-[50%] p-2">
        <TickIcon />
        <p className="px-2 w-full font-mono"> {task.title}</p>
        <ProgressBar progress={task.progress} />
      </div>

      <div className="p-1 ">
        <button
          className="m-1 p-1 border border-black shadow-lg border-b-2 h-full rounded-l-lg rounded-r-lg  bg-transparent text-sm font-serif bg-sky-300 hover:bg-sky-400/55 "
          onClick={() => setShowModal(true)}
        >
          EDIT
        </button>
        <button
          className="m-1 p-1 border border-black shadow-lg border-b-2 h-full rounded-l-lg rounded-r-lg  bg-transparent text-sm font-serif bg-red-300 hover:bg-red-400/55"
          onClick={deleteItem}
        >
          DELETE
        </button>
      </div>
      {showModal && (
        <Modal
          mode={"edit"}
          setShowModal={setShowModal}
          task={task}
          getData={getData}
        />
      )}
    </div>
  );
}

export default ListItem;
