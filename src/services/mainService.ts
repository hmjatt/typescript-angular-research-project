import { loadDataset } from './datasetService';  // Importing loadDataset function for reading CSV data
import { displayRecord } from '../utils/displayUtils'; // Function to display each record in a formatted manner
import pc from 'picocolors';  // External library used for colorized output in the terminal

/**
 * Handles the main program logic of loading the dataset and printing the records.
 * 
 * This function demonstrates several important programming concepts:
 * - **Variables**: Variables like `records` and `index` store data and track the record count.
 * - **Methods/Functions**: The `runProgram` function performs actions like loading the dataset and displaying each record.
 * - **Loops**: The `.forEach()` method iterates over each record in the dataset.
 * - **File I/O**: Uses the `loadDataset` function (from another module) to read CSV data from a file.
 * - **Exception Handling**: The function uses `try/catch` to handle potential errors during file loading or record display.
 * - **API Library**: `picocolors` is used for styling terminal output (e.g., colors).
 * 
 * @remarks
 * The function reads data from a CSV file asynchronously, and for every 10 records printed, it displays the author's name for visibility. It handles errors gracefully and prints an appropriate message when the dataset cannot be loaded.
 * 
 * **Key Concepts**:
 * 1. **Variables**: `records` stores the data, and `index` tracks which record is being displayed.
 * 2. **Methods**: The `runProgram` method is a reusable function that orchestrates the entire process of loading and displaying the dataset.
 * 3. **Loop Structure**: The `.forEach()` method loops over each `record` in the dataset and processes it.
 * 4. **File I/O**: The `loadDataset` function reads a CSV file using a stream and returns an array of records.
 * 5. **Exception Handling**: `try/catch` is used to handle any potential errors during file reading or data display.
 * 6. **API Library**: The `picocolors` library is used to add colors to the terminal output for better visibility.
 * 
 * @see {@link https://csv.js.org/parse csv-parse Documentation} for more details on CSV parsing.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach forEach Documentation} for array looping.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch try/catch Documentation} for error handling.
 * @see {@link https://nodejs.org/api/fs.html Node.js File System API} for handling file I/O.
 * @see {@link https://github.com/alexeyraspopov/picocolors Picocolors Documentation} for terminal string styling.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/console/log console.log()} for printing output in the terminal.
 * 
 * @param {string} filePath - The path to the CSV file.
 * @returns {Promise<void>} A promise that resolves when the program finishes execution.
 * 
 * @throws {Error} If the dataset cannot be loaded or processed.
 * 
 * @example
 * ```ts
 * runProgram('./src/keystone-throughput-and-capacity.csv')
 *   .catch(error => console.error(error));  // Handle any errors thrown during execution
 * ```
 * 
 * @author Harmeet Matharoo
 */
export async function runProgram(filePath: string): Promise<void> {
    // Display the author's name in a colorized format at the beginning of the output
    console.log(pc.bold(pc.bgCyanBright("Harmeet Matharoo - CST8333 Project")));
    console.log();  // Blank line for better formatting

    try {
        // FILE I/O:
        // Load records from the CSV file by calling the loadDataset function.
        // The result is an array of `Record` objects.
        const records = await loadDataset(filePath);

        // LOOP STRUCTURE:
        // Loop through the array of records. `.forEach()` applies the given function to each element.
        records.forEach((record, index) => {
            // VARIABLES:
            // The `index` variable tracks which record we are currently on in the dataset.

            // Display the current record's details using the displayRecord function.
            // This function formats the output for better readability.
            console.log(pc.yellow(`\nRecord ${index + 1}:`));
            displayRecord(record);  // Call a separate function to handle the display logic

            console.log();  // Insert a blank line after each record for better formatting

            // Every 10th record, print the author's name again for visibility
            if ((index + 1) % 10 === 0) {
                console.log(pc.bold(pc.bgCyanBright("--- Output every 10th line -> Harmeet Matharoo - CST8333 Project ---")));
            }
        });

        console.log();  // Blank line for better formatting

        // End of program: Display the author's name again to mark the end
        console.log(pc.bold(pc.bgCyanBright("--- Harmeet Matharoo - CST8333 Project ---")));

    } catch (error) {
        // EXCEPTION HANDLING:
        // If any error occurs during the execution (e.g., loading the dataset), it will be caught here.
        if (error instanceof Error) {
            console.error(pc.red(`Failed to load dataset: ${error.message}`));  // Display error message in red
        } else {
            console.error(pc.red('An unknown error occurred.'));  // Generic error message if the error is not an instance of Error
        }
    }
}
