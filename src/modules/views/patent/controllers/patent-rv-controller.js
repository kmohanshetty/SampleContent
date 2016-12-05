'use strict';

(function (angular) {

  angular
    .module('rv.views.PatentRVModule')
    .controller('PatentRVController', PatentRVController);

  PatentRVController.$inject = [];

  function PatentRVController() {
    var vm = this;

    vm.greeting = 'Welcome!!!';

   
    
  }

})(angular);
