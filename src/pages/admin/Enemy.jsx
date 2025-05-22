import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

function Enemy() {
  const navigate = useNavigate();
  const buttons = [
    { id: "/enemy/create", display: "Enemy Create" },
    { id: "/enemy/update", display: "Enemy Update" },
    { id: "/enemy/delete", display: "Enemy Delete" },
  ];

  return (
    <div className="w-screen h-screen bg-sky-950 font-gemu overflow-x-hidden">
      <Navbar />
      <div className="flex p-20 justify-between">
        {buttons.map((e, i) => {
          return (
            <button
              className="text-white p-4 bg-blue-900 rounded-md"
              onClick={() => {
                navigate(e.id);
              }}
            >
              {e.display}
            </button>
          );
        })}
      </div>
    </div>
  );
}
export default Enemy;
