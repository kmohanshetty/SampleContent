'use strict';

(function(angular) {

  angular
    .module('rv.routes.PatentModule')
    .config(PatentConfig);

	PatentConfig.$inject = ['$stateProvider'];

  function PatentConfig($stateProvider){
    $stateProvider
      .state('patentRV',{
        templateUrl: 'modules/views/patent/templates/patentRV.html',
        url : '/patentRV',
        controller: 'PatentRVController',
        controllerAs : 'vm',
        resolve: {
          viewLoginModule: ['$q', '$ocLazyLoad', function ($q, $ocLazyLoad) {
            var deferred = $q.defer();
            // This is to avoid bootstrap test digest itreation error
            // caused by unresolved otherwise route
            try {
              require.ensure([], function () {
                var module = require('../../views/patent/patent-rv-module');
                $ocLazyLoad.load({
                  name: 'rv.views.PatentRVModule'
                });
                deferred.resolve(module);
              }, 'patentRV');
            } catch (e) {
              deferred.resolve(e);
            }
            return deferred.promise;

          }]
        }
      });
  }

})(angular);