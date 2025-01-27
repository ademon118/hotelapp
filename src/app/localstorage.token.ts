import { InjectionToken } from "@angular/core";

export const localstoragetoken = new InjectionToken<any>('local storage',
  {
    providedIn : 'root',
    factory() {
      return localStorage;
    },
  }
)


