import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {TPOData} from "../models/tpodata";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Page} from "../payload/page";
import {ApiResponse} from "../payload/api-response";
import {TPOWorkOrder} from "../models/tpowork-order";
import {ConstantConfig} from "../models/constant-config";
import { TpoFailureState } from '../models/tpo-failure-state';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  httpclient: HttpClient = inject(HttpClient);

  constructor() {
  }

  getAllTpoData(): Observable<Array<TPOData>> {
    return this.httpclient.get<Array<TPOData>>(`${environment.BASE_URL}/tpo-manager/tpo-data`);
  }

  getTpoData(search = "", page = 0, size = 50): Observable<Page<TPOData>> {
    let query = new HttpParams()
    .set('search', search)
    .set('page', page)
    .set('size', size);
    return this.httpclient.get<Page<TPOData>>(`${environment.BASE_URL}/tpo-manager/tpo-data/page`, {params: query});
  }

  createTpoData(tpoData: TPOData | any): Observable<TPOData> {
    return this.httpclient.post<TPOData>(`${environment.BASE_URL}/tpo-manager/tpo-data`, tpoData);
  }

  updateTpoData(tpoDataId: number, tpoData: TPOData | any): Observable<TPOData> {
    return this.httpclient.put<TPOData>(`${environment.BASE_URL}/tpo-manager/tpo-data/${tpoDataId}/edit`, tpoData);
  }

  getTpoDataById(tpoDataId: number): Observable<TPOData> {
    return this.httpclient.get<TPOData>(`${environment.BASE_URL}/tpo-manager/tpo-data/${tpoDataId}`);
  }

  updateTpoDataPatterns(tpoDataId: number, tpoWorOrder: Array<TPOWorkOrder>): Observable<ApiResponse> {
    return this.httpclient.put<ApiResponse>(`${environment.BASE_URL}/tpo-manager/tpo-data/${tpoDataId}`, tpoWorOrder);
  }


  deleteTpoData(tpoDataId: number): Observable<ApiResponse> {
    return this.httpclient.delete<ApiResponse>(`${environment.BASE_URL}/tpo-manager/tpo-data/${tpoDataId}`);
  }

  getAllTpoWordOrder(tpoDataId: number): Observable<Array<TPOWorkOrder>> {
    return this.httpclient.get<Array<TPOWorkOrder>>(`${environment.BASE_URL}/tpo-manager/tpo-data/${tpoDataId}/tpo-word-order`);
  }

  addTpoWordOrder(tpoDataId: number, tpoWorkOrder: TPOWorkOrder | any): Observable<TPOWorkOrder> {
    return this.httpclient.put<TPOWorkOrder>(`${environment.BASE_URL}/tpo-manager/tpo-data/${tpoDataId}/tpo-word-order`, tpoWorkOrder);
  }

  getWorkOrdersPage(search = "", page = 0, size = 50): Observable<Page<TPOWorkOrder>> {
    let query = new HttpParams()
    .set('search', search)
    .set('page', page)
    .set('size', size);
    return this.httpclient.get<Page<TPOWorkOrder>>(`${environment.BASE_URL}/tpo-manager/tpo-word-orders/page`, {params: query});
  }

  addWordOrder(tpoWorkOrder: TPOWorkOrder | any): Observable<TPOWorkOrder> {
    return this.httpclient.post<TPOWorkOrder>(`${environment.BASE_URL}/tpo-manager/tpo-word-order`, tpoWorkOrder);
  }


  addManyTpoWordOrder(tpoDataId: number, tpoWorkOrders: Array<TPOWorkOrder>): Observable<ApiResponse> {
    return this.httpclient.put<ApiResponse>(`${environment.BASE_URL}/tpo-manager/tpo-data/${tpoDataId}/tpo-word-orders/add-many`, tpoWorkOrders);
  }

  addTpoPreviousState(tpoDataId: number, tpoWorkOrders: Array<TPOWorkOrder>): Observable<TpoFailureState> {
    return this.httpclient.put<TpoFailureState>(`${environment.BASE_URL}/tpo-manager/tpo-data/${tpoDataId}/previous-state`, tpoWorkOrders);
  }

  removeTpoWordOrder(tpoDataId: number, tpoWordOrderId: number): Observable<ApiResponse> {
    return this.httpclient.delete<ApiResponse>(`${environment.BASE_URL}/tpo-manager/tpo-data/${tpoDataId}/tpo-word-order/${tpoWordOrderId}`);
  }

  updateTpoWordOrder(tpoWordOrderId: number, tpoWorkOrder: TPOWorkOrder | any): Observable<TPOWorkOrder> {
    return this.httpclient.put<TPOWorkOrder>(`${environment.BASE_URL}/tpo-manager/tpo-word-order/${tpoWordOrderId}`, tpoWorkOrder);
  }

  deleteTpoWordOrder(tpoWordOrderId: number): Observable<ApiResponse> {
    return this.httpclient.delete<ApiResponse>(`${environment.BASE_URL}/tpo-manager/tpo-word-order/${tpoWordOrderId}`);
  }

  addFailureTpo(tpoDataId : number, tpoFailureState : TpoFailureState): Observable<TpoFailureState> {
    return this.httpclient.put<TpoFailureState>(`${environment.BASE_URL}/tpo-manager/tpo-data/${tpoDataId}/failure`, tpoFailureState);
  }

  updateFailureTpo(tpoFailureStateId: number, tpoDataId : number, tpoFailureState : TpoFailureState): Observable<TpoFailureState> {
    return this.httpclient.put<TpoFailureState>(`${environment.BASE_URL}/tpo-manager/tpo-data/${tpoDataId}/failure/${tpoFailureStateId}`, tpoFailureState);
  }

  deleteFailureTpo(tpoFailureStateId: number, tpoDataId : number): Observable<ApiResponse> {
    return this.httpclient.delete<ApiResponse>(`${environment.BASE_URL}/tpo-manager/tpo-data/${tpoDataId}/failure/${tpoFailureStateId}`);
  }

  getAllTpoWordOrders(): Observable<Array<TPOWorkOrder>> {
    return this.httpclient.get<Array<TPOWorkOrder>>(`${environment.BASE_URL}/tpo-manager/tpo-word-orders`);
  }

  getAllConstantConfig(): Observable<Array<ConstantConfig>> {
    return this.httpclient.get<Array<any>>(`${environment.BASE_URL}/tpo-manager/constant-config`);
  }

  createConstantConfig(constantConfig: ConstantConfig | any): Observable<ConstantConfig> {
    return this.httpclient.post<ConstantConfig>(`${environment.BASE_URL}/tpo-manager/constant-config`, constantConfig);
  }

  updateConstantConfig(constantConfigId: number, constantConfig: ConstantConfig | any): Observable<ConstantConfig> {
    return this.httpclient.put<ConstantConfig>(`${environment.BASE_URL}/tpo-manager/constant-config/${constantConfigId}`, constantConfig);
  }

  deleteConstantConfig(constantConfigId: number): Observable<ApiResponse> {
    return this.httpclient.delete<ApiResponse>(`${environment.BASE_URL}/tpo-manager/constant-config/${constantConfigId}`);
  }
}
