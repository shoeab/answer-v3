angular.module('MyApp', ['appRoutes', 'mainCtrl', 'authService', 'userCtrl', 'userService',
'storyService', 'storyCtrl','questionService', 'questionCtrl', 'categoryService', 'categoryCtrl', 'reverseDirective' ])

.config(function($httpProvider){

	$httpProvider.interceptors.push('AuthInterceptor');

})