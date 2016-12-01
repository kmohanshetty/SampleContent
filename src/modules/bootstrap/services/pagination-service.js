'use strict';

(function (angular) {
  angular
    .module('ne')
    .service('PaginationService', PaginationService);

  function PaginationService() {

    var getUpdatedMoreButtonDetails = function(total, fetched, max, template) {
      var remainder = total - fetched;
      if (remainder > 0) {
        if (remainder < max) {
          return {
            label: template.replace('{{n}}', remainder),
            more: true
          };
        } else {
          return {
            label: template.replace('{{n}}', max),
            more: true
          };
        }
      }
      return {
        label: '',
        more: false
      };
    };

    return {
      getUpdatedMoreButtonDetails: getUpdatedMoreButtonDetails
    };
  }
})(angular);
