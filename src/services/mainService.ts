import { loadDataset } from './datasetService';  // Importing loadDataset function for reading CSV data
import { displayRecord } from '../utils/displayUtils'; // Function to display each record in a formatted manner
import { Record } from '../models/Record';
import readline from 'readline'; // Used for interactive terminal input
import fs from 'fs';  // File system to save new CSV files
import pc from 'picocolors';  // External library for colorized output in the terminal

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
 * - **Data Structures**: Utilizes arrays to store `Record` objects in memory.
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
 * @returns {Promise<void>} A promise that resolves when the program completes its execution.
 *
 * @throws {Error} If there is an issue loading or saving the dataset.
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
    let records: Record[];

    // Exception Handling: Ensure the dataset is loaded correctly
    try {
        // Load initial dataset from CSV
        records = await loadDataset(filePath);
    } catch (error) {
        console.error(pc.red(`Error loading dataset: ${(error instanceof Error) ? error.message : 'Unknown error'}`));
        return;
    }

    // Create an interface for user input
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

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
    7. Exit
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
            case '7':  // Exit the program
                rl.close();
                break;
            default:
                console.log(pc.red('Invalid choice!'));
                showMenu();
                break;
        }
    };

    /**
     * Prompts the user for new record details, creates a new `Record` object, and adds it to the in-memory dataset.
     * 
     * @remarks
     * This method collects data via user input, creates a new record using the Record class, and adds it to the array of records.
     * Demonstrates variables and methods in action.
     * 
     * @returns {void}
     */
    const createRecord = (): void => {
        rl.question("Enter record details (comma-separated values for all fields): ", (input) => {
            const data = input.split(',');

            // Create a new Record object with the user's input
            const newRecord = new Record(
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

            records.push(newRecord);  // Add to array (Data Structure: Array)
            console.log(pc.green("Record added successfully!"));
            showMenu();
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
                const data = updatedData.split(',');

                // Update the record in memory
                records[index] = new Record(
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
                showMenu();
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
            const csvData = records.map(record => Object.values(record).join(',')).join('\n');
            fs.writeFileSync(outputFile, csvData);  // File I/O: Save dataset to CSV
            console.log(pc.green(`Dataset saved to ${outputFile}`));
        } catch (error) {
            console.error(pc.red(`Error saving dataset: ${(error instanceof Error) ? error.message : 'Unknown error'}`));
        }
        showMenu();
    };

    showMenu();  // Start the user interaction by displaying the menu
}
