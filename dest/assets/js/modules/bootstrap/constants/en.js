'use strict';

// @TODO Could potentially be part of a internationalization module.

(function (angular) {

  // https://github.com/substack/deep-freeze/blob/master/index.js
  function deepFreeze(object) {
    Object.freeze(object);

    Object.getOwnPropertyNames(object).forEach(function (prop) {
      if (object.hasOwnProperty(prop) &&
        object[prop] !== null &&
        (typeof object[prop] === 'object' || typeof object[prop] === 'function') &&
        !Object.isFrozen(object[prop])) {
        deepFreeze(object[prop]);
      }
    });


    return object;
  }

  angular
    .module('ne')
    .constant('ENGLISH', deepFreeze({
      authoring: {
        comment: {
          create: {
            error: {
              profanity: '<p>Words we do not allow in comments have been masked.</p>',
              formatting: '<p>Unsupported formatting and tags are not allowed in comments.</p>',
              both: '<p>Masked words, unsupported formatting and tags are not allowed in comments.</p>',
              server: '<p>We were unable to process your comment. Please try again.</p>',
              bot: '<p>We are still processing your previous comment. Please try again.</p>',
              flag: '<p>Got server error while trying to flag this comment.</p>'
            }
          },
          flagReasons: [
            {type: 'UP', id: 'RR001', order: 1, check: false, key: 'Offensive'},
            {type: 'UP', id: 'RR002', order: 3, check: false, key: 'Personal attack'},
            {type: 'UP', id: 'RR003', order: 5, check: false, key: 'Off topic'},
            {type: 'UP', id: 'RR004', order: 2, check: false, key: 'Spam'},
            {type: 'UP', id: 'RR005', order: 4, check: false, key: 'Other'},
            {type: 'DOWN', id: 'RR101', order: 1, check: false, key: 'Changed my mind'},
            {type: 'DOWN', id: 'RR102', order: 3, check: false, key: 'Flagged by mistake'},
            {type: 'DOWN', id: 'RR103', order: 2, check: false, key: 'Comment edited/no longer applies'},
            {type: 'DOWN', id: 'RR104', order: 4, check: false, key: 'Other'}
          ]
        },
        posts: {
          flagReasons: [
            {type: 'UP', id: 'RRP001', order: 1, check: false, key: 'Offensive'},
            {type: 'UP', id: 'RRP002', order: 3, check: false, key: 'Personal attack'},
            {type: 'UP', id: 'RRP004', order: 2, check: false, key: 'Spam'},
            {type: 'UP', id: 'RRP005', order: 4, check: false, key: 'Other'},
            {type: 'DOWN', id: 'RRP101', order: 1, check: false, key: 'Changed my mind'},
            {type: 'DOWN', id: 'RRP102', order: 3, check: false, key: 'Flagged by mistake'},
            {type: 'DOWN', id: 'RRP103', order: 2, check: false, key: 'Post edited/no longer applies'},
            {type: 'DOWN', id: 'RRP104', order: 4, check: false, key: 'Other'}
          ]
        }
      },
      post: {
        error: {
          profanity: '<p>Words we do not allow in posts have been masked.</p>',
          formatting: '<p>Unsupported formatting and tags are not allowed in posts.</p>',
          both: '<p>Masked words, unsupported formatting and tags are not allowed in posts.</p>',
          server: '<p>We were unable to process your post. Please try again.</p>',
          bot: '<p>We are still processing your previous post. Please try again.</p>',
          flag: '<p>Got server error while trying to flag this post.</p>',
          minTitle: '<p>Titles must have at least two characters. Please edit your title.</p>',
          maxTitle: '<p>You\'ve reached the maximum length for titles.</p>',
          minContent: '<p>Posts must have at least two characters. Please edit your post.</p>',
          maxContent: '<p>You\'ve reached the maximum length for posts.</p>'
        }
      },
      profile: {
        follow: {
          follow: 'Follow this person',
          following: 'Following',
          load: {
            more: '{{n}} more'
          },
          unfollow: 'Unfollow this person',
          unfollowing: ''
        },
        placeholder: {
          interest: 'Add a Topic',
          firstName: 'First Name',
          lastName: 'Last Name',
          location: 'Country',
          primaryInstitution: 'Institution',
          role: 'Title or Role',
          summary: 'Add a summary'
        },
        search: {
          results: {
            load: {
              more: '{{n}} more'
            }
          }
        },
        text: {
          hcr: 'HIGHLY CITED'
        }
      },
      search: {
        results: {
          load: {
            more: '{{n}} more'
          }
        }
      }
    }));
})
(angular);
