import { useNavigate } from "react-router-dom";

function Navbar() {
  const elements = [
    {
      display: "Item",
      link: "item",
    },
    {
      display: "Inventory",
      link: "inv",
    },
    {
      display: "Enemy",
      link: "enemy",
    },
    {
      display: "Loot",
      link: "loot",
    },
  ];

  const navigate = useNavigate();

  return (
    <div className="w-full h-24 font-gemu flex text-white bg-gray-800">
      <div className="w-2/3 h-full flex items-center p-2">
        <button
          onClick={() => {
            navigate("/admin");
          }}
          className="text-xl"
        >
          Admin Dashboard
        </button>
      </div>
      <div className="w-1/3 h-full flex p-2 px-9 justify-between items-center">
        {elements.map((e, i) => {
          return (
            <>
              <div className="h-full w-0.5 bg-white"></div>
              <button
                onClick={() => {
                  navigate(`/${e.link}`);
                }}
                className="hover:text-gray-500"
              >
                {e.display}
              </button>
            </>
          );
        })}
        {/* <div className="h-full w-0.5 bg-white"></div> */}
      </div>
    </div>
  );
}

export default Navbar;
