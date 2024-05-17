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
        className="border-round-sm m-2 flex w-44 justify-between border-2 p-2"
        key={index}
      >
        {element}
        <button onClick={() => deleteItem(element)}>Delete</button>
      </div>
    );
  });
  return <div className="w-72">{exerciseMap}</div>;
}
