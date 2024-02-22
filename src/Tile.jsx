export function Tile({ content: Content, flip, state }) {
  switch (state) {
    case "start":
      return (
        <Back
          className="inline-block h-full w-full min-h-16 sm:min-h-40 md:min-h-64 bg-indigo-300 p-2 text-center rounded-md cursor-pointer"
          flip={flip}
        />
      );
    case "flipped":
      return (
        <Front className="inline-block p-2 h-full w-full rounded-md bg-indigo-500 text-white">
          <Content
            style={{
              display: "inline-block",
              width: "100%",
              height: "100%",
              verticalAlign: "top",
            }}
          />
        </Front>
      );
    case "matched":
      return (
        <Matched className="inline-block p-2 h-full w-full min-h-16 text-indigo-200">
          <Content
            style={{
              display: "inline-block",
              width: "100%",
              height: "100%",
              verticalAlign: "top",
            }}
            className=""
          />
        </Matched>
      );
    default:
      throw new Error("Invalid state " + state);
  }
}

function Back({ className, flip }) {
  return <div onClick={flip} className={className}></div>;
}

function Front({ className, children }) {
  return <div className={className}>{children}</div>;
}

function Matched({ className, children }) {
  return <div className={className}>{children}</div>;
}
