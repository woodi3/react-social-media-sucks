import axios, { AxiosRequestConfig, AxiosPromise } from 'axios';
import TokenService from './token.service';
import {LOCAL_API_URL} from '../constants';

export type KeyValue<T,U> = {
    key: T,
    value: U;
}
export type APIMethod = "POST" | "GET" | "PUT" | "DELETE";

export interface IAPIRequest<T> extends AxiosRequestConfig {
    data?: T;
}

export class APIService {
    private _method: APIMethod = "GET";
    private _headers: any = {};

    constructor(private _jwtToken: string){}

    get jwtToken(): string {
        return this._jwtToken;
    }
    set jwtToken(newToken: string) {
        TokenService.setToken(newToken);
        this._jwtToken = newToken;
    }
    setHeaders (headers: KeyValue<string, string>[]): APIService {
        for(const i in headers){
            if (headers[i].hasOwnProperty('key')
            && headers[i].hasOwnProperty('value')) {
                this._headers[headers[i].key] = headers[i].value;
            }
        }
        return this;
    }
    get headers(): any {
        return this._headers;
    }

    setMethod (newMethod: APIMethod): APIService {
        this._method = newMethod;
        return this;
    }

    resetHeaders(): void {
        this._headers = {};
    }

    createRequest<T> (url: string, body?: T): IAPIRequest<T> {
        return {
            url: `${LOCAL_API_URL}${url}`,
            headers: this._headers,
            method: this._method,
            data: body,
        }
    }

    send<T>(request: IAPIRequest<T>): AxiosPromise {
        return axios(request);
    }
}

export class RequestBody<T> {
    constructor (private _requestBody: T) {
    }
    get requestBody (): T {
      return this._requestBody;
    }
    set requestBody (newRequestBody: T) {
       this._requestBody = newRequestBody;
    }
 }