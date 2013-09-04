exports.definition = {
	config: {
		columns: {
			"image": "text",
		    "content": "text",
		    "author": "text",
		    "avatar": "text",
		    "create_at": "text"
		},
		adapter: {
			type: "sql",
			collection_name: "feed"
		}
	},		
	extendModel: function(Model) {		
		_.extend(Model.prototype, {
			// extended functions and properties go here
		});
		
		return Model;
	},
	extendCollection: function(Collection) {		
		_.extend(Collection.prototype, {
			// extended functions and properties go here
		});
		
		return Collection;
	}
}

