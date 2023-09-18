import { InputField } from "./InputField";

type IngreadantProps = {
  name: string;
  gram: number;
  id: number;
  //   Placeholder: string;
  remove: (a: number) => void;
  //   children?: React.ReactNode;
  //   ContainerClass: string;
  //   value: number;
  //   max?: number;
} & Omit<React.ComponentProps<"input">, "children">;

export const Ingreadant = ({ name, gram, id, remove }: IngreadantProps) => {
  const handleSelectChange = () => {
    remove(id as any);
  };
  return (
    <div className="w-full flex justify-center items-center">
      <div className="flex">
        <div className="w-fit h-8 flex justify-center items-center px-2 py-2 space-x-2 border border-bodyhack text-white">
          <span>{name}</span>
          <span>{gram}gr</span>
        </div>
        <div
          className="flex justify-center items-center w-8 h-8 bg-bodyhack cursor-pointer select-none"
          onClick={handleSelectChange}
        >
          <span className="text-gray-700 text-lg">x</span>
        </div>
      </div>
    </div>
  );
};
