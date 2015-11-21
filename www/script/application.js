angular.module('starter', ['ionic', 'starter.controllers', 'ionic.contrib.ui.tinderCards', 'thinder.template', 'thinder.home']).run(["$ionicPlatform", function($ionicPlatform) {
  console.log($ionicPlatform);
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
}]).config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
  $stateProvider.state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  }).state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  }).state('app.browse', {
    url: '/browse',
    views: {
      'menuContent': {
        templateUrl: 'templates/browse.html'
      }
    }
  }).state('app.playlists', {
    url: '/playlists',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlists.html',
        controller: 'PlaylistsCtrl'
      }
    }
  }).state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  });
  $urlRouterProvider.otherwise('/app/playlists');
}]);

angular.module('thinder.home', ['ionic', 'ionic.contrib.ui.tinderCards']);

angular.module('starter', ['ionic', 'starter.controllers', 'ionic.contrib.ui.tinderCards', 'thinder.template', 'thinder.home']).run(["$ionicPlatform", function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
}]).config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
  $stateProvider.state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  }).state('app.rate', {
    url: '/browse',
    views: {
      'menuContent': {
        templateUrl: 'home/states/rate/view.html',
        controller: 'CardsCtrl'
      }
    },
    resolve: {
      technologies: ["$http", function($http) {
        return $http({
          method: 'GET',
          url: 'https://api.parse.com/1/classes/Technology',
          headers: {
            'X-Parse-Application-Id': 'OhtVXqe3mdDgUi5ugPK7uyQLekZCeZnXQQagb8dY',
            'X-Parse-REST-API-KEY': 'G20uNaG0lAvRZ84PLdDB9gnTmtFCTEfwztixPmwp'
          }
        });
      }]
    }
  });
  $urlRouterProvider.otherwise('/app/browse');
}]);

angular.module('starter.controllers', []).controller('AppCtrl', ["$scope", "$ionicModal", "$timeout", function($scope, $ionicModal, $timeout) {
  $scope.loginData = {};
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };
  $scope.login = function() {
    $scope.modal.show();
  };
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);
    $timeout((function() {
      $scope.closeLogin();
    }), 1000);
  };
}]);



angular.module('thinder.home').directive('noScroll', ["$document", function($document) {
  return {
    restrict: 'A',
    link: function($scope, $element, $attr) {
      return $document.on('touchmove', function(e) {
        return e.preventDefault();
      });
    }
  };
}]);

