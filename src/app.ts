import { loadDataset } from './services/datasetService';
import chalk from 'chalk';

/**
 * The main entry point of the program.
 * 
 * This function loads the dataset using the `loadDataset` function and prints the records to the console.
 * The author's name, "Harmeet Matharoo - CST8333 Project", is printed at the beginning, every 10 records,
 * and at the end for clear visibility. It uses `console.log` for outputting data to the console and loops
 * through the dataset records for display.
 * 
 * **Program Flow**:
 * - Loads data from a CSV file.
 * - Iterates through each record, prints the data to the console.
 * - Displays the author's name at regular intervals (every 10 records) to ensure visibility.
 * 
 * **References**:
 * @see MDN Web Docs. "console.log()". Available: hhttps://developer.mozilla.org/en-US/docs/Web/API/console/log_static
 * @see MDN Web Docs. "Array.prototype.forEach()". Available: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
 * @see GeeksforGeeks. "Node.js fs.readFileSync() Method", Available: https://www.geeksforgeeks.org/node-js-fs-readfilesync-method/
 * @see Chalk library for terminal string styling. Available: https://github.com/chalk/chalk
 *
 * @function main
 * @example
 * // To run the program, simply call the main function:
 * main();
 * 
 * @author Harmeet Matharoo
 */
function main() {
    // Display the author's name at the top of the output
    console.log(chalk.bold.bgCyanBright("Harmeet Matharoo - CST8333 Project"));

    // Define the path to the CSV file containing the dataset
    const filePath = './src/keystone-throughput-and-capacity.csv';

    // Load the dataset into an array of `Record` objects by invoking the loadDataset function
    const records = loadDataset(filePath); // @see loadDataset

    // Loop over each record in the array and display it on the console
    records.forEach((record, index) => {
        console.log(chalk.yellow(`\nRecord ${index + 1}:`)); // Display record number

        record.display(); // Call the display method to print the record details

        // Print the author's name every 10 records for clarity
        if ((index + 1) % 10 === 0) {
            console.log(chalk.bold.bgCyanBright("\n--- Harmeet Matharoo - CST8333 Project ---\n"));
        }
    });

    // Display the author's name again at the end of the output
    console.log(chalk.bold.bgCyanBright("\n--- Harmeet Matharoo - CST8333 Project ---\n"));
}

// Run the main function to start the program
main();
