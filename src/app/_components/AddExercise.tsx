"use client";
import React, { useState } from "react";
import { blankExercise } from "../helpers/helperObjects";
import { ExerciseAlgoBase, ExerciseData } from "../helpers/types";
import { createList } from "../helpers/functions";

type AddExerciseProps = {
  currentExerciseAlgo: ExerciseAlgoBase;
  setCurrentExerciseAlgo: React.Dispatch<
    React.SetStateAction<ExerciseAlgoBase>
  >;
  setExercises: React.Dispatch<React.SetStateAction<ExerciseData>>;
};

export default function AddExercise({
  currentExerciseAlgo,
  setCurrentExerciseAlgo,
  setExercises,
}: AddExerciseProps) {
  const [localObject, setLocalObject] = useState(blankExercise);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    key: string,
  ) => {
    setLocalObject({ ...localObject, [key]: e.target.value });
  };

  const saveExerciseData = async (exerciseAlgo: ExerciseAlgoBase) => {
    const exerciseData = createList(exerciseAlgo);

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
        setExercises(exerciseData);
        setCurrentExerciseAlgo(exerciseAlgo);
      } else {
        console.error("Failed to save data");
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const addEx = async (exerciseAlgo: ExerciseAlgoBase) => {
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

        saveExerciseData(exerciseAlgo);
      } else {
        console.error("Failed to save data");
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const handleSubmit = () => {
    const exerciseAlgo = JSON.parse(JSON.stringify(currentExerciseAlgo));
    exerciseAlgo[localObject.exercise] = localObject;
    setLocalObject(blankExercise);
    addEx(exerciseAlgo);
  };

  return (
    <div>
      <div>
        <label
          htmlFor="exercise"
          className="mb-2 block text-sm font-medium text-white"
        >
          Exercise name
        </label>
        <input
          type="text"
          id="exercise"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="Calf Raise"
          required
          onChange={(e) => handleInputChange(e, "exercise")}
        />
        <label
          htmlFor="frequency"
          className="mb-2 block pt-5 text-sm font-medium text-white"
        >
          Frequency
        </label>
        <input
          type="number"
          id="frequency"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="1"
          required
          onChange={(e) => handleInputChange(e, "frequency")}
        />
        <label
          htmlFor="start"
          className="mb-2 block pt-5 text-sm font-medium text-white"
        >
          Start Day
        </label>
        <input
          type="number"
          id="start"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="1"
          required
          onChange={(e) => handleInputChange(e, "start")}
        />
        <select
          id="color"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          onChange={(e) => handleInputChange(e, "color")}
          value={localObject.color}
          required
        >
          <option value="">Select a color</option>
          <option value="pink">Pink</option>
          <option value="blue">Blue</option>
          <option value="green">Green</option>
          <option value="purple">Purple</option>
        </select>
        <button onClick={handleSubmit} className="m-2 rounded-md border-2 p-2">
          Add Exercise
        </button>
      </div>
    </div>
  );
}
