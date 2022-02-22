import React from "react";

const Filter = ({ title, search, handleFunction }) => {
  return (
    <div>
      {title}
      <input value={search} onChange={handleFunction} />
    </div>
  );
};

export default Filter;
