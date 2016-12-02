'use strict';

(function (angular) {
  angular
    .module('ne')
    .service('StringLengthService', StringLengthService);

  StringLengthService.$inject = [];

  function StringLengthService() {

    var getRealLength = function (value) {
      if (angular.isUndefined(value) || value === null) {
        return 0;
      }
      var length = value.length;
      var newlines = value.match(/[\n\r]|[\r\n]/g);
      if (newlines === null) {
        return length;
      }
      return length + newlines.length;
    };

    var isEmpty = function (value, noTrim) {
      if (angular.isUndefined(value) || value === null) {
        return true;
      }
      if (noTrim) {
        return value.length === 0;
      }
      return value.trim().length === 0;
    };

    return {
      getRealLength: getRealLength,
      isEmpty: isEmpty
    };

  }

})(angular);