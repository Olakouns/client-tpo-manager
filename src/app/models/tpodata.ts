import { TPOWorkOrder } from "./tpowork-order";

export class TPOData {
    id: number;
    verb: string;
    tpoCondition: string;
    tpo: string;
    description: string;
    patterns: Array<TPOWorkOrder>;
    critical: boolean;
    previousStatesData: Array<TPOWorkOrder>;
}
