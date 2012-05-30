var App = {
	Models: {},
	Collections: {},
    Views: {},
    Routers: {},
    postsPerPage: 5,
    totalPages: 0,
    currentPage: 1,
    init: function() {
    	new App.Routers.Posts();
        Backbone.history.start();
    },

};

App.Routers.Posts = Backbone.Router.extend({
	routes: {
		"": "index",
	},

	getAllPosts: function() {
		var allposts = new App.Collections.List;
		$.ajax({
			url: '/atom.xml', 
			datatype: 'xml',
			contentType: 'text/xml',
			async: false,
			success: function(data) {
				list = new App.Collections.List;
				var $xml = $(data);
				$xml.find("entry").each(function() {
		    		var $this = $(this);
		    		post = new App.Models.Post;
		        	post = {
		                title: $this.find("title").text(),
		                link: $this.find("link").attr('href'),
		                content: $this.find("content").text(),
		                updated: $this.find("updated").text(),
		                category: $this.find("category").text()
		            };
		            list.add(post);
				});
				allposts = list; // return list as a List collection
			},
			error: function(data, errmsg) {
				alert(errmsg);
			},
		});
		return allposts;
	},

	initialize: function() {
		this.collection = this.getAllPosts();
	},

	index: function() {
		var index = this.collection;
		var indexView = new App.Views.Navigation({ collection: index, currentPage: 1});
	},
});

App.Models.Post = Backbone.Model.extend({});

App.Collections.List = Backbone.Collection.extend({
	model: App.Models.Post,

});

App.Views.Navigation = Backbone.View.extend({

	el: $('#content'),

	events: {
		'click #home': 'home',
		'click #en': 'en',
		'click #cn': 'cn',
		'click a#prev': 'prev',
		'click a#next': 'next',
	},

	initialize: function() {
		var homePage = new App.Views.List({ collection: this.collection, page: 1 });
	},

	home: function(e) {
		e.preventDefault();
		$('li#home').addClass('active');
		$('li#cn').removeClass('active');
		$('li#en').removeClass('active');
		this.initialize();
	},

	en: function(e) {
		e.preventDefault();
		this.category = 'en';
		$('li#en').addClass('active');
		$('li#cn').removeClass('active');
		$('li#home').removeClass('active');
		var enPage = new App.Views.List({ collection: this.collection, page: 1, category: 'en' });
	},

	cn: function(e) {
		e.preventDefault();
		this.category = 'cn';
		$('li#cn').addClass('active');
		$('li#en').removeClass('active');
		$('li#home').removeClass('active');
		var enPage = new App.Views.List({ collection: this.collection, page: 1, category: 'cn' });
	},

	prev: function(e) {
		e.preventDefault();
		if (App.currentPage == 1) {
			App.currentPage = 1;
			$('#prev').addClass('disabled');
		} else {
			App.currentPage -= 1;
			$('#prev').removeClass('disabled');
			var prevPage = new App.Views.List({ collection: this.collection, page: App.currentPage, category: this.category });
		}
	},

	next: function(e) {
		e.preventDefault();
		if (App.totalPages == App.currentPage) {
			App.currentPage = App.totalPages;
			$('#next').addClass('disabled');
		} else {
			App.currentPage += 1;
			$('#next').removeClass('disabled');
			var nextPage = new App.Views.List({ collection: this.collection, page: App.currentPage, category: this.category });
		}
	},

});

App.Views.List = Backbone.View.extend({

	model: App.Models.Paginator,

	el: $('#post-list'),
	template: _.template($('#tpl-post-item').html()),

	initialize: function() {
		this.render(this.collection, this.options.page, this.options.category);
	},

	render: function(posts, page, category) {
		var html = new String;
		var that = this;

		if (category) {
			posts = this.filterByCat(posts, category);
			posts = this.paginate(posts, page);
		} else {
			posts = this.paginate(posts, page);	
		};

		_.each(posts, function(post) {
			data = post.toJSON();
			data.excerpt = data.content.substring(0, data.content.indexOf('</p>')+4);
			moment.calendar = {
				    lastDay : '[Yesterday]',
				    sameDay : '[Today]',
				    nextDay : '[Tomorrow]',
				    lastWeek : '[last] dddd',
				    nextWeek : 'dddd',
				    sameElse : 'L'
			}
			data.updated = moment(data.updated).calendar();
			html += that.template(data);
		});
		$(this.el).html(html);
		return this;
	},

	filterByCat: function(posts, category) {
		
		postsPerPage = App.postsPerPage;
		this.totalPages = parseInt(_.size(posts.models) / postsPerPage) + 1;
		this.addPageNum(posts, App.postsPerPage);

		var postsInCat = _.filter(posts.models, function(item) {return item.get('category') == category});
		postsInCat = new App.Collections.List(postsInCat);
		return postsInCat;
	},

	addPageNum: function(posts, numPerPage) {
		_.each(posts.models, function(post, i){
			post.set({pagination: parseInt(i / numPerPage) + 1});
		});
		App.totalPages = parseInt(_.size(posts.models) / numPerPage) + 1;
		return posts;
	},

	paginate: function(posts, page) {

		postsPerPage = App.postsPerPage;
		this.totalPages = parseInt(_.size(posts.models) / postsPerPage) + 1;
		this.addPageNum(posts, App.postsPerPage);

		var postsOnPage = _.filter(posts.models, function(item) {return item.get('pagination') == page});
		return postsOnPage;
	},
	
});