import { useState } from "react";
import toast from "react-hot-toast";
interface prop {
  handleAddTodo: (message: string) => void;
}

function CreateTodo({ handleAddTodo }: prop) {
  const [inputVal, setInputVal] = useState("");

  const handleOnChange = (event: { target: { value: any } }) => {
    setInputVal(event.target.value);
  };
  return (
    <div className=" h-20 bg-current flex justify-start items-center  ">
      <p className="text-3xl text-purple-400 font-bold mx-6">TODO APP</p>
      <div className="flex w-[70%] justify-center items-center">
        <input
          value={inputVal}
          onChange={handleOnChange}
          type="text"
          placeholder="Enter Todo Title "
          className="input input-bordered input-accent w-full max-w-xs max-h-10 mx-4 "
        />

        <button
          className="btn bg-green-500 text-white  rounded-lg shadow-lg hover:bg-green-600 "
          onClick={() => {
           (!inputVal.length || /^\s*$/.test(inputVal))
              ? toast.error("Please enter a valid title! ", {
                  duration: 4000,
                })
              : handleAddTodo(inputVal);
            setInputVal("");
            console.log();
          }}
        >
          Add
        </button>
      </div>
      <div className="avatar grow flex justify-center">
        <div className="w-14 rounded-full">
          <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
    </div>
  );
}

export default CreateTodo;
