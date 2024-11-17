// datasetService.test.ts
import { loadDataset } from '../src/services/datasetService';
import { DetailedRecord } from '../src/models/DetailedRecord';

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
        const records: DetailedRecord[] = await loadDataset('./src/keystone-throughput-and-capacity.csv');
        const expectedRecordCount = 354;

        // Check that the expected number of records are loaded
        expect(records.length).toBe(expectedRecordCount);

        // Check that each record is correctly populated
        records.forEach((record) => {
            expect(record).toBeInstanceOf(DetailedRecord);
            expect(record.Date).toMatch(/\d{4}-\d{2}-\d{2}/); // Date format YYYY-MM-DD
            expect(typeof record.Month).toBe('number');
            expect(typeof record.Year).toBe('number');
            expect(typeof record.Company).toBe('string');
            expect(typeof record.Pipeline).toBe('string');
            expect(typeof record.KeyPoint).toBe('string');
            expect(typeof record.Latitude).toBe('number');
            expect(typeof record.Longitude).toBe('number');
            expect(typeof record.DirectionOfFlow).toBe('string');
            expect(typeof record.TradeType).toBe('string');
            expect(typeof record.Product).toBe('string');
            expect(typeof record.Throughput).toBe('number');
            expect(typeof record.CommittedVolumes).toBe('number');
            expect(typeof record.UncommittedVolumes).toBe('number');
            expect(typeof record.NameplateCapacity).toBe('number');
            expect(typeof record.AvailableCapacity).toBe('number');
            expect(typeof record.ReasonForVariance).toBe('string');
        });
    });

    /**
     * Test to ensure loadDataset throws an error when the file path is invalid.
     */
    it('should throw an error when the CSV file is missing', async () => {
        await expect(loadDataset('./src/nonexistent.csv')).rejects.toThrow(
            /ENOENT|no such file or directory/
        );
    });
});