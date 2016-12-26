'use strict';

(function (angular) {

  angular
  .module('rv.components.RVCenterModule')
  .directive('rvCenter', centerDirective);

  function centerDirective() {
    return {
      restruct: 'AE',
      scope: {},
      bindToController: {
        contentType: '=',
        highlightEnabled: '=',
        imagesEnabled: '=',
        testValue: '='
      },
      controllerAs: 'vm',
      controller: centerController,
      templateUrl: 'modules/components/rv-center/templates/rv-center-template.html'
    };
  }

  centerController.$inject = ['ContentDataService'];

  function centerController(ContentDataService) {
    var vm = this; // jshint ignore:line
    var results = [];
    results.$resolved = false;
    results.$promise = ContentDataService.get({recordNo: 'USRE46237E1'})
    .$promise
    .then(function (content) {
      vm.recordData = content;
    });
  }
})(angular);