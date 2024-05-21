"use client";

import React from "react";
import type { ExerciseData } from "../../helpers/types";
import { colorSwitch } from "~/app/helpers/functions";
import { colorList } from "~/app/helpers/helperObjects";

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

  const ExerciseItem = (
    element: string,
    index: number,
    colorClass: string,
    lineClass: string,
  ) => {
    return (
      <div
        key={element + "-" + index}
        onClick={() => updateItem(element)}
        className={colorClass}
      >
        <div className={lineClass}>{element}</div>
      </div>
    );
  };

  const orderedExercises = colorList.map((color) => {
    if (currentExerciseData) {
      const allOfColor = exerciseArray.filter(
        (exercise) => currentExerciseData[exercise]?.color === color,
      );
      return allOfColor;
    }
  });

  let orderedExerciseArray = orderedExercises.flat();

  const exerciseDisplay = orderedExerciseArray.map((element, index) => {
    if (element) {
      let colorClass = "";
      let selectedData = currentExerciseData
        ? currentExerciseData[element]
        : null;
      if (selectedData) {
        colorClass = colorSwitch(selectedData?.color);
      }
      let lineClass = selectedData?.status ? "line-through" : "";

      return ExerciseItem(element, index, colorClass, lineClass);
    }
  });

  return <div className="flex flex-col">{exerciseDisplay}</div>;
}
