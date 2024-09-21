import pc from 'picocolors';

/**
 * Represents a pipeline throughput record.
 * 
 * This class uses the original column names from the dataset, adjusting only for TypeScript syntax.
 * It captures details like the company, pipeline name, throughput, and other pipeline-related information.
 * 
 * **Dataset Attribution and License**:
 * The dataset used in this project is from the Government of Canada.
 * Pipeline Throughput and Capacity Data - Keystone Pipeline.
 * Open Government Portal (canada.ca). Available: https://open.canada.ca/data/en/dataset/dc343c43-a592-4a27-8ee7-c77df56afb34/resource/b7597d90-0d9a-44d8-8d31-3434d693d6d9
 * 
 * **Open Government License**:
 * License available here: https://open.canada.ca/en/open-government-licence-canada
 * 
 * @see [TypeScript Handbook - Classes](https://www.typescriptlang.org/docs/handbook/2/classes.html)
 * @see [Console.log](https://developer.mozilla.org/en-US/docs/Web/API/console/log)
 * @see [JavaScript Number Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
 * @see [Picocolors Documentation](https://github.com/alexeyraspopov/picocolors)
 * 
 * @author Harmeet Matharoo
 * 
 * @example
 * const record = new Record('2024-01-01', 1, 2024, 'Company A', 'Pipeline X', 'Location Y', 48.123, -97.456, 'south', 'export', 'oil', 100, 50, 50, 120, 100, 'No variance');
 * record.display();
 */
export class Record {
    /**
     * Creates a new Record instance using the original column names from the dataset.
     * 
     * @param Date - The date of the record.
     * @param Month - The month of the record.
     * @param Year - The year of the record.
     * @param Company - The company name.
     * @param Pipeline - The pipeline name.
     * @param KeyPoint - The key point location.
     * @param Latitude - The latitude of the location.
     * @param Longitude - The longitude of the location.
     * @param DirectionOfFlow - The flow direction of the pipeline.
     * @param TradeType - The type of trade.
     * @param Product - The type of product.
     * @param Throughput - The throughput in 1000 m3/d.
     * @param CommittedVolumes - Committed volumes in 1000 m3/d.
     * @param UncommittedVolumes - Uncommitted volumes in 1000 m3/d.
     * @param NameplateCapacity - The nameplate capacity in 1000 m3/d.
     * @param AvailableCapacity - The available capacity in 1000 m3/d.
     * @param ReasonForVariance - The reason for any variance.
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
     * @returns Nothing.
     * 
     * @see [Console.log](https://developer.mozilla.org/en-US/docs/Web/API/Console/log)
     */
    public display(): void {
        // Color-coded column names and values using picocolors (pc)
        console.log(pc.blue('Date:'), pc.green(this.Date ?? 'N/A'));
        console.log(pc.blue('Month:'), pc.green(this.Month?.toString() ?? 'N/A'));
        console.log(pc.blue('Year:'), pc.green(this.Year?.toString() ?? 'N/A'));
        console.log(pc.blue('Company:'), pc.green(this.Company ?? 'N/A'));
        console.log(pc.blue('Pipeline:'), pc.green(this.Pipeline ?? 'N/A'));
        console.log(pc.blue('Key Point:'), pc.green(this.KeyPoint ?? 'N/A'));
        console.log(pc.blue('Latitude:'), pc.green(this.Latitude?.toString() ?? 'N/A'));
        console.log(pc.blue('Longitude:'), pc.green(this.Longitude?.toString() ?? 'N/A'));
        console.log(pc.blue('Direction Of Flow:'), pc.green(this.DirectionOfFlow ?? 'N/A'));
        console.log(pc.blue('Trade Type:'), pc.green(this.TradeType ?? 'N/A'));
        console.log(pc.blue('Product:'), pc.green(this.Product ?? 'N/A'));
        console.log(pc.blue('Throughput (1000 m3/d):'), pc.green(this.Throughput?.toString() ?? 'N/A'));
        console.log(pc.blue('Committed Volumes (1000 m3/d):'), pc.green(this.CommittedVolumes?.toString() ?? 'N/A'));
        console.log(pc.blue('Uncommitted Volumes (1000 m3/d):'), pc.green(this.UncommittedVolumes?.toString() ?? 'N/A'));
        console.log(pc.blue('Nameplate Capacity (1000 m3/d):'), pc.green(this.NameplateCapacity?.toString() ?? 'N/A'));
        console.log(pc.blue('Available Capacity (1000 m3/d):'), pc.green(this.AvailableCapacity?.toString() ?? 'N/A'));
        console.log(pc.blue('Reason For Variance:'), pc.green(this.ReasonForVariance ?? 'N/A'));
    }
}
