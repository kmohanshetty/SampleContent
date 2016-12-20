'use strict';

(function (angular) {

  angular
  .module('rv.components.RVCenterModule')
  .service('ContentDataService', ContentDataService);

  ContentDataService.$inject = ['$resource', 'RV_CENTER_CONST'];

  function ContentDataService($resource, RV_CENTER_CONST) {
    var contentREST = $resource(RV_CENTER_CONST.REST_RECORD_URL, {recordNo: '@recordNo'});
    return contentREST;
  }
})(angular);