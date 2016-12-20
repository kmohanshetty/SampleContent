'use strict';

(function (angular) {

  angular
  .module('rv.components.RVCenterModule')
  .directive('rvContent', contentDirective);

  function contentDirective() {
    return {
      restrict: 'AE',
      scope: {},
      bindToController: {
        content: '=',
      },
      controllerAs: 'vm',
      controller: contentController,
      templateUrl: 'modules/components/rv-center/templates/rv-content-template.html'
    };
  }

  contentController.$inject = ['$scope', 'ContentDataService', 'RV_CENTER_CONST'];

  function contentController($scope, ContentDataService, RV_CENTER_CONST) {
    var vm = this; // jshint ignore:line
    vm.test = 'Image hello world';
    vm.alternateClass = function(index) {
      if (index % 2 === 0) {
        return 'rv-section-even';
      }else {
        return 'rv-section-odd';
      }
    };

    vm.openHelpWindow = function(hrefValue) {
      window.open(RV_CENTER_CONST.HELP_BASE_URL + hrefValue, 'DescriptiveWindowName', 'width=550px,height=550px');
    };
  }
})(angular);