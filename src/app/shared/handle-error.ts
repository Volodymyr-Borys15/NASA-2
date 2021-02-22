import { HttpErrorResponse } from '@angular/common/http'
import { throwError } from 'rxjs/internal/observable/throwError'

export const handleError = (errorResponse:HttpErrorResponse) => {
    return throwError(errorResponse.error.errors)
}
