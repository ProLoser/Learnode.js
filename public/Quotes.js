function Quotes($xhr) {
	var scope = this;
	scope.newRecord = {};
	scope.quotes = [];
	$xhr('GET', 'users.json', function(code, response){
		scope.quotes = response;
	});
	scope.delete = function(index) {
		scope.quotes.splice(index,1);
	};
	scope.save = function(newRecord) {
		scope.quotes.push(newRecord);
		scope.newRecord = {};
	};
}