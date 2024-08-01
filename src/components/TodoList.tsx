import Todo from "./Todo";
import { FloatButton } from "antd";
import LoadingPage from "./LoadingPage";

interface Todo {
  completed: boolean;
  id: number;
  title: string;
  userId: number;
}

interface prop {
  todos: Todo[];
  loading: boolean;
  handleDeleteTodo: (message: number) => void;
  handleUpdateTodo: (todoItem: {
    completed: boolean;
    id: number;
    title: string;
    userId: number;
  }) => void;
}
const TodoList = ({
  todos,
  loading,
  handleDeleteTodo,
  handleUpdateTodo,
}: prop) => {
  return loading ? (
    <LoadingPage />
  ) : (
    <>
      <div className="flex flex-wrap justify-start pt-4  px-16">
        {todos.map(
          (item: {
            completed: boolean;
            id: number;
            title: string;
            userId: number;
          }) => (
            <Todo
              key={item.id}
              todoItem={item}
              handleDeleteTodo={handleDeleteTodo}
              handleUpdateTodo={handleUpdateTodo}
            ></Todo>
          )
        )}
        <FloatButton.BackTop />
      </div>
    </>
  );
};

export default TodoList;
