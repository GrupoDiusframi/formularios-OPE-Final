import { Component, ElementRef, EventEmitter, inject, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

//PRIMENG
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { fromEvent, Subject, takeUntil } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-modal-term-cond',
  standalone: true,
  imports: [CommonModule, FormsModule, ConfirmDialogModule, CheckboxModule, ButtonModule],
  providers: [ConfirmationService],
  templateUrl: './modal-term-cond.component.html',
  styleUrls: ['./modal-term-cond.component.scss'],
})
export class ModalTermCondComponent implements OnInit, OnDestroy {
  private confirmationService: ConfirmationService = inject(ConfirmationService);
  private notifier = new Subject();
  visible!: boolean;
  enabledButtonConfirm: boolean = true;
  valueCheckBox!: boolean;
  @Output() confirm: EventEmitter<boolean> = new EventEmitter();
  @ViewChild('contentTermCond', { static: true }) _contentTermCond!: ElementRef;

  ngOnInit(): void {
  }
  
  showDialogTermCond(event: Event): void {
    const target = event.target as HTMLInputElement;
    target.checked = false;
    this.confirmationService.confirm({
      message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod   tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim   veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea   commodo consequat. Duis aute irure dolor in reprehenderit in voluptate   velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint   occaecat cupidatat non proident, sunt in culpa qui officia deserunt   mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod   tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim   veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea   commodo consequat. Duis aute irure dolor in reprehenderit in voluptate   velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint   occaecat cupidatat non proident, sunt in culpa qui officia deserunt   mollit anim id est laborum.   Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod   tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim   veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea   commodo consequat. Duis aute irure dolor in reprehenderit in voluptate   velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint   occaecat cupidatat non proident, sunt in culpa qui officia deserunt   mollit anim id est laborum.',
      accept: () => {
          this.closeDialogTermCond(true);
      },
      reject: () => {
          this.closeDialogTermCond(false);
      }
    });
  }
  
  private closeDialogTermCond(confirm: boolean): void {
    if (!confirm || (confirm && this.enabledButtonConfirm)) {
      this.valueCheckBox = confirm;
      this.confirm.emit(confirm);
    }
  }

  private enableConfirm(): void {
    fromEvent<Event>(this._contentTermCond.nativeElement, 'scroll').pipe(
      takeUntil(this.notifier)
    ).subscribe({
      next: (e: Event) => {
        const target = e.target as any as {[key:string]:any};
        this.enabledButtonConfirm = target['scrollTop'] + target['offsetHeight'] + .5 >= target['scrollHeight'];
      }
    })
  }

  ngOnDestroy(): void {
      this.notifier.complete();
  }

}
