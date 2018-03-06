/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
  System.config({
    paths: {
      // paths serve as alias
      'npm:': 'node_modules/'
    },
    // map tells the System loader where to look for things
    map: {
      // our app is within the app folder
      'app': 'app',

      // angular bundles
      '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
      '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
      '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
      '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
      '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
      'ng2-validation': 'npm:ng2-validation/bundles/ng2-validation.umd.js',
      'ng2-toasty': 'node_modules/ng2-toasty/bundles/index.umd.js',
      "angular2-social-login": "node_modules/angular2-social-login",

      // other libraries
      'rxjs':                      'npm:rxjs',
      'angular-in-memory-web-api': 'npm:angular-in-memory-web-api/bundles/in-memory-web-api.umd.js',
      'angular2-datatable': 'npm:angular2-datatable',
      'lodash': 'npm:lodash/lodash.js',
      'ng2-slim-loading-bar': 'node_modules/ng2-slim-loading-bar/bundles/index.umd.js',
      'mydatepicker': 'npm:mydatepicker/bundles/mydatepicker.umd.min.js',
      '@ngui/auto-complete': 'node_modules/@ngui/auto-complete/dist/auto-complete.umd.js',
      'ng2-charts': 'node_modules/ng2-charts/bundles/ng2-charts.umd.js'
    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
      app: {
        defaultExtension: 'js',
        meta: {
          './*.js': {
            loader: 'systemjs-angular-loader.js'
          }
        }
      },
      rxjs: {
        defaultExtension: 'js'
      },
      'angular2-datatable': {
        main: 'index.js',
        defaultExtension: 'js'
      },
      "angular2-social-login": {main: 'dist/bundles/angular2-social-login.min.js', defaultExtension: "js"}
    }
  });
})(this);
