import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ModalStateProps, SnackBarStateProps } from '../../app.model';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  private _snackBarTrigger = new Subject<SnackBarStateProps>();
  snackBarTrigger$ = this._snackBarTrigger.asObservable();

  private _modalTrigger = new BehaviorSubject<ModalStateProps | undefined>(
    undefined
  );
  private _modalClosed = new Subject<boolean>();

  modalTrigger$ = this._modalTrigger.asObservable();
  modalClosed$ = this._modalClosed.asObservable();

  showSnackbar(props: SnackBarStateProps): void {
    const { errorSnackBar = false, snackBarMessage, duration = 3000 } = props;
    this._snackBarTrigger.next({ errorSnackBar, snackBarMessage, duration });
  }

  showModal(props: ModalStateProps): void {
    this._modalTrigger.next(props);
  }

  closeModal(): void {
    this._modalTrigger.next(undefined);
    this._modalClosed.next(true);
  }
}
