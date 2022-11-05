import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { IMoment } from "../interfaces/Moment";
import { Response } from "../interfaces/Response";

@Injectable({
  providedIn: "root",
})
export class MomentService {
  private baseApiUrl = environment.baseApiUrl;
  private apiUrl = `${this.baseApiUrl}api/moments`;

  constructor(private http: HttpClient) {}

  createMoment(formData: FormData): Observable<FormData> {
    return this.http.post<FormData>(this.apiUrl, formData);
  }

  getMoments(): Observable<Response<IMoment[]>> {
    return this.http.get<Response<IMoment[]>>(this.apiUrl);
  }

  getMoment(id: number): Observable<Response<IMoment>> {
    return this.http.get<Response<IMoment>>(`${this.apiUrl}/${id}`);
  }

  removeMoment(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateMoment(id: number, formData: FormData): Observable<FormData> {
    return this.http.put<FormData>(`${this.apiUrl}/${id}`, formData);
  }
}
