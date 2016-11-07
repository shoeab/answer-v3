angular.module('questionService', [])

.factory('Question', function($http){

	var questionFactory = {};

	questionFactory.create = function(questionData){

		return $http.post('/api/question-add', questionData);
	}

	questionFactory.allQuestion = function() {

		return $http.get('/api');
	}

	questionFactory.all_questions = function() {

		return $http.get('/api/questions/50/1000');
	}

	questionFactory.getQuestion = function(id) {
		//console.log(id)

		return $http.get('/api/question/'+id);
	}

	return questionFactory;

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