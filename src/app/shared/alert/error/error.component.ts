import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-error',
    templateUrl: './error.component.html',
    styleUrls: ['./error.component.css'],
    // standalone: true,
})
export class ErrorComponent {
  closeAlert = false;
  @Input() message!: string;
  @Output() close = new EventEmitter<void>();

  onClose() {
  this.close.emit()
  }
}
