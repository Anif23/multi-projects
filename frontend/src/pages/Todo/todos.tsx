import axios from "../../api/client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";

const Todos = () => {

    const navigate = useNavigate();

    const [todoList, setTodoList] = useState([]);
    const [title, setTitle] = useState("");

    const fetchTodos = async () => {
        try {
            const res = await axios.get("/todos");

            setTodoList(res.data?.todos || []);
        } catch (err) {
            console.error(err);
            setTodoList([]);
        }
    };
    useEffect(() => {
        fetchTodos();
    }, []);

    const handleAdd = async () => {
        if (!title.trim()) return;

        try {
            const res = await axios.post("/todos", {
                title,
                completed: false,
                priority: 1
            });
            setTitle("");

            if (res.data.success) {
                toast.success("Todo added successfully!");
            }
            fetchTodos();
        } catch (err) {
            toast.error("Failed to add todo");
            console.error(err);
        }
    };

    const toggleTodo = async (todo: any) => {
        try {
            const res = await axios.put(`/todos/${todo.id}`, {
                title: todo.title,
                completed: !todo.completed,
            });

            if (res.data.success) {
                toast.success("Todo updated successfully!");
            }
            fetchTodos();
        } catch (err) {
            toast.error("Failed to update todo");
            console.error(err);
        }
    };

    const deleteTodo = async (id: number) => {
        try {
            const res = await axios.delete(`/todos/${id}`);

            if (res.data.success) {
                toast.success("Todo deleted successfully!");
            }
            fetchTodos();
        } catch (err) {
            toast.error("Failed to delete todo");
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-6">

                <h1 className="text-2xl font-bold text-center mb-6">
                    Todo App 🚀
                </h1>

                <div className="flex gap-2 mb-6">
                    <input
                        type="text"
                        placeholder="Enter todo..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleAdd();
                            }
                        }}
                        className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={handleAdd}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                    >
                        Add
                    </button>
                </div>

                <div className="space-y-3">
                    {todoList?.length === 0 && (
                        <p className="text-center text-gray-400">No todos yet</p>
                    )}

                    {todoList.map((todo: any) => (
                        <div
                            key={todo.id}
                            className="flex items-center justify-between bg-gray-50 p-3 rounded-lg hover:shadow-sm transition"
                        >
                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    checked={todo.completed}
                                    onChange={() => toggleTodo(todo)}
                                    className="w-5 h-5 cursor-pointer"
                                />

                                <span
                                    className={`${todo.completed
                                        ? "line-through text-gray-400"
                                        : "text-gray-800"
                                        }`}
                                >
                                    {todo.title}
                                </span>
                            </div>

                            <button
                                onClick={() => deleteTodo(todo.id)}
                                className="text-red-500 hover:text-red-700 transition"
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Logout Button */}
            <button
                onClick={async () => {
                    try {
                        const res = await axios.post("/auth/logout");
                        if (res.data.success) {
                            toast.success(res.data.message);
                            localStorage.removeItem("token");
                            navigate("/login");
                        }
                    } catch (err) {
                        console.error("Logout failed:", err);
                    }
                }}
                className="fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
                Logout
            </button>
        </div>
    );
};

export default Todos;