/* eslint-disable react/prop-types */
export default function Action({ children, onClick, items = { items } }) {
  const sexyStyling = {
    textAlign: "center",
    color: "#2f2f2f",
    background: "#fbce2f",
    fontWeight: 700,
    padding: ".6rem 0",
    borderRadius: "30px",
    margin: "0 0 1.3rem 0",
  };

  return (
    <p
      className="action-btn"
      style={
        items.every((item) => item.done) && children === "Add task"
          ? sexyStyling
          : { width: "fit-content", marginLeft: "auto" }
      }
      onClick={onClick}
    >
      {items.every((item) => item.done) && children === "Add task"
        ? "+ "
        : null}
      {children}
    </p>
  );
}
