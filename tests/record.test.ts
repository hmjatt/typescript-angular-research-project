import { Record } from '../src/models/Record';

/**
 * Unit tests for the Record class.
 * 
 * This file tests the functionality of creating a Record object and verifying that
 * all properties are correctly assigned by the constructor.
 * 
 * @see {@link ../src/models/Record} for the actual Record class being tested.
 */
describe('Record', () => {
    
    /**
     * Test to ensure the Record object is correctly initialized with valid data.
     * 
     * This test checks that all properties of the Record object are assigned correctly
     * when a new instance is created.
     * 
     * @example
     * ```ts
     * const record = new Record('2024-01-01', 1, 2024, 'Company A', 'Pipeline X', 'Key Point Y', 48.123, -97.456, 'south', 'export', 'oil', 100, 50, 50, 120, 100, 'No variance');
     * expect(record.Company).toBe('Company A');
     * expect(record.Latitude).toBe(48.123);
     * ```
     */
    it('should correctly initialize the Record object with valid data', () => {
        const record = new Record(
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
        );

        // Check that all values are correctly assigned
        expect(record.Date).toBe('2024-01-01');
        expect(record.Month).toBe(1);
        expect(record.Year).toBe(2024);
        expect(record.Company).toBe('Company A');
        expect(record.Pipeline).toBe('Pipeline X');
        expect(record.KeyPoint).toBe('Key Point Y');
        expect(record.Latitude).toBe(48.123);
        expect(record.Longitude).toBe(-97.456);
        expect(record.DirectionOfFlow).toBe('south');
        expect(record.TradeType).toBe('export');
        expect(record.Product).toBe('oil');
        expect(record.Throughput).toBe(100);
        expect(record.CommittedVolumes).toBe(50);
        expect(record.UncommittedVolumes).toBe(50);
        expect(record.NameplateCapacity).toBe(120);
        expect(record.AvailableCapacity).toBe(100);
        expect(record.ReasonForVariance).toBe('No variance');
    });

    /**
     * Test to ensure the Record object handles empty or null values.
     * 
     * This test checks that the Record class can handle missing or undefined data
     * by allowing empty strings or null values during instantiation.
     * 
     * @example
     * ```ts
     * const record = new Record('', 0, 0, '', '', '', 0, 0, '', '', '', 0, 0, 0, 0, 0, '');
     * expect(record.Date).toBe('');
     * ```
     */
    it('should handle empty or null values gracefully', () => {
        const record = new Record('', 0, 0, '', '', '', 0, 0, '', '', '', 0, 0, 0, 0, 0, '');

        // Check that all fields can be empty or zero without errors
        expect(record.Date).toBe('');
        expect(record.Month).toBe(0);
        expect(record.Year).toBe(0);
        expect(record.Company).toBe('');
        expect(record.Pipeline).toBe('');
        expect(record.KeyPoint).toBe('');
        expect(record.Latitude).toBe(0);
        expect(record.Longitude).toBe(0);
        expect(record.DirectionOfFlow).toBe('');
        expect(record.TradeType).toBe('');
        expect(record.Product).toBe('');
        expect(record.Throughput).toBe(0);
        expect(record.CommittedVolumes).toBe(0);
        expect(record.UncommittedVolumes).toBe(0);
        expect(record.NameplateCapacity).toBe(0);
        expect(record.AvailableCapacity).toBe(0);
        expect(record.ReasonForVariance).toBe('');
    });
});
