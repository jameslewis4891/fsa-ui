import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAuthorities } from '../interfaces/IAuthorities';
import { IRatingPercentage } from '../interfaces/IRatingPercentage';

@Injectable()
export class FSAService {

    private baseUrl: string;

    constructor(private http: HttpClient) {
        this.baseUrl = 'http://localhost:8080';
    }

    public getAuthorities(): Observable<IAuthorities> {
        const url = `${this.baseUrl}/authorities`;
        return this.http.get<IAuthorities>(url);
    }

    public getRatingPercentages(authorityId: number) {
        const url = `${this.baseUrl}/establishments/ratings/byAuthority/${authorityId}`;
        return this.http.get<IRatingPercentage[]>(url);
    }
}
