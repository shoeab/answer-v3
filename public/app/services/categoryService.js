angular.module('categoryService', [])

.factory('Category', function($http){

	var categoryFactory = {};

	categoryFactory.createCategory = function(categoryData){

		return $http.post('/api/category', categoryData);
	}

	categoryFactory.getCategory = function(categoryData){

		return $http.get('/api/category');
	}

	return categoryFactory;

})


.factory('socketio', function($rootScope){

	var socket = io.connect();
	return {

		on:function(eventName, callback){
			socket.on(eventName, function(){
				var args = arguments;
				$rootScope.$apply(function(){
					callback.apply(socket, args);
				});
			});
		},
	

		emit: function(eventName, data, callback){
			socket.emit(eventName, data, function(){
				var args = arguments;
				$rootScope.$apply(function() {
					if(callback){
						callback.apply(socket, args);
					}
				});
			});
		}

	};

});