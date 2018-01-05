var FrissSwitchBinding = new Shiny.InputBinding();

$.extend(FrissSwitchBinding, {
  // Finds all elements with class pick-a-color
  find: function(scope) {
    return $(scope).find(".FrissSwitch");
  },
  
  // This function will be called on initialisation 
  // and when the callback is triggered via the event bound in subscribe
  getValue: function(el) {	
  	return $(el).bootstrapSwitch('state');
  },
  
  // This will let shiny server know when a value has changed
  subscribe: function(el, callback) {	
    $(el).on('switchChange.bootstrapSwitch', function(event, state){
      callback();
    });
  },
  
  // Unbind
  unsubscribe: function(el) {
    $(el).off("FrissSwitchBinding");
  },
  
  // Receive messages from the server.
  // Messages sent by update...() are received by this function.
  receiveMessage: function(el, data) {
    
    // to be implemented
      
  }
});

Shiny.inputBindings.register(FrissSwitchBinding);