  'use strict';

  (function (angular) {

    angular
      .module('rv')
     .config(AppConfig);
     AppConfig.$inject = ['$logProvider','$urlRouterProvider'];

    function AppConfig($logProvider,$urlRouterProvider) {

      //this is for the dev mode
      $logProvider.debugEnabled(true);
      var rvConfig;

      var contentSet = "PAT";

        if("PAT"==contentSet){
          //$state.go('patentRV');
        }else if("LIT"==contentSet){
     angular.module('rv').$inject['rv.views.liteartureRVModule'];
        }else if("BUS"==contentSet){
     angular.module('rv').$inject['rv.views.businessRVModule'];
        }else if("JAPANESE"==contentSet){
     angular.module('rv').$inject['rv.views.japaneseRVModule'];
        }else if ("FED"==contentSet) {
     angular.module('rv').$inject['rv.views.allContentRVModule'];
        }

      $urlRouterProvider.otherwise('patentRV');
    }

    /*AppConfig.$inject = ['$httpProvider', '$logProvider', '$urlRouterProvider', '$sceDelegateProvider', 'CONFIG', 'AnalyticsProvider', 'EnvironmentProvider', 'ENV_CONFIG'];

    function AppConfig($httpProvider, $logProvider, $urlRouterProvider, $sceDelegateProvider, CONFIG, AnalyticsProvider, EnvironmentProvider, ENV_CONFIG) {

      var environment = EnvironmentProvider.getEnvironment();
      var analyticsId = getAnalyticsAccountIdForEnvironment(environment);

      AnalyticsProvider.setGoogleAccountId(analyticsId);

      //this is for the dev mode
      $logProvider.debugEnabled(true);

      $urlRouterProvider.otherwise('/login');

      $httpProvider.interceptors.push('HttpInterceptorFactory');

      if (!$httpProvider.defaults.headers.get) {
        $httpProvider.defaults.headers.get = {};
      }
      //disable ajax request caching
      $httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
      $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
      $httpProvider.defaults.headers.get.Pragma = 'no-cache';

      //support loading from AWS Cloudfront and localhost
      $sceDelegateProvider.resourceUrlWhitelist([
        // Allow same origin
        'self',
        // Allow loading from Cloudfront
        'https://d3rm6si6l6yzgk.cloudfront.net/1p-frontend/**'
      ]);

      function getAnalyticsAccountIdForEnvironment(env) {
        var accountId = '';

        switch (env) {
          case ENV_CONFIG.LOCAL.NAME:
            accountId = CONFIG.ACCOUNT_LOCAL;
            break;
          case ENV_CONFIG.DEV.SNAPSHOT.NAME:
            accountId = CONFIG.ACCOUNT_DEV_SNAPSHOT;
            break;
          case ENV_CONFIG.DEV.STABLE.NAME:
            accountId = CONFIG.ACCOUNT_DEV_STABLE;
            break;
          case ENV_CONFIG.TEST.AUTO.NAME:
            accountId = CONFIG.ACCOUNT_TEST_AUTO;
            break;
          case ENV_CONFIG.TEST.PERF.NAME:
            accountId = CONFIG.ACCOUNT_TEST_PERF;
            break;
          case ENV_CONFIG.PROD.NAME:
            accountId = CONFIG.ACCOUNT_PROD;
            break;
        }

        return accountId;
      }

    }*/


  })(angular);