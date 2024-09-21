/**
 * Represents a pipeline throughput record.
 * 
 * This class is a blueprint for creating objects that store detailed information about pipeline throughput.
 * It includes properties such as the company name, pipeline details, throughput values, and other key information from the dataset.
 * 
 * **Key Concepts**:
 * - **Variables**: Each property in the class (e.g., `Date`, `Company`) is a variable that holds specific data related to a pipeline record.
 * - **Object-Oriented Programming (OOP)**: This class is an example of **OOP**, where we use classes to create objects (instances) with specific attributes (properties) and methods.
 * - **Constructor**: The constructor method is used to initialize an object when it is created. Each property in the constructor corresponds to a column in the dataset.
 * - **Data Types**: TypeScript enforces specific types for each property (e.g., `string`, `number`), ensuring data is handled correctly.
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
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes JavaScript Classes} for understanding how JavaScript classes work.
 * @see {@link https://www.typescriptlang.org/docs/handbook/2/everyday-types.html TypeScript Types} - TypeScript data types and type safety.
 *
 * @example
 * ```ts
 * // Example of creating a Record object
 * const record = new Record('2024-01-01', 1, 2024, 'Company A', 'Pipeline X', 'Location Y', 48.123, -97.456, 'south', 'export', 'oil', 100, 50, 50, 120, 100, 'No variance');
 * console.log(record);
 * ```
 * This example shows how to instantiate a `Record` object with specific values for each property.
 * 
 * @class
 * @author Harmeet Matharoo
 */
export class Record {
    /**
     * Initializes a new instance of the `Record` class.
     * 
     * @param {string} Date - The date of the record (in a string format like 'YYYY-MM-DD').
     * @param {number} Month - The month of the record (1 for January, 12 for December).
     * @param {number} Year - The year of the record.
     * @param {string} Company - The name of the company responsible for the pipeline.
     * @param {string} Pipeline - The name of the pipeline.
     * @param {string} KeyPoint - The key point or location related to the pipeline.
     * @param {number} Latitude - The latitude coordinate of the key point.
     * @param {number} Longitude - The longitude coordinate of the key point.
     * @param {string} DirectionOfFlow - The direction in which the pipeline is flowing.
     * @param {string} TradeType - The type of trade (e.g., export, import).
     * @param {string} Product - The product being transported in the pipeline.
     * @param {number} Throughput - The throughput of the pipeline (in 1000 m³/day).
     * @param {number} CommittedVolumes - The committed volumes (in 1000 m³/day).
     * @param {number} UncommittedVolumes - The uncommitted volumes (in 1000 m³/day).
     * @param {number} NameplateCapacity - The pipeline's nameplate capacity (in 1000 m³/day).
     * @param {number} AvailableCapacity - The available capacity of the pipeline (in 1000 m³/day).
     * @param {string} ReasonForVariance - An explanation for any variance in capacity or throughput.
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
}
