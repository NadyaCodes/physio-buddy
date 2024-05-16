"use client";
import { useState } from "react";
import Link from "next/link";
import DayList from "../_components/DayList";
import * as exerciseList from "src/app/helpers/exerciseList.json";
import { calculateDateDifference, createFakeDate } from "../helpers/functions";

export default function Buddy() {
  const [exerciseData, setExerciseData] = useState(exerciseList);
  const saveState = () => {
    console.log("saveState");
  };

  // const saveStart = () => {
  //   const today = new Date();
  //   const difference = calculateDateDifference(today, today);
  //   console.log("Difference is: ", difference);
  // };

  // const makeNewStart = () => {
  //   const newStart = createFakeDate();
  //   return newStart;
  // };

  const setStart = async (date: Date) => {
    date.setHours(0, 0, 0, 0);
    try {
      const response = await fetch("/api/date/route", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(date),
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
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <Link
        href="/"
        className="m-3 self-start rounded-lg border-2 border-yellow-400 p-3 text-3xl text-yellow-400 transition-all hover:scale-110 hover:shadow-xl hover:shadow-yellow-200"
      >
        &#8592; Back
      </Link>
      {/* <button onClick={saveData}>Save Data</button> */}
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
            onClick={() => setStart(new Date())}
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
        </div>
        <DayList
          exerciseData={exerciseData}
          setExerciseData={setExerciseData}
        />
      </div>
    </main>
  );
}
