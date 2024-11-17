import { BaseRecord } from './BaseRecord';

/**
 * Represents a detailed pipeline throughput record, extending `BaseRecord`.
 * 
 * This class provides an extended structure for displaying more comprehensive details about a pipeline record.
 * It overrides the `display` method to include additional information.
 * 
 * **Key Concepts**:
 * - **Inheritance and Polymorphism**: Demonstrates overriding methods from the base class for customized behavior.
 * 
 * **Dataset Attribution and License**:
 * The dataset used in this project is from the Government of Canada.
 * Pipeline Throughput and Capacity Data - Keystone Pipeline.
 * Open Government Portal (canada.ca). Available: {@link https://open.canada.ca/data/en/dataset/dc343c43-a592-4a27-8ee7-c77df56afb34/resource/b7597d90-0d9a-44d8-8d31-3434d693d6d9}
 * 
 * **Open Government License**:
 * License available here: {@link https://open.canada.ca/en/open-government-licence-canada}
 * 
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes JavaScript Classes} for class structures in JavaScript.
 * @see {@link https://www.typescriptlang.org/docs/handbook/2/classes.html TypeScript Classes} for more details on TypeScript classes.
 * 
 * @example
 * ```typescript
 * const detailedRecord = new DetailedRecord('2024-01-01', 1, 2024, 'Company A', 'Pipeline X', 'Key Location', 48.123, -97.456, 'north', 'export', 'oil', 150, 75, 75, 200, 180, 'No variance');
 * console.log(detailedRecord.display()); // Outputs detailed information
 * ```
 * 
 * @class
 * @extends BaseRecord
 * @author Harmeet Matharoo
 */
export class DetailedRecord extends BaseRecord {
    /**
     * Displays detailed information about the record, including key throughput and capacity details.
     * 
     * @returns {string} A string representation of detailed record information.
     */
    display(): string {
        return `Detailed Record:
        Date: ${this.Date}
        Year: ${this.Year}
        Company: ${this.Company}
        Pipeline: ${this.Pipeline}
        Throughput: ${this.Throughput} m³/day
        Available Capacity: ${this.AvailableCapacity} m³/day
        Reason for Variance: ${this.ReasonForVariance}`;
    }
}
