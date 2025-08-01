import { Calendar, Check, Edit3, Trash2 } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTodo, toggleTodo, updateTodo } from "../store/todoSlice";
import TodoForm from "./TodoForm";

function TodoItem({ todo, index }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDelete] = useState(false);
  const dispatch = useDispatch();

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    if (isNaN(date)) return "Invalid date";

    return new Intl.DateTimeFormat("bn-BD", {
      //year: "numeric", // optional
      month: "long",
      //month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false, // use 24-hour format
    }).format(date);
  };

  const handleToggle = () => {
    dispatch(toggleTodo(todo.id));
    //console.log(todo.completed);
  };
  //console.log(todo.completed);

  const handleDelete = () => {
    setIsDelete(true);
    setTimeout(() => {
      dispatch(deleteTodo(todo.id));
    }, 200);
  };

  const handleUpdate = (text) => {
    dispatch(updateTodo({ id: todo.id, updates: { text: text.trim() } }));
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="p-4 bg-gray-100">
        <TodoForm
          initialValue={todo.text}
          onSubmit={handleUpdate}
          onCancel={() => setIsEditing(false)}
          placeholder="Update Your Todo"
        />
      </div>
    );
  }

  return (
    <div
      className={`group p-4 hover:bg-gray-100 transition-all duration-200 ${
        isDeleting
          ? "opacity-0 transform scale-95"
          : "opacity-100 transform scale-100"
      } ${todo.completed ? "opacity-75" : ""}`}
      style={{
        animationDelay: `${index * 50}ms`,
        animation: "slideInUp o.3s ease-out forwards",
      }}
    >
      {/* toggle btn */}
      <div className="flex items-start gap-3">
        <button
          className={`flex-shrink-0 w-6 h-6 mt-0.5 rounded-full border-2 grid place-items-center transition-all duration-200 cursor-pointer ${
            todo.completed
              ? "bg-green-500 border-green-500 hover:bg-green-600  text-white"
              : "border-gray-400 hover:border-green-500 hover:bg-green-50 "
          }`}
          onClick={handleToggle}
        >
          {todo.completed && <Check size={14} />}
        </button>

        {/* content */}
        <div className="flex-1 min-w-0">
          <div className={`text-gray-800 leading-relaxed`}>{todo.text}</div>

          <div className="flex items-center gap-4 mt-2 text-gray-600">
            <div className="flex items-center gap-1">
              <Calendar size={12} />
              <span>Created {formatDate(todo.createdAt)}</span>
            </div>

            <span>Update {formatDate(todo.updatedAt)} </span>
          </div>
        </div>
        {/* content */}

        {/* action btn */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200">
          <button
            className="p-2 text-gray-500  hover:text-gray-800 hover:bg-gray-200 rounded-lg transition-all duration-200"
            onClick={() => setIsEditing(true)}
          >
            <Edit3 size={16} />
          </button>

          <button
            className="p-2 text-gray-500  hover:text-red-800 hover:bg-gray-200 rounded-lg transition-all duration-200"
            onClick={handleDelete}
          >
            <Trash2 size={16} />
          </button>
        </div>
        {/* action btn */}
      </div>
      {/* toggle btn */}
    </div>
  );
}

export default TodoItem;
