var User = require('../models/user');
var Story = require('../models/story');
var Question = require('../models/question');
var Answer = require('../models/answer');
var Category = require('../models/category');
var config = require('../../config');

var secretKey = config.secretKey;

var jsonwebtoken = require('jsonwebtoken');

function createToken(user) {

	var token = jsonwebtoken.sign({
		id: user.id,
		name: user.name,
		username: user.username
	}, secretKey, {
		expiresIn: 1440
	});


	return token;

}

module.exports = function(app, express, io) {

	

	var api = express.Router();

	api.get('/all_stories', function(req, res) {
		
		Story.find({}, function(err, stories) {
			if(err) {
				res.send(err);
				return;
			}
			res.json(stories);
		});
	});


/*Category Start*/	
api.route('/category')

		.post(function(req, res) {

			var category = new Category({

				title: req.body.title,
				description: req.body.description

			});

			category.save(function(err, newCategory) {
				if(err) {
					res.send(err);
					return
				}
				
				res.json({message: "New Category Created!"});
			});
		})

		.get(function(req, res){
			Category.find({}, function(err, categories){

				if (err) {
					res.send(err);
					return;
				}
				return res.json(categories)
			});
		})

/*Question Start*/
	api.route('/question-add')
		.post(function(req, res) {

			var question = new Question({

				title: req.body.title,
				description: req.body.description,
				summary: req.body.summary,
				slug: req.body.slug,
				status: req.body.status,
				image: req.body.image,
				categories:   req.body.categories,
				tags:   req.body.tags,
				author: req.body.author,
				isDeleted: req.body.isDeleted

			});

			question.save(function(err, newStory){
				if(err){
					res.send(err);
					return
				}
				//io.emit('story', newStory);
				res.json({message: "New Question Created!"})
			});
		})

	api.route('/question-update/:id')
		.put(function(req, res) {
			Question.findById(req.params.id, function(err, question) {
        
				question.title = req.body.title;
				question.description = req.body.description;
				question.summary = req.body.summary;
				question.slug = req.body.slug;
				question.status = req.body.status;
				question.image = req.body.image;
				question.categories = req.body.categories;
				question.tags = req.body.tags;
				question.author = req.body.author;
				question.isDeleted = req.body.isDeleted;


				question.save(function(err, question){
					if(err){
						res.send(err);
						return
					}
					//io.emit('story', newStory);
					res.json({message: "Question Updated!"})
				});
			});
		})

	api.get('/questions/:limit/:skip', function(req, res) {
		if(req.params.skip==undefined)
	      var skip = 0;
	    else
	      var skip = parseInt(req.params.skip);

	    if(req.params.limit==undefined || isNaN(req.params.limit) || req.params.limit==0)
	       var limit = 10;
	    else
	      var limit = parseInt(req.params.limit);

		Question.find({ status: 'active' }, function(err, questions) {
			if(err) {
				res.send(err);
				return;
			}
			res.json(questions);
		}).skip(skip).limit(limit).sort({createdAt: -1});
	});

	api.get('/question/:id', function(req, res) {
		//req.params.id;
		
			Question.findById(req.params.id, function(err, question) {
				if(err) {
					res.send(err);
					return;
				}
				res.json(question);
			});
		
	});

/*Question End*/

/*Answer Start*/
api.get('/answer/:id', function(req, res) {
		
		Answer.findById(req.params.id, function(err, answer) {
			if(err) {
				res.send(err);
				return;
			}
			res.json(answer);
		});
	});
/*Answer End*/

	api.route('/stories')
		.get(function(req, res){
				Story.find({}, function(err, stories){

					if (err) {
						res.send(err);
						return;
					}
					res.json(stories)
				});
			});

	api.post('/signup', function(req, res) {

		var user = new User({
			name: req.body.name,
			username: req.body.username,
			password: req.body.password
		});
		var token = createToken(user);
		user.save(function(err) {
			if(err) {
				res.send(err);
				return;
			}

			res.json({ 
				success: true,
				message: 'User has been created!',
				token: token
			});
		});
	});


	api.get('/users', function(req, res) {

		User.find({}, function(err, users) {
			if(err) {
				res.send(err);
				return;
			}

			res.json(users);

		});
	});

	api.post('/login', function(req, res) {

		User.findOne({ 
			username: req.body.username
		}).select('name username password').exec(function(err, user) {

			if(err) throw err;

			if(!user) {

				res.send({ message: "User doenst exist"});
			} else if(user){ 

				var validPassword = user.comparePassword(req.body.password);

				if(!validPassword) {
					res.send({ message: "Invalid Password"});
				} else {

					///// token
					var token = createToken(user);

					res.json({
						success: true,
						message: "Successfuly login!",
						token: token
					});
				}
			}
		});
	});

	api.use(function(req, res, next) {


		console.log("Somebody just came to our app!");

		var token = req.body.token || req.param('token') || req.headers['x-access-token'];

		// check if token exist
		if(token) {

			jsonwebtoken.verify(token, secretKey, function(err, decoded) {

				if(err) {
					res.status(403).send({ success: false, message: "Failed to authenticate user"});

				} else {

					//
					req.decoded = decoded;
					next();
				}
			});
		} else {
			res.status(403).send({ success: false, message: "No Token Provided"});
		}

	});

	

	// Destination B // provide a legitimate token

	/* Question */
	api.route('/question')
		.post(function(req, res) {

			var question = new Question({

				title: req.body.title,
				description: req.body.description,
				summary: req.body.summary,
				slug: req.body.slug,
				status: req.body.status,
				image: req.body.image,
				categories:   req.body.categories,
				tags:   req.body.tags,
				author: req.body.author,
				isDeleted: req.body.isDeleted

			});

			question.save(function(err, newStory){
				if(err){
					res.send(err);
					return
				}
				//io.emit('story', newStory);
				res.json({message: "New Question Created!"})
			});
		})

	/* Stories */

	api.route('/')

		.post(function(req, res) {

			var story = new Story({

				creator: req.decoded.id,
				title: req.body.title,
				content: req.body.content

			});

			story.save(function(err, newStory){
				if(err){
					res.send(err);
					return
				}
				io.emit('story', newStory);
				res.json({message: "New Story Created!"})
			});
		})


		.get(function(req, res){
			Story.find({ creator: req.decoded.id }, function(err, stories){

				if (err) {
					res.send(err);
					return;
				}
				return res.json(stories)
			});
		})

		/* Categories start */

		api.route('/category')

		.post(function(req, res) {

			var category = new Category({

				title: req.body.title,
				description: req.body.description

			});

			category.save(function(err, newCategory) {
				if(err) {
					res.send(err);
					return
				}
				
				res.json({message: "New Category Created!"});
			});
		})

		.get(function(req, res){
			Category.find({}, function(err, categories){

				if (err) {
					res.send(err);
					return;
				}
				return res.json(categories)
			});
		})

		


	/* Categories end */


	api.get('/me', function(req, res) {
		res.send(req.decoded);
	});


	return api;


}