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