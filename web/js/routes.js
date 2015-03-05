(function() {
    'use strict';
    angular
        .module('app')
        .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise("/");

            $stateProvider
                .state('body', {
                    templateUrl: "views/body.html",
                    controller: function($scope, $rootScope, $state) {
                        $rootScope.state = $state;
                    }
                })
                .state('body.main', {
                    url: "/",
                    views: {
                        "main": {
                            templateUrl: "views/article/main.html",
                            controller: 'articleController',
                            controllerAs: 'articleCtrl',
                            resolve: {
                                articles: ['articleService', function(articleService) {
                                    return articleService.all();
                                }],
                                article: function() { return {}; },
                                comments: function() { return {}; }
                            }
                        }
                    }
                })
                .state('body.article', {
                    url: "/article/:id",
                    views: {
                        "main": {
                            templateUrl: "views/article/view.html",
                            controller: 'articleController',
                            controllerAs: 'articleCtrl',
                            resolve: {
                                articles: function() { return {}; },
                                article: ['$stateParams','articleService', function($stateParams, articleService) {
                                    return articleService.get($stateParams.id);
                                }],
                                comments: ['$stateParams', 'commentService', 'articleService', function($stateParams,commentService, articleService) {
                                    return commentService.all(articleService.model, $stateParams.id);
                                }]
                            }
                        }
                    }
                })
                .state('body.articleCreate', {
                    url: "/articles/create",
                    views: {
                        "main": {
                            templateUrl: "views/article/create.html",
                            controller: 'articleController',
                            controllerAs: 'articleCtrl',
                            resolve: {
                                articles: function () {
                                    return {};
                                },
                                article: function () {
                                    return {};
                                }
                            }
                        }
                    }
                })
        }]);
})();