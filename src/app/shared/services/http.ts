import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class Http {
    constructor(private http: HttpClient) {
    }
    public getHeaderCORS(){
        let headers = new HttpHeaders();
        let h = headers.append("Content-Type","application/x-www-form-urlencoded; charset=utf-8");
        return h;
    }

    public serialize(obj: any, prefix?: string): string {
        var str = [],
          p;
        for (p in obj) {
          if (obj.hasOwnProperty(p)) {
            var k = prefix ? prefix + "[" + p + "]" : p,
              v = obj[p];
            str.push((v !== null && typeof v === "object") ?
              this.serialize(v, k) :
              encodeURIComponent(k) + "=" + encodeURIComponent(v));
          }
        }
        return str.join("&");
    }

    public post(url: string, body=null) {
        return this.http.post(url, this.serialize(body), {headers: this.getHeaderCORS()});
    }

    public get(url: string) {
        return this.http.get(url);
    }

}