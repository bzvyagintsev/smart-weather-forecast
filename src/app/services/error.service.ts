import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  constructor(private snackBar: MatSnackBar) {}

  public handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('Ошибка:', error.error.message);

      this.openSnackBar('Ошибка:' + error.error.message, null);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Код ответа сервера ${error.status}, ` + `ошибка: ${error.error}`
      );

      if (error.status === 404) {
        this.openSnackBar(
          'Не получилось найти такой город',
          null
        );
      } else {
        this.openSnackBar(
          `Код ответа сервера ${error.status}, ` +
            `ошибка: ${error.error}`,
          null
        );
      }
    }
    // return an observable with a user-facing error message
    return throwError('Не получилось загрузить данные, попробуйте ещё раз.');
  }

  private openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
