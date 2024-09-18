export class Record {
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
