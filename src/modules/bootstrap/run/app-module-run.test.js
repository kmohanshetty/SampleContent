'use strict';

describe('Bootstrap Module Run Block', function () {

  var $rootScope;
  var $window;
  var PubSubFactory;
  var SessionFactory;
  var LoginService;
  var $uiViewScroll;
  var Analytics;
  var $location;
  var amMoment;

  var isAuthenticated;

  beforeEach(module('ne'));

  beforeEach(module(function ($provide) {

    $provide.service('PubSubFactory', function () {
      this.subscribe = sinon.spy();
    });

    $provide.service('SessionFactory', function () {
      this.hasLogin = isAuthenticated;
      this.logout = sinon.spy();
      this.userId = 'user-123-456';
      this.hasSession = sinon.spy();
    });

    $provide.service('LoginService', function () {
      this.validateLogin = sinon.spy();
    });

    $provide.service('localStorage', function () {
      this.get = sinon.stub().withArgs('token').returns(undefined);
    });

    $provide.value('$uiViewScroll', sinon.spy());

    $provide.service('Analytics', function () {
      this.trackPage = sinon.spy();
      this.setUserId = sinon.spy();
    });

    $provide.service('amMoment', function () {
      this.changeLocale = sinon.spy();
    });
    $provide.service('amMoment', function () {
      this.changeLocale = sinon.spy();
    });

  }));

  describe('Unauthenticated', function () {

    beforeEach(function () {

      isAuthenticated = false;

      inject(function (_SessionFactory_, _Analytics_) {
        SessionFactory = _SessionFactory_;
        Analytics = _Analytics_;
      });

    });

    it('should utilize the Analytics.setUserId to set the current User ID for Analytics tracking when user DOES NOT hasLogin', function () {
      var spy = Analytics.setUserId;

      expect(spy).to.have.not.been.calledWith('user-123-456');

      spy.reset();
    });

  });

  describe('Authenticated', function () {

    beforeEach(function () {

      isAuthenticated = true;

      inject(function (_$rootScope_, _$window_, _$location_, _PubSubFactory_, _SessionFactory_, _LoginService_, _$uiViewScroll_, _Analytics_, _amMoment_) {
        $rootScope = _$rootScope_;
        $window = _$window_;
        $location = _$location_;
        PubSubFactory = _PubSubFactory_;
        SessionFactory = _SessionFactory_;
        LoginService = _LoginService_;
        $uiViewScroll = _$uiViewScroll_;
        Analytics = _Analytics_;
        amMoment = _amMoment_;

        $location.url = sinon.stub().returns('http://www.mock-url.com');
      });

    });
    describe('$rootScope event listeners', function () {
      var mockToState;
      var mockToParams;
      var mockFromState;
      var mockFromParams;

      beforeEach(function () {
        mockToState = {
          name: 'login.login',
          authRequired: true
        };
        mockToParams = {};
        mockFromState = {
          name: 'mock-state-name'
        };
        mockFromParams = {
          name: 'mock-param-name'
        };
      });

      describe('$stateChangeStart event', function () {

        it('should utilize the LoginService.validateLogin method', function () {
          var spy = LoginService.validateLogin;

          $rootScope.$broadcast('$stateChangeStart', mockToState);

          expect(spy).to.have.been.calledOnce();
        });

        it('should utilize the SessionFactory.logout method with no referrer when an unauthenticated user lands on the login page', function () {
          var spy = SessionFactory.logout;

          $rootScope.$broadcast('$stateChangeStart', mockToState);

          expect(spy).to.have.been.calledWith({
            unauthorized: true,
            referrer: ''
          });

        });

        it('should utilize the SessionFactory.logout method with a referrer when an unauthenticated user is redirected to the login page', function () {
          var spy = SessionFactory.logout;

          mockFromParams.name = 'mock-state-name';
          $window.location.hash = '/mock-url-hash';

          $rootScope.$broadcast('$stateChangeStart', mockToState, mockToParams, mockFromState, mockFromParams);

          expect(spy).to.have.been.calledWith({
            unauthorized: true,
            referrer: '/#/mock-url-hash'
          });

        });

      });

      describe('$stateChangeSuccess event', function () {
        var domElementMatcher;

        beforeEach(function () {
          domElementMatcher = sinon.match(function (value) {
            return angular.isElement(value);
          }, 'htmlElement');
        });

        it('should utilize the $uiViewScroll service when the state is NOT a Profile state', function () {
          var spy = $uiViewScroll;

          $rootScope.$broadcast('$stateChangeSuccess', mockToState, mockToParams, mockFromState);

          expect(spy).to.have.been.calledWithMatch(domElementMatcher);
        });

        it('should utilize the $uiViewScroll service when the state is NOT a Profile state', function () {
          var spy = $uiViewScroll;

          mockToState.name = 'profile.default';
          mockFromState.name = 'profile.post';

          $rootScope.$broadcast('$stateChangeSuccess', mockToState, mockToParams, mockFromState);

          expect(spy).to.have.not.been.calledWithMatch(domElementMatcher);
        });

        it('should utilize the Analyics.trackPage method to track the current URL', function () {
          var spy = Analytics.trackPage;

          $rootScope.$broadcast('$stateChangeSuccess', mockToState, mockToParams, mockFromState);

          expect(spy).to.have.been.calledWith('http://www.mock-url.com');
        });

      });

    });

    describe('Activate', function () {

      it('should utilize the amMoment service to set the locale formatting', function () {
        var spy = amMoment.changeLocale;

        expect(spy).to.have.been.calledWith('en', sinon.match.object);
      });

      it('should utilize the Analytics.setUserId to set the current User ID for Analytics tracking when user hasLogin', function () {
        var spy = Analytics.setUserId;

        expect(spy).to.have.been.calledWith('user-123-456');

        spy.reset();
      });

    });
  });
});