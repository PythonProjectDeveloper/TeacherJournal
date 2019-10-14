import { Component, OnInit } from '@angular/core';
import { LeaveGuardModalWindowService } from 'src/app/common/services/leave-guard-modal-window.service';

@Component({
  selector: 'app-leave-guard-modal-window',
  templateUrl: './leave-guard-modal-window.component.html',
  styleUrls: ['./leave-guard-modal-window.component.scss'],
  host: {
    '[class.hidden]': '!isOpen'
  },
})
export class LeaveGuardModalWindowComponent {
  public isOpen: boolean = false;

  constructor(
    private leaveGuardModalWindowService: LeaveGuardModalWindowService
  ) { }

  public ngOnInit(): void {
    this.leaveGuardModalWindowService.getModalWindowStatus().subscribe((isOpen) => {
      this.isOpen = isOpen;
    });
  }

  public onSetAnswer(answer: boolean): void {
    this.leaveGuardModalWindowService.setAnswer(answer);
  }

}
