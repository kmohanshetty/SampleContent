'use strict';

(function (angular) {

  angular
    .module('rv.views.PatentRVModule')
    .config(PatentRVConfig);

  PatentRVConfig.$inject = ['$stateProvider'];

  function PatentRVConfig($stateProvider) {
    $stateProvider
      .state('patentRV', {
        url: '/patentRV',
        templateUrl: 'modules/views/patent/templates/patentRV.html',
        controller: 'PatentRVController',
        controllerAs: 'patentVm'
      });

  }

})(angular);
