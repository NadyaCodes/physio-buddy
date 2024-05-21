"use client";
import { useState } from "react";
import Link from "next/link";
import DayList from "../_components/BuddyComps/DayList";
import exerciseList from "src/app/helpers/exerciseList.json";
import firstDate from "src/app/helpers/firstDay.json";
import { calculateDateDifference } from "../helpers/functions";
import { ExerciseData } from "../helpers/types";

export default function Buddy() {
  const [exerciseData, setExerciseData] = useState(
    exerciseList.exerciseData as ExerciseData,
  );

  let currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  const originalDate = new Date(firstDate.firstDate);
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
        setDateDifference(0);
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
        className="m-3 self-start rounded-lg border-2 border-yellow-400 p-3 text-3xl text-yellow-400 transition-all hover:scale-110 hover:shadow-md hover:shadow-yellow-200"
      >
        &#8592; Back
      </Link>
      <div className="container flex flex-col items-center justify-center gap-12 px-4">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          You <span className="text-[hsl(280,100%,70%)]">GOT</span> This
        </h1>
        <div className="text-2xl">...maybe...</div>
        <div>
          <button
            onClick={() => saveState()}
            className="m-3 self-start rounded-lg border-2 border-yellow-400 p-3 text-xl text-yellow-400 transition-all hover:scale-110 hover:shadow-md hover:shadow-yellow-200"
          >
            Save State
          </button>
          <button
            onClick={() => setStart(currentDate)}
            className="m-3 self-start rounded-lg border-2 border-yellow-400 p-3 text-xl text-yellow-400 transition-all hover:scale-110 hover:shadow-md hover:shadow-yellow-200"
          >
            Today Start
          </button>
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
