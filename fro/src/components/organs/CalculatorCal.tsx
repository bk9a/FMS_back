import { useState, useEffect } from "react";
import { Image } from "../atoms/Image";
import { Text } from "../atoms/Text";
import CalImg from "../../assets/gym/9.jpeg";
import Form from "../molecules/Form";
import { Fade } from "react-awesome-reveal";
import { Input } from "../atoms/Input";

const CalculatorCal = () => {
  const [heightValue, setHeightValue] = useState<number>(0);
  const [weightValue, setWeightValue] = useState<number>(0);
  const [ageValue, setAgeValue] = useState<number>(0);
  const [sexValue, setSexValue] = useState<number>(1);
  const [bmiValue, setBmiValue] = useState<string | number>("30");

  useEffect(() => {
    if (heightValue != 0 && weightValue != 0 && ageValue != 0) {
    }
    let c = heightValue + weightValue + ageValue;

    setBmiValue(c);
  }, [heightValue, weightValue, ageValue, sexValue]);

  const setAgeValueFunc = (value: number) => {
    setAgeValue(value);
  };

  const setWeightValueFunc = (value: number) => {
    setWeightValue(value);
  };

  const setHeightValueFunc = (value: number) => {
    setAgeValue(value);
  };

  const setSexValueFunc = (value: number) => {
    setAgeValue(value);
  };

  return (
    <div className="w-full h-screen flex flex-col justify-start items-center  bg-zinc-900 py-10 px-20 space-y-10">
      <div className="w-full h-fit flex flex-col items-center relative before:absolute before:-bottom-6 before:left-38 before:w-20 before:h-1 before:rounded-lg before:bg-gradient-to-r before:from-amber-500 before:to-red-500 z-10">
        <Text
          as="p"
          className="text-amber-500 lg:text-sm text-xs tracking-widest uppercase font-medium"
        >
          Advanced Calculator
        </Text>
        <Text
          as="h1"
          className="text-zinc-100 lg:text-5xl md:text-4xl text-3xl"
        >
          Calculate Your BMI
        </Text>
      </div>
      <div className="w-10/12 space-y-10">
        <div className="w-full flex justify-between items-center space-x-16 ">
          <Input
            value={ageValue}
            ContainerClass={"w-60"}
            Title={"Age"}
            Placeholder={"Enter your age"}
            change={setAgeValueFunc}
          />
          <Input
            value={weightValue}
            ContainerClass={"w-60"}
            Title={"Weight"}
            Placeholder={"Enter your weight"}
            change={setWeightValueFunc}
          />
          <Input
            value={heightValue}
            ContainerClass={"w-60"}
            Title={"Height"}
            Placeholder={"Enter your heigth"}
            change={setHeightValue}
          />
          <Input
            value={sexValue}
            ContainerClass={"w-60"}
            Title={"Sex"}
            Placeholder={"Enter your sex"}
            change={setSexValue}
          />
        </div>
        <div className="w-full flex flex-col p-4 bg-zinc-700">
          <Text as="h2" className="text-zinc-200 text-lg text-center">
            Your BMI is <span className="font-extrabold">{bmiValue}</span>
          </Text>
        </div>
      </div>
    </div>
  );
};

export default CalculatorCal;
