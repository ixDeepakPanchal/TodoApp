import TodoList from "./components/TodoList";
import CreateTodo from "./components/CreateTodo";
import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Pagination } from "antd";
import InputPage from "./components/InputPage";

interface Todo {
  completed: boolean;
  id: number;
  title: string;
  userId: number;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [todoId, setTodoId] = useState(200);
  const [showTodo, setShowTodos] = useState<Todo[]>([]);
  const [searchActive, setSearchActive] = useState<boolean>(false);
  const [filterResult, setFilterResult] = useState<Todo[]>([]);
  const [filterType, setFilterType] = useState<boolean | string>("All");
  const [pageLength, setPageLength] = useState<number>(0);

  // Update showTodo whenever currentPage, pageSize, todos, or filterResult change
  useEffect(() => {
    const updateShowTodo = (list: Todo[]) => {
      setPageLength(list.length);
      const lastIndex = pageSize * currentPage;
      const firstIndex = lastIndex - pageSize;
      const newTodo = list.slice(firstIndex, lastIndex);
      setShowTodos(newTodo);
    };

    let listToShow = todos;
    if (searchActive) {
      listToShow = filterResult;
      if (filterType !== "All") {
        listToShow = listToShow.filter((item) => item.completed == filterType);
      }
    } else {
      if (filterType !== "All") {
        listToShow = todos.filter((item) => item.completed == filterType);
      }
    }

    updateShowTodo(listToShow);
  }, [currentPage, pageSize, todos, filterResult, filterType, searchActive]);

  const handlePagination = (page: number, pageSize: number) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  // get todo from api
  useEffect(() => {
    setLoading(true);
    const getTodo = async () => {
      try {
        const res = await axios.get(
          "https://jsonplaceholder.typicode.com/todos"
        );
        const data = res.data;
        setTodos(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getTodo();
  }, []);

  // add todo function
  const handleAddTodo = async (inputVal: string) => {
    setLoading(true);
    try {
      await axios.post("https://jsonplaceholder.typicode.com/todos", {
        userId: 1,
        title: inputVal,
        completed: false,
      });
      setTodoId((pre) => pre + 1);
      const data = { userId: 1, title: inputVal, completed: false, id: todoId };
      setTodos((pre) => [data, ...pre]);
      toast.success("Todo Added Successfully", { duration: 4000 });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setSearchActive(false);
      setCurrentPage(1);
    }
  };

  // delete todo function
  const handleDeleteTodo = async (id: number) => {
    setLoading(true);
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);

      const newTodo = todos.filter((todo) => todo.id != id);
      setTodos(newTodo);
      toast.success("Todo Deleted Successfully", {
        duration: 4000,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // update todo function
  const handleUpdateTodo = async (todoItem: Todo) => {
    setSearchActive(false);
    setLoading(true);

    try {
      await axios.put(
        `https://jsonplaceholder.typicode.com/todos/${todoItem.id}`,
        todoItem
      );

      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === todoItem.id ? todoItem : todo))
      );
      toast.success("Todo updated Successfully", { duration: 4000 });
    } catch (error) {
      const newTodo = todos.filter((todo) => todo.id != todoItem.id);
      setTodos([todoItem, ...newTodo]);
      console.log(error);
    } finally {
      setLoading(false);
      setCurrentPage(1);
    }
  };

  // handle searching
  const handleSearchTodo = (inputVal: string) => {
    if (inputVal.trim() === "") {
      setSearchActive(false);
      setFilterResult(todos);
    } else {
      const newTodo = todos.filter((item) => item.title.startsWith(inputVal));

      setFilterResult(newTodo);
      setSearchActive(true);
    }
  };

  const handleTypeTodo = (complete: boolean) => {
    setFilterType(complete);
  };
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <CreateTodo handleAddTodo={handleAddTodo}></CreateTodo>
      <InputPage
        handleSearchTodo={handleSearchTodo}
        handleTypeTodo={handleTypeTodo}
      ></InputPage>
      <TodoList
        todos={showTodo}
        loading={loading}
        handleDeleteTodo={handleDeleteTodo}
        handleUpdateTodo={handleUpdateTodo}
      ></TodoList>
      {!loading && (
        <div className="flex justify-center py-8">
          <Pagination
            pageSizeOptions={[8, 16, 32, 64]}
            defaultCurrent={currentPage}
            total={pageLength}
            defaultPageSize={pageSize}
            onChange={(page, pageSize) => {
              handlePagination(page, pageSize);
            }}
          />
        </div>
      )}
    </>
  );
}

export default App;
