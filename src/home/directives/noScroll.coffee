angular.module 'thinder.home'
.directive 'noScroll', ($document) ->
  restrict: 'A'
  link: ($scope, $element, $attr) ->
    $document.on 'touchmove', (e) ->
      e.preventDefault()
