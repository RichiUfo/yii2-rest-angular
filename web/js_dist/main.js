(function() {
    'use strict';
    angular.module('app', ['ui.router', 'angular.filter']);
})();
(function() {
	'use strict';
	angular.module('app')
		.controller('articleController', articleController);

	articleController.$inject = ['$state', '$rootScope', '$filter', '$location', '$anchorScroll', 'articleService', 'commentService', 'articles', 'article', 'comments'];
	function articleController($state, $rootScope, $filter, $location, $anchorScroll, articleService, commentService, articles, article, comments) {
		var vm = this;
		vm.articles = articles.data;
		vm.article = article.data;
		vm.arrParams = $state.params;
		vm.comments = comments.data;
		vm.comment = {};
		vm.errors = [];
		vm.toggleTrees = [];

		vm.createArticle = createArticle;
		vm.addComment = addComment;
		vm.gotoComment = gotoComment;
		vm.changeRate = changeRate;
		vm.toggleTree = toggleTree;

		$rootScope.rndBG = getRandomInt(1,4);
		if(vm.article)
		{
			$rootScope.title = vm.article.title;
			$rootScope.createdArticle = vm.article.created;
		} else
		{
			$rootScope.title = '';
			$rootScope.createdArticle = '';
		}

		function createArticle(){
			articleService.create(vm.article)
				.then(function() {
					$state.go('body.main');
				})
				.catch(function(err) {
					angular.forEach(err.data, function(value){
						vm.errors[value.field] = value.message;
					});
				});
		}

		function addComment(comment, parentId){
			comment.type = articleService.model;
			comment.type_id = vm.arrParams.id;
			comment.parent_id = parentId || 0;
			commentService.create(comment)
				.then(function(comment) {
					vm.comments.push(comment.data);
					vm.comments = $filter('orderBy')(vm.comments, 'hash');
					vm.comment = {};
					vm.errors = [];
					gotoComment('comment_' + comment.data.id);
				}).catch(function(err) {
					angular.forEach(err.data, function(value){
						vm.errors[value.field] = value.message;
					});
				});
		}

		function gotoComment(id) {
			if(!id) return false;
			$location.hash(id);
			$anchorScroll();
		}

		function changeRate(comment, type){
			commentService.rate(comment.id, type)
				.then(function() {
					type ? ++comment.rate: --comment.rate;
				});
		}

		function toggleTree(comment){
			var mask = comment.hash.slice(0,2),
				key = vm.toggleTrees.indexOf(mask);
			if(key > -1)
			{
				vm.toggleTrees.splice(key, 1);
			} else
			{
				vm.toggleTrees.push(mask);
			}
			angular.forEach(vm.comments, function(value, key){
				vm.comments[key]['showComment'] = !(vm.toggleTrees.indexOf(value.hash.slice(0,2)) > -1 && value.level > 1);
			});
		}
	}
})();
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
(function() {
    'use strict';
    angular
        .module('app')
        .filter("timeago", timeago);

    function timeago () {
        return function (time, local, raw) {
            if (!time) return "никогда";

            if (!local) {
                (local = Date.now())
            }

            if (angular.isDate(time)) {
                time = time.getTime();
            } else if (typeof time === "string") {
                time = new Date(time).getTime();
            }

            if (angular.isDate(local)) {
                local = local.getTime();
            }else if (typeof local === "string") {
                local = new Date(local).getTime();
            }

            if (typeof time !== 'number' || typeof local !== 'number') {
                return;
            }

            var
                offset = Math.abs((local - time) / 1000),
                span = [],
                MINUTE = 60,
                HOUR = 3600,
                DAY = 86400,
                WEEK = 604800,
                MONTH = 2629744,
                YEAR = 31556926,
                DECADE = 315569260;

            if (offset <= MINUTE)              span = [ '', raw ? '' : 'только что' ];
            else if (offset < (MINUTE * 60))   span = [ Math.round(Math.abs(offset / MINUTE)), plural_str(Math.round(Math.abs(offset / MINUTE)), 'минута', 'минуты', 'минут') ];
            else if (offset < (HOUR * 24))     span = [ Math.round(Math.abs(offset / HOUR)), plural_str(Math.round(Math.abs(offset / HOUR)), 'час', 'часа', 'часов') ];
            else if (offset < (DAY * 7))       span = [ Math.round(Math.abs(offset / DAY)), plural_str(Math.round(Math.abs(offset / DAY)), 'день', 'дня', 'дней') ];
            else if (offset < (WEEK * 52))     span = [ Math.round(Math.abs(offset / WEEK)), plural_str(Math.round(Math.abs(offset / WEEK)), 'неделя', 'недели', 'недель') ];
            else if (offset < (YEAR * 10))     span = [ Math.round(Math.abs(offset / YEAR)), plural_str(Math.round(Math.abs(offset / YEAR)), 'год', 'года', 'лет') ];
            else                               span = [ '', 'давным давно в далекой далекой галактике' ];

            span = span.join(' ');

            if (raw === true) {
                return span;
            }
            return (time <= local) ? span + ' назад' : '' + span;
        }
    }

})();

function getRandomInt(intMin, intMax) {
    return Math.floor(Math.random() * (intMax - intMin + 1)) + intMin;
}

function plural_str(intCount, str1, str2, str5) {
    intCount = Math.abs(intCount);
    intCount %= 100;
    if (intCount >= 5 && intCount <= 20) {
        return str5;
    }
    intCount %= 10;
    if (intCount == 1) {
        return str1;
    }
    if (intCount >= 2 && intCount <= 4) {
        return str2;
    }
    return str5;
}
(function() {
    'use strict';
    angular
        .module('app')
        .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise("/");

            $stateProvider
                .state('body', {
                    templateUrl: "views/body.html",
                    controller: ["$scope", "$rootScope", "$state", function($scope, $rootScope, $state) {
                        $rootScope.state = $state;
                    }]
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
(function() {
	'use strict';
	angular
		.module('app')
		.factory('articleService', ['$http', function($http){
			return {
				model: "article",

				all: function() {
					return $http.get('api/articles');
				},
				create: function(article) {
					return $http.post('api/articles', article);
				},
				get: function(id) {
					return $http.get('api/articles/' + id);
				},
				update: function(id) {
					return $http.put('api/articles/' + id);
				},
				deleteItem: function(id) {
					return $http.delete('api/articles/' + id);
				}
			}
		}])
})();
(function() {
	'use strict';
	angular
		.module('app')
		.factory('commentService', ['$http', function($http){
			return {
				all: function(type, type_id) {
					return $http.get('api/comments/' + type + '/' +type_id);
				},
				create: function(comment) {
					return $http.post('api/comments', comment);
				},
				get: function(id) {
					return $http.get('api/comments/' + id);
				},
				update: function(id) {
					return $http.put('api/comments/' + id);
				},
				deleteItem: function(id) {
					return $http.delete('api/comments/' + id);
				}
				,
				rate: function(id, type) {
					return $http.post('api/comments/' + id + '/rate/' + type);
				}
			}
		}])
})();