// pages/api/saveData.js
import fs from "fs";
import path from "path";
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
// export default function handler(req, res) {
  if (req.method === "POST") {
    
    const data  = req.body; // Assuming data is sent in the request body

    // Example file path
    const filePath = path.join(process.cwd(), "src/app/helpers/", "exerciseAlgo.json");

    try {
      // Write data to file
      fs.writeFileSync(filePath, JSON.stringify(data));

      res.status(200).json({ message: "Data saved successfully" });
    } catch (error) {
      console.error("Error saving data:", error);
      res.status(500).json({ message: "Error saving data" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
