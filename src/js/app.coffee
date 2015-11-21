# Ionic Starter App
# angular.module is a global place for creating, registering and retrieving Angular modules
# 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
# the 2nd parameter is an array of 'requires'
# 'starter.controllers' is found in controllers.js
angular.module('starter', [
  'ionic'
  'starter.controllers'
  'ionic.contrib.ui.tinderCards'

  'thinder.template'
  'thinder.home'
]).run(($ionicPlatform) ->
  $ionicPlatform.ready ->
    # Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    # for form inputs)
    if window.cordova and window.cordova.plugins.Keyboard
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar true
      cordova.plugins.Keyboard.disableScroll true
    if window.StatusBar
      # org.apache.cordova.statusbar required
      StatusBar.styleDefault()
    return
  return
).config ($stateProvider, $urlRouterProvider) ->
  $stateProvider.state('app',
    url: '/app'
    abstract: true
    templateUrl: 'templates/menu.html'
    controller: 'AppCtrl'
  ).state 'app.rate',
    url: '/browse'
    views: 'menuContent':
      templateUrl: 'home/states/rate/view.html'
      controller: 'CardsCtrl'
    resolve:
      technologies: ($http) ->
        $http({
          method: 'GET',
          url: 'https://api.parse.com/1/classes/Technology'
          headers:
            'X-Parse-Application-Id': 'OhtVXqe3mdDgUi5ugPK7uyQLekZCeZnXQQagb8dY'
            'X-Parse-REST-API-KEY': 'G20uNaG0lAvRZ84PLdDB9gnTmtFCTEfwztixPmwp'
        })
  # if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise '/app/playlists'
  return
