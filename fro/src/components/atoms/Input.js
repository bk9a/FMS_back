import { InputField } from "./InputField";

export const Input = (props) => {
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
          <input
            type="number"
            placeholder={props.Placeholder}
            className="w-full h-12 pl-4 pr-8 text-zinc-400 outline-none transition-all duration-200 focus:border-amber-500 border border-zinc-400 bg-transparent"
            value={props.value}
            // onChange={(e)=>change((e.target.value))}
            onChange={(e) => {
              props.change(e.target.value);
            }}
            min="0"
            max={props.max}
            step="1"
          />
        </div>
      </InputField>
    </div>
  );
};
