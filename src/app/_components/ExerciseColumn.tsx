"use client";

import React, { useState } from "react";
import * as exerciseList from "../helpers/exerciseList.json";

type ExerciseColumnProps = {
  id: number;
};

export default function ExerciseColumn({ id }: ExerciseColumnProps) {
  // Use useState to create state for exerciseList
  const [exerciseData, setExerciseData] = useState(exerciseList);

  const updateItem = (element: string) => {
    // Create a new copy of exerciseData to avoid mutating state directly
    const updatedData = { ...exerciseData };
    updatedData[id][element] = !updatedData[id][element];
    // Update exerciseData state with the new value
    setExerciseData(updatedData);
  };

  const exerciseObject = exerciseData[id as keyof typeof exerciseData];
  const exerciseArray = Object.keys(exerciseObject);
  const exerciseDisplay = exerciseArray.map((element) => {
    return (
      <div key={element} onClick={() => updateItem(element)}>
        {element}, {exerciseData[id][element] ? "true" : "false"}
      </div>
    );
  });

  return <div className="flex flex-col">{exerciseDisplay}</div>;
}
