"use client";
import { useState } from "react";
import Link from "next/link";
import DayList from "../_components/DayList";
import exerciseList from "src/app/helpers/exerciseList.json";
import firstDate from "src/app/helpers/firstDay.json";
import { calculateDateDifference, createFakeDate } from "../helpers/functions";
import { ExerciseData } from "../helpers/types";

export default function Buddy() {
  const [exerciseData, setExerciseData] = useState(
    exerciseList.exerciseData as ExerciseData,
  );

  let currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  const originalDate = new Date(firstDate.firstDate);
  const [startDate, setStartDate] = useState(originalDate);
  const [dateDifference, setDateDifference] = useState(
    calculateDateDifference(new Date(originalDate), currentDate),
  );
  const saveState = async () => {
    try {
      const response = await fetch("/api/status/route", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ exerciseData }),
      });

      if (response.ok) {
        console.log("Data saved successfully");
      } else {
        console.error("Failed to save data");
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const setStart = async (date: Date) => {
    date.setHours(0, 0, 0, 0);
    try {
      const response = await fetch("/api/date/route", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstDate: date }),
      });

      if (response.ok) {
        console.log("Data saved successfully");
        if (currentDate === date) {
          setDateDifference(0);
        } else if (date !== startDate) {
          let newDateDifference = calculateDateDifference(
            startDate,
            currentDate,
          );
          setDateDifference(newDateDifference);
        }
      } else {
        console.error("Failed to save data");
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <Link
        href="/"
        className="ellow-400 m-3 self-start rounded-lg border-2 p-3 text-3xl text-yellow-400 transition-all hover:scale-110 hover:shadow-xl hover:shadow-yellow-200"
      >
        &#8592; Back
      </Link>
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          I <span className="text-[hsl(280,100%,70%)]">Made</span> This
        </h1>
        <div>
          <button
            onClick={() => saveState()}
            className="m-3 self-start rounded-lg border-2 border-yellow-400 p-3 text-xl text-yellow-400 transition-all hover:scale-110 hover:shadow-xl hover:shadow-yellow-200"
          >
            Save State
          </button>
          <button
            onClick={() => setStart(currentDate)}
            className="m-3 self-start rounded-lg border-2 border-yellow-400 p-3 text-xl text-yellow-400 transition-all hover:scale-110 hover:shadow-xl hover:shadow-yellow-200"
          >
            Today Start
          </button>
          <button
            onClick={() => setStart(createFakeDate())}
            className="m-3 self-start rounded-lg border-2 border-yellow-400 p-3 text-xl text-yellow-400 transition-all hover:scale-110 hover:shadow-xl hover:shadow-yellow-200"
          >
            Reset Start
          </button>
          {dateDifference}
        </div>
        <DayList
          exerciseData={exerciseData}
          setExerciseData={setExerciseData}
          currentDate={currentDate}
          dateDifference={dateDifference}
        />
      </div>
    </main>
  );
}
