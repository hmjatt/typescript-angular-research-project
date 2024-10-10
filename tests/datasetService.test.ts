// datasetService.test.ts
import { loadDataset } from '../src/services/datasetService';
import { Record } from '../src/models/Record';

/**
 * Unit tests for DatasetService.
 * 
 * Tests the functionality of loading and parsing CSV data,
 * handling invalid file paths, and ensuring proper error handling.
 * 
 * @author Harmeet Matharoo
 */
describe('DatasetService', () => {
    /**
     * Test to ensure loadDataset loads records correctly from a valid CSV file.
     */
    it('should load and parse records correctly from CSV', async () => {
        const records: Record[] = await loadDataset('./src/keystone-throughput-and-capacity.csv');
        expect(records.length).toBeGreaterThan(0);
        expect(records[0]).toBeInstanceOf(Record);
    });

    /**
     * Test to ensure loadDataset throws an error when the file path is invalid.
     */
    it('should throw an error when the CSV file is missing', async () => {
        await expect(loadDataset('./src/nonexistent.csv')).rejects.toThrow(/ENOENT|no such file or directory/);
    });
});
