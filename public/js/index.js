/**
 * 
 * All java script logic for the application.
 * Subject to standard usage terms and conditions
 * The code relies on the jQuery JS library to
 * be also loaded. 
 *    For all details and documentation:
 *    https://github.com/Demandware/Site-Genesis 
 */
// semi-colon to assure functionality upon script concatenation and minification
;
var app = (function (app, $) {
	/**
	 * Application configurations and constants
	 */
	app.config = {
			base_url : "http://dev13-shop-diesel.demandware.net/s/DieselUS/dw/",
			client_id:'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
	};
	/**
	 * Initialize Application
	 */
	app.init = function(){
		app.getCategories();
	};
	/**
	 * Get Categories
	 */
	app.getCategories = function(){
		var url = '/v13_5/categories/root?levels=2';
			app.callapi(url,function(res){
				if(res.status == true){
					var html = "";
					for(var k in res.items.categories){
						item = res.items.categories[k];
						html += '<li><a href="'+item.id+'">'+item.name+'</a></li>';
					}
					$('#main-category').html(html);
				}
			});
	};
	/**
	 * Call Open Commerce API
	 */
	app.callapi = function(url,callback){
		$.ajax({
		     type : "GET",
		     dataType : "jsonp",
		     data : {client_id:app.config.client_id},
		     url : app.config.base_url+url,
		     success: function(data){
		           callback({'status':true,items:data});
		     },
		     failure:function(){
		    	   callback({'status':false,items:null});
		     }
		});
	};
	app.init();
}(window.app = window.app || {}, jQuery));