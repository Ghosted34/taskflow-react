import { useDispatch } from "react-redux";
import AddTask from "./features/tasks/components/add";
import BoardView from "./features/tasks/components/board";
import type { AppDispatch } from "./app/store";
import { useEffect } from "react";
import { fetchTasks } from "./features/tasks/taskSlice";
import Header from "./features/tasks/components/header";
import SearchBar from "./features/tasks/components/search";
import { useTaskNotifications } from "./features/notifications/socket";

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  useTaskNotifications();
  return (
    //header
    <>
      <Header />
      <div className="flex min-h-svh flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">Task Flow</h1>
        <AddTask />
        <SearchBar />
        <BoardView />
      </div>
    </>
  );
}

export default App;
