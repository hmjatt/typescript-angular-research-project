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
        7. Interactive Charting Options
        8. Exit
        `);

            // Display author's name at the end of the menu
            console.log(pc.bold(pc.bgCyanBright("Harmeet Matharoo - CST8333 Project")));

            rl.question("\nChoose an option: ", handleMenuInput);
        };

        const handleMenuInput = async (choice: string): Promise<void> => {
            await processMenuChoice(choice.trim());
        };

        const processMenuChoice = async (choice: string): Promise<void> => {
            switch (choice) {
                case '1': // Display all records
                    records.forEach((record, index) => {
                        console.log(pc.yellow(`\nRecord ${index + 1}:`));
                        displayRecord(record);
                    });
                    break;
        
                case '2': // Create a new record
                    await createRecord();
                    break;
        
                case '3': // Update an existing record
                    await updateRecord();
                    break;
        
                case '4': // Delete a record
                    await deleteRecord();
                    break;
        
                case '5': // Reload the dataset
                    await reloadDataset();
                    break;
        
                case '6': // Save the dataset to a file
                    saveDataset();
                    break;
        
                case '7': // Interactive Charting Options
                    await interactiveChartMenu();
                    break;
        
                case '8': // Exit the program
                    console.log(pc.green("Exiting the program. Goodbye!"));
                    rl.close();
                    return;
        
                default:
                    console.log(pc.red('Invalid choice!'));
                    break;
            }
        
            showMenu(); // Return to the main menu after processing
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

        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        
        const displayHorizontalBarChart = (
            data: DetailedRecord[],
            title: string,
            groupByMonth = false
        ): void => {
            term.clear();
            term.bold.underline(`${title} (1000 m³/d)\n\n`);
        
            const labels = groupByMonth
                ? [...new Set(data.map(record => `${monthNames[record.Month - 1]}`))]
                : data.map((_, index) => `Record ${index + 1}`);
            const throughputValues = groupByMonth
                ? Array.from({ length: 12 }, (_, month) =>
                    data
                        .filter(record => record.Month === month + 1)
                        .reduce((sum, record) => sum + (record.Throughput || 0), 0)
                )
                : data.map(record => record.Throughput || 0);
            const capacityValues = groupByMonth
                ? Array.from({ length: 12 }, (_, month) =>
                    data
                        .filter(record => record.Month === month + 1)
                        .reduce((sum, record) => sum + (record.AvailableCapacity || 0), 0)
                )
                : data.map(record => record.AvailableCapacity || 0);
        
            displayHorizontalBarChartFromData(labels, throughputValues, capacityValues, title);
        };
        
        const displayHorizontalBarChartFromData = (
            labels: string[],
            throughputValues: number[],
            capacityValues: number[],
            title: string
        ): void => {
            const maxValue = Math.max(...throughputValues, ...capacityValues, 1);
            const maxBarLength = Math.min(term.width - 40, 50);
        
            labels.forEach((label, index) => {
                const throughputBarLength = Math.round((throughputValues[index] / maxValue) * maxBarLength);
                const capacityBarLength = Math.round((capacityValues[index] / maxValue) * maxBarLength);
        
                // Display throughput bar
                term(`${label.padEnd(20)}: `);
                term.bgBlue(' '.repeat(throughputBarLength)).styleReset();
                term(` Throughput: ${throughputValues[index].toFixed(2)}\n`);
        
                // Display capacity bar
                term(' '.repeat(22)); // Indent for alignment
                term.bgYellow(' '.repeat(capacityBarLength)).styleReset();
                term(` Capacity: ${capacityValues[index].toFixed(2)}\n`);
        
                // Add a blank line or separator after each row
                term(pc.gray("\n--------------------\n"));
            });
        
            term.bold.underline("\nLegend:").styleReset();
            term("\n Blue = Throughput (1000 m³/d)");
            term("\n Yellow = Available Capacity (1000 m³/d)\n\n");
        };
        
        
        const interactiveChartMenu = async (): Promise<void> => {
            console.log(`
            --- Charting Menu ---
            1. Select a specific month in a year
            2. Show all months in a year
            3. Compare combined monthly data across years
            4. Return to main menu
            `);
        
            const chartChoice = await getInput("Choose a charting option: ");
            switch (chartChoice.trim()) {
                case '1': // Chart for a specific month in a year
                    const year = parseInt(await getInput("Enter the year: "), 10);
                    const month = parseInt(await getInput("Enter the month (1-12): "), 10);
        
                    const filtered = records.filter(record => record.Year === year && record.Month === month);
        
                    if (filtered.length === 0) {
                        console.error(pc.red("No data found for the selected month and year."));
                    } else {
                        displayHorizontalBarChart(filtered, `Data for ${monthNames[month - 1]} ${year}`);
                    }
                    break;
        
                case '2': // Chart for all months in a year
                    const selectedYear = parseInt(await getInput("Enter the year: "), 10);
        
                    const yearData = records.filter(record => record.Year === selectedYear);
        
                    if (yearData.length === 0) {
                        console.error(pc.red("No data found for the selected year."));
                    } else {
                        displayHorizontalBarChart(yearData, `All months in ${selectedYear}`, true);
                    }
                    break;
        
                case '3': // Compare combined monthly data across years
                    const years = Array.from(new Set(records.map(record => record.Year)));
                    const aggregatedData = years.map(year => {
                        const yearlyRecords = records.filter(record => record.Year === year);
                        const totalThroughput = yearlyRecords.reduce((sum, record) => sum + (record.Throughput || 0), 0);
                        const totalCapacity = yearlyRecords.reduce((sum, record) => sum + (record.AvailableCapacity || 0), 0);
                        return { year, totalThroughput, totalCapacity };
                    });
        
                    const labels = aggregatedData.map(data => `${data.year}`);
                    const throughputValues = aggregatedData.map(data => data.totalThroughput);
                    const capacityValues = aggregatedData.map(data => data.totalCapacity);
        
                    displayHorizontalBarChartFromData(labels, throughputValues, capacityValues, "Combined Data by Year");
                    break;
        
                case '4': // Return to main menu
                    showMenu();
                    return;
        
                default:
                    console.error(pc.red("Invalid charting option!"));
                    break;
            }
            await returnToChartMenu();
        };
        
        const returnToChartMenu = async (): Promise<void> => {
            term("\nPress any key to return to the charting menu...");
            term.grabInput();
            await new Promise<void>(resolve => {
                term.on('key', () => {
                    term.grabInput(false);
                    console.clear();
                    console.log("Returning to the chart menu...");
                    resolve();
                });
            });
        };
        
        
        const getInput = (prompt: string): Promise<string> => {
            return new Promise((resolve, reject) => {
                rl.question(pc.yellow(prompt), (input) => {
                    resolve(input.trim());
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
