
if(typeof FRISSC3COMMON === "undefined"){

 function remove(arr, item) {
      for(var i = arr.length; i--;) {
          if(arr[i] === item) {
              arr.splice(i, 1);
          }
      }
  }

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
}

// Custom handler to zoom FrissC3Charts
Shiny.addCustomMessageHandler('ZoomC3Chart', function(message){
      var el    = $("#" + message.outputId);

      EL = el;
      MESSAGE = message;

      if (el.data("instance")) {
        var chart = el.data("instance").chart;

        var minDate = Date.parse(message.minX);
        var maxDate = Date.parse(message.maxX);

        chart.zoom([minDate,maxDate]);
      }
});

FRISSC3COMMON = true;

}
