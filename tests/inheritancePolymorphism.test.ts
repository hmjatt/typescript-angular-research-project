// tests/inheritancePolymorphism.test.ts
import { BaseRecord } from '../src/models/BaseRecord';
import { DetailedRecord } from '../src/models/DetailedRecord';

/**
 * Unit tests for inheritance and polymorphism between BaseRecord and DetailedRecord.
 * 
 * @author Harmeet Matharoo
 */
describe('Inheritance and Polymorphism', () => {
    /**
     * Test to ensure that method overriding in DetailedRecord works as expected.
     */
    it('should override the display method in DetailedRecord', () => {
        const baseRecord = new BaseRecord(
            '2024-01-01', 1, 2024, 'Company A', 'Pipeline X', 'Location Y',
            48.123, -97.456, 'south', 'export', 'oil', 100, 50, 50, 120, 100, 'No variance'
        );
        
        const detailedRecord = new DetailedRecord(
            '2024-01-01', 1, 2024, 'Company A', 'Pipeline X', 'Location Y',
            48.123, -97.456, 'south', 'export', 'oil', 100, 50, 50, 120, 100, 'No variance'
        );

        // Check if the display method of DetailedRecord returns the overridden format
        expect(detailedRecord.display()).toContain('Detailed Record:');
        expect(baseRecord.display()).not.toContain('Detailed Record:'); // Ensure base class display is different
    });

    /**
     * Test to ensure polymorphism works with BaseRecord references.
     */
    it('should call the overridden display method when using BaseRecord reference', () => {
        const record: BaseRecord = new DetailedRecord(
            '2024-01-01', 1, 2024, 'Company A', 'Pipeline X', 'Location Y',
            48.123, -97.456, 'south', 'export', 'oil', 100, 50, 50, 120, 100, 'No variance'
        );

        // Check that the correct display method from DetailedRecord is called
        expect(record.display()).toContain('Detailed Record:');
    });
});
