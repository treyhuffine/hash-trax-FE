(function() {
  angular.module('hashtrax.controllers.dashboard', [])
  .controller('DashboardCtrl', function($scope, $http, $stateParams) {
    console.log($stateParams);
    $http.get('http://hashtraxserver.herokuapp.com/dashboard/' + $stateParams.hash)
    .success(function(data){
      var test = data[0].text.length;
      var div = d3.select("#d3")
        .selectAll("div")
          .data(data)
        .enter().append("div")
          .style("width", function(d) {
            console.log(d.text.length);
            return d.text.length * 10;
          })
          .style("height", function() {
            return 20;
          })
          .style("background-color", function(){
            return "hsl(" + Math.random() * 360 + ",100%,50%)";
          })
          .text(function(d){
            return d.text;
          });
    })
    .catch(function(error){
      console.log(error);
    });
  });
})();
