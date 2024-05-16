"use client";
import React, { useState } from "react";
import { daysOfWeek } from "../helpers/helperObjects";
import DayColumn from "./DayColumn";

type DayListProps = {
  exerciseData: Object;
  setExerciseData: Function;
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
  const dayList = [];

  for (let i = 0; i < 7; i++) {
    if (currentDay === 7) {
      currentDay = 0;
    }
    dayList.push(daysOfWeek[currentDay]);
    currentDay++;
  }

  const dayDisplay = dayList.map((element, index) => {
    const exerciseIndex = index + dateDifference;
    return (
      <div key={index}>
        <DayColumn
          day={element || "Sunday"}
          exerciseIndex={exerciseIndex}
          exerciseData={exerciseData}
          setExerciseData={setExerciseData}
        />
      </div>
    );
  });
  return <div className="flex flex-row">{dayDisplay}</div>;
}
