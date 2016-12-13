'use strict';

(function (angular){

  angular
    .module('rv.components.ImagesModule')
    .service('ImageService', ImageService);

  ImageService.$inject = ['$q', '$http'];

  function ImageService($q, $http){
   
   var _getImages = function (){
     var deferred = $q.defer();
    try{
      $http({
        method: 'GET',
        url: 'http://localhost:8085/RESTServer/getImageURLs/',
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
      getImages: _getImages
    };
  }
})(angular);

