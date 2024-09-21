import { loadDataset } from './datasetService';
import pc from 'picocolors';

/**
 * Handles the main program logic of loading the dataset and printing the records.
 * 
 * This function loads the dataset using the `loadDataset` function and prints the records to the console.
 * The author's name, "Harmeet Matharoo - CST8333 Project", is printed at the beginning, every 10 records,
 * and at the end for clear visibility.
 * 
 * **Program Flow**:
 * - Loads data from a CSV file.
 * - Iterates through each record, prints the data to the console.
 * - Displays the author's name at regular intervals (every 10 records) to ensure visibility.
 * 
 * @see csv-parse: Node.js module to read CSV files. Available: https://csv.js.org/parse
 * @see MDN Web Docs. "console.log()". Available: https://developer.mozilla.org/en-US/docs/Web/API/console/log_static
 * @see Picocolors library for terminal string styling. Available: https://github.com/alexeyraspopov/picocolors
 * 
 * @author Harmeet Matharoo
 * 
 * @param {string} filePath - The path to the dataset CSV file.
 * @returns {Promise<void>}
 * @example
 * runProgram('./src/keystone-throughput-and-capacity.csv');
 */
export async function runProgram(filePath: string): Promise<void> {
    console.log(pc.bold(pc.bgCyanBright("Harmeet Matharoo - CST8333 Project")));
    console.log();

    try {
        const records = await loadDataset(filePath); // Load records from CSV

        // Loop through records and display them
        records.forEach((record, index) => {
            console.log(pc.yellow(`\nRecord ${index + 1}:`));
            record.display(); // Output the details of each record

            console.log();

            // Print the author's name every 10 records
            if ((index + 1) % 10 === 0) {
                console.log(pc.bold(pc.bgCyanBright("--- Output every 10th line ->  Harmeet Matharoo - CST8333 Project ---")));
            }
        });

        console.log();
        // Display the author's name again at the end
        console.log(pc.bold(pc.bgCyanBright("--- Harmeet Matharoo - CST8333 Project ---")));
    } catch (error) {
        if (error instanceof Error) {
            console.error(pc.red(`Failed to load dataset: ${error.message}`));
        } else {
            console.error(pc.red('An unknown error occurred.'));
        }
    }
}
