angular.module('categoryCtrl', ['categoryService'])

	.controller('CategoryController', function(Category, socketio){

		var vm = this;

		
		Category.getCategory()
			.success(function(data){
				vm.categories = data;
			});

		vm.createCategory = function(){

			Category.createCategory(vm.categoryData)
				.success(function(data){

					vm.categoryData = '';

					vm.message = data.message;

					vm.categories.push(data);
				});

		};

		socketio.on('category', function(data){
		vm.categories.push(data);
	})

	})