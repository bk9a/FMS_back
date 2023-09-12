import { Image } from "../atoms/Image";
import { Text } from "../atoms/Text";
import CalImg from "../../assets/gym/9.jpeg";
import Form from "../molecules/Form";
import { Fade } from "react-awesome-reveal";

const CalculatorCal = () => {
  return (
    <div className="w-full flex flex-col mt-10 items-center relative before:absolute before:-bottom-6 before:left-38 before:w-20 before:h-1 before:rounded-lg before:bg-gradient-to-r before:from-amber-500 before:to-red-500 z-10">
      <Text
        as="p"
        className="text-amber-500 lg:text-sm text-xs tracking-widest uppercase font-medium"
      >
        Advanced Calculator
      </Text>
      <Text as="h1" className="text-zinc-100 lg:text-5xl md:text-4xl text-3xl">
        Calculate Your BMI
      </Text>
    </div>
  );
};

export default CalculatorCal;
