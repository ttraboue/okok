HTMLWidgets.widget({

  name: 'FrissC3PieChart',

  type: 'output',

  // initialization
  initialize: function(el, width, height) {
      return{replace: false, width: width, height: height};
  },

  // this part will be called each time we send an update
  renderValue: function(el, x, instance) {

      if(typeof(instance.chart) == 'undefined'){

        instance.inFilter = JSON.parse(JSON.stringify(x.fullNames));

        // Return initial selection such that the inputs are all filled
         if(typeof(Shiny)!==undefined){
           Shiny.onInputChange(el.id, instance.inFilter);
         }

        var chart = c3.generate({

            bindto: "#" + el.id,

            data: {
                json:
                  x.value
                ,
                type : x.type,
                onclick: function (d, element) {

                }

            },

            size:
            {height: x.height},

            legend: {
              position: x.legendPosition,

              item: {
                onclick: function (id) {

                 var items  = instance.chart.data();
                 var nItems = items.length;
                 var index  = -1;

                 for (i = 0; i < nItems; i++) {
                    if(items[i].id==id){
                      index=i;
                      break;
                    }
                 }

                 var id_org = x.fullNames[index];
                 var diff = _.difference([id_org],instance.inFilter);

                 if(diff.length===0){

                   // Dont hide when only 1 item is shown
                   if(instance.inFilter.length==1)
                      return false;

                   instance.chart.hide(id);
                   remove(instance.inFilter,id_org);


                 }else{
                   instance.chart.show(id);
                   instance.inFilter.push(id_org);
                 }

                 if(typeof(Shiny)!==undefined){
                   Shiny.onInputChange(el.id, instance.inFilter);
                 }
                }

              }

            },

            tooltip: {
               format: {
                  name:  function (name, ratio, id, index) { return x.fullNames[index]; },
                  value: function (value, ratio, id, index) { return value; }
               }
            },
            transition: {
              duration: x.transition
            },
            pie: {
              label: {
                format: function (value, ratio, id) {
                if(x.displayValues)
                  return (value);
                else
                  return((ratio*100).toFixed(2)) + "%";
              }
            }
          }
        });

        instance.chart = chart;

      }else{

      // Get names of current and new series to put in the chart
      var curKeys = _.keys(instance.chart.x());
      var newKeys = _.keys(x.value);

      // Determine the keys that are in the current chart but not in the new data
      // This difference should be unloaded
      diff = _.difference(curKeys,newKeys);

      instance.chart.load({
        json:
          x.value
        ,
          unload: diff,
      });

      instance.chart.hide(x.dataHidden);

      }
  },

  // this part will be called each time we resize the containing div element
  resize: function(el, width, height, instance) {
      el.style.paddingLeft = 0.028*screen.width + "px";
  }

});
