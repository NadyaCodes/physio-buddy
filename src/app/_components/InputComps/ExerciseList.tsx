"use client";
import React from "react";
import { createList } from "~/app/helpers/functions";
import type { ExerciseAlgoBase, ExerciseData } from "~/app/helpers/types";

type ExerciseListProps = {
  currentExerciseAlgo: ExerciseAlgoBase;
  setCurrentExerciseAlgo: React.Dispatch<
    React.SetStateAction<ExerciseAlgoBase>
  >;
  setExerciseDataList: React.Dispatch<React.SetStateAction<ExerciseData>>;
  exerciseArray: string[];
  setExerciseArray: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function ExerciseList({
  currentExerciseAlgo,
  setCurrentExerciseAlgo,
  setExerciseDataList,
  exerciseArray,
  setExerciseArray,
}: ExerciseListProps) {
  const deleteItem = (element: string) => {
    const newExerciseArray = [...exerciseArray];
    const index = newExerciseArray.findIndex((item) => item === element); // Corrected this line
    if (index !== -1) {
      newExerciseArray.splice(index, 1); // Remove the element at the found index
      setExerciseArray(newExerciseArray);
      let newExerciseAlgo = JSON.parse(
        JSON.stringify(currentExerciseAlgo),
      ) as ExerciseAlgoBase;
      delete newExerciseAlgo[element];
      setCurrentExerciseAlgo(newExerciseAlgo);
      const newExercises = createList(newExerciseAlgo);
      setExerciseDataList(newExercises);
    } else {
      console.log("Element not found in the array.");
    }
  };

  const exerciseMap = exerciseArray.map((element, index) => {
    return (
      <div
        className="rounded-smp-2 m-2 flex h-16 items-center justify-between rounded-sm border-2 p-2 "
        key={index}
      >
        {element}
        <button
          onClick={() => deleteItem(element)}
          className="rounded-full p-2 text-pink-400 transition-all hover:scale-105 hover:shadow-md hover:shadow-yellow-100"
        >
          Delete
        </button>
      </div>
    );
  });
  return (
    <div className="m-3 grid grid-cols-3 border-4 p-3 ">{exerciseMap}</div>
  );
}
