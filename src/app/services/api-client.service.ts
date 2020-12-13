import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AppConfig } from "../app.config";

@Injectable({
  providedIn: "root",
})
export class ApiClientService {
  constructor(private http: HttpClient, private config: AppConfig) {}
  postPredict(name, files) {
    let formData: FormData = new FormData();
    formData.append(name, files, files.name);
    const _headers = new HttpHeaders();
    _headers.append("Content-Type", "multipart/form-data");
    _headers.append("Accept", "application/json");
    const _headersReq = {
      headers: _headers,
    };

    return this.http.post(`${this.config.PredictImage}`, formData, _headersReq);
  }
}
