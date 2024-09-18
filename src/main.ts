import { readFileSync } from 'fs';
import { Record } from './Record';

function loadDataset(filePath: string): Record[] {
  const data = readFileSync(filePath, 'utf-8');
  const lines = data.split('\n');
  const records: Record[] = [];
  
  lines.forEach((line, index) => {
    if (index === 0) return;  // Skip header if applicable
    const [id, name, age, jobTitle, department] = line.split(',');
    records.push(new Record(+id, name, +age, jobTitle, department));
  });

  return records;
}

function main() {
  const records = loadDataset('./dataset.csv');
  records.forEach(record => console.log(record));
}

main();
