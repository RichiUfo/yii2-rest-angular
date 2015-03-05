(function() {
    'use strict';
    angular.module('app')
        .controller('headerController', headerController);

    headerController.$inject = ['$rootScope'];
    function headerController($rootScope) {
        $rootScope.defaultTitle = 'Блог';
        $rootScope.rndBG = getRandomInt(1,4);
    }
})();