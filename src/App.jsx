import TodoList from "./components/TodoList";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-yellow-800 dark:bg-gray-900 dark:text-yellow-300">
      <div className="max-w-xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">TaskFlow - ToDo List App</h1>
        <TodoList />
      </div>
    </div>
  );
}