"use client";
import Link from "next/link";
import { useState } from "react";
import exerciseList from "src/app/helpers/exerciseList.json";
import { ExerciseAlgoBase, ExerciseData } from "../helpers/types";
import AddExercise from "../_components/AddExercise";
import originalExerciseAlgo from "src/app/helpers/exerciseAlgo.json";

export default function Buddy() {
  const [exercises, setExercises] = useState(
    exerciseList.exerciseData as ExerciseData,
  );
  const [currentExerciseAlgo, setCurrentExerciseAlgo] = useState(
    originalExerciseAlgo.exerciseAlgo as ExerciseAlgoBase,
  );
  const idArray = Object.keys(exercises);

  const exerciseDisplay = idArray.map((id) => {
    const exerciseObject = exercises[id] || {};
    const exerciseList = Object.keys(exerciseObject);
    const displayArray = exerciseList.map((exercise) => {
      let ex;
      let className = "";
      let object = exerciseObject[exercise];

      if (exercises && id && exerciseObject && object !== undefined) {
        ex = object?.status ? true : false;

        switch (object?.color) {
          case "blue":
            className = "text-blue-400";
            break;
          case "pink":
            className = " text-pink-300";
            break;
          case "green":
            className = " text-green-300";
            break;
          case "purple":
            className = " text-purple-300";
            break;
          default:
            className = " text-yellow-200";
        }
      }
      return (
        <div className={className}>
          {exercise}: {ex && ex ? "true" : "false"}
        </div>
      );
    });
    return (
      <div className="m-2 flex flex-col rounded-sm border-2 p-2">
        <div>Day: {id}</div>
        {displayArray}
      </div>
    );
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <Link
        href="/"
        className="ellow-400 m-3 self-start rounded-lg border-2 p-3 text-3xl text-yellow-400 transition-all hover:scale-110 hover:shadow-xl hover:shadow-yellow-200"
      >
        &#8592; Back
      </Link>
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          I <span className="text-[hsl(280,100%,70%)]">Made</span> This
        </h1>
        <AddExercise
          setCurrentExerciseAlgo={setCurrentExerciseAlgo}
          currentExerciseAlgo={currentExerciseAlgo}
          setExercises={setExercises}
        />
        <div className="grid grid-cols-7">{exerciseDisplay}</div>
      </div>
    </main>
  );
}
