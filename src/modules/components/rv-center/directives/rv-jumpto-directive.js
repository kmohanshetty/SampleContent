'use strict';

(function (angular) {

  angular
    .module('rv.components.RVCenterModule')
    .directive('rvJumpTo', rvJumpTo);

  function rvJumpTo() {

    return {
      restrict: 'AE',
      scope: {},
      bindToController: {
        fieldNames: '='
      },
      controller: rvJumpToController,
      controllerAs: 'vm',
      templateUrl: 'modules/components/rv-center/templates/rv-jumpto-template.html'
    };


  }

  rvJumpToController.$inject = ['$location', '$anchorScroll'];

  function rvJumpToController($location, $anchorScroll) {
  	var vm = this; // jshint ignore:line

  	vm.gotoAnchor = function(x) {
  		$location.hash(x);
  		$anchorScroll();
  	}


  }

})(angular);