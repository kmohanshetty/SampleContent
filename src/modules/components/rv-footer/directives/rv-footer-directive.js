'use strict';

(function (angular) {

  angular
    .module('rv.components.RVFooterModule')
    .directive('rvFooter', RVFooterDirective)
    .controller('rvFooterController',RVFooterController);

  function RVFooterDirective() {
    return {
      restrict: 'E',
      templateUrl: 'modules/components/rv-footer/templates/rv-footer-template.html',
      scope: {
        title: '@'
      },
      bindToController: true,
      controllerAs: 'vm',
      controller: 'rvFooterController'
    };
  }
function RVFooterController () {
      var vm = this;
      vm.title = "Patent RecordView";
    }
})(angular);