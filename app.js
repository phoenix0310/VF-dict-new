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

AddController.$inject=['listService', '$scope', '$firebaseArray'];
function listComponentController($scope, $firebaseArray, listService){
  var $ctrl= this;
  var config = {
    apiKey: "AIzaSyCC_PMzSnYuou0u_nuuYTt_H27XEMhru4w",
    authDomain: "vfdict.firebaseapp.com",
    databaseURL: "https://vfdict.firebaseio.com",
    storageBucket: "vfdict.appspot.com",
    messagingSenderId: "1051867458155"
  };
  firebase.initializeApp(config);
  var ref= firebase.database().ref();
  //
  // //List all the data in database into scope//
  // ref.once('value', function(snapshot) {
  // snapshot.forEach(function(childSnapshot) {
  //   var childKey = childSnapshot.key;
  //   var childData = childSnapshot.val();
  //   console.log(childKey);
  //   console.log(childData);
  // });
  // });

  //Retrieve data by key//
  ref.orderByKey().equalTo("母").on("child_added", function(snapshot) {
    console.log(snapshot.val());
  });

  return false;
};

AddController.$inject=['listService'];
function AddController (listService) {
  //$scope.VNword="";
  //$scope.JPword="";
  // var config = {
  //   apiKey: "AIzaSyCC_PMzSnYuou0u_nuuYTt_H27XEMhru4w",
  //   authDomain: "vfdict.firebaseapp.com",
  //   databaseURL: "https://vfdict.firebaseio.com",
  //   storageBucket: "vfdict.appspot.com",
  //   messagingSenderId: "1051867458155"
  // };
  // firebase.initializeApp(config);
  // var ref= firebase.database().ref("vfdict");

  var list=this;

  list.items=listService.getItems();
  // var origTitle= "";
  // list.title= origTitle + ""+ list.items.length + " Thẻ";

  list.VNword="";
  list.JPword="";

  list.Abrakadabra=function(){
      listService.addItem(list.VNword,list.JPword);
      // list.title= origTitle + ""+list.items.length+ " Thẻ";
      // ref.once('value', function(snapshot) {
      //   snapshot.forEach(function(childSnapshot) {
      //     var childKey = childSnapshot.key;
      //     var childData = childSnapshot.val();
      //     console.log(childData);
      //   });
      // });

      list.VNword="";
      list.JPword="";
    }

  // list.removeItem=function(itemIndex){
  //   this.lastRemoved="Đã xóa thẻ " + this.items[itemIndex].name;
  //   listService.removeItem(itemIndex);
  //   this.title= origTitle + ""+list.items.length+ " Thẻ";
  // };

}

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
