/**
 * Represents a pipeline throughput record.
 * 
 * @class Record
 * @author Harmeet Matharoo
 */
export class Record {
    /**
     * Creates a new Record instance.
     * 
     * @constructor
     * @param {string} date - The date of the record.
     * @param {number} month - The month of the record.
     * @param {number} year - The year of the record.
     * @param {string} company - The company name.
     * @param {string} pipeline - The pipeline name.
     * @param {string} keyPoint - The key point location.
     * @param {number} latitude - The latitude of the location.
     * @param {number} longitude - The longitude of the location.
     * @param {string} directionOfFlow - The flow direction of the pipeline.
     * @param {string} tradeType - The type of trade.
     * @param {string} product - The type of product.
     * @param {number} throughput - The throughput in 1000 m3/d.
     * @param {number} committedVolumes - Committed volumes in 1000 m3/d.
     * @param {number} uncommittedVolumes - Uncommitted volumes in 1000 m3/d.
     * @param {number} nameplateCapacity - The nameplate capacity in 1000 m3/d.
     * @param {number} availableCapacity - The available capacity in 1000 m3/d.
     * @param {string} reasonForVariance - The reason for any variance.
     */
    constructor(
        public date: string,
        public month: number,
        public year: number,
        public company: string,
        public pipeline: string,
        public keyPoint: string,
        public latitude: number,
        public longitude: number,
        public directionOfFlow: string,
        public tradeType: string,
        public product: string,
        public throughput: number,
        public committedVolumes: number,
        public uncommittedVolumes: number,
        public nameplateCapacity: number,
        public availableCapacity: number,
        public reasonForVariance: string
    ) { }
}
