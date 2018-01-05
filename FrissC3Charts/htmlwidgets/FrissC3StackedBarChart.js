HTMLWidgets.widget({

  name: 'FrissC3StackedBarChart',

  type: 'output',

  initialize: function(el, width, height) {

    return {replace: false, width: width, height: height};

  },

  renderValue: function(el, x, instance) {

    var Data = x;
    DATA = x;

    if(typeof(instance.chart) == 'undefined'){

    var chart = c3.generate({
        bindto: '#' + el.id,
        data: {
            columns: [
                Data.columns
            ],
            type: 'bar',
            groups: [
                ['data1', 'data2','data3']
            ]
        },
        grid: {
            y: {
                lines: [{value:0}]
            }
        }
    });


    instance.Data = Data;
    instance.chart = chart;

    }else{


    }
    // Store chart instance in the div for later manipulation
    if(!$(el).data("instance"))
      $(el).data("instance",{chart: instance.chart});

  },

  resize: function(el, width, height, instance) {

  }

});
