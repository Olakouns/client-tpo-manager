export class TPOWorkOrder {
  id: number;
  webServiceName: string;
  webServiceClassName: string;
  isServiceTemplate: boolean;
  template: string;
  equipment: string;
  tpoWorkOrderFailure: Array<TPOWorkOrder>;
}
