/**
*  Module
*
* gTableTest Description
*/
angular.module('test', ['objectTable','ngRoute','ui.codemirror'])
.controller('mainController', function ($scope, $routeParams,$location,$timeout) {

  $scope.state = $routeParams.template;
  $scope.data = null
  $scope.isLoading= true;
  $timeout(function () {
    $scope.data = [{name: "Moroni", age: 50, money: -10, address: {postal: '1313'}},
      {name: "Tiancum", age: 43,money: 120, address: {postal: '1214'}},
      {name: "Jacob", age: 27, money: 5.5, address: {postal: '1292'}},
      {name: "Nephi", age: 29,money: -54, address: {postal: '6533'}},
      {name: "Enos", age: 34,money: 110, address: {postal: '1413'}},
      {name: "Tiancum", age: 43, money: 1000, address: {postal: '4444'}},
      {name: "Jacob", age: 27,money: -201, address: {postal: '1181'}},
      {name: "Nephi", age: 29, money: 100, address: {postal: '1231'}},
      {name: "Enos", age: 34, money: -52.5, address: {postal: '222'}},
      {name: "Tiancum", age: 43, money: 52.1, address: {postal: '1143'}},
      {name: "Jacob", age: 27, money: 110, address: {postal: '1513'}},
      {name: "Nephi", age: 29, money: -55, address: {postal: '1183'}},
      {name: "Enos", age: 34, money: 551, address: {postal: '1193'}},
      {name: "Tiancum", age: 43, money: -1410, address: {postal: '1113'}},
      {name: "Jacob", age: 27, money: 410, address: {postal: '1132'}},
      {name: "Nephi", age: 29, money: 100, address: {postal: '1133'}},
      {name: "Enos", age: 34, money: -100, address: {postal: '1153'}}];
    $scope.isLoading = false
  }, 1000);


  $scope.report = {
    selectedPerson:null
  };

  $scope.test = function(e) {
    alert('Alert from controller method!');
  };
  
  $scope.showItem = function(item) {
    alert(JSON.stringify(item));
  };

   $scope.getTotalBalance = function(data){
    //return if empty or not ready
    if(!data || !data.length) return;

    var totalNumber = 0;
    for(var i=0; i<data.length; i++){
      totalNumber = totalNumber + parseFloat(data[i].money);
    }

    return Math.round(totalNumber);
  
  };

  // this variable will contains all data after loading
  $scope.dataFromUrl =[];

  /*codemirror*/

  $scope.editorOptions = {
    lineNumbers: true,
    readOnly: false
  };

  $scope.editorOptionsJS = {
    lineNumbers: true,
    readOnly: 'nocursor',
    mode:"javascript"
  };



})