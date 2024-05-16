import React from "react";
import ExerciseColumn from "./ExerciseColumn";

type DayColumProps = {
  day: String;
  exerciseIndex: number;
};

export default function DayColumn({ day, exerciseIndex }: DayColumProps) {
  return (
    <div className="m-4 flex flex-col border-2 p-3">
      <div className="text-lg font-bold">{day}</div>
      <ExerciseColumn id={exerciseIndex} />
    </div>
  );
}
