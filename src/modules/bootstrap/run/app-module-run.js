'use strict';

(function (angular) {

  angular
    .module('ne')
    .run(AppModuleRunBlock);

  AppModuleRunBlock.$inject = ['$state', '$rootScope', '$window', '$location', 'SessionFactory', 'Analytics', 'amMoment', '$uiViewScroll', 'notifySocketEvents', 'TrendingSocketService', 'PubSubFactory', 'LoginService', 'Experiments', 'AUTHENTICATION_CONFIG'];

  function AppModuleRunBlock($state, $rootScope, $window, $location, SessionFactory, Analytics, amMoment, $uiViewScroll, notifySocketEvents, TrendingSocketService, PubSubFactory, LoginService, Experiments, AUTHENTICATION_CONFIG) {

    PubSubFactory.subscribe(AUTHENTICATION_CONFIG.EVENT_USER_LOGGED_IN, function() {
      // @TODO Relocate via OPUI-1268
      Experiments.refreshExperiment();
    });

    PubSubFactory.subscribe(AUTHENTICATION_CONFIG.EVENT_USER_LOGGED_OUT, function(data) {
      $state.go(data.stateToGo, data.goConfig, {reload:true});
      // @TODO Relocate via OPUI-1257
      TrendingSocketService.destroySocket();
    });

    PubSubFactory.subscribe(AUTHENTICATION_CONFIG.EVENT_TOKEN_UPDATED, function() {
      // @TODO Relocate via OPUI-1257
      TrendingSocketService.openSocket();
    });

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
      var loginState = 'login.login'; // convert to constant?
      var referrer = '';

      if (toState.authRequired && (!SessionFactory.hasLogin || !SessionFactory.hasSession())) {

        event.preventDefault();

        if (angular.isDefined(fromParams) && fromParams.name !== '') {
          referrer = '/' + $window.location.hash;
        }

        SessionFactory.logout({
          unauthorized: true,
          referrer: referrer
        });
      }

      if (toState.name === loginState && SessionFactory.hasLogin) {
        LoginService.validateLogin();
        event.preventDefault();
      }

    });

    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState) {

      Analytics.trackPage($location.url());

      if (!isProfileState(toState) || !isProfileState(fromState)) {
        $uiViewScroll(angular.element('body'));
      }

      function isProfileState(state) {
        return state && state.name.match(/^profile(?:\..*)?$/);
      }
    });

    activate();

    function activate() {

      if (SessionFactory.hasLogin) {
        Analytics.setUserId(SessionFactory.userId);

        // @TODO Relocate via OPUI-1257
        TrendingSocketService.openSocket();
        // @TODO Relocate via OPUI-1268
        Experiments.refreshExperiment();
      }

      // this is for now, needs to take actual locale from browser,
      // but the | requires customization
      amMoment.changeLocale('en', {
        calendar: {
          lastDay: '[Yesterday |] LT',
          sameDay: '[Today |] LT',
          nextDay: '[Tomorrow |] LT',
          lastWeek: '[last] dddd [|] LT',
          nextWeek: 'dddd [|] LT',
          sameElse: 'L'
        }
      });

    }

  }

})(angular);
