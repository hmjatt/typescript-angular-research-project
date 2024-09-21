import { runProgram } from './services/mainService';

/**
 * Entry point of the program.
 * 
 * This file simply starts the program by invoking the `runProgram` function from the main service.
 * 
 * @author Harmeet Matharoo
 * 
 * @example
 * // Run the program
 * main();
 */
function main(): void {
    const filePath = './src/keystone-throughput-and-capacity.csv';
    runProgram(filePath); // Start the program
}

main();
