import { readFileSync } from 'fs';
import { Record } from '../models/Record';

export function loadDataset(filePath: string): Record[] {
  try {
    const data = readFileSync(filePath, 'utf-8');
    const lines = data.split('\n');
    const records: Record[] = [];

    lines.forEach((line, index) => {
      if (index === 0) return; // Skip the header

      const [
        date, month, year, company, pipeline, keyPoint, latitude, longitude,
        directionOfFlow, tradeType, product, throughput, committedVolumes,
        uncommittedVolumes, nameplateCapacity, availableCapacity, reasonForVariance
      ] = line.split(',');

      records.push(new Record(
        date, +month, +year, company, pipeline, keyPoint, +latitude, +longitude,
        directionOfFlow, tradeType, product, +throughput, +committedVolumes,
        +uncommittedVolumes, +nameplateCapacity, +availableCapacity, reasonForVariance
      ));
    });

    return records;
  } catch (err) {
    if (err instanceof Error) {
      console.error(`Error reading file: ${err.message}`);
    } else {
      console.error('An unknown error occurred.');
    }
    return [];
  }
}
