import {  useState } from "react";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { Button, Modal } from "antd";
import { Badge, Space } from "antd";
import { Switch } from "antd";
import { BsQuestionCircle } from "react-icons/bs";
import "../index.css";
import toast from "react-hot-toast";

export interface prop {
  todoItem: {
    completed: boolean;
    id: number;
    title: string;
    userId: number;
  };
  handleDeleteTodo: (message: number) => void;
  handleUpdateTodo: (todoItem: {
    completed: boolean;
    id: number;
    title: string;
    userId: number;
  }) => void;
}
const Todo = ({ todoItem, handleDeleteTodo, handleUpdateTodo }: prop) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTodo, setEditTodo] = useState(false);
  const [inputVal, setInputVal] = useState(todoItem.title);
  
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    if (editTodo) {
      if (!inputVal.length || /^\s*$/.test(inputVal)) {
        toast.error("Please enter a valid title!", {
          duration: 4000,
        });
      } else {
        handleUpdateTodo({
          id: todoItem.id,
          completed: todoItem.completed,
          userId: todoItem.userId,
          title: inputVal,
        });
      }
    } else {
      handleDeleteTodo(todoItem.id);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setInputVal(todoItem.title);
  };

  const handleOnChange = (event: any) => {
    setInputVal(event.target.value);
  };

  return (
    <Space direction="vertical" size="middle">
      <div
        className={`card min-w-64 flex shadow-md shadow-gray-500 rounded-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110  duration-300 `}
      >
        <Badge.Ribbon
          text={todoItem.completed ? "Completed" : "Pending"}
          color={todoItem.completed ? "blue" : "red"}
          className=" text-lg"
        >
          <Modal
            title={editTodo && "Edit Todo"}
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            {editTodo ? (
              <>
                <p className="text-lg">Title</p>
                <input
                  // defaultValue={todoItem.title}
                  value={inputVal}
                  
                  onChange={(event) => {
                    handleOnChange(event);
                  }}
                  type="text"
                  placeholder="Enter Title "
                  className="input input-bordered input-warning w-full max-w-xs my-2 "
                />
              </>
            ) : (
              <div className=" text-center">
                <div className="flex flex-wrap justify-center ">
                  <BsQuestionCircle className=" text-red-300 text-[6rem] pb-4" />
                </div>
                <p className="text-2xl font-bold ">Are you sure ?</p>
                <p className="text-xl font-semibold text-gray-500 ">
                  Do you want to delete this Todo.
                </p>
              </div>
            )}
          </Modal>
          <div className="card-body h-70 border-[.5px] border-gray-400  rounded-lg">
            <div>
              <p className="text-2xl">Title</p>
              <div className="overflow-y-auto break-words scroll-smooth h-[5rem] custom-scrollbar">
                <p className={"text-gray-500  py-2  "}>{todoItem.title}</p>
              </div>
            </div>
            <div className="card-actions  gap-5 flex-col justify-end items-center  grow">
              <div>
                Completed :{" "}
                <Switch
                  checked={todoItem.completed}
                  onChange={() => {
                    handleUpdateTodo({
                      id: todoItem.id,
                      completed: !todoItem.completed,
                      userId: todoItem.userId,
                      title: todoItem.title,
                    });
                  }}
                />
              </div>
              <div>
                <Button
                  className="btn bg-blue-500  text-white rounded-lg shadow-lg hover:bg-blue-600 mx-2"
                  onClick={() => {
                    setEditTodo(true);
                    showModal();
                  }}
                >
                  <FiEdit className=" text-2xl" />
                </Button>
                <button
                  className="btn bg-red-500 text-white  rounded-lg shadow-lg hover:text-red-600 hover:bg-white hover:border-red-600  mx-2"
                  onClick={() => {
                    setEditTodo(false);
                    showModal();
                  }}
                >
                  <MdDelete className=" text-2xl " />
                </button>
              </div>
            </div>
          </div>{" "}
        </Badge.Ribbon>
      </div>
    </Space>
  );
};

export default Todo;
