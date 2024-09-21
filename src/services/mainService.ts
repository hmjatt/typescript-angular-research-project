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
 * @see MDN Web Docs. "console.log()". Available: https://developer.mozilla.org/en-US/docs/Web/API/console/log_static
 * @see MDN Web Docs. "Array.prototype.forEach()". Available: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
 * @see GeeksforGeeks. "Node.js fs.readFileSync() Method", Available: https://www.geeksforgeeks.org/node-js-fs-readfilesync-method/
 * @see Picocolors library for terminal string styling. Available: https://github.com/alexeyraspopov/picocolors
 * 
 * @author Harmeet Matharoo
 * 
 * @function runProgram
 * @param {string} filePath - The path to the dataset CSV file.
 * @returns {void}
 * @example
 * runProgram('./src/keystone-throughput-and-capacity.csv');
 */
export function runProgram(filePath: string): void {
    console.log(pc.bold(pc.bgCyanBright("Harmeet Matharoo - CST8333 Project")));

    const records = loadDataset(filePath); // Load records from CSV

    // Loop through records and display them
    records.forEach((record, index) => {
        console.log(pc.yellow(`\nRecord ${index + 1}:`));
        record.display(); // Output the details of each record

        console.log();
        
        // Print the author's name every 10 records
        if ((index + 1) % 10 === 0) {
            console.log(pc.bold(pc.bgCyanBright("--- Harmeet Matharoo - CST8333 Project ---")));
        }
    });

    // Display the author's name again at the end
    console.log(pc.bold(pc.bgCyanBright("--- Harmeet Matharoo - CST8333 Project ---")));
}
