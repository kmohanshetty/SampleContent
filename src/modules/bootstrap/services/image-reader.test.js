'use strict';

describe('Image Reader Service', function () {

  var $rootScope;
  var $log;
  var ImageReaderService;

  var _FileReader;
  var _Image;

  var mockFileUpload = {
    lastModified: 1333,
    name: 'mock-file-name.jpg',
    size: 88342,
    type: 'image/jpeg',
    webkitRelativePath: '',
    width: 567,
    height: 567
  };

  var mockDataUrlResult = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/4QEIRXhpZ';

  var mockImageData = {
    name: 'mock-file-name.jpg',
    size: 88342,
    src: mockDataUrlResult,
    width: 567,
    height: 567
  };

  var mockError = {
    target: 'mockErrorTarget',
    type: 'mockErrorType'
  };

  beforeEach(module('ne'));

  beforeEach(inject(function (_$rootScope_, _$log_, _ImageReaderService_) {
    $rootScope = _$rootScope_;
    $log = _$log_;
    ImageReaderService = _ImageReaderService_;

    _FileReader = window.FileReader;
    _Image = window.Image;

    window.FileReader = sinon.stub().returns({
      readAsDataURL: sinon.stub().returns(mockDataUrlResult),
      addEventListener: sinon.stub()
        .withArgs('load').callsArgWith(1, { target: { result: mockDataUrlResult } })
        .withArgs('error').callsArgWith(1, mockError)
    });

    window.Image = sinon.stub().returns({
      addEventListener: sinon.stub().withArgs('load').callsArgWith(1, {})
    });

  }));

  afterEach(function () {
    window.FileReader = _FileReader;
    window.Image = _Image;
  });

  it('should exist', function () {
    expect(ImageReaderService).to.exist();
  });

  describe('readImage method', function () {

    it('should expose readImage method', function () {
      expect(ImageReaderService.readImage).to.exist();
    });

    describe('Error Handling', function () {

      it('should $log.error a message when a file object is not provided', function () {
        var spy = sinon.spy($log, 'error');

        ImageReaderService.readImage();

        expect(spy).to.have.been.calledWith('Image Reader Service Error: File object required.');
      });

      it('should reject the promise when a file object is not provided', function () {

        ImageReaderService.readImage()
          .catch(function (error) {
            expect(error.message).to.equal('Image Reader Service Error: File object required.');
          });

        $rootScope.$apply();
      });

    });

    describe('Success Handling', function () {

      it('should return a promise', function () {
        expect(ImageReaderService.readImage().then).to.exist();
        expect(ImageReaderService.readImage().catch).to.exist();
      });

      it('should utilize FileReader.readAsDataURL to retrieve the file details', function () {
        var spy = new FileReader().readAsDataURL;

        ImageReaderService.readImage(mockFileUpload);

        expect(spy).to.have.been.calledWith(mockFileUpload);
      });

      it('should return an image object when successfully reading a file', function () {

        ImageReaderService
          .readImage(mockFileUpload)
          .then(function (image) {
            expect(image.name).to.equal(mockImageData.name);
          });

        $rootScope.$apply();

      });

      it('should return an error object when an error occurs when reading a file', function () {

        ImageReaderService
          .readImage(mockFileUpload)
          .catch(function (error) {
            expect(error).to.deep.equal(mockError);
          });

        $rootScope.$apply();

      });

    });

  });

});