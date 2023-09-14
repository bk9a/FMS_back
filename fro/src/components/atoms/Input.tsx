import { InputField } from "./InputField";

type InputProps = {
  Title: string;
  Placeholder: string;
  change: (a: number) => void;
  
  children?: React.ReactNode;
  ContainerClass: string;
  value: number;
} & Omit<React.ComponentProps<"input">, "children">;

export const Input = ({
  Title,
  Placeholder,
  ContainerClass,
  change,
  value,
  children,
}: InputProps) => {
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
          <input
            type="number"
            placeholder={Placeholder}
            className="w-full h-12 pl-4 pr-8 text-zinc-400 outline-none transition-all duration-200 focus:border-amber-500 border border-zinc-400 bg-transparent"
            value={value}
            onChange={()=>change(value)}
          />
        </div>
      </InputField>
    </div>
  );
};
