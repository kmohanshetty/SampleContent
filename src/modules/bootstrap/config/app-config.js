'use strict';

(function (angular) {

  angular
  .module('rv')
  .config(AppConfig);
  AppConfig.$inject = ['$logProvider', '$urlRouterProvider'];

  function AppConfig($logProvider, $urlRouterProvider) {

    //this is for the dev mode
    $logProvider.debugEnabled(true);
    //var rvConfig;

    var contentSet = 'PAT';

    if (contentSet === 'PAT') {
      // $state.go('patentRV');
    }else if (contentSet === 'LIT') {
      angular.module('rv').$inject['rv.views.liteartureRVModule'];// jshint ignore:line
    }else if (contentSet === 'BUS') {
      angular.module('rv').$inject['rv.views.businessRVModule'];// jshint ignore:line
    }else if (contentSet === 'JAPANESE') {
      angular.module('rv').$inject['rv.views.japaneseRVModule'];// jshint ignore:line
    }else if (contentSet === 'FED') {
      angular.module('rv').$inject['rv.views.allContentRVModule'];// jshint ignore:line
    }

    $urlRouterProvider.otherwise('patentRV');
  }
})(angular);