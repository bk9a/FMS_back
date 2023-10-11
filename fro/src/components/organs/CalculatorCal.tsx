import { useState, useEffect } from "react";
import { Text } from "../atoms/Text";
import { Input } from "../atoms/Input";
import { Button } from "../atoms/Button";
import { Selection } from "../atoms/Selection";
import ReactSelect from "../atoms/ReactSelect";
import { Ingreadant } from "../atoms/Ingreadant";

interface Option {
  value: number;
  label: string;
}

interface FoodOption {
  value: number;
  label: string;
  calories: number;
}

const CalculatorCal = () => {
  const options: Option[] = [
    { value: 0, label: "Эр" },
    { value: 1, label: "Эм" },
  ];

  const Foods: FoodOption[] = [
    { value: 0, label: "Food1", calories: 1.1 },
    { value: 1, label: "Food2", calories: 1.2 },
    { value: 2, label: "Food3", calories: 1.3 },
    { value: 3, label: "Food4", calories: 1.4 },
    { value: 4, label: "Food5", calories: 1.5 },
  ];

  const [heightValue, setHeightValue] = useState<number>(0);
  const [weightValue, setWeightValue] = useState<number>(0);
  const [ageValue, setAgeValue] = useState<number>(0);
  // const [sexValue, setSexValue] = useState<number>(1);
  const [sexValue, setSexValue] = useState<number>(options[0].value);
  const [ingSel, setIngSel] = useState<number>(Foods[0].value);

  const [bmiValue, setBmiValue] = useState<number>(0);
  const [calOneEat, setCalOneEat] = useState<number>(0);
  const [amountFood, setAmountFood] = useState<number>(0);

  const [ingre, setIngre] = useState<
    { calorie: number; name: string; gram: number; id: number }[]
  >([]);
  // const itemElements = [];

  useEffect(() => {
    let height = parseFloat(heightValue.toString());
    let weight = parseFloat(weightValue.toString());
    let age = parseFloat(ageValue.toString());
    let sex = parseFloat(sexValue.toString());

    let BMR; // Basal Metabolic Rate

    if (sex === 0) {
      // For males
      BMR = 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
    } else if (sex === 1) {
      // For females
      BMR = 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;
    } else {
      throw new Error('Invalid sex. Use "male" or "female".');
    }

    // To estimate daily calorie needs, you can use the Harris-Benedict equation
    // Harris-Benedict equation for sedentary activity level
    const dailyCalories = BMR * 1.2;
    if (isNaN(dailyCalories)) {
      setBmiValue(0);
    } else {
      const twoDecimalPlaces = dailyCalories.toFixed(2);
      setBmiValue(parseFloat(twoDecimalPlaces));
    }
  }, [heightValue, weightValue, ageValue, sexValue]);

  useEffect(() => {
    if (bmiValue < calOneEat) {
      setCalOneEat(bmiValue);
      console.log("Max calorie odort avah hemjeenees baga baih ystoi");
    }
  }, [calOneEat]);

  // useEffect(() => {
  //   itemElements.push(<Ingreadant name="Food1" gram={1.1} />);
  // }, [ingre]);

  const setAgeValueFunc = (value: number) => {
    setAgeValue(value);
  };

  const setWeightValueFunc = (value: number) => {
    setWeightValue(value);
  };

  const setHeightValueFunc = (value: number) => {
    setHeightValue(value);
  };

  // const setSexValueFunc = (value: number) => {
  //   setSexValue(value);
  // };

  const setFoodOptionFunc = (newOption: number) => {
    console.log(newOption);
    setIngSel(newOption);
  };

  const setSexValueFunc = (newOption: number) => {
    setSexValue(newOption);
  };

  const setCalOneEatFunc = (value: number) => {
    setCalOneEat(value);
  };

  const setAmountFoodFunc = (value: number) => {
    setAmountFood(value);
  };

  const removeIng = (value: number) => {
    console.log("ingre");
    setIngre((current) => current.filter((el) => el.id !== value));
  };

  const addIngrFunc = () => {
    let ingSelVal = parseFloat(ingSel.toString());
    let amountFoodVal = parseFloat(amountFood.toString());

    if (amountFoodVal != 0) {
      Foods.forEach((el) => {
        if (el.value === ingSelVal) {
          let id = parseFloat(el.value.toString());
          let calories = parseFloat(el.calories.toString());
          setIngre((prev) => [
            ...prev,
            {
              calorie: calories * amountFoodVal,
              name: el.label,
              gram: amountFoodVal,
              id: id,
            },
          ]);
          return;
        }
      });
    }
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
          Calculate Your Calorie
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
            change={setHeightValueFunc}
          />
          <Selection
            ContainerClass={"w-60"}
            Title={"Sex"}
            options={options}
            selectedOption={sexValue}
            change={setSexValueFunc}
          />
        </div>
        <div className="w-full flex flex-col p-4 bg-zinc-700">
          <Text as="h2" className="text-zinc-200 text-lg text-center">
            Your calorie is <span className="font-extrabold">{bmiValue}</span>
          </Text>
        </div>
      </div>
      <div className="w-10/12 flex justify-between items-end">
        <Input
          value={calOneEat}
          ContainerClass={"w-3/12"}
          Title={"Тухайн хоолонд авах калори"}
          Placeholder={"Тухайн хоолонд авах калори"}
          change={setCalOneEatFunc}
          max={bmiValue}
        />
        <Selection
          ContainerClass={"w-3/12"}
          Title={"Хоолны орц сонгох"}
          options={Foods}
          change={setFoodOptionFunc}
        />
        <Input
          value={amountFood}
          ContainerClass={"w-3/12"}
          Title={"Орцны хэмжээ(грамм)"}
          Placeholder={"Орцны хэмжээ"}
          change={setAmountFoodFunc}
        />
        <button
          className="px-6 py-3 bg-bodyhack text-gray-700 text-sm uppercase font-semibold h-12 w-40"
          onClick={addIngrFunc}
        >
          Add
        </button>
      </div>
      <div className="w-10/12 h-fit bg-zinc-700 grid gap-4 grid-cols-4 py-4">
        {ingre.map((el, i) => (
          <Ingreadant
            key={i}
            name={el.name}
            gram={el.gram}
            remove={removeIng}
          />
        ))}
      </div>
      <div className="w-10/12 flex p-4 bg-zinc-700 justify-around">
        <Text as="h2" className="text-zinc-200 text-lg text-center">
          Your calorie is <span className="font-extrabold">test</span>
        </Text>
      </div>
    </div>
  );
};

export default CalculatorCal;
