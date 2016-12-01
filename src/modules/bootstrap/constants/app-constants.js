'use strict';

(function (angular) {

  angular
    .module('ne')
    //use native window object, so we won't drag here injection as this injected first
    // @TODO is it necessary to have a closure here using raw JS?
    .constant('CONFIG', (function (location) {

      // @TODO Can we find a better way to return the current host string?
      var hostName = function getLocation() {
        var url    = location.href;
        var prefix = 'local.';
        var defws  = 'dev-snapshot.';
        var match  = url.match(/^(https?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?)(\/[^?#]*)(\?[^#]*|)(#.*|)$/);
        var host   = match && match[3] || url;

        return host.indexOf(prefix) === 0 ? defws + host.substring(prefix.length) : host;
      };

      // @TODO Restructure the return object to group together like values (endpoints, config, etc.)
      return {
        ANALYTICS: {
          PROFILE: {
            ACTION: {
              SELECTTAB: 'tabselect'
            },
            CATEGORY: {
              COMMENTS: 'profilecomments',
              FOLLOWERS: 'profilefollowers',
              FOLLOWING: 'profilefollowing'
            }
          }
        },
        FOLLOW_ENDPOINT: '/api/follow/user',
        PROFILE_ENDPOINT: '/api/v2users/user',
        PROFILE_SEARCH_ENDPOINT: '/api/profilesearch',
        PROFILE_BULK_ENDPOINT: '/api/users/list',
        PROFILE_FIRST_NAME_MAXLENGTH: 50,
        PROFILE_INSTITUTION_MAXLENGTH: 110,
        PROFILE_LAST_NAME_MAXLENGTH: 50,
        PROFILE_LOCATION_MAXLENGTH: 110,
        PROFILE_ROLE_MAXLENGTH: 50,
        PROFILE_SUMMARY_MAXLENGTH: 1500,
        PROFILE_PLACEHOLDER_IMAGE: '/modules/components/user-profile-image/img/profile-placeholder.jpg',
        PROFILE_FOLLOW_MAX_PER_PAGE: 10,
        PROFILE_SEARCH_MAX_PER_PAGE: 10,

        SEARCH_MAX_PER_PAGE: 10,

        MAIN_PAGE: '/#/home',

        WS_NOTIFY_URL: 'ws.'  + hostName(),

        SEARCH_ENDPOINT: '/api/search/v3',
        DETAILS_ENDPOINT: '/api/search/v3',
        AGGREGATE_ENDPOINT: '/api/search/v3',

        SEARCH_TYPE_ENDPOINT: {
          ALL: '/search',
          ARTICLES: '/wos/search',
          PATENTS: '/patents/search',
          PEOPLE: '/people/search',
          POSTS: '/posts/search'
        },

        DETAILS_TYPE_ENDPOINT: {
          ALL: '/details',
          ARTICLES: '/wos/details',
          PATENTS: '/patents/details',
          PEOPLE: '/people/details',
          POSTS: '/posts/details'
        },

        SUGGESTION_ENDPOINT: '/api/suggest',

        ACCOUNT_SETTINGS_ENDPOINT: '/api/iamuser',
        ACCOUNT_RESETPASSWORD_ENDPOINT: '/api/account/resetpassword',
        ACCOUNT_REGISTER_ENDPOINT: '/api/account/register/',
        ACCOUNT_AUTO_REGISTER_ENDPOINT: '/api/account/auth/register',
        ACCOUNT_SKIP_LINKING: '/api/account/auth/settings',
        NOTIFY_LISTS_ENDPOINT: '/api/notify/list',
        DECORATOR_NOTIFICATIONS_ENDPOINT: '/api/decorator/graphqlrq',
        NOTIFY_LAST_SEEN: '/api/notify/lastseen',

        RECOMMENDATION_ENDPOINT: '/api/recommend',
        RESEND_ACTIVATION_ENDPOINT: '/api/account/email/',

        CITATION_WATCHLIST_ENDPOINT: '/api/lists/watchlist',
        MANAGE_CONTAINER_ENDPOINT: '/api/containers',

        ZUUL_CLIENT_ENDPOINT: '/api/auth-clientinfo',
        ZUUL_CLIENT_ENDPOINT_NOAUTH: '/api/clientinfo',

        COMMENTS_ENDPOINT: '/api/comments',
        COMMENTS_FOR_USER_ENDPOINT: '/api/comments/user',
        COMMENTS_COUNT_ENDPOINT: '/api/comments/count',
        COMMENTS_STATISTICS_ENDPOINT: '/api/statistics',
        COMMENTS_EDIT_ENDPOINT:'/api/comments/comment',
        APPRECIATE_NEW_ENDPOINT:'/api/appreciation/appreciate',
        COMMENTS_FLAG_ENDPOINT:'/api/report',

        AUTHORIZE_URL: '/api/authorize',
        AUTHORIZE_MERGE_URL: '/api/authorize/merge',
        BACK_URL: '/#/login/AUTHTOKEN',
        BRIDGE_URL: '/api/bridge/en/tokenbytruid',
        CHECK_EXISTING_EMAIL_URL: '/api/account/user/',
        RESET_PASSWORD_URL: '/api/auth/resetpassword',

        //google analytics accounts
        //TODO make as constants in analytics module
        ACCOUNT_LOCAL: 'UA-58833090-3',  //local.1p.thomsonreuters.com
        ACCOUNT_DEV_SNAPSHOT: 'UA-58833090-4', //dev-snapshot.1p.thomsonreuters.com
        ACCOUNT_DEV_STABLE: 'UA-58833090-5', //dev-stable.1p.thomsonreuters.com
        ACCOUNT_TEST_AUTO: 'UA-58833090-6', //test-auto.1p.thomsonreuters.com
        ACCOUNT_TEST_PERF: 'UA-58833090-7', //test-perf.1p.thomsonreuters.com
        ACCOUNT_PROD: 'UA-58833090-8', //projectne.thomsonreuters.com

        USER_TOKEN: 'token',

        NOTIFY_CLIENT: 'NOTIFY_SOCKET',
        NOTIFY_TYPE_EVENTS: 'NOTIFY',

        NOTIFY_FIELDS: ['fullrecord.summary.title', 'authorsrefine', 'fullrecord.source'],
        WOS_TITLE_FIELD: 'fullrecord.summary.title',
        WOS_AUTHOR_FIELD: 'authorsrefine',
        WOS_SOURCE_FIELD: 'fullrecord.source',

        USER_NO_PORTRET: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0OCIgaGVpZ2h0PSI0OCIgdmlld0JveD0iMCAwIDQ4IDQ4Ij48cGF0aCBkPSJNMjQgMTEuOGMyLjMyIDAgNC4yIDEuODggNC4yIDQuMnMtMS44OCA0LjItNC4yIDQuMi00LjItMS44OC00LjItNC4yIDEuODgtNC4yIDQuMi00LjJtMCAxOGM1Ljk1IDAgMTIuMiAyLjkxIDEyLjIgNC4ydjIuMkgxMS44VjM0YzAtMS4yOSA2LjI1LTQuMiAxMi4yLTQuMk0yNCA4Yy00LjQyIDAtOCAzLjU4LTggOCAwIDQuNDEgMy41OCA4IDggOHM4LTMuNTkgOC04YzAtNC40Mi0zLjU4LTgtOC04em0wIDE4Yy01LjMzIDAtMTYgMi42Ny0xNiA4djZoMzJ2LTZjMC01LjMzLTEwLjY3LTgtMTYtOHoiLz48L3N2Zz4=',

        MIN_USER_IMAGE_SIZE: 1024,
        MAX_USER_IMAGE_SIZE: 1024 * 256,
        MIN_USER_IMAGE_WIDTH: 50,
        MAX_USER_IMAGE_WIDTH: 1024,
        MIN_USER_IMAGE_HEIGHT: 50,
        MAX_USER_IMAGE_HEIGHT: 1024,

        CEL: {
          url: 'http://gateway.webofknowledge.com/gateway/Gateway.cgi?GWVersion=2&SrcApp=PNS&SrcAuth=NEON&DestLinkType=FullRecord&DestApp=WOS_CPL',
          srcUrl:'&SrcURL=',
          srcDesc: '&SrcDesc=Back+to+Project+Neon',
          UT:'&UT='
        },

        EXTERNAL_PATENTS: {
          url: 'http://www.thomsoninnovation.com/tip-innovation/recordView.do?idType=uid/recordid&category=PAT&hideHighlightPanel=true&recordKeys=',
          databaseIds: '&databaseIds=PATENT&TYPE=RECORDVIEW&datasource=T3&fromExternalLink=true&locale=en_US'

        }

      };
    })(window.location));

})(angular);
