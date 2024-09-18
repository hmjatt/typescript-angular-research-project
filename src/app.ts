import { loadDataset } from './services/datasetService';

function main() {
  console.log("Harmeet Matharoo - CST8333 Project");

  const filePath = './src/keystone-throughput-and-capacity.csv';
  const records = loadDataset(filePath);

  records.forEach(record => {
    console.log(record);
  });
}

main();
