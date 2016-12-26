'use strict';

(function(angular) {

  angular.module('rv.components.ImagesModule')
  .directive('rvImage', rvImageDirective);

  function rvImageDirective() {
    return {
      restrict: 'AE',
      templateUrl: 'modules/components/images/templates/image-template.html',
      bindToController: {
        publicationNumber: '@'
      },
      scope: {},
      controller: rvImageController,
      controllerAs: 'vm'
    };
  }

  rvImageController.$inject = ['ImageService'];

  function rvImageController(ImageService) {
    var vm = this; // jshint ignore:line
    ImageService.getImages().then(function (data) {
      vm.images = data;
    }).catch(function (data) { // jshint ignore:line
      // I have written this code to hardcode urls for now. Once a working URL is available, the below line can be deleted
      var URL = 'http://10.30.148.206:8080/RESTServer/getRecordViewImage/USRE46237E1/';
      vm.images = [URL + '1/', URL + '2/', URL + '3/', URL + '4/', URL + '5/', URL + '6/'];
    });

    vm.activeClass = function(index) {
      if (index === 0) {
        return 'active';
      }
    };
  }
})(angular);


