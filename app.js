(function () {
'use strict';

angular.module('DictApp',["firebase"])
.controller('AddController', AddController)
;

// listComponentController.$inject=['listService', '$scope', '$firebaseArray'];



function AddController() {
  
var list=this;
var word;
list.category=[];

list.dict = [
       {Jap:'Jani',vi:'Norway',categories:'a,b,c,d,e'},
       {Jap:'Carl',vi:'Sweden',categories:'re,br,cd,ds,er'},
       {Jap:'Margareth',vi:'England',categories:'a,b,c,d,'},
       {Jap:'Hege',vi:'Norway',categories:'Array,b,c,dr,fe'},
       {Jap:'Joe',vi:'Denmark',categories:'split,tb,c,wd,'},
       {Jap:'Gustav',vi:'Sweden',categories:'av,b,cr,d,e'},
       {Jap:'Birgit',vi:'Denmark',categories:'a,hgb,sc,d,e'},
       {Jap:'Mary',vi:'England',categories:'ae,b,c,d,e'},
       {Jap:'Kai',vi:'Norway',categories:'ga,vb,c,ed,e'}
       ];


// for (word in list.dict) {
//   list.category=list.category.concat(word.categories.split(","));
// };

Array.prototype.unique = function() {
  return this.filter(function (value, index, self) { 
    return self.indexOf(value) === index;
  });
}


for (var i = 0; i < list.dict.length; i++) {
 list.category=list.category.concat(list.dict[i].categories.split(","));
};





console.log(list.category.unique());

};




})();
