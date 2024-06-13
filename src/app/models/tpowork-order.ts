import { TpoFailureState } from "./tpo-failure-state";

export class TPOWorkOrder {
  id: number;
  webServiceName: string;
  webServiceClassName: string;
  isServiceTemplate: boolean;
  template: string;
  equipment: string;
  tpoFailureState: TpoFailureState | any;
  // tpoWorkOrderFailure: Array<TPOWorkOrder>;
  // linkedList: Array<TPOWorkOrder>;
}
