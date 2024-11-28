// src/services/mainService.ts
import { loadDataset } from './datasetService';  // Importing loadDataset function for reading CSV data
import { displayRecord } from '../utils/displayUtils'; // Function to display each record in a formatted manner
import { DetailedRecord } from '../models/DetailedRecord';
import readline from 'readline'; // Used for interactive terminal input
import fs from 'fs';  // File system to save new CSV files
import pc from 'picocolors';  // External library for colorized output in the terminal
import { parse } from 'csv-parse';
import termkit from 'terminal-kit'; // Ensure correct import of terminal-kit
const term = termkit.terminal; // Use the terminal object
/**
 * Handles the main program logic of loading the dataset and interacting with the user.
 * The user can view, create, update, and delete records in memory, and save the dataset back to a CSV file.
 *
 * @remarks
 * This function orchestrates the main user interaction, reading and writing the dataset as needed. It includes options
 * for displaying records, creating, updating, and deleting records, reloading the dataset, and saving the dataset back to disk.
 * 
 * The program demonstrates several important programming concepts:
 * - **Variables**: Manages the `records` array and other input/output variables.
 * - **Methods/Functions**: Includes various helper methods to perform user tasks.
 * - **Loop Structures**: Uses the `.forEach()` method to iterate over the `records` array.
 * - **File I/O**: Reads from the dataset CSV using the `loadDataset` method, and writes data back to a file using `fs.writeFileSync`.
 * - **Exception Handling**: Implements error handling using `try/catch` blocks.
 * - **API Library**: Uses external libraries like `picocolors` for terminal output styling and `readline` for command-line interaction.
 * - **Data Structures**: Utilizes arrays to store `DetailedRecord` objects in memory.
 * - **Decision Structures**: Uses the `switch` statement to handle menu options.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch try/catch Documentation} for error handling.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch switch Documentation} for decision structures.
 * @see {@link https://csv.js.org/parse csv-parse Documentation} for more details on CSV parsing.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach Array.forEach Documentation} for array iteration.
 * @see {@link https://nodejs.org/api/fs.html Node.js File System API} for handling file I/O.
 * @see {@link https://github.com/alexeyraspopov/picocolors Picocolors Documentation} for terminal string styling.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/console/log console.log()} for printing output in the terminal.
 * @see {@link https://nodejs.org/api/readline.html Node.js readline API} for interactive user input.
 * 
 * @param {string} filePath - The path to the CSV file to load.
 * @returns {Promise<DetailedRecord[]>} A promise that resolves with the updated records when the program exits.
 *
 * @throws {Error} If there is an issue loading or saving the dataset.
 * 
 * @example
 * ```ts
 * runProgram('./src/keystone-throughput-and-capacity.csv')
 *   .then(records => {
 *     // Do something with the records after the program exits
 *   })
 *   .catch(error => console.error(error));  // Handle any errors thrown during execution
 * ```
 * 
 * @author Harmeet Matharoo
 */
