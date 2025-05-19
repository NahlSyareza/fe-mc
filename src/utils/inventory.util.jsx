function autoCapitalize(str) {
  return str.replace(/(^\w|[-_]\w)/g, (match) => match.toUpperCase());
}

function formatUnderscore(input) {
  return input
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function getType(type, item) {
  switch (type) {
    case "weapon":
      return (
        <>
          <p className="m-2">{item.atk} ATK</p>
          <p className="m-2">{item.cost} SP</p>
          <p className="m-2">{autoCapitalize(item.skill)}</p>
          {!item.desc ? <></> : <p className="m-2">'{item.desc}'</p>}
        </>
      );

    case "spell":
      return (
        <>
          <p className="m-2">{item.mgc} MGC</p>
          <p className="m-2">{item.cost} MP</p>
          <p className="m-2">{autoCapitalize(item.skill)}</p>
          {!item.desc ? <></> : <p className="m-2">'{item.desc}'</p>}
        </>
      );

    case "armor":
      return (
        <>
          <p className="m-2">{item.def} DEF</p>
          <p className="m-2">{autoCapitalize(item.skill)}</p>
          {!item.desc ? <></> : <p className="m-2">'{item.desc}'</p>}
        </>
      );

    case "potion":
      return (
        <>
          <p className="m-2">
            +{item.restore} {item.attribute}
          </p>
          {!item.desc ? <></> : <p className="m-2">'{item.desc}'</p>}
        </>
      );

    default:
      return <>{!item.desc ? <></> : <p className="m-2">'{item.desc}'</p>}</>;
  }
}

export { autoCapitalize, getType, formatUnderscore };
