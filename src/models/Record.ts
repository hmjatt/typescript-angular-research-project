/**
 * Represents a pipeline throughput record.
 * 
 * This class uses the original column names from the dataset, adjusting only for TypeScript syntax.
 * It captures details like the company, pipeline name, throughput, and other pipeline-related information.
 * 
 * @class Record
 * @author Harmeet Matharoo
 * 
 * @see Typescript Handbook for Classes. Available: https://www.typescriptlang.org/docs/handbook/2/classes.html
 * @see Mozilla Developer Network (MDN). "Console.log", Available: https://developer.mozilla.org/en-US/docs/Web/API/console/log_static
 * @see Mozilla Developer Network (MDN). "JavaScript Number Object", Available: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number
 * 
 * **Dataset Attribution and License**:
 * The dataset used in this project is from the Government of Canada.
 * Pipeline Throughput and Capacity Data - Keystone Pipeline.
 * Open Government Portal (canada.ca). Available: https://open.canada.ca/data/en/dataset/dc343c43-a592-4a27-8ee7-c77df56afb34/resource/b7597d90-0d9a-44d8-8d31-3434d693d6d9
 * 
 * **Open Government License**:
 * License available here: https://open.canada.ca/en/open-government-licence-canada
 */
export class Record {
    /**
     * Creates a new Record instance using the original column names from the dataset.
     * 
     * @constructor
     * @param {string} Date - The date of the record.
     * @param {number} Month - The month of the record.
     * @param {number} Year - The year of the record.
     * @param {string} Company - The company name.
     * @param {string} Pipeline - The pipeline name.
     * @param {string} KeyPoint - The key point location.
     * @param {number} Latitude - The latitude of the location.
     * @param {number} Longitude - The longitude of the location.
     * @param {string} DirectionOfFlow - The flow direction of the pipeline.
     * @param {string} TradeType - The type of trade.
     * @param {string} Product - The type of product.
     * @param {number} Throughput - The throughput in 1000 m3/d.
     * @param {number} CommittedVolumes - Committed volumes in 1000 m3/d.
     * @param {number} UncommittedVolumes - Uncommitted volumes in 1000 m3/d.
     * @param {number} NameplateCapacity - The nameplate capacity in 1000 m3/d.
     * @param {number} AvailableCapacity - The available capacity in 1000 m3/d.
     * @param {string} ReasonForVariance - The reason for any variance.
     * 
     * @see MDN JavaScript Number Object. Available: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number
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
    ) { }

    /**
     * Displays the details of the Record instance.
     * 
     * This method prints the full details of a `Record` instance to the console, formatted as a string. 
     * It includes all the key properties of the record, such as the company name, pipeline, location, and throughput details.
     * 
     * @returns {void}
     * 
     * @see MDN Console.log. Available: https://developer.mozilla.org/en-US/docs/Web/API/Console/log
     */
    public display(): void {
        console.log(`Date: ${this.Date}`);
        console.log(`Month: ${this.Month}`);
        console.log(`Year: ${this.Year}`);
        console.log(`Company: ${this.Company}`);
        console.log(`Pipeline: ${this.Pipeline}`);
        console.log(`Key Point: ${this.KeyPoint}`);
        console.log(`Latitude: ${this.Latitude}`);
        console.log(`Longitude: ${this.Longitude}`);
        console.log(`Direction Of Flow: ${this.DirectionOfFlow}`);
        console.log(`Trade Type: ${this.TradeType}`);
        console.log(`Product: ${this.Product}`);
        console.log(`Throughput (1000 m3/d): ${this.Throughput}`);
        console.log(`Committed Volumes (1000 m3/d): ${this.CommittedVolumes}`);
        console.log(`Uncommitted Volumes (1000 m3/d): ${this.UncommittedVolumes}`);
        console.log(`Nameplate Capacity (1000 m3/d): ${this.NameplateCapacity}`);
        console.log(`Available Capacity (1000 m3/d): ${this.AvailableCapacity}`);
        console.log(`Reason For Variance: ${this.ReasonForVariance}`);
    }
}
