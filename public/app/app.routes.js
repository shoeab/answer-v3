angular.module('appRoutes', ['ngRoute'])

.config(function($routeProvider, $locationProvider){

	$routeProvider

		.when('/', {

			templateUrl: 'app/views/pages/home.html',
			controller: 'MainController',
			controllerAs: 'main'

		})

		.when('/login', {

			templateUrl: 'app/views/pages/login.html'
		})

		.when('/signup', {

			templateUrl: 'app/views/pages/signup.html'
		})

		.when('/stories', {

			templateUrl: 'app/views/pages/stories.html',
			controller: 'AllStoryController',
			controllerAs: 'story',
			resolve: {
				stories: function(Story){
					return Story.all_stories();
				}
			}
			

		})

		.when('/category', {

			templateUrl: 'app/views/pages/category.html',
			controller: 'CategoryController',
			controllerAs: 'category'
		})

		.when('/question', {

			templateUrl: 'app/views/pages/question.html',
			controller: 'QuestionController',
			controllerAs: 'question'
		})

		.when('/show-question/:id', {

			templateUrl: 'app/views/pages/show-question.html',
			controller: 'QuestionShowController',
			controllerAs: 'questionShow'
		})

	$locationProvider.html5Mode(true);
})