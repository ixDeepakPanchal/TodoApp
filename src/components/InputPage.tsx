import { Flex, Radio } from "antd";
import { useState } from "react";
import { IoIosSearch } from "react-icons/io";

interface prop {
  handleSearchTodo: (message: string) => void;
  handleTypeTodo: (message: boolean) => void;
}

const InputPage = ({ handleSearchTodo, handleTypeTodo }: prop) => {
  const [inputVal, setInputVal] = useState<string>("");
  const handleOnChange = (event: { target: { value: string} }) => {
    setInputVal(event.target.value);
    handleSearchTodo(event.target.value);
  };

  return (
    <div className=" pt-4 ">
      <div className="flex justify-center py-4">
        <div className="input input-info flex items-center pr-0   h-[2.5rem]">
          <input
            value={inputVal}
            onChange={handleOnChange}
            type="text"
            placeholder="Search... "
            className="grow"
          />

          <button className="h-[100%]  rounded-r bg-blue-500 text-white border-none hover:bg-blue-600 px-4 ">
            <IoIosSearch className="text-2xl" />
          </button>
        </div>
      </div>

      <div className="flex justify-center">
        <Flex vertical gap="middle">
          <Radio.Group
            defaultValue={"All"}
            buttonStyle="solid"
            onChange={(event) => {
              handleTypeTodo(event.target.value);
            }}
          >
            <Radio.Button value={"All"}>All</Radio.Button>
            <Radio.Button value={true}>Completed</Radio.Button>
            <Radio.Button value={false}>Pending</Radio.Button>
          </Radio.Group>
        </Flex>
      </div>
    </div>
  );
};

export default InputPage;
