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

//** SETTINGS UP FIREBASE **/
var config = {
  apiKey: "AIzaSyCC_PMzSnYuou0u_nuuYTt_H27XEMhru4w",
  authDomain: "vfdict.firebaseapp.com",
  databaseURL: "https://vfdict.firebaseio.com/",
  storageBucket: "vfdict.appspot.com",
  messagingSenderId: "1051867458155"
};
firebase.initializeApp(config);


// listComponentController.$inject=['listService', '$scope', '$firebaseArray'];
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
  $ctrl.onRemove=function(itemIndex){
    listService.removeItem(itemIndex);
  }
  //
  // return false;
};

AddController.$inject=['listService','$scope', '$firebaseArray'];
function AddController (listService, $scope, $firebaseArray) {
  var ref= firebase.database().ref('vfdict1');

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
  list.userName="";
  list.password="";

  //** Search Vietnamese by Japanese keyword **//
  // list.Abrakadabra=function(){
  //   ref.orderByKey().equalTo(list.JPword).on("child_added", function(snapshot) {
  //     console.log(snapshot.val());
  //   });
  // }
  //** Search and Print Vietnamese by Japanese keyword **//
  list.GetWord=function(){
    var temp="";
    console.log('Đang xử lý');
    ref.orderByKey().equalTo(list.JPword).on('child_added', function(snapshot) {
      console.log(snapshot.val());
      temp=snapshot.val();
      console.log(list.VNword);
      // listService.addItem(list.VNword,list.JPword);
      console.log('Đã xong');
    });
  };

  // $scope.$watch('VNword', function(){
  //   list.items=listService.getItems();
  // });


  //** Add new Vietnamese to Japanese keyword **//
  list.AddWord=function(){
    var key=list.JPword;
    var val=list.VNword;
    var email=list.userName;
    var password=list.password;

    //** Add Authentication **//
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log('Error !!')
      // ...
    });

    // var addWord= ref.push('vfdict1');
    //--> Use push(), system will auto generate code//
    //-->Require when many user want to add key in the same time//

    ref.child(key).set(val);
    console.log('Đã thêm');
    // ref.orderByKey().equalTo(list.JPword).on('child_added', function(snapshot) {
    //   console.log(snapshot.val());
    //   // list.VNword=snapshot.val();
    //   listService.addItem(snapshot.val(),snapshot.key);
    // });

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

  service.removeItem= function(itemIndex){
    items.splice(itemIndex,1);
  };
}

})();
