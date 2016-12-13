'use strict';

(function(angular){

  angular.module('rv.components.ImagesModule')
  .directive('rvImage' , rvImageDirective);

  function rvImageDirective() {
    return{
      restruct: 'AE',
      templateUrl: 'modules/components/images/templates/image-template.html',
      bindToController: {
        imagedata : '='
      },
      scope: {},
      controller: rvImageController,
      controllerAs: 'vm'
    }
  }

  rvImageController.$inject = ['ImageService'];

  function rvImageController(ImageService){
    var vm=this; // jshint ignore:line
    ImageService.getImages().then(function (data){
      vm.images = data;
      vm.imgHeight = '450px';
      vm.imgWidth = '450px';
      vm.mainImage = vm.images[0];
     }).catch(function (data){
      // I have written this code to hardcode urls for now. Once a working URL is available, the below 2 lines can be deleted
      vm.images = ['http://lorempixel.com/300/300/nightlife/3','http://lorempixel.com/300/300/sports/6','http://lorempixel.com/300/300/food/2','http://lorempixel.com/300/300/nature/3','http://lorempixel.com/300/300/fashion/3'];
      vm.mainImage = vm.images[0];
      console.log(data);
     });
    
      vm.moveImages = function(button){
        if(button === 'right'){
          var first = vm.images.shift();
          vm.images.push(first);  
        }else{
          var last = vm.images.pop();
          vm.images.unshift(last);
        }
      }

      vm.showMainImage = function(index){
        vm.mainImage = vm.images[index];
        console.log(index);
      }

      vm.imageResize = function(){
        vm.imgHeight='1000px';
        vm.imgWidth = '1000px';
      }
  }
})(angular);


