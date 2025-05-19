import { useNavigate } from "react-router-dom";
import DuelDungeon from "./DuelDungeon";

function Forest() {
  const navigate = useNavigate();

  return (
    <div>
      <img
        className="object-cover h-full w-full absolute"
        src="https://terraria.wiki.gg/images/9/9c/Forest_background_1.png?e2477a"
      />
      <img
        src="https://terraria.wiki.gg/images/c/c2/Music_Box_%28Dungeon%29.png?18edec"
        className="absolute translate-x-[150px] translate-y-[800px]"
        onClick={() => {}}
      />
      <DuelDungeon />
      <img
        src="https://terraria.wiki.gg/images/3/37/Skeleton_Merchant.png?e9dbf5"
        style={{
          transform: `scaleX(-1)`,
          left: "500px",
          top: "750px",
        }}
        className="absolute"
        onClick={() => {
          console.log("You are talking to Skeleton Merchant!");
          navigate("/shop/skeleton_merchant");
        }}
      />
    </div>
  );
}

export default Forest;
