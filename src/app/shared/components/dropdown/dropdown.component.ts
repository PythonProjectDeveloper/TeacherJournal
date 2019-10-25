import { Component, OnInit, forwardRef } from '@angular/core';
import { DataPickerService } from 'src/app/common/services/data-picker.service';
import { FormGroup, FormControl, FormArray, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IDate, ISubjectDates } from 'src/app/common/entities/subject-dates';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true
    }
  ]
})
export class DropdownComponent implements OnInit {
  public subjects: FormGroup[];
  public viewDates: string;

  constructor(
    private dataPickerService: DataPickerService
  ) { }

  public ngOnInit(): void {
    this.dataPickerService.getSubjectDates().subscribe(dates => {
      this.subjects = dates.map(subjectDates => this.getSubjectDatesControl(subjectDates));
    });
  }

  public getSubjectDatesControl(subjectDates: ISubjectDates): FormGroup {
    return new FormGroup({
      subjectName: new FormControl(subjectDates.subjectName),
      dates: new FormArray(subjectDates.dates.map(date => this.getDateControl(date)))
    });
  }

  public getDateControl(date: IDate): FormGroup {
    return new FormGroup({
      name: new FormControl(date.name),
      state: new FormControl(date.state)
    });
  }

}
