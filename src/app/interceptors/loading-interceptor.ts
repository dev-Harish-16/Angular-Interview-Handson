import { HttpInterceptorFn } from '@angular/common/http';
import { delay, finalize } from 'rxjs';
import { Loader } from '../services/loader';
import { inject } from '@angular/core';
import { SKIP_LOADER } from '../../main';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loaderService = inject(Loader);
  const skiploder = req.context.get(SKIP_LOADER);

  if (skiploder) {
    return next(req);
  }
  loaderService.show();
  return next(req).pipe(
    delay(1000),
    finalize(() => {
      loaderService.hide();
    })
  );
};
