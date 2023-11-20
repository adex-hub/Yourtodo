/* eslint-disable react/prop-types */
export default function Indicator({ items }) {
  const completed = items.filter((item) => item.done).length;

  return (
    <>
      {items.length > 0 && (
        <div className="indicator">
          {completed} / {items.length}
        </div>
      )}
    </>
  );
}
