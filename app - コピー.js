(function () {
'use strict';

angular.module('DictApp',["firebase"])
.controller('AddController', AddController)
.service('listService',listService)
.component('list',{
  templateUrl: 'list.html',
  controller: listComponentController,
  bindings: {
    trans:'=',
    items: '<',
    myTitle: '@title',
    onRemove: '&'
  }
});

// listComponentController.$inject=['listService', '$scope', '$firebaseArray'];
function listComponentController($scope, $firebaseArray, listService){
  var $ctrl= this;
  $ctrl.items=listService.getItems();
  $ctrl.remove=function(myIndex){
    listService.removeItem(myIndex);
  }
};

AddController.$inject=['listService','$scope', '$firebaseArray', '$http'];
function AddController(listService, $scope, $firebaseArray, $http) {
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

  // list.items=listService.getItems();
  // var origTitle= "";
  // list.title= origTitle + ""+ list.items.length + " Thẻ";

  list.VNword="";
  list.JPword="";
  list.JPwordTrans="";
  list.userName="";
  list.password="";
  list.authStatus="Chưa đăng nhập";
  var authStatus_ok='#B2FF59';
  var authStatus_no='#FF6E40';
  var APIpath='http://www.transltr.org/api/translate?text=';

  list.authColor=authStatus_no;

  //** Search and Print Vietnamese by Japanese keyword **//
  list.GetWord=function(object){
    var requestUrl=APIpath+object.toString()+'&to=vi&from=ja';
    console.log('Đang xử lý');
    $http.get(requestUrl)
      .success(function(data,status){
        list.JPwordTrans=data.translationText;
      })
      .error(function(data,status){
        console.log("Error");
      })

    ref.orderByKey()
    .startAt(object)
    .on('value',function(snapshot) {
      /*Check if the key exists */
      if (snapshot.val()){
          list.VNword=snapshot.child(object).val();
          console.log(list.VNword);
          console.log('Đã xong!');
        } else {
          list.VNword="Chưa có! Hãy bổ sung";
          console.log('Không có trong database');
        };
        listService.addItem(list.VNword,object);
        $scope.$digest();
      });
  };


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
      alert("Error !! Sai username hoặc password" )
      list.authStatus="Đăng nhập thất bại";
      list.authColor=authStatus_no;
      // ...
    });

    // var addWord= ref.push('vfdict1');
    //--> Use push(), system will auto generate code//
    //-->Require when many user want to add key in the same time//

    ref.child(key).set(val);
    list.authStatus="Đăng nhập thành công";
    list.authColor=authStatus_ok;
    alert("Đã thêm từ mới! Xin cám ơn.");
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

    //* Keep new item always ontop *//
    items.unshift(item);
  };

  service.getItems= function(){
    return items;
  };

  service.removeItem= function(itemIndex){
    items.splice(itemIndex,1);
  };
}

})();
