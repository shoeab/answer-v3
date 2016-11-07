angular.module('questionCtrl', ['questionService'])

.controller('QuestionController', function(Question, socketio, $sce, Category, $http){

	var vm = this;
	//Question.all_questions();

	console.log(Category.getCategory())

	Question.all_questions()
		.success(function(data){

			vm.questions = data;
			
		});

	Category.getCategory()
			.success(function(data){
				vm.categories = data;
				console.log(vm.categories)
			});

		

	vm.createQuestion = function(){

		console.log(vm.questionData.categories);
		vm.questionData.categories = toObject(vm.questionData.categories);
		console.log(vm.questionData.categories);


		vm.message = '';
		Question.create(vm.questionData)
			.success(function(data){

				vm.questionData = ''; /// clear up the form

				vm.message = data.message;
				console.log(vm.message);
				vm.questions.push(data);
			});

	};

	function toObject(arr) {
	  var rv = new Array();
	  for (var i = 0; i < arr.length; ++i)
	    rv.push(JSON.parse(arr[i]));
	  return rv;
	}

	
	socketio.on('question', function(data){
		vm.questions.push(data);
	})
		


})

.controller('AllQuestionController', function(questions, socketio){

	var vm = this;

	vm.questions = questions.data;
	
	socketio.on('question', function(data){
		vm.questions.push(data);
	})

	/*Question.all_questions()
		.success(function(data){

			vm.questions = data;

		});*/

	
})

.controller('QuestionShowController', function(Question, Answer, socketio, $sce, Category, $http, $scope, $routeParams, $location){

	var vm = this;

	var urlParam = $location.path().split('/');
	console.log(urlParam[2])

	Question.getQuestion(urlParam[2])
		.success(function(data){

			
			$scope.question = data;
			console.log(data)
		});


	vm.addAnswer = function(){

		console.log(vm.answerData);
		

		vm.message = '';
		Answer.create(vm.answerData)
			.success(function(data){

				vm.questionData = ''; /// clear up the form

				vm.message = data.message;
				console.log(vm.message);
				vm.questions.push(data);
			});

	};


})