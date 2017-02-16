(function () {
'use strict';

angular.module('DictApp',["firebase"])
.controller('AddController', AddController)
.service('listService',listService)
.component('list',{
  templateUrl: 'list.html',
  controller: listComponentController,
  bindings: {
    items: '<',
    myTitle: '@title',
    onRemove: '&'
  }
});
//.filter('change', changeThem);

// function ListItemDescription(){
//   var ddo={
//     template: '{{item.quantity}} of {{item.name}}'
//   }
//   return ddo;
// }

// AddController.$inject=['listService', '$scope', '$firebaseArray'];
function listComponentController($scope, $firebaseArray, listService){
  var $ctrl= this;
  // var config = {
  //   apiKey: "AIzaSyCC_PMzSnYuou0u_nuuYTt_H27XEMhru4w",
  //   authDomain: "vfdict.firebaseapp.com",
  //   databaseURL: "https://vfdict.firebaseio.com",
  //   storageBucket: "vfdict.appspot.com",
  //   messagingSenderId: "1051867458155"
  // };
  // firebase.initializeApp(config);
  // var ref= firebase.database().ref();
  //
  // //** List all the data in database into scope **//
  // ref.once('value', function(snapshot) {
  // snapshot.forEach(function(childSnapshot) {
  //   var childKey = childSnapshot.key;
  //   var childData = childSnapshot.val();
  //   console.log(childKey);
  //   console.log(childData);
  // });
  // });

  //** Retrieve data by key **//
  // ref.orderByKey().equalTo("母").on("child_added", function(snapshot) {
  //   console.log(snapshot.val());
  // });

  $ctrl.items=listService.getItems();
  //
  // return false;
};

AddController.$inject=['listService','$scope', '$firebaseArray'];
function AddController (listService, $scope, $firebaseArray) {
  var config = {
    apiKey: "AIzaSyCC_PMzSnYuou0u_nuuYTt_H27XEMhru4w",
    authDomain: "vfdict.firebaseapp.com",
    databaseURL: "https://vfdict.firebaseio.com",
    storageBucket: "vfdict.appspot.com",
    messagingSenderId: "1051867458155"
  };
  firebase.initializeApp(config);
  var ref= firebase.database().ref();

  //** List all the data in database into scope **//
  // ref.once('value', function(snapshot) {
  // snapshot.forEach(function(childSnapshot) {
  //   var childKey = childSnapshot.key;
  //   var childData = childSnapshot.val();
  //   console.log(childKey);
  //   console.log(childData);
  // });
  // });

  var list=this;

  list.items=listService.getItems();
  // var origTitle= "";
  // list.title= origTitle + ""+ list.items.length + " Thẻ";

  list.VNword="";
  list.JPword="";

  //** Search Vietnamese by Japanese keyword **//
  // list.Abrakadabra=function(){
  //   ref.orderByKey().equalTo(list.JPword).on("child_added", function(snapshot) {
  //     console.log(snapshot.val());
  //   });
  // }

  //** Search and Print Vietnamese by Japanese keyword **//
  list.Abrakadabra=function(){
    var keyword=list.JPword;
    ref.orderByKey().equalTo(keyword).on("child_added", function(snapshot) {
      console.log(snapshot.val());
      list.VNword=snapshot.val();
      listService.addItem(list.VNword,list.JPword);
    });

    list.VNword="";
    list.JPword="";
  }
};

function listService(){
  var service=this;
  var items=[];

  service.addItem= function(VNword, JPword) {
    var item={
      VN: VNword,
      JP: JPword
    };
    items.push(item);
  };

  service.getItems= function(){
    return items;
  };

  // service.removeItem= function(itemIndex){
  //   items.splice(itemIndex,1);
  // };
}

})();
