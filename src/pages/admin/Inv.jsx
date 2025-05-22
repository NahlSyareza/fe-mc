import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

function Inv() {
  const navigate = useNavigate();
  const buttons = [
    { id: "/inv/add", display: "Inv Add" },
    { id: "/inv/update", display: "Inv update" },
    { id: "/inv/delete", display: "Inv Delete" },
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
export default Inv;