export async function runProgram(filePath: string): Promise<DetailedRecord[]> {
    let records: DetailedRecord[];

    // Exception Handling: Ensure the dataset is loaded correctly
    try {
        // Load initial dataset from CSV
        records = await loadDataset(filePath);
    } catch (error) {
        console.error(pc.red(`Error loading dataset: ${(error instanceof Error) ? error.message : 'Unknown error'}`));
        return [];
    }

    // Create an interface for user input
    let rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    // Wrap the main program in a Promise to ensure the tests can await its completion
    return new Promise<DetailedRecord[]>((resolve, reject) => {
        /**
         * Displays a menu of options for the user and handles user input.
         * After the menu is displayed, the author's name is shown for visibility.
         * 
         * @returns {void}
         */
        const showMenu = (): void => {
            console.log(`
        --- Menu ---
        1. Display all records
        2. Create new record
        3. Update a record
        4. Delete a record
        5. Reload dataset
        6. Save dataset to file
        7. Generate ASCII Chart for a Record
        8. Exit
        `);

            // Display author's name at the end of the menu
            console.log(pc.bold(pc.bgCyanBright("Harmeet Matharoo - CST8333 Project")));

            rl.question("\nChoose an option: ", handleMenuInput);
        };

        /**
         * Handles the user's menu selection and performs the corresponding action.
         * @param {string} choice - The user's menu choice.
         * @returns {void}
         */
        const handleMenuInput = (choice: string): void => {
            switch (choice) {
                case '1':  // Display all records
                    records.forEach((record, index) => {
                        console.log(pc.yellow(`\nRecord ${index + 1}:`));
                        displayRecord(record);
                    });
                    showMenu();
                    break;
                case '2':  // Create a new record
                    createRecord();
                    break;
                case '3':  // Update an existing record
                    updateRecord();
                    break;
                case '4':  // Delete a record
                    deleteRecord();
                    break;
                case '5':  // Reload the dataset
                    reloadDataset();
                    break;
                case '6':  // Save the dataset to a file
                    saveDataset();
                    break;
                case '7': // Generate ASCII Chart for a Record
                    if (records.length === 0) {
                        console.log(pc.red('No records available to generate a chart.'));
                        showMenu();
                        break;
                    }

                    console.log(pc.green(`\nThere are ${records.length} records available.`));
                    rl.question(pc.yellow('Enter record number: '), async (input) => {
                        const index = parseInt(input, 10) - 1;
                        if (isNaN(index) || index < 0 || index >= records.length) {
                            console.log(pc.red('Invalid record number!'));
                            showMenu();
                            return;
                        }

                        const selectedRecord = records[index];
                        await generateTerminalChart(selectedRecord); // Await the chart display

                        // Reinitialize readline interface
                        rl.close(); // Close the old interface
                        rl = readline.createInterface({
                            input: process.stdin,
                            output: process.stdout,
                        });
                        showMenu(); // Return to the menu
                    });
                    break;

                case '8':  // Exit the program
                    rl.close();
                    break;
                default:
                    console.log(pc.red('Invalid choice!'));
                    showMenu();
                    break;
            }
        };

        /**
         * Prompts the user for new record details, creates a new `DetailedRecord` object, and adds it to the in-memory dataset.
         * 
         * @remarks
         * This method collects data via user input, creates a new record using the DetailedRecord class, and adds it to the array of records.
         * Demonstrates variables and methods in action.
         * 
         * @returns {void}
         */
        const createRecord = (): void => {
            rl.question("Enter record details (comma-separated values for all fields): ", (input) => {
                // Check if the input is empty
                if (!input.trim()) {
                    console.error(pc.red('No input provided. Please enter all 17 fields.'));
                    showMenu();
                    return;
                }

                parse(input, { delimiter: ',', quote: '"', relax_quotes: true }, (err, output) => {
                    if (err) {
                        console.error(pc.red('Error parsing input. Please try again.'));
                        showMenu();
                        return;
                    }

                    const data = output[0]; // Parsed array of values

                    // Check if data array has exactly 17 fields
                    if (data.length !== 17) {
                        console.error(pc.red(`Insufficient data provided. Please enter exactly 17 fields. You entered ${data.length}.`));
                        showMenu();
                        return;
                    }

                    // Proceed to create the DetailedRecord object
                    try {
                        const newRecord = new DetailedRecord(
                            data[0],               // Date
                            parseInt(data[1]),      // Month (number)
                            parseInt(data[2]),      // Year (number)
                            data[3],               // Company
                            data[4],               // Pipeline
                            data[5],               // Key Point
                            parseFloat(data[6]),    // Latitude (number)
                            parseFloat(data[7]),    // Longitude (number)
                            data[8],               // DirectionOfFlow
                            data[9],               // TradeType
                            data[10],              // Product
                            parseFloat(data[11]),   // Throughput (number)
                            parseFloat(data[12]),   // CommittedVolumes (number)
                            parseFloat(data[13]),   // UncommittedVolumes (number)
                            parseFloat(data[14]),   // NameplateCapacity (number)
                            parseFloat(data[15]),   // AvailableCapacity (number)
                            data[16]               // ReasonForVariance
                        );

                        records.push(newRecord);
                        console.log(pc.green("Record added successfully!"));
                    } catch (e) {
                        console.error(pc.red('Error creating record. Please ensure all fields are entered correctly.'));
                    }
                    showMenu();
                });
            });
        };

        /**
         * Prompts the user for a record number and updated details, then updates the specified record.
         * 
         * @remarks
         * This method allows the user to modify a specific record's details, demonstrating variables, methods, and decision-making structures.
         * 
         * @returns {void}
         */
        const updateRecord = (): void => {
            rl.question("Enter the record number to update: ", (input) => {
                const index = parseInt(input) - 1;
                if (index < 0 || index >= records.length) {
                    console.log(pc.red("Invalid record number!"));
                    showMenu();
                    return;
                }
                rl.question("Enter updated details (comma-separated values): ", (updatedData) => {
                    parse(updatedData, { delimiter: ',', relax_quotes: true }, (err, output) => {
                        if (err) {
                            console.error(pc.red('Error parsing input. Please try again.'));
                            showMenu();
                            return;
                        }

                        const data = output[0]; // Parsed array of values

                        if (data.length < 17) {
                            console.error(pc.red('Insufficient data provided. Please enter all 17 fields.'));
                            showMenu();
                            return;
                        }

                        // Update the record in memory
                        try {
                            records[index] = new DetailedRecord(
                                data[0],               // Date
                                parseInt(data[1]),      // Month (number)
                                parseInt(data[2]),      // Year (number)
                                data[3],               // Company
                                data[4],               // Pipeline
                                data[5],               // Key Point
                                parseFloat(data[6]),    // Latitude (number)
                                parseFloat(data[7]),    // Longitude (number)
                                data[8],               // DirectionOfFlow
                                data[9],               // TradeType
                                data[10],              // Product
                                parseFloat(data[11]),   // Throughput (number)
                                parseFloat(data[12]),   // CommittedVolumes (number)
                                parseFloat(data[13]),   // UncommittedVolumes (number)
                                parseFloat(data[14]),   // NameplateCapacity (number)
                                parseFloat(data[15]),   // AvailableCapacity (number)
                                data[16]               // ReasonForVariance
                            );

                            console.log(pc.green("Record updated successfully!"));
                        } catch (e) {
                            console.error(pc.red('Error updating record. Please ensure all fields are entered correctly.'));
                        }
                        showMenu();
                    });
                });
            });
        };

        /**
         * Prompts the user for a record number and deletes the specified record from the in-memory dataset.
         * 
         * @remarks
         * This method demonstrates array manipulation, allowing the user to delete records from memory.
         * 
         * @returns {void}
         */
        const deleteRecord = (): void => {
            rl.question("Enter the record number to delete: ", (input) => {
                const index = parseInt(input) - 1;
                if (index < 0 || index >= records.length) {
                    console.log(pc.red("Invalid record number!"));
                    showMenu();
                    return;
                }
                records.splice(index, 1);  // Remove the record from array
                console.log(pc.green("Record deleted successfully!"));
                showMenu();
            });
        };

        /**
         * Reloads the dataset from the CSV file, replacing the in-memory data.
         * @returns {Promise<void>} A promise that resolves when the dataset has been reloaded.
         */
        const reloadDataset = async (): Promise<void> => {
            try {
                records = await loadDataset(filePath);  // File I/O: Reload dataset from CSV
                console.log(pc.green("Dataset reloaded successfully!"));
            } catch (error) {
                console.error(pc.red(`Error reloading dataset: ${(error instanceof Error) ? error.message : 'Unknown error'}`));
            }
            showMenu();
        };

        /**
         * Saves the current in-memory dataset to a new CSV file on disk.
         * @returns {void}
         */
        const saveDataset = (): void => {
            try {
                const outputFile = './src/updated_dataset.csv';

                // Step 1: Define the headers as an array
                const headers = [
                    'Date',
                    'Month',
                    'Year',
                    'Company',
                    'Pipeline',
                    'Key Point',
                    'Latitude',
                    'Longitude',
                    'Direction Of Flow',
                    'Trade Type',
                    'Product',
                    'Throughput (1000 m3/d)',
                    'Committed Volumes (1000 m3/d)',
                    'Uncommitted Volumes (1000 m3/d)',
                    'Nameplate Capacity (1000 m3/d)',
                    'Available Capacity (1000 m3/d)',
                    'Reason For Variance'
                ];

                // Step 2: Convert the headers array to a CSV string
                const headerLine = headers.join(',');

                // Step 3: Convert the records to CSV lines
                const csvDataLines = records.map(record => {
                    // Handle fields that might contain commas by wrapping them in quotes
                    return Object.values(record).map(value => {
                        if (typeof value === 'string' && value.includes(',')) {
                            // Escape double quotes by replacing " with ""
                            const escapedValue = value.replace(/"/g, '""');
                            return `"${escapedValue}"`;
                        } else {
                            return value;
                        }
                    }).join(',');
                });

                // Combine the header and data lines
                const csvContent = [headerLine, ...csvDataLines].join('\n');

                // Write the CSV content to the file
                fs.writeFileSync(outputFile, csvContent);
                console.log(pc.green(`Dataset saved to ${outputFile}`));
            } catch (error) {
                console.error(pc.red(`Error saving dataset: ${(error instanceof Error) ? error.message : 'Unknown error'}`));
            }
            showMenu();
        };

        /**
         * Generate a horizontal terminal chart for a record and return to the menu upon user input.
         * @param {DetailedRecord} record - The record to display.
         */
        const generateTerminalChart = async (record: DetailedRecord): Promise<void> => {
            const term = termkit.terminal; // Reinitialize terminal object for terminal-kit

            // Clear the terminal and display the chart
            term.clear();
            term.bold.underline(`Horizontal Chart for ${record.Company} (${record.Year})\n\n`);

            const labels = ['Throughput', 'Committed', 'Uncommitted', 'Available'];
            const values = [
                record.Throughput || 0,
                record.CommittedVolumes || 0,
                record.UncommittedVolumes || 0,
                record.AvailableCapacity || 0,
            ];

            // Display each metric as a horizontal bar
            labels.forEach((label, index) => {
                const barLength = Math.round((values[index] / Math.max(...values)) * 20); // Scale bars to fit
                term(`${label.padEnd(12)}: `);
                term.green('█'.repeat(barLength));
                term(` ${values[index].toFixed(2)}\n`);
            });

            // Display author's name at the end of the menu
            console.log(pc.bold(pc.bgCyanBright("\nHarmeet Matharoo - CST8333 Project")));

            term('\nPress any key to return to the menu...\n');

            // Capture a key press and exit the chart view
            term.grabInput();
            return new Promise<void>((resolve) => {
                term.on('key', () => {
                    term.grabInput(false); // Stop capturing input
                    term.clear();
                    resolve(); // Resolve the promise to return to the menu
                });
            });
        };


        // Override rl.close to resolve the promise when the program exits
        const originalRlClose = rl.close.bind(rl);
        rl.close = () => {
            originalRlClose();
            resolve(records); // Resolve the promise with the current records
        };

        showMenu();  // Start the user interaction by displaying the menu
    });
}
