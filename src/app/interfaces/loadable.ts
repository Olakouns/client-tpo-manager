export interface Loadable {
  loading: boolean;
  loadData: (...ars: any) => void;
}
