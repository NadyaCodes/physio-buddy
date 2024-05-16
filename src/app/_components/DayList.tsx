"use client";
import React from "react";
import { daysOfWeek } from "../helpers/helperObjects";
import DayColumn from "./DayColumn";

type DayListProps = {
  exerciseData: Object;
  setExerciseData: Function;
};

export default function DayList({
  exerciseData,
  setExerciseData,
}: DayListProps) {
  const date = new Date();
  let currentDay = date.getDay();
  const dayList = [];

  for (let i = 0; i < 7; i++) {
    if (currentDay === 7) {
      currentDay = 0;
    }
    dayList.push(daysOfWeek[currentDay]);
    currentDay++;
  }

  const dayDisplay = dayList.map((element, index) => {
    return (
      <div key={index}>
        <DayColumn day={element || "Sunday"} exerciseIndex={index} />
      </div>
    );
  });
  return <div className="flex flex-row">{dayDisplay}</div>;
}
