import { loadDataset } from './services/datasetService';

/**
 * The main entry point of the program.
 * Loads the dataset and prints the records to the console.
 * Repeats the author's name every 10 records.
 * 
 * @function main
 */
function main() {
  const filePath = './src/keystone-throughput-and-capacity.csv';
  const records = loadDataset(filePath);

  console.log("Harmeet Matharoo - CST8333 Project"); // Full name at the top

  // Print the records, and redisplay the name every 10 records for visibility
  records.forEach((record, index) => {
    console.log(record);
    if ((index + 1) % 10 === 0) {
      console.log("\n--- Harmeet Matharoo - CST8333 Project ---\n");
    }
  });

  console.log("\n--- Harmeet Matharoo - CST8333 Project ---\n"); // Display name at the end again
}

main();