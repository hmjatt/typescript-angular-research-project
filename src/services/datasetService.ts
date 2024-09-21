import fs from 'fs';
import { parse } from 'csv-parse';
import { Record } from '../models/Record';
import pc from 'picocolors';

/**
 * Loads the dataset from a CSV file and returns an array of `Record` objects using the `csv-parse` library.
 * 
 * This function reads the content of a CSV file and parses the file using `csv-parse`, creating `Record` objects.
 * The CSV file must follow the column format specified in the dataset.
 * 
 * **CSV Parsing Library**:
 * This function uses the `csv-parse` library, which simplifies reading and parsing CSV files in Node.js.
 * 
 * @param {string} filePath - The path to the CSV dataset file.
 * @returns {Promise<Record[]>} A promise that resolves with an array of `Record` objects parsed from the CSV file.
 * @throws {Error} If the file cannot be read or if an error occurs during parsing.
 * 
 * @see csv-parse: Node.js module to read CSV files. Available: https://csv.js.org/parse
 * @see MDN Web Docs. "Array.prototype.forEach()", Available: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
 * @see Picocolors library for terminal string styling. Available: https://github.com/alexeyraspopov/picocolors
 *
 * @example
 * loadDataset('./data/keystone-throughput-and-capacity.csv')
 *   .then(records => console.log(records))
 *   .catch(error => console.error(error));
 * 
 * @author Harmeet Matharoo
 */
export async function loadDataset(filePath: string): Promise<Record[]> {
    const records: Record[] = [];

    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(parse({ delimiter: ',' }))
            .on('data', (row) => {
                const record = new Record(
                    row[0],  // Date
                    +row[1], // Month (converted to number)
                    +row[2], // Year (converted to number)
                    row[3],  // Company
                    row[4],  // Pipeline
                    row[5],  // KeyPoint
                    +row[6], // Latitude (converted to number)
                    +row[7], // Longitude (converted to number)
                    row[8],  // DirectionOfFlow
                    row[9],  // TradeType
                    row[10], // Product
                    +row[11],// Throughput (converted to number)
                    +row[12],// CommittedVolumes (converted to number)
                    +row[13],// UncommittedVolumes (converted to number)
                    +row[14],// NameplateCapacity (converted to number)
                    +row[15],// AvailableCapacity (converted to number)
                    row[16]  // ReasonForVariance
                );
                records.push(record);
            })
            .on('end', () => {
                console.log(pc.green(`Successfully loaded ${records.length} records.`));
                resolve(records);
            })
            .on('error', (err) => {
                console.error(pc.red(`Error reading file: ${err.message}`));
                reject(err);
            });
    });
}
