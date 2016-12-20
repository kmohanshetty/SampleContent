'use strict';

(function(angular) {

  angular
  .module('rv.components.ImagesModule')
  .constant('RV_IMG_CONST', {
    REST_IMAGE_URL: 'http://localhost:8085/RESTServer/getImageURLs/'
  });

})(angular);