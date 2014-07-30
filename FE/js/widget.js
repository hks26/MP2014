$(function() {
    $( "#tabs" ).tabs();
});

/* Recognize enter key */
$.fn.enterKey = function (fnc) {
    return this.each(function () {
        $(this).keypress(function (ev) {
            var keycode = (ev.keyCode ? ev.keyCode : ev.which);
            if (keycode == '13') {
                fnc.call(this, ev);
            }
        })
    })
};


/* Get JSON from twitter using Ajax calls */
$("#search").enterKey(function() {
	var search = document.getElementById("search").value;
		
	$.ajax({
		url: 'http://web.njit.edu/~hks26/twitter_widget/widget_proxy.php',
		type: 'post',
		data: {'search': document.getElementById("search").value},
		success: function(data, status) {
			var result = jQuery.parseJSON(data);
			var tweets = result.statuses;

			var tab1 = document.getElementById('tabs1');
			tab1.innerHTML = "";

			for(var i=0; i < tweets.length; i++)
			{
				var newDiv = document.createElement('div');
				newDiv.setAttribute('id', 'tweet');
				newDiv.innerHTML = "<img src='" + tweets[i].user.profile_image_url + "'> </img> <p>" + tweets[i].text + "</p>";
				
				tab1.appendChild(newDiv);
			}
		}
	});
});
