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