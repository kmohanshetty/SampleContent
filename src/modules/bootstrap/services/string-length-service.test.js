'use strict';

//XXX TODO fix such that this service doesn't break builds
//http://build.oneplatform.build/view/All/job/DEV-app-jetty-1p-frontend-new/662/
xdescribe('String Length Service', function () {
  var StringLengthService;

  beforeEach(module('ne'));

  beforeEach(module(function ($provide) {
    var dummyFunction = function () {
      this.$get = function () {
        return {
        };
      };
    };

    $provide.provider('$state', dummyFunction);
    $provide.provider('SessionFactory', dummyFunction);
    $provide.provider('dataAugmentation', dummyFunction);
    $provide.provider('searchServiceGet', dummyFunction);
    $provide.provider('Analytics', dummyFunction);
    $provide.provider('aggregateServiceGet', dummyFunction);
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

  beforeEach(inject(function (_StringLengthService_) {
    StringLengthService = _StringLengthService_;
  }));

  describe('Get string length', function () {
    it('should declare a getRealLength method', function () {
      expect(StringLengthService.getRealLength).to.not.be.undefined();
    });

    it('should get the correct length when there are no newlines', function () {
      var mockString = 'hao was here.';
      expect(StringLengthService.getRealLength(mockString)).to.equal(mockString.length);
    });

    it('should get the correct length when there are unix newlines', function () {
      var mockString = 'hao was here.\n';
      expect(StringLengthService.getRealLength(mockString)).to.equal(mockString.length + 1);
    });

    it('should get the correct length when there are mac newlines', function () {
      var mockString = 'hao was here.\r';
      expect(StringLengthService.getRealLength(mockString)).to.equal(mockString.length + 1);
    });

    it('should get the correct length when there are windows newlines', function () {
      var mockString = 'hao was here.\r\n';
      expect(StringLengthService.getRealLength(mockString)).to.equal(mockString.length + 2);
    });
  });

  describe('Check if empty', function () {
    it('should declare an isEmpty method', function () {
      expect(StringLengthService.isEmpty).to.not.be.undefined();
    });

    it('should say when the string is undefined or null', function () {
      expect(StringLengthService.isEmpty()).to.be.true();
      expect(StringLengthService.isEmpty(null)).to.be.true();
      expect(StringLengthService.isEmpty(null, true)).to.be.true();
    });

    it('should say when the string is just whitespace', function () {
      var mockString = '     ';
      expect(StringLengthService.isEmpty(mockString)).to.be.true();

      mockString = '\r\n';
      expect(StringLengthService.isEmpty(mockString)).to.be.true();
    });

    it('should count whitespace when we tell it to', function () {
      var mockString = '     ';
      expect(StringLengthService.isEmpty(mockString, true)).to.be.false();

      mockString = '\r\n';
      expect(StringLengthService.isEmpty(mockString, true)).to.be.false();
    });

    it('should say when we have content', function () {
      var mockString = 'hao was here.';
      expect(StringLengthService.isEmpty(mockString, true)).to.be.false();

      mockString = '     hao was here.';
      expect(StringLengthService.isEmpty(mockString, true)).to.be.false();

      mockString = 'hao was here.     ';
      expect(StringLengthService.isEmpty(mockString, true)).to.be.false();
    });
  });
});
