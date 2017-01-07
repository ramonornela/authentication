# AuthenticationModule

This is abstract to Authentication based in project https://github.com/zendframework/zend-authentication

## Using AuthenticationModule or AuthenticationHttpModule in an Ionic 2 app

```typescript
import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';

import { UrlResolverModule } from '@ramonornela/url-resolver';
import { AuthenticationHttpModule } from '@ramonornela/authentication';

const Routes = {
  'auth': {
    'url': 'http://example.com/auth'
  }
};
@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    UrlResolverModule.initialize(Routes),
    AuthenticationHttpModule.initialize()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ]
})
export class AppModule {}
```

Contributing

See [CONTRIBUTING.md](https://github.com/ramonornela/authentication/blob/master/.github/CONTRIBUTING.md)
