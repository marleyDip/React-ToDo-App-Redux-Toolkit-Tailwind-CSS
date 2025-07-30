import { Check, X } from "lucide-react";
import React from "react";

function TodoForm() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1">
        <input
          className="w-full px-4 py-3 text-gray-800 backdrop-blur-sm bg-white/90 placeholder-gray-600 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent transition-all duration-200"
          maxLength={500}
        />
      </div>

      <div className="flex items-center gap-2">
        <button
          type="submit"
          className="flex items-center justify-center w-10 h-10 text-white bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed rounded-lg transition-colors duration-200"
          title="Save todo"
        >
          <Check size={18} />
        </button>

        <button
          type="submit"
          className="flex items-center justify-center w-10 h-10 text-white bg-gray-600 hover:bg-gray-700 disabled:bg-green-400 disabled:cursor-not-allowed rounded-lg transition-colors duration-200"
          title="Save todo"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}

export default TodoForm;
