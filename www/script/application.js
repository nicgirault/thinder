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
  }).state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
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
  $urlRouterProvider.otherwise('/app/playlists');
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
}]).controller('PlaylistsCtrl', ["$scope", function($scope) {
  $scope.playlists = [
    {
      title: 'Reggae',
      id: 1
    }, {
      title: 'Chill',
      id: 2
    }, {
      title: 'Dubstep',
      id: 3
    }, {
      title: 'Indie',
      id: 4
    }, {
      title: 'Rap',
      id: 5
    }, {
      title: 'Cowbell',
      id: 6
    }
  ];
}]).controller('PlaylistCtrl', ["$scope", "$stateParams", function($scope, $stateParams) {}]);



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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJhcHBsaWNhdGlvbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJhbmd1bGFyLm1vZHVsZSgnc3RhcnRlcicsIFsnaW9uaWMnLCAnc3RhcnRlci5jb250cm9sbGVycycsICdpb25pYy5jb250cmliLnVpLnRpbmRlckNhcmRzJywgJ3RoaW5kZXIudGVtcGxhdGUnLCAndGhpbmRlci5ob21lJ10pLnJ1bihbXCIkaW9uaWNQbGF0Zm9ybVwiLCBmdW5jdGlvbigkaW9uaWNQbGF0Zm9ybSkge1xuICBjb25zb2xlLmxvZygkaW9uaWNQbGF0Zm9ybSk7XG4gICRpb25pY1BsYXRmb3JtLnJlYWR5KGZ1bmN0aW9uKCkge1xuICAgIGlmICh3aW5kb3cuY29yZG92YSAmJiB3aW5kb3cuY29yZG92YS5wbHVnaW5zLktleWJvYXJkKSB7XG4gICAgICBjb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQuaGlkZUtleWJvYXJkQWNjZXNzb3J5QmFyKHRydWUpO1xuICAgICAgY29yZG92YS5wbHVnaW5zLktleWJvYXJkLmRpc2FibGVTY3JvbGwodHJ1ZSk7XG4gICAgfVxuICAgIGlmICh3aW5kb3cuU3RhdHVzQmFyKSB7XG4gICAgICBTdGF0dXNCYXIuc3R5bGVEZWZhdWx0KCk7XG4gICAgfVxuICB9KTtcbn1dKS5jb25maWcoW1wiJHN0YXRlUHJvdmlkZXJcIiwgXCIkdXJsUm91dGVyUHJvdmlkZXJcIiwgZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlcikge1xuICAkc3RhdGVQcm92aWRlci5zdGF0ZSgnYXBwJywge1xuICAgIHVybDogJy9hcHAnLFxuICAgIGFic3RyYWN0OiB0cnVlLFxuICAgIHRlbXBsYXRlVXJsOiAndGVtcGxhdGVzL21lbnUuaHRtbCcsXG4gICAgY29udHJvbGxlcjogJ0FwcEN0cmwnXG4gIH0pLnN0YXRlKCdhcHAuc2VhcmNoJywge1xuICAgIHVybDogJy9zZWFyY2gnLFxuICAgIHZpZXdzOiB7XG4gICAgICAnbWVudUNvbnRlbnQnOiB7XG4gICAgICAgIHRlbXBsYXRlVXJsOiAndGVtcGxhdGVzL3NlYXJjaC5odG1sJ1xuICAgICAgfVxuICAgIH1cbiAgfSkuc3RhdGUoJ2FwcC5icm93c2UnLCB7XG4gICAgdXJsOiAnL2Jyb3dzZScsXG4gICAgdmlld3M6IHtcbiAgICAgICdtZW51Q29udGVudCc6IHtcbiAgICAgICAgdGVtcGxhdGVVcmw6ICd0ZW1wbGF0ZXMvYnJvd3NlLmh0bWwnXG4gICAgICB9XG4gICAgfVxuICB9KS5zdGF0ZSgnYXBwLnBsYXlsaXN0cycsIHtcbiAgICB1cmw6ICcvcGxheWxpc3RzJyxcbiAgICB2aWV3czoge1xuICAgICAgJ21lbnVDb250ZW50Jzoge1xuICAgICAgICB0ZW1wbGF0ZVVybDogJ3RlbXBsYXRlcy9wbGF5bGlzdHMuaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdQbGF5bGlzdHNDdHJsJ1xuICAgICAgfVxuICAgIH1cbiAgfSkuc3RhdGUoJ2FwcC5zaW5nbGUnLCB7XG4gICAgdXJsOiAnL3BsYXlsaXN0cy86cGxheWxpc3RJZCcsXG4gICAgdmlld3M6IHtcbiAgICAgICdtZW51Q29udGVudCc6IHtcbiAgICAgICAgdGVtcGxhdGVVcmw6ICd0ZW1wbGF0ZXMvcGxheWxpc3QuaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdQbGF5bGlzdEN0cmwnXG4gICAgICB9XG4gICAgfVxuICB9KTtcbiAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnL2FwcC9wbGF5bGlzdHMnKTtcbn1dKTtcblxuYW5ndWxhci5tb2R1bGUoJ3RoaW5kZXIuaG9tZScsIFsnaW9uaWMnLCAnaW9uaWMuY29udHJpYi51aS50aW5kZXJDYXJkcyddKTtcblxuYW5ndWxhci5tb2R1bGUoJ3N0YXJ0ZXInLCBbJ2lvbmljJywgJ3N0YXJ0ZXIuY29udHJvbGxlcnMnLCAnaW9uaWMuY29udHJpYi51aS50aW5kZXJDYXJkcycsICd0aGluZGVyLnRlbXBsYXRlJywgJ3RoaW5kZXIuaG9tZSddKS5ydW4oW1wiJGlvbmljUGxhdGZvcm1cIiwgZnVuY3Rpb24oJGlvbmljUGxhdGZvcm0pIHtcbiAgJGlvbmljUGxhdGZvcm0ucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgaWYgKHdpbmRvdy5jb3Jkb3ZhICYmIHdpbmRvdy5jb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQpIHtcbiAgICAgIGNvcmRvdmEucGx1Z2lucy5LZXlib2FyZC5oaWRlS2V5Ym9hcmRBY2Nlc3NvcnlCYXIodHJ1ZSk7XG4gICAgICBjb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQuZGlzYWJsZVNjcm9sbCh0cnVlKTtcbiAgICB9XG4gICAgaWYgKHdpbmRvdy5TdGF0dXNCYXIpIHtcbiAgICAgIFN0YXR1c0Jhci5zdHlsZURlZmF1bHQoKTtcbiAgICB9XG4gIH0pO1xufV0pLmNvbmZpZyhbXCIkc3RhdGVQcm92aWRlclwiLCBcIiR1cmxSb3V0ZXJQcm92aWRlclwiLCBmdW5jdGlvbigkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKSB7XG4gICRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdhcHAnLCB7XG4gICAgdXJsOiAnL2FwcCcsXG4gICAgYWJzdHJhY3Q6IHRydWUsXG4gICAgdGVtcGxhdGVVcmw6ICd0ZW1wbGF0ZXMvbWVudS5odG1sJyxcbiAgICBjb250cm9sbGVyOiAnQXBwQ3RybCdcbiAgfSkuc3RhdGUoJ2FwcC5zZWFyY2gnLCB7XG4gICAgdXJsOiAnL3NlYXJjaCcsXG4gICAgdmlld3M6IHtcbiAgICAgICdtZW51Q29udGVudCc6IHtcbiAgICAgICAgdGVtcGxhdGVVcmw6ICd0ZW1wbGF0ZXMvc2VhcmNoLmh0bWwnXG4gICAgICB9XG4gICAgfVxuICB9KS5zdGF0ZSgnYXBwLnBsYXlsaXN0cycsIHtcbiAgICB1cmw6ICcvcGxheWxpc3RzJyxcbiAgICB2aWV3czoge1xuICAgICAgJ21lbnVDb250ZW50Jzoge1xuICAgICAgICB0ZW1wbGF0ZVVybDogJ3RlbXBsYXRlcy9wbGF5bGlzdHMuaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdQbGF5bGlzdHNDdHJsJ1xuICAgICAgfVxuICAgIH1cbiAgfSkuc3RhdGUoJ2FwcC5zaW5nbGUnLCB7XG4gICAgdXJsOiAnL3BsYXlsaXN0cy86cGxheWxpc3RJZCcsXG4gICAgdmlld3M6IHtcbiAgICAgICdtZW51Q29udGVudCc6IHtcbiAgICAgICAgdGVtcGxhdGVVcmw6ICd0ZW1wbGF0ZXMvcGxheWxpc3QuaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdQbGF5bGlzdEN0cmwnXG4gICAgICB9XG4gICAgfVxuICB9KS5zdGF0ZSgnYXBwLnJhdGUnLCB7XG4gICAgdXJsOiAnL2Jyb3dzZScsXG4gICAgdmlld3M6IHtcbiAgICAgICdtZW51Q29udGVudCc6IHtcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdob21lL3N0YXRlcy9yYXRlL3ZpZXcuaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdDYXJkc0N0cmwnXG4gICAgICB9XG4gICAgfSxcbiAgICByZXNvbHZlOiB7XG4gICAgICB0ZWNobm9sb2dpZXM6IFtcIiRodHRwXCIsIGZ1bmN0aW9uKCRodHRwKSB7XG4gICAgICAgIHJldHVybiAkaHR0cCh7XG4gICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICB1cmw6ICdodHRwczovL2FwaS5wYXJzZS5jb20vMS9jbGFzc2VzL1RlY2hub2xvZ3knLFxuICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICdYLVBhcnNlLUFwcGxpY2F0aW9uLUlkJzogJ09odFZYcWUzbWREZ1VpNXVnUEs3dXlRTGVrWkNlWm5YUVFhZ2I4ZFknLFxuICAgICAgICAgICAgJ1gtUGFyc2UtUkVTVC1BUEktS0VZJzogJ0cyMHVOYUcwbEF2Ulo4NFBMZERCOWduVG10RkNURWZ3enRpeFBtd3AnXG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1dXG4gICAgfVxuICB9KTtcbiAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnL2FwcC9wbGF5bGlzdHMnKTtcbn1dKTtcblxuYW5ndWxhci5tb2R1bGUoJ3N0YXJ0ZXIuY29udHJvbGxlcnMnLCBbXSkuY29udHJvbGxlcignQXBwQ3RybCcsIFtcIiRzY29wZVwiLCBcIiRpb25pY01vZGFsXCIsIFwiJHRpbWVvdXRcIiwgZnVuY3Rpb24oJHNjb3BlLCAkaW9uaWNNb2RhbCwgJHRpbWVvdXQpIHtcbiAgJHNjb3BlLmxvZ2luRGF0YSA9IHt9O1xuICAkaW9uaWNNb2RhbC5mcm9tVGVtcGxhdGVVcmwoJ3RlbXBsYXRlcy9sb2dpbi5odG1sJywge1xuICAgIHNjb3BlOiAkc2NvcGVcbiAgfSkudGhlbihmdW5jdGlvbihtb2RhbCkge1xuICAgICRzY29wZS5tb2RhbCA9IG1vZGFsO1xuICB9KTtcbiAgJHNjb3BlLmNsb3NlTG9naW4gPSBmdW5jdGlvbigpIHtcbiAgICAkc2NvcGUubW9kYWwuaGlkZSgpO1xuICB9O1xuICAkc2NvcGUubG9naW4gPSBmdW5jdGlvbigpIHtcbiAgICAkc2NvcGUubW9kYWwuc2hvdygpO1xuICB9O1xuICAkc2NvcGUuZG9Mb2dpbiA9IGZ1bmN0aW9uKCkge1xuICAgIGNvbnNvbGUubG9nKCdEb2luZyBsb2dpbicsICRzY29wZS5sb2dpbkRhdGEpO1xuICAgICR0aW1lb3V0KChmdW5jdGlvbigpIHtcbiAgICAgICRzY29wZS5jbG9zZUxvZ2luKCk7XG4gICAgfSksIDEwMDApO1xuICB9O1xufV0pLmNvbnRyb2xsZXIoJ1BsYXlsaXN0c0N0cmwnLCBbXCIkc2NvcGVcIiwgZnVuY3Rpb24oJHNjb3BlKSB7XG4gICRzY29wZS5wbGF5bGlzdHMgPSBbXG4gICAge1xuICAgICAgdGl0bGU6ICdSZWdnYWUnLFxuICAgICAgaWQ6IDFcbiAgICB9LCB7XG4gICAgICB0aXRsZTogJ0NoaWxsJyxcbiAgICAgIGlkOiAyXG4gICAgfSwge1xuICAgICAgdGl0bGU6ICdEdWJzdGVwJyxcbiAgICAgIGlkOiAzXG4gICAgfSwge1xuICAgICAgdGl0bGU6ICdJbmRpZScsXG4gICAgICBpZDogNFxuICAgIH0sIHtcbiAgICAgIHRpdGxlOiAnUmFwJyxcbiAgICAgIGlkOiA1XG4gICAgfSwge1xuICAgICAgdGl0bGU6ICdDb3diZWxsJyxcbiAgICAgIGlkOiA2XG4gICAgfVxuICBdO1xufV0pLmNvbnRyb2xsZXIoJ1BsYXlsaXN0Q3RybCcsIFtcIiRzY29wZVwiLCBcIiRzdGF0ZVBhcmFtc1wiLCBmdW5jdGlvbigkc2NvcGUsICRzdGF0ZVBhcmFtcykge31dKTtcblxuXG5cbmFuZ3VsYXIubW9kdWxlKCd0aGluZGVyLmhvbWUnKS5kaXJlY3RpdmUoJ25vU2Nyb2xsJywgW1wiJGRvY3VtZW50XCIsIGZ1bmN0aW9uKCRkb2N1bWVudCkge1xuICByZXR1cm4ge1xuICAgIHJlc3RyaWN0OiAnQScsXG4gICAgbGluazogZnVuY3Rpb24oJHNjb3BlLCAkZWxlbWVudCwgJGF0dHIpIHtcbiAgICAgIHJldHVybiAkZG9jdW1lbnQub24oJ3RvdWNobW92ZScsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgcmV0dXJuIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbn1dKTtcblxuYW5ndWxhci5tb2R1bGUoJ3RoaW5kZXIuaG9tZScpLmNvbnRyb2xsZXIoJ0NhcmRzQ3RybCcsIFtcIiRzY29wZVwiLCBcIlREQ2FyZERlbGVnYXRlXCIsIFwidGVjaG5vbG9naWVzXCIsIGZ1bmN0aW9uKCRzY29wZSwgVERDYXJkRGVsZWdhdGUsIHRlY2hub2xvZ2llcykge1xuICB0ZWNobm9sb2dpZXMgPSB0ZWNobm9sb2dpZXMuZGF0YS5yZXN1bHRzO1xuICAkc2NvcGUudGVjaG5vbG9naWVzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwodGVjaG5vbG9naWVzLCAwKTtcbiAgJHNjb3BlLmNhcmREZXN0cm95ZWQgPSBmdW5jdGlvbihpbmRleCkge1xuICAgICRzY29wZS50ZWNobm9sb2dpZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgfTtcbiAgJHNjb3BlLmFkZENhcmQgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgbmV3Q2FyZDtcbiAgICBuZXdDYXJkID0gdGVjaG5vbG9naWVzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRlY2hub2xvZ2llcy5sZW5ndGgpXTtcbiAgICBuZXdDYXJkLmlkID0gTWF0aC5yYW5kb20oKTtcbiAgICAkc2NvcGUudGVjaG5vbG9naWVzLnB1c2goYW5ndWxhci5leHRlbmQoe30sIG5ld0NhcmQpKTtcbiAgfTtcbn1dKS5jb250cm9sbGVyKCdDYXJkQ3RybCcsIFtcIiRzY29wZVwiLCBcIlREQ2FyZERlbGVnYXRlXCIsIGZ1bmN0aW9uKCRzY29wZSwgVERDYXJkRGVsZWdhdGUpIHtcbiAgJHNjb3BlLmNhcmRTd2lwZWRMZWZ0ID0gZnVuY3Rpb24oaW5kZXgpIHtcbiAgICBjb25zb2xlLmxvZygnTEVGVCBTV0lQRScpO1xuICAgICRzY29wZS5hZGRDYXJkKCk7XG4gIH07XG4gICRzY29wZS5jYXJkU3dpcGVkUmlnaHQgPSBmdW5jdGlvbihpbmRleCkge1xuICAgIGNvbnNvbGUubG9nKCdSSUdIVCBTV0lQRScpO1xuICAgICRzY29wZS5hZGRDYXJkKCk7XG4gIH07XG59XSk7XG4iXSwiZmlsZSI6ImFwcGxpY2F0aW9uLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=