HTMLWidgets.widget({

  name: 'FrissC3Gauge',

  type: 'output',

  // initialization
  initialize: function(el, width, height) {
      return{replace: false, width: width, height: height};
  },

  // this part will be called each time we send an update
  renderValue: function(el, x, instance) {

      if(typeof(instance.chart) == 'undefined'){

        var chart = c3.generate({

            bindto: "#" + el.id,

            data: {
              columns: [
                ['data', x.value]
              ],
              type: 'gauge'
            },

            gauge: {
              label: {
              format: function(value, ratio) {
                  return value;
                }, show: x.showMinMax
              },
                min: x.min,
                max: x.max,
                units: x.text,
                width: x.gaugeWidth
            },

            size: {
              height: 180
            },

            color: {
              pattern: [x.color]
            },
            transition: {
              duration: x.transition
            }

         });

        instance.chart = chart;

      }else{
        instance.chart.load({columns: [['data', x.value]]});

        instance.chart.data.colors({
          data: x.color,
      });

      }
  },

  // this part will be called each time we resize the containing div element
  resize: function(el, width, height, instance) {

  }

});
