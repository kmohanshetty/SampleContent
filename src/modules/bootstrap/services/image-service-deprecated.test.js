'use strict';

// @TODO Remove these tests when the deprecated service is removed.

describe('Image Service', function () {
  var $q;
  var ImageService;

  beforeEach(module('ne'));

  beforeEach(module(function ($provide) {
    var dummyFunction = function () {
      this.$get = function () {
        return {
        };
      };
    };

    $provide.provider('Notification', dummyFunction);
    $provide.provider('$state', dummyFunction);
    $provide.provider('SessionFactory', dummyFunction);
    $provide.provider('dataAugmentation', dummyFunction);
    $provide.provider('searchServiceGet', dummyFunction);
    $provide.provider('citationDetailsGet', dummyFunction);
    $provide.provider('ProjectNeonSecurity', dummyFunction);
    $provide.provider('Analytics', dummyFunction);
    $provide.provider('aggregateServiceGet', dummyFunction);
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

  beforeEach(inject(function (_$q_, _ImageServiceDeprecated_) {
    $q = _$q_;
    ImageService = _ImageServiceDeprecated_;
  }));

  describe('Get maximum image diameter for the container square', function () {

    it('should give the shrunker image width as-is proportional to the shrunken height', function () {
      var max = 245;
      var large = 245 * 2;
      var image = {
        src: 'data:image/jpeg;base64,/9j/hao/Z',
        width: large,
        height: max
      };
      var width = ImageService.getMaxImageDiameter(image, max);
      expect(width).to.equal(large);
    });

    it('should give the shrunker image width proportional to the shrunken height', function () {
      var max = 245;
      var large = 245 * 2;
      var extra = 245 * 4;
      var image = {
        src: 'data:image/jpeg;base64,/9j/hao/Z',
        width: extra,
        height: large
      };
      var width = ImageService.getMaxImageDiameter(image, max);
      expect(width).to.equal(large);
    });

    it('should give the shrunker image width equal to the max', function () {
      var max = 245;
      var large = 245 * 2;
      var image = {
        src: 'data:image/jpeg;base64,/9j/hao/Z',
        width: max,
        height: large
      };
      var width = ImageService.getMaxImageDiameter(image, max);
      expect(width).to.equal(max);
    });
  });
});
