'use strict';

// @TODO Remove this service and the corresponding test file

(function (angular) {
  angular
    .module('ne')
    .service('ImageServiceDeprecated', ImageService);

  ImageService.$inject = ['$q', '$state'];

  function ImageService($q) {

    var getImageDetails = function (base64Data) {
      var deferred = $q.defer();
      var tmp = new Image();
      tmp.src = base64Data;
      tmp.onload = function () {
        deferred.resolve({
          src: tmp.src,
          width: tmp.width,
          height: tmp.height
        });
      };
      return deferred.promise;
    };

    var getMaxImageDiameters = function (image, max) {
      var width = parseInt(image.width);
      var outer = width;
      if (width < image.height) {
        if (width > max) {
          width = max;
        }
      } else {
        if (width > max) {
          width = Math.round(max / image.height * width);
        } else if (image.height > max) {
          outer = max;
        } else {
          outer = image.height;
        }
      }
      return {
        inner: width,
        outer: outer
      };
    };

    var getMaxImageDiameter = function (image, max) {
      var width = image.width;
      if (width < image.height) {
        if (width > max) {
          width = max;
        }
      } else {
        if (width > max) {
          width = Math.round(max / image.height * width);
        }
      }
      return width;
    };

    return {
      getImageDetails: getImageDetails,
      getMaxImageDiameter: getMaxImageDiameter,
      getMaxImageDiameters: getMaxImageDiameters
    };

  }

})(angular);
