'use strict';

(function(angular) {

  angular
  .module('rv.components.RVCenterModule')
  .constant('RV_CENTER_CONST', {
    REST_RECORD_URL: 'http://10.30.148.206:8080/RESTServer/getRecord/:recordNo/',
    HELP_BASE_URL: 'http://www.thomsoninnovation.com/tip-innovation/support/help/patent_fields.htm#'
  });

})(angular);
