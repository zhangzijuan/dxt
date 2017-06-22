"use strict";

//找潮货首页
dxtApp.controller('FindGoodsCtrl',function($scope,$http,$location){

	$('html,body').css({'backgroundColor':'#fff'}); 

	
	//获取轮播图片集合
	$http.post('/data/find_goods/findGoodsIndex_lunBo.json',{}).success(function(data){
        if(data.success == true){
        	
        	$scope.lunBoList = data.lunBoList;
            $scope.lunBoList = data.lunBoList;
            var renderLunBoView = setTimeout(function(){
            	//获取数据后渲染
	            var mySwiper = new Swiper ('.swiper-container', {
				    direction: 'horizontal',
				    loop: true,
				    speed:300,
				    autoplay:3000,
				    preventClicks:false,
				    autoplayDisableOnInteraction:false,
				    // 如果需要分页器
				    pagination: '.swiper-pagination',
				    //分页器样式
				    paginationBulletRender: function (swiper, index, className) {
				    	 // console.log（className);
					      return '<span class="' + className + '"></span>';
					}
				})   

            },10);
        }else{
            toastr.success('数据加载失败！');
        }
    });     

	$scope.url = '/data/find_goods/findGoodsIndex_goodsList.json';
	//获取商品数据集合
	$http.post($scope.url,{}).success(function(data){
        if(data.success == true){
        	$scope.pageNo = data.findGoodsListPage.pageNo;
            $scope.totalPages = data.findGoodsListPage.totalPages;
            $scope.totalSize = data.findGoodsListPage.totalSize;
            $scope.currentList = $scope.findGoodsList = data.findGoodsListPage.rows;
        }else{
            toastr.success('数据加载失败！');
        }
    });
    //上拉刷新
    paginationPage($scope,'.goods-content-list','findGoodsList','findGoodsListPage');

	//跳转商品详情界面
    $scope.goodsItemClick = function(goodsId){
    	$location.path('/find_goods/goods_detail/'+goodsId);
    }

});


//商品详情界面
dxtApp.controller('GoodsDetailCtrl',function($scope,$http,$sce,$location,$routeParams){

	$('html,body').css({'backgroundColor':'#fff'});  

	var goodsId = $routeParams.goodsId;

	$scope.firstTabActive = true;

	var goodsNotesRender = function (){
		setTimeout(function(){
			$('.goods-notes-contents').imagesLoaded( function() {
			  // init Masonry after all images have loaded
			  $('.goods-notes-contents').masonry({
				  // set itemSelector so .grid-sizer is not used in layout
				  itemSelector: '.goods-note-item',
				  isAnimated: true, 
				  singleMode: true,
				  isFitWidth: true,
				  isResizableL:true,
				  gutter:12.5
				});
			});
		},10);
	}

	var goodsPicsRender = function(){
		setTimeout(function(){
	    	//获取数据后渲染
	    	var mySwiperGoodsPics = new Swiper ('.goods-pics-container .swiper-container', {
			    direction: 'horizontal',
			    loop: true,
			    speed:300,
			    autoplay:3000,
			    preventClicks:false,
			    autoplayDisableOnInteraction:false,
			    // 如果需要分页器
			    pagination: '.swiper-pagination',
			    //分页器样式
			    paginationBulletRender: function (swiper, index, className) {
				      return '<span class="' + className + '"></span>';
				}
			})   

	    },10);
	}

	var goodsCommentRender = function(){
		setTimeout(function(){
            	//获取数据后渲染
	            var mySwiperComment = new Swiper ('.goods-comment-content-container .swiper-container', {
				    direction: 'horizontal',
                    speed:300,
                    slidesPerView : 1.3,
                    spaceBetween:5,
                    autoplayDisableOnInteraction:false
				})   

            },10);
	}

	//获取商品详情所有信息
	$http.post('/data/find_goods/findGoods_goodsDetail.json',{}).success(function(data){
        if(data.success == true){
            $scope.goodsDetail = data.goodsDetail;

            $scope.goodsPicWordContent=$sce.trustAsHtml(data.goodsDetail.goodsPicWordContent);

            goodsPicsRender();

            goodsCommentRender();

            goodsNotesRender();

        }else{
            toastr.success('数据加载失败！');
        }
    });  

	//查看商品的视频列表
	$scope.viewGoodsVideos = function(goodsId){
		$location.path('/find_goods/goods_videos/'+goodsId);
	}

	//进店看看
	$scope.gotoStore = function(storeId){
		$location.path('/find_store/'+storeId);
	}	

	//查看商品所有的评价
	$scope.goViewAllComment = function(goodsId){
		toastr.success('查看商品所有的评价啦！'+goodsId);
	}

	//查看商品所有的笔记
	$scope.goViewAllNotes = function(goodsId){
		toastr.success('查看商品所有的笔记！'+goodsId);
	}

	//查看单个笔记详情界 main
	$scope.viewNoteDetail = function(noteId){
		//todo 调用原生界面查看详情
		toastr.success('查看单个笔记详情界，去原生喽！'+noteId);
	}

	//商品图文信息和参数信息切换查看
	$scope.goodsTabViewChange = function(type){
		if(type === 'pic-word'){
            $scope.firstTabActive = true;
        }else{
            $scope.firstTabActive = false;
        }
	}

	//是否显示置顶图标
	$(window).scroll(function(){
	    if ($(window).scrollTop()>1300){
	        $(".back-to-top").fadeIn(1000);
	    }else{
	        $(".back-to-top").fadeOut(1000);
	    }
	});

	//图文介绍回顶部
	$scope.backToTop = function(){
		$('body,html').animate({scrollTop:0},1000);
	}

	//商品加入购物车
	$scope.joinCart = function(goodsId){
		toastr.success('商品加入购物车');
	}

	//立即购买商品
	$scope.buyGoods = function(goodsId){
		toastr.success('立即购买商品');
	}

});


