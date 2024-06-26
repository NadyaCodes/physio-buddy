"use client";
import Link from "next/link";
import { useState } from "react";
import exerciseList from "src/app/helpers/exerciseList.json";
import { ExerciseAlgoBase, ExerciseData } from "../helpers/types";
import AddExercise from "../_components/InputComps/AddExercise";
import originalExerciseAlgo from "src/app/helpers/exerciseAlgo.json";
import ExerciseList from "../_components/InputComps/ExerciseList";
import Save from "../_components/InputComps/Save";
import SavedCard from "../_components/InputComps/SavedCard";
import { colorSwitch } from "../helpers/functions";

export default function Input() {
  const [exerciseDataList, setExerciseDataList] = useState(
    exerciseList.exerciseData as ExerciseData,
  );

  const [currentExerciseAlgo, setCurrentExerciseAlgo] = useState(
    originalExerciseAlgo.exerciseAlgo as ExerciseAlgoBase,
  );

  const [exerciseArray, setExerciseArray] = useState(
    Object.keys(originalExerciseAlgo.exerciseAlgo as ExerciseAlgoBase),
  );

  const [showSaveCard, setShowSaveCard] = useState(false);

  const idArray = Object.keys(exerciseDataList);

  const exerciseDisplay = idArray.map((id, index) => {
    const exerciseObject = exerciseDataList[id] || {};
    const exerciseList = Object.keys(exerciseObject);
    const displayArray = exerciseList.map((exercise, index) => {
      let ex;
      let object = exerciseObject[exercise];
      let className = "";

      if (exerciseDataList && id && exerciseObject && object !== undefined) {
        ex = object?.status ? true : false;
        className = colorSwitch(object?.color);
      }
      return (
        <div className={className} key={index}>
          {exercise}
        </div>
      );
    });
    return (
      <div className="m-2 flex flex-col rounded-sm border-2 p-2" key={index}>
        <div>Day: {id}</div>
        {displayArray}
      </div>
    );
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <Link
        href="/"
        className="m-3 self-start rounded-lg border-2 border-yellow-400 p-3 text-3xl text-yellow-400 transition-all hover:scale-110 hover:shadow-md hover:shadow-yellow-200"
      >
        &#8592; Back
      </Link>
      <div className="container flex flex-col items-center justify-center gap-12 px-4 ">
        {showSaveCard && <SavedCard />}
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Exercise <span className="text-[hsl(280,100%,70%)]">Input</span> 🤓
        </h1>
        <Link
          href="/buddy"
          className="m-3 rounded-lg border-2 border-pink-400 p-3 text-3xl text-pink-400 transition-all hover:scale-110 hover:shadow-md hover:shadow-pink-200"
        >
          Buddy
        </Link>
        <div className="flex w-full justify-between">
          <ExerciseList
            currentExerciseAlgo={currentExerciseAlgo}
            setCurrentExerciseAlgo={setCurrentExerciseAlgo}
            setExerciseDataList={setExerciseDataList}
            exerciseArray={exerciseArray}
            setExerciseArray={setExerciseArray}
          />
          <div className="flex w-1/2 flex-row justify-around">
            <AddExercise
              currentExerciseAlgo={currentExerciseAlgo}
              setCurrentExerciseAlgo={setCurrentExerciseAlgo}
              setExerciseDataList={setExerciseDataList}
              setExerciseArray={setExerciseArray}
            />
            <Save
              exerciseDataList={exerciseDataList}
              exerciseAlgo={currentExerciseAlgo}
              setShowSaveCard={setShowSaveCard}
            />
          </div>
        </div>
        <div className="grid grid-cols-7">{exerciseDisplay}</div>
      </div>
    </main>
  );
}
