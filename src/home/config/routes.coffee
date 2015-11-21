# angular.module 'thinder.home'
# .config ($stateProvider, $urlRouterProvider) ->
#   $stateProvider.state 'app.rate',
#     url: '/browse'
#     views: 'menuContent':
#       templateUrl: 'home/states/rate/view.html'
#     controller: 'CardsCtrl'
#     resolve:
#       technologies: ($http) ->
#         $http {
#           method: 'GET',
#           url: 'https://api.parse.com/1/classes/Technology'
#           headers:
#             'X-Parse-Application-Id': 'OhtVXqe3mdDgUi5ugPK7uyQLekZCeZnXQQagb8dY'
#             'X-Parse-REST-API-KEY': 'G20uNaG0lAvRZ84PLdDB9gnTmtFCTEfwztixPmwp'
#         }
