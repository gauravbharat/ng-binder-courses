import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SnackBarStateProps } from '../../app.model';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  private _snackBarTrigger = new Subject<SnackBarStateProps>();
  snackBarTrigger$ = this._snackBarTrigger.asObservable();

  showSnackbar(props: SnackBarStateProps): void {
    const { errorSnackBar = false, snackBarMessage, duration = 3000 } = props;
    this._snackBarTrigger.next({ errorSnackBar, snackBarMessage, duration });
  }
}
