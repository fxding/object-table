angular.module('test').config(function ($routeProvider) {
       $routeProvider.when('/server-paging',{
             controller:'serverPagingController',
            templateUrl:"example/partials/server_paging.html"
        }).when('/:template', {
            controller:'mainController',
            templateUrl:function(params){
                return !!params.template ? 'example/partials/'+ params.template + '.html' : "example/partials/attributes.html";
            }
        }).when('/',{
             controller:'mainController',
            templateUrl:"example/partials/attributes.html"
        });
    });