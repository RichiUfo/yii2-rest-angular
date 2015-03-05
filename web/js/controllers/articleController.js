(function() {
	'use strict';
	angular.module('app')
		.controller('articleController', articleController);

	articleController.$inject = ['$state', '$rootScope', 'articleService', 'commentService', 'articles', 'article', 'comments'];
	function articleController($state, $rootScope, articleService, commentService, articles, article, comments) {
		var vm = this;
		vm.articles = articles.data;
		vm.article = article.data;
		vm.arrParams = $state.params;
		vm.comments = comments.data;
		vm.comment = {};
		vm.errors = [];

		vm.createArticle = createArticle;
		vm.addComment = addComment;

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

		function addComment(comment){
			comment.type = articleService.model;
			comment.type_id = vm.arrParams.id;
			commentService.create(comment)
				.then(function(comment) {
					vm.comments.push(comment.data);
					vm.comment = {};
				});
		}
	}
})();