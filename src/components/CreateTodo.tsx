import { useState } from "react";
import toast from "react-hot-toast";
import { IoMdAddCircle } from "react-icons/io";
interface prop {
  handleAddTodo: (message: string) => void;
}

function CreateTodo({ handleAddTodo }: prop) {
  const [inputVal, setInputVal] = useState("");

  const handleOnChange = (event: { target: { value: any } }) => {
    setInputVal(event.target.value);
  };
  return (
    <div className=" max-h-20 w-screen bg-gray-800 grid grid-cols-4 items-center p-3 ">
      <p className="text-2xl md:text-3xl text-purple-400 font-bold col-span-1 text-center">
        TODO APP
      </p>
      <div className="flex col-span-2 justify-center items-center">
        <input
          value={inputVal}
          onChange={handleOnChange}
          type="text"
          placeholder="Enter Todo Title "
          className="input input-bordered input-accent w-full max-w-xs max-h-10 mx-4 "
        />

        <button
          className=" max-h-10 p-3 bg-green-500 text-white font-bold  rounded-lg shadow-lg hover:bg-green-600 "
          onClick={() => {
            !inputVal.length || /^\s*$/.test(inputVal)
              ? toast.error("Please enter a valid title! ", {
                  duration: 4000,
                })
              : handleAddTodo(inputVal);
            setInputVal("");
          }}
        >
          <IoMdAddCircle  />
        </button>
      </div>
      <div className="col-span-1 avatar grow flex justify-center">
        <div className="w-14 rounded-full">
          <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
    </div>
  );
}

export default CreateTodo;
