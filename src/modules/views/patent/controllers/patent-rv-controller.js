'use strict';

(function (angular) {

  angular
    .module('rv.views.PatentRVModule')
    .controller('PatentRVController', PatentRVController);

  PatentRVController.$inject = [];

  function PatentRVController() {
    var vm = this;

    vm.greeting = 'Welcome!!!';
    vm.param='PAT';
    vm.another='Foolish';
    vm.count=100;
  }

})(angular);
