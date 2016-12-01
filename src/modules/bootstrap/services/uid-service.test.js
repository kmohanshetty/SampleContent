'use strict';

describe('UID Service:', function () {

  var UidService;

  beforeEach(module('ne'));

  beforeEach(inject(function (_UidService_) {
    UidService = _UidService_;
  }));

  describe('the service', function () {
    it('should exist', function () {
      expect(UidService).to.exist();
    });

    it('should contain a method or property', function () {
      expect(UidService).not.to.be.empty();
    });
  });

  describe('the getUid() method', function () {
    it('should exist', function () {
      expect(UidService.getUid).to.exist();
    });

    it('should return something', function () {
      expect(UidService.getUid()).not.to.be.empty();
    });

    it('should return a UID string', function () {
      expect(UidService.getUid()).to.have.string('UID');
    });

    it('should return a string with a length above 3', function () {
      expect(UidService.getUid()).to.have.length.above(3);
    });

    it('should not produce duplicates', function () {
      var i;
      var uids = [];
      var numberOfUidsToTest = 1024;
      var foundDuplicate = false;

      for (i = 0; i < numberOfUidsToTest; i = i + 1) {
        uids[i] = UidService.getUid();
      }

      for (i = 1; i < numberOfUidsToTest; i = i + 1) {
        if (uids[0] === uids[i]) {
          foundDuplicate = true;
        }
      }

      expect(foundDuplicate).to.be.false();
    });
  });
});
