import { readFileSync } from 'fs';
import { Record } from './Record';

function loadDataset(filePath: string): Record[] {
    try {
        const data = readFileSync(filePath, 'utf-8');
        const lines = data.split('\n');
        const records: Record[] = [];

        lines.forEach((line, index) => {
            if (index === 0) return; // Skip header if applicable
            const [id, name, age, jobTitle, department] = line.split(',');
            records.push(new Record(+id, name, +age, jobTitle, department));
        });

        return records;
    } catch (err) {
        // Narrow down 'err' to the 'Error' type
        if (err instanceof Error) {
            console.error(`Error reading file: ${err.message}`);
        } else {
            console.error('An unknown error occurred.');
        }
        return [];
    }
}


function main() {
    const records = loadDataset('./dataset.csv');
    records.forEach(record => console.log(record));
}

main();
