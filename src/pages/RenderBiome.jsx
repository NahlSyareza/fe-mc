import Corruption from "./Corruption";
import Forest from "./Forest";
import Crimson from "./Crimson";
import Jungle from "./Jungle";
import Hallow from "./Hallow";

function RenderBiome({ biome }) {
  return (
    <>
      {biome === "forest" && <Forest />}
      {biome === "crimson" && <Crimson />}
      {biome === "corruption" && <Corruption />}
      {biome === "hallow" && <Hallow />}
      {biome === "jungle" && <Jungle />}
    </>
  );
}

export default RenderBiome;
