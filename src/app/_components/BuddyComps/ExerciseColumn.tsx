"use client";

import React from "react";
import type { ExerciseData } from "../../helpers/types";

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
      let currentElement = currentData[element];
      if (currentElement) {
        currentElement.status = !currentElement.status;
      }
      // Update exerciseData state with the new value
      setExerciseData({ ...updatedData });
    }
  };

  const currentExerciseData = exerciseData[exerciseIndex];
  const exerciseArray = currentExerciseData
    ? Object.keys(currentExerciseData)
    : [];

  const exerciseDisplay = exerciseArray.map((element, index) => {
    let colorClass = "";
    let selectedData = currentExerciseData
      ? currentExerciseData[element]
      : null;
    if (selectedData) {
      switch (selectedData?.color) {
        case "blue":
          colorClass = "text-blue-400";
          break;
        case "pink":
          colorClass = " text-pink-400";
          break;
        case "green":
          colorClass = " text-green-400";
          break;
        case "purple":
          colorClass = " text-purple-400";
          break;
        default:
          colorClass = " text-yellow-200";
      }
    }
    let lineClass = selectedData?.status ? "line-through" : "";

    return (
      <div
        key={element + "-" + index}
        onClick={() => updateItem(element)}
        className={colorClass}
      >
        <div className={lineClass}>{element}</div>
      </div>
    );
  });

  return <div className="flex flex-col">{exerciseDisplay}</div>;
}
