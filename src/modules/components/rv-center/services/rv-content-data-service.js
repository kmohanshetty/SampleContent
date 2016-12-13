'use strict';

(function (angular){

  angular
    .module('rv.components.RVCenterModule')
    .service('ContentDataService', ContentDataService);

  ContentDataService.$inject = ['$q', '$http'];

  function ContentDataService($q, $http){
   
   var _getRecordData = function (){
      var deferred = $q.defer();
    try{
      $http({
        method: 'GET',
        url: 'http://localhost:8085/RESTServer/getRecord/US20130058864A1',
      }).success(function(data,status,headers){
        deferred.resolve(data, headers);
      }).error(function(data,status){
        deferred.reject('HTTP status' + status);
      });
    }catch(e){
      deferred.reject('ERROR' + e);
    }

    return deferred.promise;
  };

    return {
      getRecordData: _getRecordData
    };
  }
})(angular);

