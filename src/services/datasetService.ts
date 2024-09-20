import { readFileSync } from 'fs';
import { Record } from '../models/Record';
import chalk from 'chalk';

/**
 * Loads the dataset from a CSV file and returns an array of `Record` objects.
 * 
 * This function reads the content of a CSV file using Node.js's File System (FS) API, parses the file line by line,
 * and uses the column data to instantiate `Record` objects. The CSV file must follow the column format specified
 * in the dataset.
 * 
 * **Regular Expression for CSV Parsing**:
 * A regular expression is used to split each line of the CSV while properly handling commas that may be enclosed in quotes.
 * This ensures the correct parsing of fields, even if they contain commas.
 * 
 * @function loadDataset
 * @param {string} filePath - The path to the CSV dataset file.
 * @returns {Record[]} An array of parsed `Record` objects.
 * @throws {Error} If the file cannot be read or if an error occurs during parsing.
 * 
 * @see GeeksforGeeks. "Node.js fs.readFileSync() Method", Available: https://www.geeksforgeeks.org/node-js-fs-readfilesync-method/
 * @see MDN Web Docs. "Array.prototype.forEach()", Available: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
 * @see MDN Web Docs. "try...catch Statement", Available: hhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch
 * @see MDN Web Docs. "Regular Expressions", Available: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions
 * @see Chalk library for terminal string styling. Available: https://github.com/chalk/chalk
 *
 * @example
 * // Example usage:
 * const records = loadDataset('./data/keystone-throughput-and-capacity.csv');
 * console.log(records);
 * 
 * @author Harmeet Matharoo
 */
export function loadDataset(filePath: string): Record[] {
    try {
        // Read the file content synchronously from the provided file path
        const data = readFileSync(filePath, 'utf-8'); // @see fs.readFileSync
        const lines = data.split('\n').map(line => line.trim()).filter(line => line.length); // Remove empty lines

        // Initialize an array to hold the parsed Record objects
        const records: Record[] = [];

        // Iterate over each line starting from the second line (index 1) @see Array.forEach
        lines.slice(1).forEach((line) => {
            // Split the line into values and clean up any extra quotes
            const values = line.split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/).map(value => value.replace(/"/g, '').trim());

            // Create a new Record instance using the parsed values
            const record = new Record(
                values[0],  // Date
                +values[1], // Month (converted to number)
                +values[2], // Year (converted to number)
                values[3],  // Company
                values[4],  // Pipeline
                values[5],  // KeyPoint
                +values[6], // Latitude (converted to number)
                +values[7], // Longitude (converted to number)
                values[8],  // DirectionOfFlow
                values[9],  // TradeType
                values[10], // Product
                +values[11],// Throughput (converted to number)
                +values[12],// CommittedVolumes (converted to number)
                +values[13],// UncommittedVolumes (converted to number)
                +values[14],// NameplateCapacity (converted to number)
                +values[15],// AvailableCapacity (converted to number)
                values[16]  // ReasonForVariance
            );

            // Add the new Record object to the records array
            records.push(record); // @see Array.push
        });

        // Log success message if records are successfully loaded
        console.log(chalk.green(`Successfully loaded ${records.length} records.`));
        // Return the array of Record objects
        return records;

    } catch (err) { // Error handling block @see try...catch
        if (err instanceof Error) {
            console.error(chalk.red(`Error reading file: ${err.message}`)); // Print specific error message with color
        } else {
            console.error(chalk.red('An unknown error occurred.')); // Generic error message for unknown cases
        }
        return []; // Return an empty array in case of error
    }
}
