'use strict';

// @TODO Increase test coverage for this file.
// @TODO Remove $log messages that may flood the console (info, warn, debug), leaving only error messages.

(function (angular) {

  angular
  .module('ne')
  .service('socketEvents', SocketEventsService);

  SocketEventsService.$inject = ['$window', '$q', '$http', '$log', '$websocket', 'CONFIG'];

  // @TODO Remove unused params
  function SocketEventsService($window, $q, $http, $log, $websocket, CONFIG) {

    function OpenSocket(url, message, error, open) {

      var ws = $websocket(url, {reconnectIfNotNormalClose: true});

      ws.onOpen(function () {
        var openHandler = open;

        // @TODO Since openHandler is set above, doesn't this condition always pass?
        if (openHandler) {
          openHandler();
        }
      });
      ws.onClose(function () {

      });
      ws.onError(function (event) {
        var errorHandler = error;

        // @TODO Since errorHandler is set above, doesn't this condition always pass?
        if (errorHandler) {
          errorHandler(event);
        }
      });
      ws.onMessage(function (event) {
        var messageHandler = message;

        if (messageHandler && event && event.data) {
          try {
            messageHandler(JSON.parse(event.data));
          }
          catch (e) {
            $log.error('Socket message parse error: ' + e);

            messageHandler(event.data);
          }
        } else {
          angular.noop();
        }
      });

      this.close = function () {
        if (ws) {

          ws.close(true);
          ws = null;
        }
      };

      this.send = function (request) {
        if (ws) {
          ws.send(JSON.stringify(request));
        } else {
          // @TODO Please check the spelling of promise.
          return $q.defer().reject('Socket closed!').promice;
        }
      };
    }

    this.openSocket = function (client, message, error, open) {
      var deferred = $q.defer();

      // @TODO Refactor to use service instead of $rootScope
      var url = ($window.location.protocol === 'https:') ? ('wss://' + CONFIG.WS_NOTIFY_URL.replace(/:([^:]*)$/, '') + ':443') : ('ws://' + CONFIG.WS_NOTIFY_URL);

      try {
        var socket = new OpenSocket(url, message, error, open);

        deferred.resolve(socket);
      } catch (e) {
        $log.error(e);
        deferred.reject('Error creating socket: ' + e);
      }

      return deferred.promise;
    };
  }

})(angular);