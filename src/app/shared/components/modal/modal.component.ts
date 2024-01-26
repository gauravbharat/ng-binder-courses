import { Component, inject } from '@angular/core';
import { UtilService } from '../../services/util.service';
import { ButtonComponent } from '../button/button.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  #utilService = inject(UtilService);

  modalProps$ = this.#utilService.modalTrigger$;

  close(): void {
    this.#utilService.closeModal();
  }
}
