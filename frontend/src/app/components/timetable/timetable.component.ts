import {Component, OnInit} from '@angular/core';

import {MatSelectChange} from "@angular/material/select";
import {Teacher} from "../../models/teacher";
import {Class} from "../../models/class";
import {Unit} from "../../models/unit";
import {HttpService} from "../../services/http.service";
import {UpdateService} from "../../services/update.service";


@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.scss']
})
export class TimetableComponent implements OnInit {

  teachers: Teacher[] = [];
  classes: Class[] = [];
  selectedClass?: 'string';
  units?: Unit[];
  days = ['Mo', 'Di', 'Mi', 'Do', 'Fr'];
  timeUnits = new Array(4);
  unitsToUpdate: Unit[] = [];

  constructor(private readonly http: HttpService, private readonly updateService: UpdateService) {
  }

  ngOnInit(): void {
    this.http.listTeachers().subscribe(data => this.teachers = data);
    this.http.listClasses().subscribe(data => {
      this.classes = data
    });
    this.updateTimetable();
  }

  updateTimetable() {
    this.units = undefined;
    this.http.getUnitsForClass('5BHITM').subscribe(data => {
      this.units = data;
      for (let day = 1; day <= this.days.length; day++) {
        for (let unit = 1; unit <= this.timeUnits.length; unit++) {
          if (!this.getUnit(unit, day)) {
            let u: Unit = {
              id: -1,
              day: day,
              unit: unit,
              teacherId: -1,
              subject: 'frei',
              classId: this.selectedClass ?? ''
            }
            this.units.push(u);
          }
        }
      }
    });
  }

  getUnit(unit: number, day: number): Unit | undefined {
    if (!this.units) return undefined;
    return this.units.filter(u => {
      return u.unit == unit && u.day == day
    }).pop();
  }

  updateUnit(unit: Unit) {
    unit.changed = 'self';
    if (!this.unitsToUpdate.includes(unit))
      this.unitsToUpdate.push(unit);
  }

  saveChanged() {
    for (let i = this.unitsToUpdate.length - 1; i >= 0; i--) {
      let unit = this.unitsToUpdate.pop();
      if (!unit) break;
      this.http.update(unit).subscribe(() => {
        console.log("updated");
        this.updateTimetable();
      });
    }
  }
}
