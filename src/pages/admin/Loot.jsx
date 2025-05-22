import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

function Loot() {
  const navigate = useNavigate();
  const buttons = [
    { id: "/loot/create", display: "Loot Create" },
    { id: "/loot/update", display: "Loot Update" },
    { id: "/loot/delete", display: "Loot Delete" },
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
export default Loot;
