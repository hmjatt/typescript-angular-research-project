// tests/mainService.test.ts
import { runProgram } from '../src/services/mainService';
import { loadDataset } from '../src/services/datasetService';
import readline from 'readline';
import fs from 'fs';
import pc from 'picocolors';
import { DetailedRecord } from '../src/models/DetailedRecord';

// Mock dependencies
jest.mock('readline');
jest.mock('fs');
jest.mock('../src/services/datasetService');
jest.mock('picocolors');

/**
 * Integration tests for the runProgram function.
 * 
 * This test suite simulates user input and tests the overall functionality of the `runProgram` function.
 * The tests ensure that records are loaded, displayed, created, updated, and saved as expected.
 * 
 * @author Harmeet Matharoo
 */
describe('MainService', () => {
    let rlMock: any;

    beforeEach(() => {
        // Mock the readline interface
        rlMock = {
            question: jest.fn(),
            close: jest.fn(),
        };
        (readline.createInterface as jest.Mock).mockReturnValue(rlMock);

        // Mock console.log to prevent actual printing
        jest.spyOn(console, 'log').mockImplementation(() => { });
        jest.spyOn(console, 'error').mockImplementation(() => { });
        jest.spyOn(fs, 'writeFileSync').mockImplementation(() => { }); // Mock file saving
    });

    afterEach(() => {
        jest.restoreAllMocks(); // Restore original behavior
    });

    /**
     * Test for Creating a New Record
     */
    it('should create a new record and add it to the dataset', async () => {
        // Initialize an empty records array
        const records: DetailedRecord[] = [];
        (loadDataset as jest.Mock).mockResolvedValue(records);

        // Simulate user input
        rlMock.question
            .mockImplementationOnce((_prompt: string, callback: any) => {
                callback('2'); // Choose 'Create new record'
            })
            .mockImplementationOnce((_prompt: string, callback: any) => {
                // Provide record details
                callback(
                    '2024-06-01,6,2024,Company B,Pipeline Y,"Key Point Z",48.123,-97.456,south,export,oil,200,150,50,220,200,"Variance reason"'
                );
            })
            .mockImplementationOnce((_prompt: string, callback: any) => {
                callback('8'); // Exit
            });

        const resultRecords = await runProgram('./src/keystone-throughput-and-capacity.csv');

        expect(resultRecords.length).toBe(1); // Record added to the array
        const newRecord = resultRecords[0];
        expect(newRecord.Company).toBe('Company B');
        expect(newRecord.Pipeline).toBe('Pipeline Y');
        expect(newRecord.KeyPoint).toBe('Key Point Z');
        expect(newRecord.Latitude).toBe(48.123);
        expect(newRecord.Longitude).toBe(-97.456);
        expect(newRecord.DirectionOfFlow).toBe('south');
        expect(newRecord.TradeType).toBe('export');
        expect(newRecord.Product).toBe('oil');
        expect(newRecord.Throughput).toBe(200);
        expect(newRecord.CommittedVolumes).toBe(150);
        expect(newRecord.UncommittedVolumes).toBe(50);
        expect(newRecord.NameplateCapacity).toBe(220);
        expect(newRecord.AvailableCapacity).toBe(200);
        expect(newRecord.ReasonForVariance).toBe('Variance reason');
    });

    /**
     * Test for Updating an Existing Record
     */
    it('should update an existing record with new values', async () => {
        // Initialize records with one record
        const initialRecords = [
            new DetailedRecord(
                '2024-01-01',
                1,
                2024,
                'Company A',
                'Pipeline X',
                'Key Point Y',
                48.123,
                -97.456,
                'south',
                'export',
                'oil',
                100,
                50,
                50,
                120,
                100,
                'No variance'
            )
        ];
        (loadDataset as jest.Mock).mockResolvedValue(initialRecords);

        // Simulate user input
        rlMock.question
            .mockImplementationOnce((_prompt: string, callback: any) => {
                callback('3'); // Choose 'Update a record'
            })
            .mockImplementationOnce((_prompt: string, callback: any) => {
                callback('1'); // Record number to update
            })
            .mockImplementationOnce((_prompt: string, callback: any) => {
                // Provide updated record details
                callback(
                    '2025-01-01,1,2025,Company A Updated,Pipeline X Updated,"Key Point Y Updated",49.123,-98.456,north,import,gas,150,100,50,130,110,"Updated variance reason"'
                );
            })
            .mockImplementationOnce((_prompt: string, callback: any) => {
                callback('8'); // Exit
            });

        const resultRecords = await runProgram('./src/keystone-throughput-and-capacity.csv');

        expect(resultRecords.length).toBe(1); // Should still have one record
        const updatedRecord = resultRecords[0];
        expect(updatedRecord.Company).toBe('Company A Updated');
        expect(updatedRecord.Pipeline).toBe('Pipeline X Updated');
        expect(updatedRecord.KeyPoint).toBe('Key Point Y Updated');
        expect(updatedRecord.Latitude).toBe(49.123);
        expect(updatedRecord.Longitude).toBe(-98.456);
        expect(updatedRecord.DirectionOfFlow).toBe('north');
        expect(updatedRecord.TradeType).toBe('import');
        expect(updatedRecord.Product).toBe('gas');
        expect(updatedRecord.Throughput).toBe(150);
        expect(updatedRecord.CommittedVolumes).toBe(100);
        expect(updatedRecord.UncommittedVolumes).toBe(50);
        expect(updatedRecord.NameplateCapacity).toBe(130);
        expect(updatedRecord.AvailableCapacity).toBe(110);
        expect(updatedRecord.ReasonForVariance).toBe('Updated variance reason');
    });

    /**
     * Test for Handling Missing CSV File
     */
    it('should handle errors when the CSV file is missing', async () => {
        // Simulate the file missing error (ENOENT)
        const error = new Error('ENOENT: no such file or directory, open \'./nonexistent.csv\'') as any;
        error.code = 'ENOENT';

        (loadDataset as jest.Mock).mockRejectedValue(error); // Simulate loadDataset rejection

        await runProgram('./nonexistent.csv');

        // Assert that console.error is called with the actual error message
        expect(console.error).toHaveBeenCalledWith(
            pc.red(`Error loading dataset: ENOENT: no such file or directory, open './nonexistent.csv'`)
        );
    });
});
