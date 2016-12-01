/**
 * @ngdoc service
 * @name UidService
 * @description
 * This service creates Unique IDs that can be used for HTML element IDs, etc.
 */

'use strict';

(function(angular) {

  angular
    .module('ne')
    .service('UidService', UidService);

  UidService.$inject = [];

  function UidService() {
    var _uids = {};

    var _getUid = function() {
      return 'UID' + Math.random().toString(36).substr(2, 10);
    };

    /**
     * @ngdoc method
     * @name getUid
     * @methodOf ne.UidService
     * @description
     * Provides a single, thirteen character ID that is unique to all others called by this method.
     * The first three characters of the UID are 'UID'.
     * The next ten characters are random, alphanumeric.
     * Example: 'UIDabc123xyz0'
     *
     * @returns {String} A unique ID.
     */
    var getUid = function () {
      var _uid;

      _uid = _getUid();

      while (_uids[_uid] === true) {
        _uid = _getUid();
      }

      _uids[_uid] = true;

      return _uid;
    };

    return {
      getUid: getUid
    };
  }
})(angular);
