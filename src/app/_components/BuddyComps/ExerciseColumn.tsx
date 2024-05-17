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
    let className = "";
    let selectedData = currentExerciseData
      ? currentExerciseData[element]
      : null;
    if (selectedData) {
      switch (selectedData?.color) {
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
      <div
        key={element + "-" + index}
        onClick={() => updateItem(element)}
        className={className}
      >
        {element},{" "}
        {currentExerciseData && selectedData?.status ? "true" : "false"}
      </div>
    );
  });

  return <div className="flex flex-col">{exerciseDisplay}</div>;
}
