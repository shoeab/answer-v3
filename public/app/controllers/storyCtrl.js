angular.module('storyCtrl', ['storyService'])

.controller('StoryController', function(Story, socketio){

	var vm = this;


	Story.allStory()
		.success(function(data){

			vm.stories = data;

		});

	vm.createStory = function(){

		vm.message = '';
		Story.create(vm.storyData)
			.success(function(data){

				vm.storyData = ''; /// clear up the form

				vm.message = data.message;

				vm.stories.push(data);
			});

	};

	
	socketio.on('story', function(data){
		vm.stories.push(data);
	})
		


})

.controller('AllStoryController', function(stories, socketio){

	var vm = this;

	vm.stories = stories.data;
	
	socketio.on('story', function(data){
		vm.stories.push(data);
	})

	/*Story.all_stories()
		.success(function(data){

			vm.stories = data;

		});*/

	
})