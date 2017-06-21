"use strict";


angular.module('loadingService', [], function ($provide) {
    $provide.factory('myHttpInterceptor', function ($q, $window) {
        return {
            'request': function (config) {
                return config;
            },

            'requestError': function (rejection) {
                console.error('requestError:', rejection);
                return $q.reject(rejection);
            },

            'response': function (response) {
                $('.loading').hide();
                return response;
            },

            'responseError': function (rejection) {
                return $q.reject(rejection);
            }
        };
    });

});


var dxtApp = angular.module('dxtApp',['ngRoute','ngSanitize','loadingService','common_directive']);


//页面路由配置
dxtApp.config(['$routeProvider','$httpProvider', function($routeProvider,$httpProvider){

    $httpProvider.interceptors.push('myHttpInterceptor');
    var spinnerFunction = function (data, headers) {
        if ($('body').find('section').size() === 0) {
            $('.loading').show();
        }
    };
    $httpProvider.defaults.transformRequest.push(spinnerFunction);


    $routeProvider
    .when('/',{templateUrl:'index'})
    //营业员-我的点赞列表
    .when('/my_seller/thumb_up_list',{templateUrl:'my_seller/thumb_up_list.html',controller:'MySellerCtrl'})
    //营业员-选择（搜索）商品
    .when('/my_seller/select_search_goods',{templateUrl:'my_seller/search_select_goods.html',controller:'SearchSelectGoodsCtrl'})
    //找潮货首页
    .when('/find_goods',{templateUrl:'find_goods/index.html',controller:'FindGoodsCtrl'})
    //找潮货-商品详情页面
    .when('/find_goods/goods_detail/:goodsId',{templateUrl:'find_goods/goods_detail.html',controller:'GoodsDetailCtrl'})
    //找潮货-商品详情页-商品视频列表
    .when('/find_goods/goods_videos/:goodsId',{templateUrl:'find_goods/goods_videos.html',controller:'GoodsVideosCtrl'})
    //找潮货-管理收货地址
    .when('/find_goods/manage_address',{templateUrl:'find_goods/manage_address.html',controller:'ManageAddressCtrl'})
    //找潮货-选择收货地址
    .when('/find_goods/select_address/:selectedAddressId',{templateUrl:'find_goods/select_address.html',controller:'GoodsSelectAddressCtrl'})
    //寻好店首页
    .when('/find_store',{templateUrl:'find_store/index.html',controller:'FindStoreCtrl'})
    //寻好店-店铺详情页面
    .when('/find_store/:storeId',{templateUrl:'find_store/store-detail.html',controller:'StoreDetailCtrl'})
    //看看首页
    .when('/look_something',{templateUrl:'look_something/index.html',controller:'LookSomethingCtrl'})
    

    .otherwise({redirectTo:'/'});
}]);

//导航控制器
dxtApp.controller('DxtPageNavCtrl',function($scope){
	$scope.navShow = false;
	$scope.openPageNav = function(){
		if ($scope.navShow) {
			$scope.navShow = false;
		}else{
			$scope.navShow = true;
		}
		
	}	
});