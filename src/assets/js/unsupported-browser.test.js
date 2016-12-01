'use strict';

describe('Unsupported Browser', function () {
  // NOTE: these tests use navigator.userAgent as seen on an OSX10.10.5 Mac and modern.ie Windows VMs

  var appName = '';
  var userAgent = '';

  afterEach(function () {
    appName = '';
    userAgent = '';
  });

  describe('init()', function () {
    it('should return false if called without specifying DOM elements', function () {
      expect(window.ne.components.unsupportedBrowserTester.init()).to.be.false();
    });
  });

  describe('Internet Explorer version', function () {
    it('should be 9', function () {
      appName = 'Microsoft Internet Explorer';
      userAgent = 'MSIE 9.0';
      expect(window.ne.components.unsupportedBrowserTester.getInternetExplorerVersion(appName, userAgent)).to.equal(9);
    });

    it('should be 9.9', function () {
      appName = 'Microsoft Internet Explorer';
      userAgent = 'MSIE 9.9';
      expect(window.ne.components.unsupportedBrowserTester.getInternetExplorerVersion(appName, userAgent)).to.equal(9.9);
    });

    it('should be null', function () {
      appName = 'Microsoft Internet Explorer';
      userAgent = 'MSIE is a good browser';
      expect(window.ne.components.unsupportedBrowserTester.getInternetExplorerVersion(appName, userAgent)).to.be.null();
    });

    it('should be 7', function () {
      appName = 'Microsoft Internet Explorer';
      userAgent = 'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0; SLCC1; .NET CLR 2.0.50727; .NET CLR 3.0.30729; .NET CLR 3.5.30729)';
      expect(window.ne.components.unsupportedBrowserTester.getInternetExplorerVersion(appName, userAgent)).to.equal(7);
    });

    it('should be 8', function () {
      appName = 'Microsoft Internet Explorer';
      userAgent = 'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/4.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C)';
      expect(window.ne.components.unsupportedBrowserTester.getInternetExplorerVersion(appName, userAgent)).to.equal(8);
    });

    it('should be 9', function () {
      appName = 'Microsoft Internet Explorer';
      userAgent = 'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C)';
      expect(window.ne.components.unsupportedBrowserTester.getInternetExplorerVersion(appName, userAgent)).to.equal(9);
    });

    it('should be 10', function () {
      appName = 'Microsoft Internet Explorer';
      userAgent = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/6.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C)';
      expect(window.ne.components.unsupportedBrowserTester.getInternetExplorerVersion(appName, userAgent)).to.equal(10);
    });

    it('should not be 11', function () {
      // NOTE: IE11 does not claim to be IE11
      appName = 'Netscape';
      userAgent = 'Mozilla/5.0 (Windows NT 6.1; Trident/7.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; rv:11.0) like Gecko';
      expect(window.ne.components.unsupportedBrowserTester.getInternetExplorerVersion(appName, userAgent)).to.be.null();
    });
  });

  describe('Unsupported browsers', function () {
    it('should include IE 7', function () {
      appName = 'Microsoft Internet Explorer';
      userAgent = 'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0; SLCC1; .NET CLR 2.0.50727; .NET CLR 3.0.30729; .NET CLR 3.5.30729)';
      expect(window.ne.components.unsupportedBrowserTester.hasUnsupportedBrowser(appName, userAgent)).to.be.true();
    });

    it('should include IE 8', function () {
      appName = 'Microsoft Internet Explorer';
      userAgent = 'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/4.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C)';
      expect(window.ne.components.unsupportedBrowserTester.hasUnsupportedBrowser(appName, userAgent)).to.be.true();
    });

    it('should include IE 9', function () {
      appName = 'Microsoft Internet Explorer';
      userAgent = 'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C)';
      expect(window.ne.components.unsupportedBrowserTester.hasUnsupportedBrowser(appName, userAgent)).to.be.true();
    });
  });

  describe('Supported browsers', function () {
    it('should include Chrome', function () {
      appName = 'Netscape';
      userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.86 Safari/537.36';
      expect(window.ne.components.unsupportedBrowserTester.hasUnsupportedBrowser(appName, userAgent)).to.be.false();
    });

    it('should include Firefox', function () {
      appName = 'Netscape';
      userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.10; rv:44.0) Gecko/20100101 Firefox/44.0';
      expect(window.ne.components.unsupportedBrowserTester.hasUnsupportedBrowser(appName, userAgent)).to.be.false();
    });

    it('should include IE 10', function () {
      appName = 'Microsoft Internet Explorer';
      userAgent = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/6.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C)';
      expect(window.ne.components.unsupportedBrowserTester.hasUnsupportedBrowser(appName, userAgent)).to.be.false();
    });
    it('should include IE 11', function () {
      appName = 'Netscape';
      userAgent = 'Mozilla/5.0 (Windows NT 6.1; Trident/7.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; rv:11.0) like Gecko';
      expect(window.ne.components.unsupportedBrowserTester.hasUnsupportedBrowser(appName, userAgent)).to.be.false();
    });
    it('should include Microsoft Edge', function () {
      appName = 'Netscape';
      userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.10240';
      expect(window.ne.components.unsupportedBrowserTester.hasUnsupportedBrowser(appName, userAgent)).to.be.false();
    });

    it('should include Safari', function () {
      appName = 'Netscape';
      userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/601.4.4 (KHTML, like Gecko) Version/9.0.3 Safari/601.4.4';
      expect(window.ne.components.unsupportedBrowserTester.hasUnsupportedBrowser(appName, userAgent)).to.be.false();
    });
  });
});
