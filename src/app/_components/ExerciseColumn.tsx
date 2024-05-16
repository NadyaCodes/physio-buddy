"use client";

import React from "react";
import type { ExerciseData } from "../helpers/types";

type ExerciseColumnProps = {
  exerciseData: ExerciseData;
  setExerciseData: React.Dispatch<React.SetStateAction<ExerciseData>>;
  exerciseIndex: number;
};

export default function ExerciseColumn({
  exerciseData,
  setExerciseData,
  exerciseIndex,
}: ExerciseColumnProps) {
  const updateItem = (element: string) => {
    // Create a new copy of exerciseData to avoid mutating state directly
    const updatedData: ExerciseData = JSON.parse(JSON.stringify(exerciseData));
    const currentData = updatedData[exerciseIndex];
    if (currentData) {
      currentData[element] = !currentData[element];
      // Update exerciseData state with the new value
      setExerciseData({ ...updatedData });
    }
  };

  const currentExerciseData = exerciseData[exerciseIndex];
  const exerciseArray = currentExerciseData
    ? Object.keys(currentExerciseData)
    : [];
  const exerciseDisplay = exerciseArray.map((element, index) => {
    return (
      <div key={element + "-" + index} onClick={() => updateItem(element)}>
        {element},{" "}
        {currentExerciseData && currentExerciseData[element] ? "true" : "false"}
      </div>
    );
  });

  return <div className="flex flex-col">{exerciseDisplay}</div>;
}
