import { Record } from '../models/Record';  // Import the Record class from the models directory
import pc from 'picocolors';  // Picocolors library for adding color to terminal output

/**
 * Displays the details of a `Record` object.
 * 
 * This function demonstrates important programming concepts:
 * - **Variables**: The function accesses properties (variables) from the `Record` object to print each detail.
 * - **Methods**: The `displayRecord` function encapsulates the logic to display a `Record` object.
 * - **API Library**: It uses the `picocolors` library (imported as `pc`) to format and colorize output in the terminal for readability.
 * - **Optional Chaining**: Uses `?.` to handle cases where a field might be `null` or `undefined`.
 * 
 * The function outputs each key property of the `Record`, such as the company name, pipeline, location, and throughput details, with color-coding for better readability in the terminal.
 * 
 * **Key Concepts**:
 * 1. **Variables**: The `record` parameter is passed into the function, and its properties (like `Date`, `Company`, etc.) are accessed and printed.
 * 2. **Methods**: `displayRecord` is a function (or method) that performs the task of displaying a record's details.
 * 3. **API Library**: The `picocolors` library is used to apply different colors to the printed text, making the output easier to read.
 * 4. **Error Handling with Optional Chaining**: The `?.` operator is used to safely access properties, even if they are `null` or `undefined`, preventing runtime errors.
 * 
 * @remarks
 * This function is useful for printing structured data (like records from a dataset) in a readable format with color coding. Each property of the `Record` is printed, and color is added using the `picocolors` library for better readability in a terminal environment.
 * 
 * **References**:
 * @see {@link https://www.typescriptlang.org/docs/handbook/2/classes.html TypeScript Classes} for more on TypeScript classes.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number JavaScript Number Object} for handling numbers in JavaScript.
 * @see {@link https://github.com/alexeyraspopov/picocolors Picocolors Documentation} for adding color to terminal outputs.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining Optional Chaining Operator} for understanding optional chaining.
 *
 * 
 * @param record - The `Record` object containing data to be displayed. It holds details like date, company, pipeline, etc.
 * @returns void - This function does not return any value; it only prints to the console.
 * 
 * @example
 * ```ts
 * const record = new Record('2024-01-01', 1, 2024, 'Company A', 'Pipeline X', 'Location Y', 48.123, -97.456, 'south', 'export', 'oil', 100, 50, 50, 120, 100, 'No variance');
 * displayRecord(record);
 * ```
 * This example shows how to create a `Record` object and use `displayRecord` to print its details.
 * 
 * @author Harmeet Matharoo
 */
export function displayRecord(record: Record): void {
    // VARIABLES:
    // Each property of the `record` object (like Date, Company, Pipeline, etc.) is accessed and printed.
    
    // The `pc` (picocolors) library is used to apply colors to the terminal output.
    console.log(pc.blue('Date:'), pc.green(record.Date ?? 'N/A'));
    console.log(pc.blue('Month:'), pc.green(record.Month?.toString() ?? 'N/A'));  // Optional chaining to handle null or undefined
    console.log(pc.blue('Year:'), pc.green(record.Year?.toString() ?? 'N/A'));
    console.log(pc.blue('Company:'), pc.green(record.Company ?? 'N/A'));
    console.log(pc.blue('Pipeline:'), pc.green(record.Pipeline ?? 'N/A'));
    console.log(pc.blue('Key Point:'), pc.green(record.KeyPoint ?? 'N/A'));
    console.log(pc.blue('Latitude:'), pc.green(record.Latitude?.toString() ?? 'N/A'));
    console.log(pc.blue('Longitude:'), pc.green(record.Longitude?.toString() ?? 'N/A'));
    console.log(pc.blue('Direction Of Flow:'), pc.green(record.DirectionOfFlow ?? 'N/A'));
    console.log(pc.blue('Trade Type:'), pc.green(record.TradeType ?? 'N/A'));
    console.log(pc.blue('Product:'), pc.green(record.Product ?? 'N/A'));
    console.log(pc.blue('Throughput (1000 m3/d):'), pc.green(record.Throughput?.toString() ?? 'N/A'));
    console.log(pc.blue('Committed Volumes (1000 m3/d):'), pc.green(record.CommittedVolumes?.toString() ?? 'N/A'));
    console.log(pc.blue('Uncommitted Volumes (1000 m3/d):'), pc.green(record.UncommittedVolumes?.toString() ?? 'N/A'));
    console.log(pc.blue('Nameplate Capacity (1000 m3/d):'), pc.green(record.NameplateCapacity?.toString() ?? 'N/A'));
    console.log(pc.blue('Available Capacity (1000 m3/d):'), pc.green(record.AvailableCapacity?.toString() ?? 'N/A'));
    console.log(pc.blue('Reason For Variance:'), pc.green(record.ReasonForVariance ?? 'N/A'));
}