angular.module('thinder.home').controller('CardsCtrl', ["$scope", "TDCardDelegate", "technologies", function($scope, TDCardDelegate, technologies) {
  technologies = technologies.data.results;
  $scope.technologies = Array.prototype.slice.call(technologies, 0);
  $scope.cardDestroyed = function(index) {
    $scope.technologies.splice(index, 1);
  };
  $scope.addCard = function() {
    var newCard;
    newCard = technologies[Math.floor(Math.random() * technologies.length)];
    newCard.id = Math.random();
    $scope.technologies.push(angular.extend({}, newCard));
  };
}]).controller('CardCtrl', ["$scope", "TDCardDelegate", function($scope, TDCardDelegate) {
  $scope.cardSwipedLeft = function(index) {
    console.log('LEFT SWIPE');
    $scope.addCard();
  };
  $scope.cardSwipedRight = function(index) {
    console.log('RIGHT SWIPE');
    $scope.addCard();
  };
}]);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJhcHBsaWNhdGlvbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJhbmd1bGFyLm1vZHVsZSgnc3RhcnRlcicsIFsnaW9uaWMnLCAnc3RhcnRlci5jb250cm9sbGVycycsICdpb25pYy5jb250cmliLnVpLnRpbmRlckNhcmRzJywgJ3RoaW5kZXIudGVtcGxhdGUnLCAndGhpbmRlci5ob21lJ10pLnJ1bihbXCIkaW9uaWNQbGF0Zm9ybVwiLCBmdW5jdGlvbigkaW9uaWNQbGF0Zm9ybSkge1xuICBjb25zb2xlLmxvZygkaW9uaWNQbGF0Zm9ybSk7XG4gICRpb25pY1BsYXRmb3JtLnJlYWR5KGZ1bmN0aW9uKCkge1xuICAgIGlmICh3aW5kb3cuY29yZG92YSAmJiB3aW5kb3cuY29yZG92YS5wbHVnaW5zLktleWJvYXJkKSB7XG4gICAgICBjb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQuaGlkZUtleWJvYXJkQWNjZXNzb3J5QmFyKHRydWUpO1xuICAgICAgY29yZG92YS5wbHVnaW5zLktleWJvYXJkLmRpc2FibGVTY3JvbGwodHJ1ZSk7XG4gICAgfVxuICAgIGlmICh3aW5kb3cuU3RhdHVzQmFyKSB7XG4gICAgICBTdGF0dXNCYXIuc3R5bGVEZWZhdWx0KCk7XG4gICAgfVxuICB9KTtcbn1dKS5jb25maWcoW1wiJHN0YXRlUHJvdmlkZXJcIiwgXCIkdXJsUm91dGVyUHJvdmlkZXJcIiwgZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlcikge1xuICAkc3RhdGVQcm92aWRlci5zdGF0ZSgnYXBwJywge1xuICAgIHVybDogJy9hcHAnLFxuICAgIGFic3RyYWN0OiB0cnVlLFxuICAgIHRlbXBsYXRlVXJsOiAndGVtcGxhdGVzL21lbnUuaHRtbCcsXG4gICAgY29udHJvbGxlcjogJ0FwcEN0cmwnXG4gIH0pLnN0YXRlKCdhcHAuc2VhcmNoJywge1xuICAgIHVybDogJy9zZWFyY2gnLFxuICAgIHZpZXdzOiB7XG4gICAgICAnbWVudUNvbnRlbnQnOiB7XG4gICAgICAgIHRlbXBsYXRlVXJsOiAndGVtcGxhdGVzL3NlYXJjaC5odG1sJ1xuICAgICAgfVxuICAgIH1cbiAgfSkuc3RhdGUoJ2FwcC5icm93c2UnLCB7XG4gICAgdXJsOiAnL2Jyb3dzZScsXG4gICAgdmlld3M6IHtcbiAgICAgICdtZW51Q29udGVudCc6IHtcbiAgICAgICAgdGVtcGxhdGVVcmw6ICd0ZW1wbGF0ZXMvYnJvd3NlLmh0bWwnXG4gICAgICB9XG4gICAgfVxuICB9KS5zdGF0ZSgnYXBwLnBsYXlsaXN0cycsIHtcbiAgICB1cmw6ICcvcGxheWxpc3RzJyxcbiAgICB2aWV3czoge1xuICAgICAgJ21lbnVDb250ZW50Jzoge1xuICAgICAgICB0ZW1wbGF0ZVVybDogJ3RlbXBsYXRlcy9wbGF5bGlzdHMuaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdQbGF5bGlzdHNDdHJsJ1xuICAgICAgfVxuICAgIH1cbiAgfSkuc3RhdGUoJ2FwcC5zaW5nbGUnLCB7XG4gICAgdXJsOiAnL3BsYXlsaXN0cy86cGxheWxpc3RJZCcsXG4gICAgdmlld3M6IHtcbiAgICAgICdtZW51Q29udGVudCc6IHtcbiAgICAgICAgdGVtcGxhdGVVcmw6ICd0ZW1wbGF0ZXMvcGxheWxpc3QuaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdQbGF5bGlzdEN0cmwnXG4gICAgICB9XG4gICAgfVxuICB9KTtcbiAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnL2FwcC9wbGF5bGlzdHMnKTtcbn1dKTtcblxuYW5ndWxhci5tb2R1bGUoJ3RoaW5kZXIuaG9tZScsIFsnaW9uaWMnLCAnaW9uaWMuY29udHJpYi51aS50aW5kZXJDYXJkcyddKTtcblxuYW5ndWxhci5tb2R1bGUoJ3N0YXJ0ZXInLCBbJ2lvbmljJywgJ3N0YXJ0ZXIuY29udHJvbGxlcnMnLCAnaW9uaWMuY29udHJpYi51aS50aW5kZXJDYXJkcycsICd0aGluZGVyLnRlbXBsYXRlJywgJ3RoaW5kZXIuaG9tZSddKS5ydW4oW1wiJGlvbmljUGxhdGZvcm1cIiwgZnVuY3Rpb24oJGlvbmljUGxhdGZvcm0pIHtcbiAgJGlvbmljUGxhdGZvcm0ucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgaWYgKHdpbmRvdy5jb3Jkb3ZhICYmIHdpbmRvdy5jb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQpIHtcbiAgICAgIGNvcmRvdmEucGx1Z2lucy5LZXlib2FyZC5oaWRlS2V5Ym9hcmRBY2Nlc3NvcnlCYXIodHJ1ZSk7XG4gICAgICBjb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQuZGlzYWJsZVNjcm9sbCh0cnVlKTtcbiAgICB9XG4gICAgaWYgKHdpbmRvdy5TdGF0dXNCYXIpIHtcbiAgICAgIFN0YXR1c0Jhci5zdHlsZURlZmF1bHQoKTtcbiAgICB9XG4gIH0pO1xufV0pLmNvbmZpZyhbXCIkc3RhdGVQcm92aWRlclwiLCBcIiR1cmxSb3V0ZXJQcm92aWRlclwiLCBmdW5jdGlvbigkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKSB7XG4gICRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdhcHAnLCB7XG4gICAgdXJsOiAnL2FwcCcsXG4gICAgYWJzdHJhY3Q6IHRydWUsXG4gICAgdGVtcGxhdGVVcmw6ICd0ZW1wbGF0ZXMvbWVudS5odG1sJyxcbiAgICBjb250cm9sbGVyOiAnQXBwQ3RybCdcbiAgfSkuc3RhdGUoJ2FwcC5yYXRlJywge1xuICAgIHVybDogJy9icm93c2UnLFxuICAgIHZpZXdzOiB7XG4gICAgICAnbWVudUNvbnRlbnQnOiB7XG4gICAgICAgIHRlbXBsYXRlVXJsOiAnaG9tZS9zdGF0ZXMvcmF0ZS92aWV3Lmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyOiAnQ2FyZHNDdHJsJ1xuICAgICAgfVxuICAgIH0sXG4gICAgcmVzb2x2ZToge1xuICAgICAgdGVjaG5vbG9naWVzOiBbXCIkaHR0cFwiLCBmdW5jdGlvbigkaHR0cCkge1xuICAgICAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgICAgdXJsOiAnaHR0cHM6Ly9hcGkucGFyc2UuY29tLzEvY2xhc3Nlcy9UZWNobm9sb2d5JyxcbiAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAnWC1QYXJzZS1BcHBsaWNhdGlvbi1JZCc6ICdPaHRWWHFlM21kRGdVaTV1Z1BLN3V5UUxla1pDZVpuWFFRYWdiOGRZJyxcbiAgICAgICAgICAgICdYLVBhcnNlLVJFU1QtQVBJLUtFWSc6ICdHMjB1TmFHMGxBdlJaODRQTGREQjlnblRtdEZDVEVmd3p0aXhQbXdwJ1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XVxuICAgIH1cbiAgfSk7XG4gICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy9hcHAvYnJvd3NlJyk7XG59XSk7XG5cbmFuZ3VsYXIubW9kdWxlKCdzdGFydGVyLmNvbnRyb2xsZXJzJywgW10pLmNvbnRyb2xsZXIoJ0FwcEN0cmwnLCBbXCIkc2NvcGVcIiwgXCIkaW9uaWNNb2RhbFwiLCBcIiR0aW1lb3V0XCIsIGZ1bmN0aW9uKCRzY29wZSwgJGlvbmljTW9kYWwsICR0aW1lb3V0KSB7XG4gICRzY29wZS5sb2dpbkRhdGEgPSB7fTtcbiAgJGlvbmljTW9kYWwuZnJvbVRlbXBsYXRlVXJsKCd0ZW1wbGF0ZXMvbG9naW4uaHRtbCcsIHtcbiAgICBzY29wZTogJHNjb3BlXG4gIH0pLnRoZW4oZnVuY3Rpb24obW9kYWwpIHtcbiAgICAkc2NvcGUubW9kYWwgPSBtb2RhbDtcbiAgfSk7XG4gICRzY29wZS5jbG9zZUxvZ2luID0gZnVuY3Rpb24oKSB7XG4gICAgJHNjb3BlLm1vZGFsLmhpZGUoKTtcbiAgfTtcbiAgJHNjb3BlLmxvZ2luID0gZnVuY3Rpb24oKSB7XG4gICAgJHNjb3BlLm1vZGFsLnNob3coKTtcbiAgfTtcbiAgJHNjb3BlLmRvTG9naW4gPSBmdW5jdGlvbigpIHtcbiAgICBjb25zb2xlLmxvZygnRG9pbmcgbG9naW4nLCAkc2NvcGUubG9naW5EYXRhKTtcbiAgICAkdGltZW91dCgoZnVuY3Rpb24oKSB7XG4gICAgICAkc2NvcGUuY2xvc2VMb2dpbigpO1xuICAgIH0pLCAxMDAwKTtcbiAgfTtcbn1dKTtcblxuXG5cbmFuZ3VsYXIubW9kdWxlKCd0aGluZGVyLmhvbWUnKS5kaXJlY3RpdmUoJ25vU2Nyb2xsJywgW1wiJGRvY3VtZW50XCIsIGZ1bmN0aW9uKCRkb2N1bWVudCkge1xuICByZXR1cm4ge1xuICAgIHJlc3RyaWN0OiAnQScsXG4gICAgbGluazogZnVuY3Rpb24oJHNjb3BlLCAkZWxlbWVudCwgJGF0dHIpIHtcbiAgICAgIHJldHVybiAkZG9jdW1lbnQub24oJ3RvdWNobW92ZScsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgcmV0dXJuIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbn1dKTtcblxuYW5ndWxhci5tb2R1bGUoJ3RoaW5kZXIuaG9tZScpLmNvbnRyb2xsZXIoJ0NhcmRzQ3RybCcsIFtcIiRzY29wZVwiLCBcIlREQ2FyZERlbGVnYXRlXCIsIFwidGVjaG5vbG9naWVzXCIsIGZ1bmN0aW9uKCRzY29wZSwgVERDYXJkRGVsZWdhdGUsIHRlY2hub2xvZ2llcykge1xuICB0ZWNobm9sb2dpZXMgPSB0ZWNobm9sb2dpZXMuZGF0YS5yZXN1bHRzO1xuICAkc2NvcGUudGVjaG5vbG9naWVzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwodGVjaG5vbG9naWVzLCAwKTtcbiAgJHNjb3BlLmNhcmREZXN0cm95ZWQgPSBmdW5jdGlvbihpbmRleCkge1xuICAgICRzY29wZS50ZWNobm9sb2dpZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgfTtcbiAgJHNjb3BlLmFkZENhcmQgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgbmV3Q2FyZDtcbiAgICBuZXdDYXJkID0gdGVjaG5vbG9naWVzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRlY2hub2xvZ2llcy5sZW5ndGgpXTtcbiAgICBuZXdDYXJkLmlkID0gTWF0aC5yYW5kb20oKTtcbiAgICAkc2NvcGUudGVjaG5vbG9naWVzLnB1c2goYW5ndWxhci5leHRlbmQoe30sIG5ld0NhcmQpKTtcbiAgfTtcbn1dKS5jb250cm9sbGVyKCdDYXJkQ3RybCcsIFtcIiRzY29wZVwiLCBcIlREQ2FyZERlbGVnYXRlXCIsIGZ1bmN0aW9uKCRzY29wZSwgVERDYXJkRGVsZWdhdGUpIHtcbiAgJHNjb3BlLmNhcmRTd2lwZWRMZWZ0ID0gZnVuY3Rpb24oaW5kZXgpIHtcbiAgICBjb25zb2xlLmxvZygnTEVGVCBTV0lQRScpO1xuICAgICRzY29wZS5hZGRDYXJkKCk7XG4gIH07XG4gICRzY29wZS5jYXJkU3dpcGVkUmlnaHQgPSBmdW5jdGlvbihpbmRleCkge1xuICAgIGNvbnNvbGUubG9nKCdSSUdIVCBTV0lQRScpO1xuICAgICRzY29wZS5hZGRDYXJkKCk7XG4gIH07XG59XSk7XG4iXSwiZmlsZSI6ImFwcGxpY2F0aW9uLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=