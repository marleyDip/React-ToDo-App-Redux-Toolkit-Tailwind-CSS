import { CheckCircle2, Circle, Filter, Plus, Trash2 } from "lucide-react";

import TodoFilters from "./TodoFilters";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";

import { useDispatch, useSelector } from "react-redux";
import {
  selectTodos,
  selectFilter,
  selectFilteredTodos,
  selectTodosStats,
  selectIsAddingTodo,
} from "../store/selectors";

import {
  clearAllComplete,
  markAllComplete,
  setFilter,
  setIsAddingTodo,
} from "../store/todoSlice";

function TodoApp() {
  const todos = useSelector(selectTodos);
  const filter = useSelector(selectFilter);
  //console.log(todos);
  const filteredTodos = useSelector(selectFilteredTodos);
  const stats = useSelector(selectTodosStats);
  const isAddingTodo = useSelector(selectIsAddingTodo);
  //console.log(stats.completionPercentage);
  console.log(todos);

  const dispatch = useDispatch();

  const handleAddToClick = () => {
    dispatch(setIsAddingTodo(true));
    //console.log(isAddingTodo);
  };

  const handleFilterChange = (newFilter) => {
    dispatch(setFilter(newFilter));
  };

  const handleMarkAllComplete = () => {
    dispatch(markAllComplete());
  };

  const handleClearAllComplete = () => {
    dispatch(clearAllComplete());
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300
     py-8 px-4"
    >
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-gray-800 font-bold text-4xl mb-2">To Do Flow</h2>

          <p className="font-semibold">
            Organize your life, one task at a time
          </p>
        </div>
        {/* Header */}

        {/* Starts Card */}
        {stats.total > 0 && (
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 mb-6 border border-gray-300">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Progress Overview
              </h2>

              <div className="text-2xl font-bold text-green-600">
                {stats.completionPercentage}%
              </div>
            </div>

            <div className="w-full h-3 rounded-full mb-4 bg-gray-300">
              {/* progress bar */}
              <div
                className="h-3 rounded-full bg-gradient-to-r from-green-500 to-green-600 transition-all duration-500 ease-out"
                style={{ width: `${stats.completionPercentage}%` }}
              ></div>
            </div>

            {/* stats */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <div className="text-2xl font-bold text-gray-800">
                  {stats.total}
                </div>

                <div className="text-sm text-gray-600">Total</div>
              </div>

              <div>
                <div className="text-2xl font-bold text-gray-800">
                  {stats.active}
                </div>
                <div className="text-sm text-gray-600">Active</div>
              </div>

              <div>
                <div className="text-2xl font-bold text-gray-800">
                  {stats.complete}
                </div>
                <div className="text-sm text-gray-600">Complete</div>
              </div>
            </div>
            {/* starts */}
          </div>
        )}
        {/* Starts Card */}

        {/* main todo container */}
        <div className="bg-white/90 backdrop-blur-sm rounded-b-2xl shadow-lg border border-gray-300  overflow-hidden">
          {/* action bar */}
          <div className="p-6 border-b border-gray-300">
            <div className="flex items-center justify-between mb-4">
              {/* add button */}
              <button
                className="flex items-center gap-3 px-4 py-2 text-white font-medium bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors duration-200 cursor-pointer"
                onClick={handleAddToClick}
              >
                <Plus size={20} /> Add ToDo
              </button>
              {/* add button */}

              {/* clear & delete button */}
              {stats.total > 0 && (
                <div className="flex items-center gap-2">
                  {/* clear btn */}
                  {stats.complete > 0 && (
                    <button
                      className="flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200"
                      onClick={handleClearAllComplete}
                    >
                      <Trash2 size={16} /> Clear Completed
                    </button>
                  )}
                  {/* clear btn */}

                  {/* complete btn */}
                  {stats.active > 0 && (
                    <button
                      className="flex items-center gap-3 px-3 py-2 text-sm text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors duration-200"
                      onClick={handleMarkAllComplete}
                    >
                      <CheckCircle2 size={16} /> Marks All Completed
                    </button>
                  )}
                  {/* complete btn */}
                </div>
              )}
              {/* clear & add button */}
            </div>

            {/* Todo filter = add logic */}
            <TodoFilters
              currentFilter={filter}
              stats={stats}
              onFilterChange={handleFilterChange}
            />
            {/* Todo filter */}
          </div>
          {/* action bar */}

          {/* Todo form */}
          {isAddingTodo && (
            <div className="p-6 border-b border-gray-300 bg-gray-100">
              <TodoForm placeholder="what need to be done" />
            </div>
          )}
          {/* Todo form */}

          {/* todo list */}
          <div className="max-h-96 overflow-y-auto">
            {filteredTodos.length === 0 ? (
              <div className="p-12 text-center">
                {todos.length === 0 ? (
                  <div className="text-gray-600">
                    <Circle size={48} className="mx-auto mb-4 opacity-50" />

                    <p className="text-lg font-medium mb-2 text-gray-800">
                      No Todos Yet
                    </p>
                    <p>Add your first todo to get started!</p>
                  </div>
                ) : (
                  <div className="text-gray-600">
                    <Filter size={48} className="mx-auto mb-4 opacity-50" />

                    <p className="text-lg font-medium mb-2 text-gray-800">
                      No {filter} Todos
                      <p className="text-[14px]">
                        {filter === "completed" &&
                          "All your todos are completed"}

                        {filter === "active" &&
                          "No completed todos yet, keep going!"}
                      </p>
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="divide-y divide-gray-300">
                {filteredTodos.map((todo, index) => {
                  return <TodoItem key={todo.id} todo={todo} index={index} />;
                })}
              </div>
            )}
          </div>
          {/* todo list */}
        </div>
        {/* main todo container */}

        {/* footer */}
        <div className="text-center mt-6 text-sm text-gray-700">footer</div>
        {/* footer */}
      </div>
    </div>
  );
}

export default TodoApp;
