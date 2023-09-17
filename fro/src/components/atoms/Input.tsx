import { InputField } from "./InputField";

type InputProps = {
  Title: string;
  Placeholder: string;
  change: (a: number) => void;
  children?: React.ReactNode;
  ContainerClass: string;
  value: number;
  max?: number;
} & Omit<React.ComponentProps<"input">, "children">;

export const Input = ({
  Title,
  Placeholder,
  ContainerClass,
  change,
  value,
  max,
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
            // onChange={(e)=>change((e.target.value))}
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              change(e.currentTarget.value as any);
            }}
            min="0"
            max={max}
            step="1"
          />
        </div>
      </InputField>
    </div>
  );
};
