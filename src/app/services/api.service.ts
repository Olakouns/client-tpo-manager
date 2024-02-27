import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TPOData} from "../models/tpodata";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Page} from "../payload/page";
import {ApiResponse} from "../payload/api-response";
import {TPOWorkOrder} from "../models/tpowork-order";

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
    return this.httpclient.get<Page<TPOData>>(`${environment.BASE_URL}/tpo-manager/tpo-data/page`);
  }

  createTpoData(tpoData: TPOData | any): Observable<TPOData> {
    return this.httpclient.post<TPOData>(`${environment.BASE_URL}/tpo-manager/tpo-data`, tpoData);
  }

  updateTpoData(tpoDataId: number, tpoData: TPOData | any): Observable<TPOData> {
    return this.httpclient.put<TPOData>(`${environment.BASE_URL}/tpo-manager/tpo-data/${tpoDataId}`, tpoData);
  }

  deleteTpoData(tpoDataId: number): Observable<ApiResponse> {
    return this.httpclient.delete<ApiResponse>(`${environment.BASE_URL}/tpo-manager/tpo-data/${tpoDataId}`);
  }

  getAllTpoWordOrder(tpoDataId: number): Observable<Array<TPOWorkOrder>> {
    return this.httpclient.get<Array<TPOWorkOrder>>(`${environment.BASE_URL}/tpo-manager/tpo-data/${tpoDataId}/tpo-word-order`);
  }

  addTpoWordOrder(tpoDataId: number, tpoWorkOrder: TPOWorkOrder): Observable<TPOWorkOrder> {
    return this.httpclient.put<TPOWorkOrder>(`${environment.BASE_URL}/tpo-manager/tpo-data/${tpoDataId}/tpo-word-order`, tpoWorkOrder);
  }

  removeTpoWordOrder(tpoDataId: number, tpoWordOrderId: number): Observable<ApiResponse> {
    return this.httpclient.delete<ApiResponse>(`${environment.BASE_URL}/tpo-manager/tpo-data/${tpoDataId}/tpo-word-order/${tpoWordOrderId}`);
  }

  updateTpoWordOrder(tpoWordOrderId: number, tpoWorkOrder: TPOWorkOrder): Observable<TPOWorkOrder> {
    return this.httpclient.put<TPOWorkOrder>(`${environment.BASE_URL}/tpo-manager/tpo-word-order/${tpoWordOrderId}`, tpoWorkOrder);
  }

  deleteTpoWordOrder(tpoWordOrderId: number): Observable<ApiResponse> {
    return this.httpclient.delete<ApiResponse>(`${environment.BASE_URL}/tpo-manager/tpo-word-order/${tpoWordOrderId}`);
  }

  addTpoWordOrderFailureToWK(tpoWordOrderId: number, tpoWorkOrderFailure: TPOWorkOrder): Observable<TPOWorkOrder> {
    return this.httpclient.put<TPOWorkOrder>(`${environment.BASE_URL}/tpo-manager/tpo-word-order/${tpoWordOrderId}/failure`, tpoWorkOrderFailure);
  }

}
