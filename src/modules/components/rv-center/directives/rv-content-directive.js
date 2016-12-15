'use strict';

(function (angular) {

  angular
  .module('rv.components.RVCenterModule')
  .directive('rvContent', contentDirective);

  function contentDirective() {
    return {
      restruct: 'AE',
      scope: {},
      bindToController: {
        content: '=',
      },
      controllerAs: 'vm',
      controller: contentController,
      templateUrl: 'modules/components/rv-center/templates/rv-content-template.html'
    };
  }

  contentController.$inject = ['$scope','ContentDataService'];

  function contentController ($scope, ContentDataService) {
    var vm = this; // jshint ignore:line
      vm.test = 'Image hello world';
      vm.alternateClass = function(index){
      if(index %2 === 0){
        return 'rv-section-even';
      }else{
        return 'rv-section-odd';
      }
    }

    vm.openHelpWindow = function(hrefValue){
      window.open('http://www.thomsoninnovation.com/tip-innovation/support/help/patent_fields.htm#'+hrefValue, "DescriptiveWindowName", "width=550px,height=550px");
    }
  }
})(angular);