(function() {
  'use strict';

  app.directive('hamburgerToggle', function() {
    console.log('hamburger');
    return {
      restrict: 'E',
      replace: true,
      scope: {
        state: '='
      },
      templateUrl: 'partials/hamburger-toggle.html',
      link: function($scope, $element, $attrs) {

        $scope.toggleState = function() {
          return $scope.state = !$scope.state;
        };
      }
    };
  });

})();