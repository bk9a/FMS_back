import { InputField } from "./InputField";

export const Selection = (props) => {
  return (
    <div className={props.ContainerClass}>
      <InputField className="w-full flex flex-col gap-2">
        <label
          htmlFor="weight"
          className="uppercase text-sm text-zinc-200 font-bold"
        >
          {props.Title}
        </label>
        <div className="w-full relative">
          <select
            id="select"
            className="w-full h-12 pl-4 pr-8 text-zinc-400 outline-none transition-all duration-200 focus:border-amber-500 border border-zinc-400 bg-transparent"
            value={props.selectedOption}
            onChange={(e) => props.change(e.target.value)}
          >
            {props.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </InputField>
    </div>
  );
};
