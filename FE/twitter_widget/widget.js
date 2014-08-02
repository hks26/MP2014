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

/* Preload the tweets once */

/* All subsequent twitter updates made every 70 seconds 
 * 
 * NOTE : Only 1 request / minute allowed
 *
 * */
setInterval( function() {
	var search = document.getElementById("search").value;
		
	$.ajax({
		url: 'http://web.njit.edu/~hks26/twitter_widget/widget_proxy.php',
		type: 'post',
		success: function(data, status) {
			var tweets = jQuery.parseJSON(data);

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
}, 70000);
