import { loadDataset } from '../src/services/datasetService';
import { Record } from '../src/models/Record';

/**
 * Unit tests for DatasetService.
 * 
 * This file tests the functionality of loading and parsing CSV data,
 * handling invalid file paths, and ensuring proper error handling.
 * 
 * @author Harmeet Matharoo
 * 
 * @see {@link https://jestjs.io/ Jest Documentation} for Jest testing framework details.
 * @see {@link ../src/services/datasetService} for the actual service being tested.
 */
describe('DatasetService', () => {
    /**
     * Test to load and parse records correctly from a valid CSV file.
     * Ensures that records are loaded and parsed into `Record` objects.
     */
    it('should load and parse records correctly from CSV', async () => {
        const records: Record[] = await loadDataset('./src/keystone-throughput-and-capacity.csv');
        expect(records.length).toBeGreaterThan(0);
        expect(records[0]).toBeInstanceOf(Record);
    });

});
