import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { DataPickerService } from 'src/app/common/services/data-picker.service';
import { FormGroup } from '@angular/forms';
import { setDestroyFlag } from 'src/app/common/helpers/ngrx-widen';
import { Subject } from 'rxjs';
import { IRequestDates, IDropDown, IDropDownWidget } from '../../common/entities/dropdown';
import { chain } from 'lodash';
import { createDropDownWidgetForm } from '../../common/forms/dropdown';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public viewDates: string;
  public destroy$: Subject<boolean> = new Subject<boolean>();
  public isInputOpen = false;
  public defaultText: string;
  public selectedDates: IRequestDates[] = [];
  @Output() public onChanged = new EventEmitter<IRequestDates[]>();

  constructor(
    private dataPickerService: DataPickerService,
    private translate: TranslateService
  ) { }

  public ngOnInit(): void {
    setDestroyFlag(this.dataPickerService.getSubjectDates(), this.destroy$).subscribe(dates => {
      this.form = createDropDownWidgetForm({ dropdowns: dates });
      this.form.valueChanges.subscribe(() => this.updateViewDates(this.form.value.dropdowns));

      this.updateViewDates(dates);
    });
    setDestroyFlag(this.translate.onLangChange, this.destroy$).subscribe(({ translations }) => {
      this.setViewText(translations.widgets.dropdown.selectDate);
    });
    setDestroyFlag(this.translate.getTranslation(this.translate.currentLang), this.destroy$).subscribe((translations) => {
      this.setViewText(translations.widgets.dropdown.selectDate);
    });
  }

  public setViewText(text: string): void {
    this.defaultText = text;
    this.setViewDatesString(this.selectedDates, text);
  }

  public updateViewDates(dropdowns: IDropDown[]): void {
    this.selectedDates = this.getViewDates(dropdowns);

    this.setViewDatesString(this.selectedDates, this.defaultText);

    this.onChanged.emit(this.selectedDates);
  }

  public getViewDates(dropdowns: IDropDown[]): IRequestDates[] {
    return chain(dropdowns)
      .map(dropdown => ({
        subject: dropdown.subjectName,
        dates: chain(dropdown.dates).filter('state').map('name').value()
      }))
      .filter(dropdown => Boolean(dropdown.dates.length))
      .value();
  }

  public setViewDatesString(subjects: IRequestDates[], defaultText: string): void {
    const viewDatesString: string[] = subjects.map((date) => `${ date.subject }: [${ date.dates.join(', ') }]`, []);

    this.viewDates = viewDatesString.length ? viewDatesString.join(', ') : defaultText;
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  public toggleCheckboxs(flag: boolean): void {
    const value: IDropDownWidget = this.form.value;
    value.dropdowns.forEach(dropdown =>
      dropdown.dates.forEach(date => date.state = flag)
    );
    this.form.patchValue(value);
  }

  public toggleCollapses(flag: boolean): void {
    const value: IDropDownWidget = this.form.value;
    value.dropdowns.forEach(dropdown => dropdown.isExpended = flag);
    this.form.patchValue(value);
  }

  public toggleInput(flag: boolean): void {
    this.isInputOpen = flag;
  }

}
