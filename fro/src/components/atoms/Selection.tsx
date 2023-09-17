import { ChangeEvent } from "react";
import { InputField } from "./InputField";

interface Option {
  value: number;
  label: string;
}

type SelectProps = {
  Title: string;
  change: (newOption: number) => void;
  options: Option[];
  selectedOption: number;
  ContainerClass: string;
};

export const Selection = ({
  Title,
  ContainerClass,
  change,
  options,
  selectedOption,
}: SelectProps) => {
  const handleSelectChange = (event: React.FormEvent<HTMLSelectElement>) => {
    change(event.currentTarget.value as any);
  };

  return (
    <div className={ContainerClass}>
      <InputField className="w-full flex flex-col gap-2">
        <label
          htmlFor="weight"
          className="uppercase text-sm text-zinc-200 font-bold"
        >
          {Title}
        </label>
        <div className="w-full relative">
          <select
            id="select"
            className="w-full h-12 pl-4 pr-8 text-zinc-400 outline-none transition-all duration-200 focus:border-amber-500 border border-zinc-400 bg-transparent"
            value={selectedOption}
            onChange={handleSelectChange}
          >
            {options.map((option) => (
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
