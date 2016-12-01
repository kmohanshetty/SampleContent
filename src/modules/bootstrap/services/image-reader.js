'use strict';

(function (angular) {
  angular
    .module('ne')
    .service('ImageReaderService', ImageReaderService);

  ImageReaderService.$inject = ['$q', '$log'];

  function ImageReaderService($q, $log) {

    this.readImage = function (file) {

      var deferred = $q.defer();
      var reader;


      if (angular.isUndefined(file)) {
        $log.error('Image Reader Service Error: File object required.');
        deferred.reject({ message: 'Image Reader Service Error: File object required.' });

      } else {
        reader = new FileReader();

        reader.addEventListener('load', readerOnLoad);
        reader.addEventListener('error', readerOnError);

        reader.readAsDataURL(file);

      }

      function readerOnLoad(event) {
        var image = new Image();

        image.src = event.target.result;

        image.addEventListener('load', function () {

          deferred.resolve({
            name: file.name,
            size: file.size,
            src: image.src,
            width: image.width,
            height: image.height
          });

        });

      }

      function readerOnError(error) {
        deferred.reject(error);
      }

      return deferred.promise;

    };

  }

})(angular);
