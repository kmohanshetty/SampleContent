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
        param: '=',
        another: '=',
        countValue: '=',
        testValue: '='
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
      console.log(ContentDataService.getRecordData());

      ContentDataService.getRecordData().then(function (data){
      vm.sections = data.sections;
      console.log(data);
     });

      vm.alternateClass = function(index){
      if(index %2 === 0){
        return 'rv-section-even';
      }else{
        return 'rv-section-odd';
      }
    }
  }
})(angular);