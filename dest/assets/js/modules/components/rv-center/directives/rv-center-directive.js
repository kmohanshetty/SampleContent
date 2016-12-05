'use strict';

(function (angular) {

  angular
  .module('rv.components.RVCenterModule')
  .directive('rvCenter', RVCenterDirective)
  .controller('rvCenterController', RVCenterController);

  function RVCenterDirective() {
    return {
      restrict: 'E',
      templateUrl: 'modules/components/rv-center/templates/rv-center-template.html',
      scope: {
        title: '@'
      },
      bindToController: true,
      controllerAs: 'vm',
      controller: 'rvCenterController'
    };
  }

  RVCenterController.$inject = [];

  function RVCenterController () {
    var vm = this;
    vm.title = "Patent RecordView";
  }
})(angular);