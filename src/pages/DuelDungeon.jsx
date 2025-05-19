import { useNavigate } from "react-router-dom";

function DuelDungeon() {
  const navigate = useNavigate();

  return (
    <img
      src="https://terraria.wiki.gg/images/6/67/Skeletron_Prime_head.gif?8385ef"
      className="absolute translate-x-[1550px] translate-y-[700px]"
      onClick={() => {
        console.log("Duelling in!");
        navigate("/duel");
      }}
    />
  );
}

export default DuelDungeon;
