angular.module("gthiveApp",["app.routes","mainCtrl","buildingService","uiGmapgoogle-maps"]).config(["uiGmapGoogleMapApiProvider",function(o){o.configure({v:"3.20",libraries:"geometry,visualization"})}]),angular.module("app.routes",["ngRoute"]).config(["$routeProvider","$locationProvider",function(o,n){o.when("/",{templateUrl:"app/views/pages/home.html",controller:"mainController",controllerAs:"main"}),n.html5Mode(!0)}]),angular.module("mainCtrl",["uiGmapgoogle-maps","buildingService"]).controller("mainController",["$scope","uiGmapGoogleMapApi","Building","$log",function(o,n,i,e){var t=this;o.markers=[],t.processing=!0,n.then(function(n){return o.map={center:{latitude:33.7753,longitude:-84.3975},zoom:16,options:{disableDefaultUI:!0}},i.all()}).then(function(n){t.buildings=n.data;for(var i=function(o,n){var i={id:o,options:{title:n.name,labelContent:n.name},latitude:n.latitude,longitude:n.longitude};return n.occupancy<=40?i.icon="http://maps.google.com/mapfiles/ms/icons/green-dot.png":n.occupancy<=80?i.icon="http://maps.google.com/mapfiles/ms/icons/yellow-dot.png":i.icon="http://maps.google.com/mapfiles/ms/icons/red-dot.png",i},e=0;e<t.buildings.length;e++)o.markers.push(i(e,t.buildings[e]))})["catch"](function(){}).then(function(){t.processing=!1})}]),angular.module("buildingService",[]).factory("Building",["$http","$log",function(o,n){var i={};return i.all=function(){return o.get("/api/buildings")},i.get=function(n){return o.get("/api/buildings/"+n)},i}]);