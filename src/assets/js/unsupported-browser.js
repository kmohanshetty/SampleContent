'use strict';

window.ne = window.ne || {};
window.ne.components = window.ne.components || {};

window.ne.components.unsupportedBrowserTester = (function () {
  var ubMessageElement = null;
  var ubDismissElement = null;

  var init = function(messageElement, dismissElement) {
    // the element (e.g. a div) that contains the message (warning that the browser is unsupported)
    ubMessageElement = messageElement || null;
    // the element (e.g. a button) used to dismiss the warning message
    ubDismissElement = dismissElement || null;

    if (ubDismissElement !== null && ubMessageElement !== null) {
      ubDismissElement.onclick = function () {
        ubMessageElement.style.display = 'none';
      };
      // init was successful
      return true;
    } else {
      // did not receive elements
      return false;
    }
  };

  var getInternetExplorerVersion = function(navigatorAppName, navigatorUserAgent) {
    // NOTE: this simple method is good for detecting IE7-10. IE11 and Edge do not use
    // 'Microsoft Internet Explorer' as appName nor do they include 'MSIE' in userAgent

    // null indicates a non-IE browser
    var ieVersion = null;
    var matches = /MSIE ([0-9]+[\.0-9]*)/.exec(navigatorUserAgent);

    if (navigatorAppName === 'Microsoft Internet Explorer' && matches !== null) {
      ieVersion = parseFloat(matches[1]);
    }

    return ieVersion;
  };

  var hasUnsupportedBrowser = function (navigatorAppName, navigatorUserAgent) {
    var browserIsUnsupported = false;
    var browserVersion = null;

    // Check if IE browser
    browserVersion = getInternetExplorerVersion(navigatorAppName, navigatorUserAgent);
    if (browserVersion !== null) {
      // browser is IE
      if (browserVersion < 10.0) {
        browserIsUnsupported = true;
      }
    }

    if (browserIsUnsupported === true && ubMessageElement !== null) {
      // show the unsupported browser warning
      ubMessageElement.style.display = 'block';
    }

    return browserIsUnsupported;
  };


  return {
    init: init,
    getInternetExplorerVersion: getInternetExplorerVersion,
    hasUnsupportedBrowser: hasUnsupportedBrowser
  };

})();
