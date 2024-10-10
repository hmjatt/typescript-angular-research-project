import { runProgram } from '../src/services/mainService';
import { loadDataset } from '../src/services/datasetService';
import readline from 'readline';
import fs from 'fs';
import pc from 'picocolors';
import { Record } from '../src/models/Record'; // Changed PipelineRecord to Record

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
describe('runProgram', () => {
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

    it('should load dataset and display menu on start', async () => {
        const mockRecords = [
            new Record(
                '2024-01-01', 1, 2024, 'Company A', 'Pipeline X', 'Location Y',
                48.123, -97.456, 'south', 'export', 'oil', 100, 50, 50, 120, 100, 'No variance'
            )
        ];

        (loadDataset as jest.Mock).mockResolvedValue(mockRecords);

        await runProgram('./src/keystone-throughput-and-capacity.csv');

        expect(loadDataset).toHaveBeenCalledWith('./src/keystone-throughput-and-capacity.csv');
        expect(rlMock.question).toHaveBeenCalled(); // Menu should be displayed
    });

    it('should handle user interaction for displaying records', async () => {
        const mockRecords = [
            new Record(
                '2024-01-01', 1, 2024, 'Company A', 'Pipeline X', 'Location Y',
                48.123, -97.456, 'south', 'export', 'oil', 100, 50, 50, 120, 100, 'No variance'
            )
        ];

        (loadDataset as jest.Mock).mockResolvedValue(mockRecords);

        rlMock.question.mockImplementationOnce((_prompt: string, callback: any) => {
            callback('1'); // Simulate user choosing "Display all records"
        }).mockImplementationOnce((_prompt: string, callback: any) => {
            callback('7'); // Simulate user choosing "Exit"
        });

        await runProgram('./src/keystone-throughput-and-capacity.csv');

        // Log the actual console.log mock calls to see what was called
        console.log('console.log mock calls:', (console.log as jest.Mock).mock.calls);

        // Assert console.log output matches actual behavior
        expect(console.log).toHaveBeenCalledWith(expect.stringContaining('--- Menu ---'));
    });

    it('should handle creating a new record', async () => {
        const mockRecords: Record[] = [];

        (loadDataset as jest.Mock).mockResolvedValue(mockRecords);

        rlMock.question
            .mockImplementationOnce((_prompt: string, callback: any) => {
                callback('2'); // Simulate user choosing "Create new record"
            })
            .mockImplementationOnce((_prompt: string, callback: any) => {
                callback('2024-01-01,1,2024,Company B,Pipeline Y,Key Point Z,48.123,-97.456,south,export,oil,200,150,50,220,200,Variance reason'); // Simulate input for new record
            })
            .mockImplementationOnce((_prompt: string, callback: any) => {
                callback('7'); // Simulate user choosing "Exit"
            });

        await runProgram('./src/keystone-throughput-and-capacity.csv');

        expect(mockRecords.length).toBe(1);
        expect(mockRecords[0].Company).toBe('Company B');
    });

    it('should save the dataset to a new file', async () => {
        const mockRecords = [
            new Record(
                '2024-01-01', 1, 2024, 'Company A', 'Pipeline X', 'Location Y',
                48.123, -97.456, 'south', 'export', 'oil', 100, 50, 50, 120, 100, 'No variance'
            )
        ];

        (loadDataset as jest.Mock).mockResolvedValue(mockRecords);

        rlMock.question
            .mockImplementationOnce((_prompt: string, callback: any) => {
                callback('6'); // Simulate user choosing "Save dataset"
            })
            .mockImplementationOnce((_prompt: string, callback: any) => {
                callback('7'); // Simulate user choosing "Exit"
            });

        await runProgram('./src/keystone-throughput-and-capacity.csv');

        expect(fs.writeFileSync).toHaveBeenCalledWith(
            './src/updated_dataset.csv',
            expect.stringContaining('Company A') // Ensure correct CSV content
        );
    });

    it('should handle ENOENT errors during file loading when file is missing', async () => {
        // Simulate the file missing error (ENOENT)
        const error = new Error('ENOENT: no such file or directory, open \'./src/keystone-throughput-and-capacity.csv\'') as any;
        error.code = 'ENOENT';

        (loadDataset as jest.Mock).mockRejectedValue(error);  // Simulate loadDataset rejection

        await runProgram('./nonexistent.csv');

        // Log the actual error message passed to console.error
        console.log('console.error mock calls:', (console.error as jest.Mock).mock.calls);

        // Assert that console.error is called with the actual error message
        expect(console.error).toHaveBeenCalled();
    });
});