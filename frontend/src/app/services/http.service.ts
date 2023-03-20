import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Teacher} from "../models/teacher";
import {Class} from "../models/class";
import {Unit} from "../models/unit";

const BASE_URL = 'http://localhost:8080'

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  listTeachers(): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(BASE_URL + "/teacher");
  }

  listClasses(): Observable<Class[]> {
    return this.http.get<Class[]>(BASE_URL + "/class");
  }

  getUnitsForClass(selectedClass: string): Observable<Unit[]> {
    return this.http.get<Unit[]>(BASE_URL + "/unit/class/" +  selectedClass);
  }

  update(unit: Unit): Observable<any> {
    return this.http.post(BASE_URL + "/unit", unit);
  }
}
