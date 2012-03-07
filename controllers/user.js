var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/learn');

var Quote = new Schema();

Quote.add({
    bash_id     : { type: Number, index: { unique: true } }
  , quote      : { type: String, required: true }
  , rank      : Number
});

/**
 * Define model.
 */

var quote = mongoose.model('Quote', Quote);

module.exports = {
  
  // /users
  
  index: function(req, res, next){
		quote.find({}, {}, {limit:10}, function(err, docs){
	    res.render(docs);
		});
  },

  // /users/:id

  show: function(req, res, next){
		quote.findOne({bash_id: req.params.id}, function(err, docs){
	    res.render(docs);
		});
  },

	create: function(req, res, next){
		var newQuote = new quote(req.body);
		newQuote.save(function(err, docs){
			res.render(201);
		});
	},
  
  // /users/:id/edit
  
  edit: function(req, res, next){
    get(req.params.id, function(err, user){
      if (err) return next(err);
      res.render(user);
    });
  },
  
  // PUT /users/:id
  
  update: function(req, res, next){
    var id = req.params.id;
    get(id, function(err){
      if (err) return next(err);
      var user = users[id] = req.body.user;
      user.id = id;
      req.flash('info', 'Successfully updated _' + user.name + '_.');
      res.redirect('back');
    });
  }
};