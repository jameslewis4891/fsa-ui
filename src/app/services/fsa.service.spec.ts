import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FSAService } from './fsa.service';
import { FSAAPIMock } from '../mocks/fsapimock';
import { IAuthorities } from '../interfaces/IAuthorities';
import { IRatingPercentage } from '../interfaces/IRatingPercentage';
import { TestBed, inject } from '@angular/core/testing';
import { Observable } from 'rxjs';

describe('FSAService', () => {

    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            HttpClientTestingModule
        ],
        providers: [
            FSAService
        ]
    }));

    describe('When making requests to the FSA Service', () => {
        it('Should fetch a list of authorites', inject([FSAService], service => {

            const http = TestBed.get(HttpTestingController);

            const responseHandle: Observable<IAuthorities> = service.getAuthorities();

            responseHandle.subscribe((response: IAuthorities) => {
                expect(response.count).toBe(4);
                expect(response.authorities[0].authorityId).toBe(197);
                expect(response.authorities[0].name).toBe('Aberdeen City');
            });

            const req = http.expectOne('http://localhost:8080/authorities');

            expect(req.request.method).toEqual('GET');

            req.flush(FSAAPIMock.getAuthorities(), {
                status: 200, statusText: 'Success'
            });

            http.verify();
        }));

        it('Should fetch a list of rating percentages', inject([FSAService], service => {

            const http = TestBed.get(HttpTestingController);
            const authorityId = 392;
            const responseHandle: Observable<IRatingPercentage[]> = service.getRatingPercentages(authorityId);

            responseHandle.subscribe((response: IRatingPercentage[]) => {
                expect(response.length).toBe(8);
                expect(response[0].rating).toBe('0');
                expect(response[0].percentage).toBe(0.16);
            });

            const req = http.expectOne('http://localhost:8080/establishments/ratings/byAuthority/' + authorityId);

            expect(req.request.method).toEqual('GET');

            req.flush(FSAAPIMock.getRatingPercentages(), {
                status: 200, statusText: 'Success'
            });

            http.verify();
        }));
    });
});
