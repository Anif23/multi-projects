import { useNavigate } from "react-router-dom";

const projects = [
    {
        name: "Todo App",
        path: "/login",
        icon: "📝",
        description: "Manage your daily tasks efficiently",
        color: "from-blue-500 to-blue-700",
    },
    {
        name: "Ecommerce",
        path: "/login",
        icon: "🛒",
        description: "Admin panel for products & categories",
        color: "from-purple-500 to-purple-700",
    },
    {
        name: "Ecommerce",
        path: "/user/ecommerce",
        icon: "🛒",
        description: "Shopping with Asnif",
        color: "from-green-500 to-green-700",
    },
    {
        name: "Coming Soon",
        path: "#",
        icon: "🚀",
        description: "More projects will be added",
        color: "from-gray-400 to-gray-600",
        disabled: true,
    },
];

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-100 to-gray-200 flex flex-col items-center p-6">
            <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800">
                My Projects 🚀
            </h1>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
                {projects.map((project, i) => (
                    <div
                        key={i}
                        onClick={() => !project.disabled && navigate(project.path)}
                        className={`cursor-pointer rounded-2xl p-6 text-white shadow-lg transition transform hover:scale-105 hover:shadow-xl
              bg-linear-to-br ${project.color}
              ${project.disabled ? "opacity-60 cursor-not-allowed" : ""}
            `}
                    >
                        <div className="text-4xl mb-4">{project.icon}</div>
                        <h2 className="text-xl font-semibold mb-2">
                            {project.name}
                        </h2>
                        <p className="text-sm opacity-90">
                            {project.description}
                        </p>
                        {!project.disabled && (
                            <div className="mt-4 text-sm underline">
                                Open →
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;