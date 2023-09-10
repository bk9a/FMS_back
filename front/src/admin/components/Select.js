import React from "react";

const Select = (props) => {
  return (
    <div>
      <label className="font-semibold text-lg text-slate-700">
        {props.name}
      </label>
      <select
        className="text-italic text-slate-400 block bg-white w-[500px] border border-slate-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500"
        name={props.sname}
        onChange={props.selectOnChange}
      >
        {props.data.map((item, key) => (
          <option key={"option-" + key} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
