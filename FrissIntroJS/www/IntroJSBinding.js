// Custom handler to initialze introJS with help data
Shiny.addCustomMessageHandler('initIntroJS', function(message){

   var intro = introJs();

   // IF a nextPage is provided the done button is replaced with a next page button
   if(message.nextPage !== null){
      intro.setOption('doneLabel', 'Next page').start().oncomplete(function() {

            // When we click next page the appropriate tab is selected with Jquery and its content will be loaded
            $('[data-value=' + message.nextPage + ']').tab('show');
            // This is to let shiny know we went to the next page while displaying the help and the help should be displayed when opening this page.
            // The help canno be opend here directly because this creates an infinite loop which results in a stack overflow even with a timeout.
            Shiny.onInputChange("autoStartHelp", 1);
      });
   }

    intro.setOptions({
      steps: message.steps
    });

   var el = $("#helpContainer");
   $(el).data("helpData",{intro: intro});

});

// Custom handler to start the help serverside
// This is used when we switch to the next page from within the help
Shiny.addCustomMessageHandler('startHelp', function(message){
  // The autostart help flag is reset at this point
  Shiny.onInputChange("autoStartHelp", 0);
  startHelp();
});

// Start Intro JS
startHelp = function(){
  var el = $("#helpContainer");

  var intro = el.data("helpData").intro;

  intro.onchange(function(el){

      // Compare to the string true because R converts to boolean provided by creating the div to a character
      if($('#helpContainer').attr('useVoice')=='TRUE'){
        // current step in help (zero based)
        var Step = parseInt(this._currentStep);

        // get raw HTML i.e. including tags
        var RAWHTML = this._introItems[this._currentStep].intro;

        // put it in a div so we are sure that all text has at least one set of HTML tags
  			var HTML = "<div>" + RAWHTML + "</div>";

  		  // extract text only via jQuery
  			var txt = $(HTML).text();

        // speak text, solve issues with long texts
        var chunkLength = 180;
        var pattRegex = new RegExp('^[\\s\\S]{' + Math.floor(chunkLength / 2) + ',' + chunkLength + '}[.!?,]{1}|^[\\s\\S]{1,' + chunkLength + '}$|^[\\s\\S]{1,' + chunkLength + '} ');
        var arr = [];

        while (txt.length > 0) {
            arr.push(txt.match(pattRegex)[0]);
            txt = txt.substring(arr[arr.length - 1].length);
        }

        $.each(arr, function () {
            var u = new SpeechSynthesisUtterance(this.trim());
            window.speechSynthesis.speak(u);
        });
      }
		}).start();
};
