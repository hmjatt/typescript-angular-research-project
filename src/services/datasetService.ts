import fs from 'fs';  // Node.js built-in module for working with files (File I/O)
import { parse } from 'csv-parse';  // External API library used to parse CSV files
import { DetailedRecord } from '../models/DetailedRecord';
import pc from 'picocolors';  // External library for colorized output in the terminal

/**
 * Loads a dataset from a CSV file and returns an array of `DetailedRecord` objects.
 * 
 * This function demonstrates several important programming concepts:
 * - **File I/O**: Uses Node.js's `fs.createReadStream` to read a file.
 * - **Variables**: Declares variables like `records` to hold an array of data.
 * - **Methods/Functions**: The `loadDataset` function performs actions like reading the CSV, processing the data, and returning a result.
 * - **Loops**: Loops over rows in the CSV file as the data is streamed.
 * - **Exception Handling**: Uses a `try/catch` mechanism (through Promises) to handle potential errors.
 * - **API Library**: The `csv-parse` library is an API that processes CSV data.
 * 
 * @remarks
 * The function reads data asynchronously, making it efficient for handling large files. It uses a Promise to manage asynchronous code execution, ensuring that we can wait for the file to be fully read before continuing with further processing.
 * 
 * **Key Concepts**:
 * 1. **File I/O**: Input/Output operations on files. Here we read a CSV file using streams, which lets us handle large files efficiently without loading everything into memory at once.
 * 2. **Variables**: Used to store data. In this case, `records` is a variable that holds an array of `DetailedRecord` objects.
 * 3. **Methods**: The `loadDataset` method (or function) is a reusable piece of code that accepts a file path, processes the file, and returns the parsed data.
 * 4. **Loop Structure**: The `.on('data', ...)` is a loop-like structure, which processes each row of the CSV file as it's read.
 * 5. **API Library**: We use `csv-parse` to automatically parse the CSV file into individual rows and columns.
 * 6. **Exception Handling**: The `.on('error', ...)` callback ensures that errors are caught and handled properly.
 * 
 * @see {@link https://csv.js.org/parse csv-parse Documentation} for more details on CSV parsing.
 * @see {@link https://nodejs.org/api/stream.html#stream_readable_on_event_listener Node.js Stream Documentation} for handling events on streams.
 * @see {@link https://nodejs.org/api/events.html#events_emitter_on_eventname_listener Node.js EventEmitter Documentation} for event handling using `.on()`.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array Array Documentation} for handling arrays in JavaScript.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise Promise Documentation} for understanding asynchronous behavior.
 * @see {@link https://github.com/alexeyraspopov/picocolors Picocolors Documentation} for terminal string styling.
 *  
 * @param {string} filePath - The path to the CSV file.
 * @returns {Promise<DetailedRecord[]>} A promise that resolves with an array of `DetailedRecord` objects created from the CSV file data.
 * 
 * @throws {Error} If the file cannot be read or if parsing fails.
 * 
 * @example
 * ```ts
 * loadDataset('./data/keystone-throughput-and-capacity.csv')
 *   .then(records => console.log(records))
 *   .catch(error => console.error(error));
 * ```
 * 
 * @author Harmeet Matharoo
 */
export async function loadDataset(filePath: string): Promise<DetailedRecord[]> {
    // VARIABLES:
    // `records` is an array that will store the parsed records (each row of the CSV file will become a DetailedRecord object)
    const records: DetailedRecord[] = [];

    // RETURNING A PROMISE:
    // A Promise allows asynchronous code (like reading a file) to be handled cleanly.
    return new Promise((resolve, reject) => {
        const readStream = fs.createReadStream(filePath);

        // Handle errors from createReadStream (e.g., file not found)
        readStream.on('error', (err) => {
            console.error(pc.red(`Error opening file: ${err.message}`));
            reject(err);
        });

        readStream
            .pipe(parse({ delimiter: ',', from_line: 2 }))
            .on('data', (row) => {
                const record = new DetailedRecord(
                    row[0],      // Date
                    +row[1],     // Month
                    +row[2],     // Year
                    row[3],      // Company
                    row[4],      // Pipeline
                    row[5],      // KeyPoint
                    +row[6],     // Latitude
                    +row[7],     // Longitude
                    row[8],      // DirectionOfFlow
                    row[9],      // TradeType
                    row[10],     // Product
                    +row[11],    // Throughput
                    +row[12],    // CommittedVolumes
                    +row[13],    // UncommittedVolumes
                    +row[14],    // NameplateCapacity
                    +row[15],    // AvailableCapacity
                    row[16]      // ReasonForVariance
                );
                records.push(record);
            })
            .on('error', (err) => {
                console.error(pc.red(`Error parsing file: ${err.message}`));
                reject(err);
            })
            .on('end', () => {
                console.log(pc.green(`Successfully loaded ${records.length} records.`));
                resolve(records);
            });
    });
}