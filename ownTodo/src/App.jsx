import { useState } from "react";
import React from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [curentTodo, setCurrentTodo] = useState("");
  const [editTodo, setEditTodo] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [currentEditingTodo, setCurrentEditingTodo] = useState("");
  const [savetodos, setSaveTodos] = useState([]);
  const addtodo = (event) => {
    event.preventDefault();
    if (curentTodo === "") {
      return;
    }
    setTodos((previousTodos) => {
      const newTodos = [...previousTodos];
      newTodos.push(curentTodo);
      return newTodos;
    });
    setCurrentTodo("");
  };
  const handleDelete = (index) => {
    const updatedTodos = todos.filter((todo, idx) => idx !== index);
    setTodos(updatedTodos);
  };
  const handleOnChange = (event) => {
    event.preventDefault();
    setCurrentTodo(event.target.value);
  };

  const updateTodo = (e, index, todo) => {
    e.preventDefault();
    setEditTodo(todo);
    setEditIndex(index);
  };
  const handleCancel = (e) => {
    e.preventDefault();
    setEditTodo("");
    setEditIndex(null);
  };

  const resetToDefault = () => {
    setEditIndex(null);
    setEditTodo("");
    setCurrentEditingTodo("");
  };
  const handleSave = (e) => {
    e.preventDefault();
    if (!currentEditingTodo) {
      resetToDefault();
      return;
    }
    const updatedTodos = todos.map((todo, idx) => {
      if (idx === editIndex) {
        return currentEditingTodo;
      }
      return todo;
    });
    setTodos(updatedTodos);
    resetToDefault();
  };
  return (
    <div className=" w-full h-screen flex justify-center items-center flex-col">
      <div className=" text-2xl"> My Todos </div>
      <form action="submit">
        <input
          onChange={handleOnChange}
          type="text"
          value={curentTodo}
          placeholder="Write todo..."
          className=" border-gray-500 border"
        />
        <button
          onClick={addtodo}
          className=" bg-blue-500 hover:cursor-pointer hover:bg-blue-400 p-2 py-1 rounded-md text-white "
        >
          add todo
        </button>
      </form>

      <div className="mt-4 flex flex-col w-2/3 gap-2 ">
        {todos.map((item, index) => {
          return (
            <div
              key={index}
              className="flex  justify-between 
            "
            >
              {editIndex === index ? (
                <input
                  onChange={(e) => {
                    setCurrentEditingTodo(e.target.value);
                  }}
                  type="text"
                  placeholder="editTodo "
                  defaultValue={editTodo}
                  className="border border-gray-400"
                />
              ) : (
                <span>{item}</span>
              )}
              <div className="flex gap-4">
                {editIndex === index && (
                  <div className="flex place-items-end gap-4">
                    <button
                      onClick={(e) => handleCancel(e)}
                      className="bg-red-500 hover:cursor-pointer hover:bg-red-400 p-2 py-1 rounded-md text-white"
                    >
                      cancel
                    </button>
                    <button
                      onClick={(e) => handleSave(e)}
                      className="bg-blue-500 hover:cursor-pointer hover:bg-blue-400 p-2 py-1 rounded-md text-white"
                    >
                      save
                    </button>
                  </div>
                )}

                <div className="flex justify-center gap-4 ">
                  {editIndex !== index && (
                    <button
                      onClick={(e) => updateTodo(e, index, item)}
                      className="bg-green-500 hover:cursor-pointer hover:bg-green-400 p-2 py-1 rounded-md text-white items-end "
                    >
                      Edit
                    </button>
                  )}

                  <button
                    onClick={() => handleDelete(index)}
                    className="bg-red-500 hover:cursor-pointer hover:bg-red-400 p-2 py-1 rounded-md text-white"
                  >
                    delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
