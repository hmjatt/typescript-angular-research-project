import { displayRecord } from '../src/utils/displayUtils';
import { Record } from '../src/models/Record';
import pc from 'picocolors';

/**
 * Unit tests for the displayRecord function.
 * 
 * This file ensures that the displayRecord function correctly handles formatting,
 * missing values, and the use of the picocolors library for terminal output.
 * 
 * The tests check for:
 * - Proper color formatting of each field.
 * - Correct handling of null or missing values.
 * - Functionality with valid and invalid record data.
 * 
 * @author Harmeet Matharoo
 * 
 * @see {@link ../src/utils/displayUtils} for the actual displayRecord function being tested.
 */
describe('displayRecord', () => {
    /**
     * This function runs before each test to mock console.log.
     *
     * By mocking console.log, we prevent actual printing in the test output
     * and allow for assertions based on how it is called.
     */
    beforeEach(() => {
        jest.spyOn(console, 'log').mockImplementation(() => { }); // Mock console.log to avoid actual printing
    });

    /**
     * This function runs after each test to restore original console.log behavior.
     *
     * It ensures that the console.log function is restored after each test case,
     * so other tests or parts of the code aren't affected by the mock.
     */
    afterEach(() => {
        jest.restoreAllMocks(); // Restore original console.log
    });

    /**
     * Test to ensure the record's details are printed with the correct color formatting using picocolors.
     *
     * This test checks that the displayRecord function uses picocolors to color-code each
     * field of the Record object. It verifies that console.log is called with correctly
     * formatted text and colors for each field.
     *
     * @example
     * The test creates a valid Record object and calls the displayRecord function.
     * The result should display each field with the correct color-coded output.
     */
    it('should display the record details with correct formatting', () => {
        // Create a sample Record object with valid data
        const record = new Record(
            '2024-01-01', // Date
            1, // Month
            2024, // Year
            'Company A', // Company
            'Pipeline X', // Pipeline
            'Location Y', // Key Point
            48.123, // Latitude
            -97.456, // Longitude
            'south', // Direction Of Flow
            'export', // Trade Type
            'oil', // Product
            100, // Throughput (1000 m³/d)
            50, // Committed Volumes (1000 m³/d)
            50, // Uncommitted Volumes (1000 m³/d)
            120, // Nameplate Capacity (1000 m³/d)
            100, // Available Capacity (1000 m³/d)
            'No variance' // Reason For Variance
        );

        // Call the function to display the record
        displayRecord(record);

        // Check if console.log was called with properly formatted text for all fields
        expect(console.log).toHaveBeenCalledWith(pc.yellow(`\nRecord:`));
        expect(console.log).toHaveBeenCalledWith(pc.blue('Date:'), pc.green('2024-01-01'));
        expect(console.log).toHaveBeenCalledWith(pc.blue('Month:'), pc.green('1'));
        expect(console.log).toHaveBeenCalledWith(pc.blue('Year:'), pc.green('2024'));
        expect(console.log).toHaveBeenCalledWith(pc.blue('Company:'), pc.green('Company A'));
        expect(console.log).toHaveBeenCalledWith(pc.blue('Pipeline:'), pc.green('Pipeline X'));
        expect(console.log).toHaveBeenCalledWith(pc.blue('Key Point:'), pc.green('Location Y'));
        expect(console.log).toHaveBeenCalledWith(pc.blue('Latitude:'), pc.green('48.123'));
        expect(console.log).toHaveBeenCalledWith(pc.blue('Longitude:'), pc.green('-97.456'));
        expect(console.log).toHaveBeenCalledWith(pc.blue('Direction Of Flow:'), pc.green('south'));
        expect(console.log).toHaveBeenCalledWith(pc.blue('Trade Type:'), pc.green('export'));
        expect(console.log).toHaveBeenCalledWith(pc.blue('Product:'), pc.green('oil'));
        expect(console.log).toHaveBeenCalledWith(pc.blue('Throughput (1000 m3/d):'), pc.green('100'));
        expect(console.log).toHaveBeenCalledWith(
            pc.blue('Committed Volumes (1000 m3/d):'),
            pc.green('50')
        );
        expect(console.log).toHaveBeenCalledWith(
            pc.blue('Uncommitted Volumes (1000 m3/d):'),
            pc.green('50')
        );
        expect(console.log).toHaveBeenCalledWith(
            pc.blue('Nameplate Capacity (1000 m3/d):'),
            pc.green('120')
        );
        expect(console.log).toHaveBeenCalledWith(
            pc.blue('Available Capacity (1000 m3/d):'),
            pc.green('100')
        );
        expect(console.log).toHaveBeenCalledWith(
            pc.blue('Reason For Variance:'),
            pc.green('No variance')
        );
    });

    /**
     * Test to ensure that missing or null values are replaced with "N/A" in the output.
     *
     * This test ensures that the displayRecord function correctly replaces any null,
     * undefined, or empty values with "N/A" for better clarity in the output.
     */
    it('should display "N/A" for missing or null values, and keep 0 as a valid value', () => {
        // Create a sample Record object with missing/null values
        const record = new Record(
            '', // Date
            0, // Month (valid value)
            0, // Year (valid value)
            '', // Company
            '', // Pipeline
            '', // Key Point
            0, // Latitude (valid value)
            0, // Longitude (valid value)
            '', // DirectionOfFlow
            '', // TradeType
            '', // Product
            0, // Throughput (valid value)
            0, // CommittedVolumes (valid value)
            0, // UncommittedVolumes (valid value)
            0, // NameplateCapacity (valid value)
            0, // AvailableCapacity (valid value)
            '' // Reason For Variance
        );

        // Call the function to display the record
        displayRecord(record);

        // Check if missing/null values are replaced with "N/A" and 0 values remain as valid
        expect(console.log).toHaveBeenCalledWith(pc.blue('Date:'), pc.green('N/A'));
        expect(console.log).toHaveBeenCalledWith(pc.blue('Month:'), pc.green('0')); // 0 is a valid value
        expect(console.log).toHaveBeenCalledWith(pc.blue('Year:'), pc.green('0')); // 0 is a valid value
        expect(console.log).toHaveBeenCalledWith(pc.blue('Company:'), pc.green('N/A'));
        expect(console.log).toHaveBeenCalledWith(pc.blue('Pipeline:'), pc.green('N/A'));
        expect(console.log).toHaveBeenCalledWith(pc.blue('Key Point:'), pc.green('N/A'));
        expect(console.log).toHaveBeenCalledWith(pc.blue('Latitude:'), pc.green('0')); // 0 is valid
        expect(console.log).toHaveBeenCalledWith(pc.blue('Longitude:'), pc.green('0')); // 0 is valid
        expect(console.log).toHaveBeenCalledWith(pc.blue('Direction Of Flow:'), pc.green('N/A'));
        expect(console.log).toHaveBeenCalledWith(pc.blue('Trade Type:'), pc.green('N/A'));
        expect(console.log).toHaveBeenCalledWith(pc.blue('Product:'), pc.green('N/A'));
        expect(console.log).toHaveBeenCalledWith(
            pc.blue('Throughput (1000 m3/d):'),
            pc.green('0')
        ); // 0 is valid
        expect(console.log).toHaveBeenCalledWith(
            pc.blue('Committed Volumes (1000 m3/d):'),
            pc.green('0')
        ); // 0 is valid
        expect(console.log).toHaveBeenCalledWith(
            pc.blue('Uncommitted Volumes (1000 m3/d):'),
            pc.green('0')
        ); // 0 is valid
        expect(console.log).toHaveBeenCalledWith(
            pc.blue('Nameplate Capacity (1000 m3/d):'),
            pc.green('0')
        ); // 0 is valid
        expect(console.log).toHaveBeenCalledWith(
            pc.blue('Available Capacity (1000 m3/d):'),
            pc.green('0')
        ); // 0 is valid
        expect(console.log).toHaveBeenCalledWith(pc.blue('Reason For Variance:'), pc.green('N/A'));
    });
});