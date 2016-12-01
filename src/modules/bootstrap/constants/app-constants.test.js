'use strict';

// @TODO Not sure that this file is necessary. Simply checking values my not be worth the upkeep.

describe('Global Constants', function () {

  var CONFIG;

  beforeEach(module('ne'));

  beforeEach(module(function ($provide) {
    var dummyFunction = function () {
      this.$get = function () {
        return {
        };
      };
    };

    $provide.provider('Notification', dummyFunction);
    $provide.provider('SessionFactory', dummyFunction);
    $provide.provider('$state', dummyFunction);
    $provide.provider('aggregateServiceGet', dummyFunction);
    $provide.provider('EnvironmentService', dummyFunction);
    $provide.provider('dataAugmentation', dummyFunction);
    $provide.provider('searchServiceGet', dummyFunction);
    $provide.provider('citationDetailsGet', dummyFunction);
    $provide.provider('ProjectNeonSecurity', dummyFunction);
    $provide.provider('Analytics', dummyFunction);
    $provide.provider('LoginService', dummyFunction);
    $provide.provider('amMoment', function () {
      this.$get = function () {
        return {
          changeLocale: function() {
          }
        };
      };
    });

    $provide.provider('$window', function () {
      this.$get = function () {
        return {
          onepShare: {}
        };
      };
    });

  }));

  beforeEach(inject(function (_CONFIG_) {
    CONFIG = _CONFIG_;
  }));

  it('has correct prefix for websockets', function () {
    expect(CONFIG.WS_NOTIFY_URL).to.equal('ws.localhost');
  });

  it('has correct values for google analytic account IDs', function () {
    expect(CONFIG.ACCOUNT_LOCAL).to.equal('UA-58833090-3');
    expect(CONFIG.ACCOUNT_DEV_SNAPSHOT).to.equal('UA-58833090-4');
    expect(CONFIG.ACCOUNT_DEV_STABLE).to.equal('UA-58833090-5');
    expect(CONFIG.ACCOUNT_TEST_AUTO).to.equal('UA-58833090-6');
    expect(CONFIG.ACCOUNT_TEST_PERF).to.equal('UA-58833090-7');
    expect(CONFIG.ACCOUNT_PROD).to.equal('UA-58833090-8');
  });

});