//商品详情界面-商品视频列表
dxtApp.controller('GoodsVideosCtrl',function($scope,$http,$location,$routeParams){
	$('html,body').css({'backgroundColor':'#fff'}); 

	var goodsId = $routeParams.goodsId;
	
	//获取商品视频集合
	$http.post('/data/find_goods/goodsDetail_goodsVideoList.json',{}).success(function(data){
        if(data.success == true){
            $scope.goodsVideoList = data.goodsVideoList;
        }else{
            toastr.success('数据加载失败！');
        }
    });

});


//找潮货-选择收货地址
dxtApp.controller('GoodsSelectAddressCtrl',function($scope,$http,$location,$routeParams){
	$('html,body').css({'backgroundColor':'#efefef'}); 

	$scope.selectedAddress = $routeParams.selectedAddressId;

	//获取商品收货地址列表集合
	$http.post('/data/find_goods/findGoods_goodsAddressList.json',{}).success(function(data){
        if(data.success == true){
            $scope.goodsAddressList = data.goodsAddressList;
        }else{
            toastr.success('数据加载失败！');
        }
    });

	//点击选择新的收获地址
    $scope.selectAddress = function(goodsAddress){
    	toastr.success('返回确认订单界面修改选择的地址信息！');
    }
	
});


//找潮货-管理收货地址
dxtApp.controller('ManageAddressCtrl',function($scope,$http,$location){
	$('html,body').css({'backgroundColor':'#efefef'});
	
	//获取商品收货地址列表集合
	$http.post('/data/find_goods/findGoods_goodsAddressList.json',{}).success(function(data){
        if(data.success == true){
            $scope.goodsAddressList = data.goodsAddressList;
        }else{
            toastr.success('数据加载失败！');
        }
    });

	//删除商品收货地址
    $scope.delAddress = function(goodsAddressId){
    	toastr.success('调用后台接口删除收货地址！');
    }

    //编辑商品收货地址
    $scope.editAddress = function(goodsAddressId){
    	$location.path('/find_goods/addOrEdit_address/'+goodsAddressId);
    }
	
});


//找潮货-添加或者编辑收获地址
dxtApp.controller('AddOrEditAddressCtrl',function($scope,$http,$location,$routeParams){
	$('html,body').css({'backgroundColor':'#efefef'});
	var addressId = $routeParams.addressId;
	$scope.address = null;
	if(addressId == null || addressId == '' || addressId == 'null'){
		$scope.addAdress = true;
		$scope.address = {
			getGoodsUserName:null,
			getGoodsUserPhone:null,
			getGoodsUserOfProvince:null,
            getGoodsUserOfCity:null,
            getGoodsUserOfArea:null,
			getGoodsDetail:null
		}
	}else{
		$scope.addAdress = false;
		//todo 根据参数加载收货地址对象
		$http.post('',{'addressId':addressId}).success(function(data){
	        if(data.success == true){
	            $scope.address = data.address;
	        }else{
	            toastr.success('数据加载失败！');
	        }
	    });
	}

	//保存收货详情信息
	$scope.saveAddress = function(address){
		var formData = angular.copy(address);
		if (formData.getGoodsUserName == null || formData.getGoodsUserName == '') {
            mui.alert('请输入收货人姓名');
            return false;
        }

        if (formData.getGoodsUserPhone == null || formData.getGoodsUserPhone == ''|| (formData.getGoodsUserPhone.length != 11)) {
            mui.alert('请输入11位手机号码');
            return false;
        }

        if (formData.getGoodsUserOfProvince == null || formData.getGoodsUserOfProvince == '' || 
        	formData.getGoodsUserOfCity == null || formData.getGoodsUserOfCity == '' || 
        	formData.getGoodsDetail == null || formData.getGoodsDetail == '') {
            mui.alert('请选择收货地址');
            return false;
        }
        //todo 保存地址对象信息
		$http.post('',{'address':address}).success(function(data){
	        
	    });
	}

});


//找潮货-选择发货店铺
dxtApp.controller('SelectStoreCtrl',function($scope,$http,$location,$routeParams){
	$('html,body').css({'backgroundColor':'#efefef'}); 

	var goodsId = $routeParams.goodsId;

	$scope.selectedStoreId = null;
	
	$scope.url = '/data/find_goods/selectStore_storeList.json';
	//根据传递的goodsId 查看所属的所有店铺列表
	$http.post($scope.url,{}).success(function(data){
        if(data.success == true){
        	$scope.pageNo = data.selectStoreListPage.pageNo;
            $scope.totalPages = data.selectStoreListPage.totalPages;
            $scope.totalSize = data.selectStoreListPage.totalSize;
            $scope.currentList = $scope.storesList = data.selectStoreListPage.rows;
        }else{
            toastr.success('数据加载失败！');
        }
    });

    //上拉刷新
    paginationPage($scope,'.select-store-content','storesList','selectStoreListPage');

    //下一步，确认订单界面
    $scope.saveSelectStore = function(){
    	alert($scope.selectedStoreId);
    	// $location.path('');
    }
});






