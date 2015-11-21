angular.module 'thinder.home'
.controller('CardsCtrl', ($scope, TDCardDelegate, technologies) ->
  technologies = technologies.data.results
  $scope.technologies = Array::slice.call(technologies, 0)

  $scope.cardDestroyed = (index) ->
    $scope.technologies.splice index, 1
    return

  $scope.addCard = ->
    newCard = technologies[Math.floor(Math.random() * technologies.length)]
    newCard.id = Math.random()
    $scope.technologies.push angular.extend({}, newCard)
    return

  return
).controller 'CardCtrl', ($scope, TDCardDelegate) ->

  $scope.cardSwipedLeft = (index) ->
    console.log 'LEFT SWIPE'
    $scope.addCard()
    return

  $scope.cardSwipedRight = (index) ->
    console.log 'RIGHT SWIPE'
    $scope.addCard()
    return

  return
