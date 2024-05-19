"use client";
import React from "react";
import type { ExerciseData } from "~/app/helpers/types";

type SaveProps = {
  exerciseDataList: ExerciseData;
  exerciseAlgo: Object;
  setShowSaveCard: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Save({
  exerciseDataList,
  exerciseAlgo,
  setShowSaveCard,
}: SaveProps) {
  const exerciseData = exerciseDataList;
  const saveData = async () => {
    try {
      const response = await fetch("/api/list/route", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ exerciseData }),
      });

      if (response.ok) {
        console.log("Data saved successfully");
        try {
          const response = await fetch("/api/algo/route", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ exerciseAlgo }),
          });

          if (response.ok) {
            console.log("Data saved successfully");
            setShowSaveCard(true);
            setTimeout(() => setShowSaveCard(false), 1500);
          } else {
            console.error("Failed to save data");
          }
        } catch (error) {
          console.error("Error saving data:", error);
        }
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <div
      className="self-start rounded-lg border-4 border-yellow-400 p-10 text-3xl font-extrabold text-yellow-400 transition-all hover:scale-110 hover:shadow-md hover:shadow-yellow-200"
      onClick={saveData}
    >
      Save
    </div>
  );
}
