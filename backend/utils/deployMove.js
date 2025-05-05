import fs from "fs";
import path from "path";
import { exec } from "child_process";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";

dotenv.config();

// Ensure TEMP_DIR exists
const TEMP_DIR = path.join(process.cwd(), "temp");

export const deployMoveContract = async (rawCode) => {
  try {
    console.log("Step 1: Cleaning raw Move code");
    // Clean the raw Move code, removing markdown syntax
    const cleanedCode = rawCode.replace(/```move|```/g, "").trim();
    console.log("Cleaned Move code:", cleanedCode);

    // Generate a unique ID for the package
    const id = uuidv4();
    const moduleDir = path.join(TEMP_DIR, `package_${id}`);
    const sourcesDir = path.join(moduleDir, "sources");

    console.log("Step 2: Checking environment variable SUI_ADDRESS");
    // Ensure we have the SUI_ADDRESS environment variable
    if (!process.env.SUI_ADDRESS) {
      throw new Error("SUI_ADDRESS environment variable is not set.");
    }
    console.log("SUI_ADDRESS found:", process.env.SUI_ADDRESS);

    console.log("Step 3: Writing Move.toml file");
    // Write the Move.toml configuration
    const moveToml = `
[package]
name = "NFTCollection"
version = "0.0.1"

[addresses]
NFTCollection = "${process.env.SUI_ADDRESS}"
`;

    // Create necessary directories
    fs.mkdirSync(sourcesDir, { recursive: true });
    console.log("Step 4: Created directories for module and sources");

    // Write the Move TOML and main.move files
    fs.writeFileSync(path.join(moduleDir, "Move.toml"), moveToml);
    fs.writeFileSync(path.join(sourcesDir, "main.move"), cleanedCode);
    console.log("Step 5: Written Move.toml and main.move files");

    return new Promise((resolve, reject) => {
      const formattedPath = moduleDir.replace(/\\/g, "/");

      console.log("Step 6: Preparing to publish the contract");
      // Use the correct publish command with gas budget
      const publishCommand = `sui client publish "${formattedPath}" --gas-budget 100000000`;

      exec(publishCommand, (err, stdout, stderr) => {
        if (err) {
          // Log and reject with detailed error
          console.error("Error during contract publishing:", stderr);
          return reject({ success: false, error: stderr });
        }

        console.log("Step 7: Successfully published contract, parsing output");
        // Check for successful package publication
        const match = stdout.match(/Package ID: ([a-zA-Z0-9:_]+)/);
        const packageId = match ? match[1] : null;

        // Return the result with package ID and output
        resolve({
          success: true,
          packageId,
          output: stdout,
        });
      });
    });
  } catch (err) {
    // Return a structured error if something fails in the try block
    console.error("Step X: Error deploying contract:", err.message);
    return { success: false, error: err.message };
  }
};
