import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

function Item() {
  const buttons = [
    { id: "/item/create", display: "Item Create" },
    { id: "/item/update", display: "Item Update" },
    { id: "/item/delete", display: "Item Delete" },
  ];

  const navigate = useNavigate();

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
export default Item;
