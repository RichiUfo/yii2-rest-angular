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