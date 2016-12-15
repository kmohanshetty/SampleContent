'use strict';

(function (angular){

  angular
    .module('rv.components.RVCenterModule')
    .service('ContentDataService', ContentDataService);

  ContentDataService.$inject = ['$resource'];

  function ContentDataService($resource){

    var contentREST = $resource('http://localhost:8085/RESTServer/getRecord/:recordNo/', {recordNo: '@recordNo'});

    return contentREST;
  }
})(angular);