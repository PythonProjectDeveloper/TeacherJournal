import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { TranslateModuleConfig, TranslateLoader } from '@ngx-translate/core';

// work only with http HttpBackend
export function translateHttpLoaderFactory(httpBackend: HttpBackend): TranslateHttpLoader {
  return new TranslateHttpLoader(new HttpClient(httpBackend));
}

export function TranslateLanguageSettings(): TranslateModuleConfig {
  return {
    loader: {
      provide: TranslateLoader,
      deps: [HttpBackend],
      useFactory: translateHttpLoaderFactory
    }
  };
}
