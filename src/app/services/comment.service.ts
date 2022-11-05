import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { environment } from "src/environments/environment";
import { IComment } from "../interfaces/Comment";
import { IResponse } from "../interfaces/Response";

@Injectable({
  providedIn: "root",
})
export class CommentService {
  private baseApiUrl = environment.baseApiUrl;
  private apiUrl = `${this.baseApiUrl}api/moments/comments`;

  constructor(private http: HttpClient) {}

  createComment(data: IComment): Observable<IResponse<IComment>> {
    return this.http.post<IResponse<IComment>>(this.apiUrl, data);
  }
}
