"use client";

import React from "react";

type ExerciseColumnProps = {
  exerciseData: Object;
  setExerciseData: Function;
  exerciseIndex: number;
};

export default function ExerciseColumn({
  exerciseData,
  setExerciseData,
  exerciseIndex,
}: ExerciseColumnProps) {
  const updateItem = (element: string) => {
    // Create a new copy of exerciseData to avoid mutating state directly
    const updatedData = JSON.parse(JSON.stringify(exerciseData));
    updatedData[exerciseIndex][element] = !updatedData[exerciseIndex][element];
    // // Update exerciseData state with the new value
    setExerciseData({ ...updatedData });
  };

  const exerciseArray = Object.keys(exerciseData[exerciseIndex]);
  const exerciseDisplay = exerciseArray.map((element, index) => {
    return (
      <div key={element + "-" + index} onClick={() => updateItem(element)}>
        {element}, {exerciseData[exerciseIndex][element] ? "true" : "false"}
      </div>
    );
  });

  return <div className="flex flex-col">{exerciseDisplay}</div>;
}
