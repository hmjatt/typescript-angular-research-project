/**
 * Represents a basic pipeline throughput record.
 * 
 * This class serves as a base structure for creating objects that store essential information about pipeline throughput.
 * It can be extended by other classes to include more detailed or specific functionality.
 * 
 * **Key Concepts**:
 * - **Variables**: Each property (e.g., `Date`, `Company`) holds specific data related to a pipeline record.
 * - **Inheritance**: This class is designed to be extended by subclasses, which can override or add functionality.
 * - **Constructor**: Initializes an instance with the provided values for each property.
 * 
 * **Dataset Attribution and License**:
 * The dataset used in this project is from the Government of Canada.
 * Pipeline Throughput and Capacity Data - Keystone Pipeline.
 * Open Government Portal (canada.ca). Available: {@link https://open.canada.ca/data/en/dataset/dc343c43-a592-4a27-8ee7-c77df56afb34/resource/b7597d90-0d9a-44d8-8d31-3434d693d6d9}
 * 
 * **Open Government License**:
 * License available here: {@link https://open.canada.ca/en/open-government-licence-canada}
 * 
 * @see {@link https://www.typescriptlang.org/docs/handbook/2/classes.html TypeScript Classes} for more details on TypeScript classes.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes JavaScript Classes} for understanding JavaScript classes.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number JavaScript Number Object} for handling numbers in JavaScript.
 * 
 * @example
 * ```typescript
 * const baseRecord = new BaseRecord('2024-01-01', 1, 2024, 'Company A', 'Pipeline X', 'Key Location', 48.123, -97.456, 'north', 'export', 'oil', 150, 75, 75, 200, 180, 'No variance');
 * console.log(baseRecord.display()); // Outputs basic information
 * ```
 * 
 * @author Harmeet Matharoo
 * @class
 */
export class BaseRecord {
    /**
     * Initializes a new instance of the `BaseRecord` class.
     * 
     * @param {string} Date - The date of the record (e.g., 'YYYY-MM-DD').
     * @param {number} Month - The month of the record (1 for January to 12 for December).
     * @param {number} Year - The year of the record.
     * @param {string} Company - The company responsible for the pipeline.
     * @param {string} Pipeline - The name of the pipeline.
     * @param {string} KeyPoint - The key location related to the pipeline.
     * @param {number} Latitude - The latitude coordinate of the key point.
     * @param {number} Longitude - The longitude coordinate of the key point.
     * @param {string} DirectionOfFlow - The direction of flow of the pipeline.
     * @param {string} TradeType - The type of trade (e.g., 'export', 'import').
     * @param {string} Product - The product being transported.
     * @param {number} Throughput - The throughput (in 1000 m³/day).
     * @param {number} CommittedVolumes - The committed volumes (in 1000 m³/day).
     * @param {number} UncommittedVolumes - The uncommitted volumes (in 1000 m³/day).
     * @param {number} NameplateCapacity - The pipeline's nameplate capacity (in 1000 m³/day).
     * @param {number} AvailableCapacity - The available capacity (in 1000 m³/day).
     * @param {string} ReasonForVariance - Explanation for any variance in capacity or throughput.
     */
    constructor(
        public Date: string,
        public Month: number,
        public Year: number,
        public Company: string,
        public Pipeline: string,
        public KeyPoint: string,
        public Latitude: number,
        public Longitude: number,
        public DirectionOfFlow: string,
        public TradeType: string,
        public Product: string,
        public Throughput: number,
        public CommittedVolumes: number,
        public UncommittedVolumes: number,
        public NameplateCapacity: number,
        public AvailableCapacity: number,
        public ReasonForVariance: string
    ) {}

    /**
     * Displays a summary of the basic record information.
     * 
     * @returns {string} A string representation of basic record details.
     */
    display(): string {
        return `Date: ${this.Date}, Company: ${this.Company}, Product: ${this.Product}`;
    }
}
