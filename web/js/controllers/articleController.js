(function() {
	'use strict';
	angular.module('app')
		.controller('articleController', articleController);

	articleController.$inject = ['$state', '$rootScope', 'articleService', 'articles', 'article'];
	function articleController($state, $rootScope, articleService, articles, article) {
		var vm = this;
		vm.articles = articles.data;
		vm.article = article.data;
		vm.params = $state.params;
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
	}
})();