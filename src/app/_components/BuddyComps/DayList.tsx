"use client";
import React from "react";
import { daysOfWeek } from "../../helpers/helperObjects";
import DayColumn from "./DayColumn";
import { ExerciseData } from "../../helpers/types";

type DayListProps = {
  exerciseData: ExerciseData;
  setExerciseData: React.Dispatch<React.SetStateAction<ExerciseData>>;
  currentDate: Date;
  dateDifference: number;
};

export default function DayList({
  exerciseData,
  setExerciseData,
  currentDate,
  dateDifference,
}: DayListProps) {
  let currentDay = currentDate.getDay();
  const exerciseArray = Object.keys(exerciseData);

  //find first day of week
  let firstDay = currentDay - dateDifference - 1;
  while (firstDay < 0) {
    firstDay += 7;
  }

  const allDaysDisplay = exerciseArray.map((element, index) => {
    let dayToDisplay = firstDay + Number(element);
    while (dayToDisplay >= 7) {
      dayToDisplay -= 7;
    }
    let columnClass = "m-2 border-2";

    if (dateDifference === Number(element) - 1) {
      columnClass += " border-yellow-400 rounded-lg";
    }

    return (
      <div key={index} className={columnClass}>
        <DayColumn
          day={daysOfWeek[dayToDisplay] || "Sunday"}
          exerciseIndex={Number(element)}
          exerciseData={exerciseData}
          setExerciseData={setExerciseData}
        />
      </div>
    );
  });
  return <div className="grid grid-cols-5">{allDaysDisplay}</div>;
}
