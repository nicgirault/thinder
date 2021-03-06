angular.module('starter.controllers', []).controller('AppCtrl', ($scope, $ionicModal, $timeout) ->
  # With the new view caching in Ionic, Controllers are only called
  # when they are recreated or on app start, instead of every page change.
  # To listen for when this page is active (for example, to refresh data),
  # listen for the $ionicView.enter event:
  #$scope.$on('$ionicView.enter', function(e) {
  #});
  # Form data for the login modal
  $scope.loginData = {}
  # Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', scope: $scope).then (modal) ->
    $scope.modal = modal
    return
  # Triggered in the login modal to close it

  $scope.closeLogin = ->
    $scope.modal.hide()
    return

  # Open the login modal

  $scope.login = ->
    $scope.modal.show()
    return

  # Perform the login action when the user submits the login form

  $scope.doLogin = ->
    console.log 'Doing login', $scope.loginData
    # Simulate a login delay. Remove this and replace with your login
    # code if using a login system
    $timeout (->
      $scope.closeLogin()
      return
    ), 1000
    return

  return
)
