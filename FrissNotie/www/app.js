$( document ).ready(function() {

  // input example
  Shiny.addCustomMessageHandler("FrissNotifyAlert",
  function(data) {

    notie.alert(data.style_number, data.message, data.time_in_seconds);

  });

  // confirm example
  Shiny.addCustomMessageHandler("FrissNotifyConfirm",
  function(data) {

    yes_callback = function(){alert("confirm callback called!")};

    notie.confirm(data.confirm_title, data.confirm_yes, data.confirm_no,yes_callback);

  });

  // input example
  Shiny.addCustomMessageHandler("FrissNotifyInput",
  function(data) {

    submit_callback = function(){alert("submit_callback called!")};

    notie.input(data.input_title, data.input_submit, data.input_cancel, 'text', 'Enter filter name:', function(value_entered) {
      notie.alert(1, 'Filter stored under name: ' + value_entered, 2);
    });


  });

});

