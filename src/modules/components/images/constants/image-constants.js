'use strict';

(function(angular) {

  angular
  .module('rv.components.ImagesModule')
  .constant('RV_IMG_CONST', {
    REST_IMAGE_URL: 'http://10.30.148.206:8080/RESTServer/getImageURLs/'
  });

})(angular);