"use strict";

//寻好店首页
dxtApp.controller('FindStoreCtrl',function($scope,$http,$location){
    $('html,body').css({'backgroundColor':'#fff'});  

    $scope.renderStoreListView = function (){ 
        setTimeout(function(){
                //获取数据后渲染
                var mySwiper = new Swiper ('.swiper-container', {
                    direction: 'horizontal',
                    speed:300,
                    slidesPerView : 4,
                    spaceBetween:50,
                    autoplayDisableOnInteraction:false
                })   

            },100);
    }

    $scope.url = '/data/find_store/findStore_indexList.json';
	//获取附近店铺列表数据
	$http.post($scope.url,{}).success(function(data){
        if(data.success == true){
            $scope.pageNo = data.storeListPage.pageNo;
            $scope.totalPages = data.storeListPage.totalPages;
            $scope.totalSize = data.storeListPage.totalSize;
            $scope.currentList = $scope.storeItemList = data.storeListPage.rows;
            $scope.renderStoreListView();
        }else{
            mui.alert('数据加载失败！');
        }
    }); 

    //上拉刷新
    paginationPage($scope,'.find-store-content','storeItemList','storeListPage');

    //查看全部商铺
    // $scope.viewAllStore = function(){
    //     toastr.success('查看全部店铺啦！');
    // }    

    //收藏或者取消收藏
    $scope.collectStore = function(storeId){
        mui.alert('收藏成功！'+storeId);
    }
    //查看店铺详情
    $scope.goStoreDetail = function(storeId){
        $location.path('/find_store/'+storeId);
    }


});



//寻好店-店铺详情页面
dxtApp.controller('StoreDetailCtrl',function($scope,$http,$location,$routeParams){
    $('html,body').css({'backgroundColor':'#fff'});  

    var storeId = $routeParams.storeId;

    $scope.firstTabActive = true;

    $scope.storeInnerPicRender = function (){ 
        setTimeout(function(){
                //获取数据后渲染
                new Swiper ('.store-inner-pics .swiper-container', {
                    direction: 'horizontal',
                    speed:300,
                    slidesPerView : 3.5,
                    spaceBetween:5,
                    autoplayDisableOnInteraction:false
                })   
        },100);
    }
    //获取店铺详情数据
    $http.post('/data/find_store/storeDetail_storeInfo.json',{}).success(function(data){
        if(data.success == true){
            $scope.storeDetailInfo = data.storeDetailInfo;

            var renderLunBoView = setTimeout(function(){
                //获取数据后渲染
                var mySwiper1 = new Swiper ('.store-detail-pic .swiper-container', {
                    direction: 'horizontal',
                    loop: true,
                    speed:300,
                    autoplay:3000,
                    preventClicks:false,
                    autoplayDisableOnInteraction:false,
                    // 如果需要分页器
                    pagination: '.swiper-pagination',
                    paginationType : 'fraction',
                    paginationFractionRender: function (swiper, currentClassName, totalClassName) {
                          return '<span class="' + currentClassName + '"></span>' +
                                 ' / ' +
                                 '<span class="' + totalClassName + '"></span>';
                    }
                })   
            },100);

            $scope.storeInnerPicRender();
            

        }else{
            mui.alert('数据加载失败！');
        }
    }); 

    $scope.url = '/data/find_store/storeDetail_storeGoodsList.json';
    //获取店铺商品列表数据
    $http.post($scope.url,{}).success(function(data){
        if(data.success == true){
            $scope.pageNo = data.storeGoodsListPage.pageNo;
            $scope.totalPages = data.storeGoodsListPage.totalPages;
            $scope.totalSize = data.storeGoodsListPage.totalSize;
            $scope.currentList = $scope.storeGoodsList = data.storeGoodsListPage.rows;
        }else{
            mui.alert('数据加载失败！');
        }
    }); 

    //上拉刷新
    paginationPage($scope,'.store-goods-list','storeGoodsList','storeGoodsListPage');

    
    //简介和商品bar切换事件
    $scope.tabChange = function(type){
        if(type === 'consultant-tab'){
            $scope.firstTabActive = true;
            $scope.storeInnerPicRender();
        }else{
            $scope.firstTabActive = false;
        }
    }

    //查看商品详情
    $scope.viewGoodsDetail = function(goodsId){
        $location.path('/find_goods/goods_detail/'+goodsId);
    }



});