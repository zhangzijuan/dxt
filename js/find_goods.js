"use strict";

//找潮货首页
dxtApp.controller('FindGoodsCtrl',function($scope,$http){

	$('html,body').css({'backgroundColor':'#fff'});  

	//获取轮播图片集合
	$http.post('/data/find_goods/findGoodsIndex_lunBo.json',{}).success(function(data){
        if(data.success == true){
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

	//获取商品数据集合
	$http.post('/data/find_goods/findGoodsIndex_goodsList.json',{}).success(function(data){
        if(data.success == true){
            $scope.findGoodsList = data.findGoodsList;
        }else{
            toastr.success('数据加载失败！');
        }
    });

	//跳转至优选商铺界面
    $scope.goodsItemClick = function(goodsId){
    	toastr.success(goodsId);
    }

});



//商品详情界面
dxtApp.controller('GoodsDetailCtrl',function($scope,$http,$sce,$location){

	$('html,body').css({'backgroundColor':'#fff'});  

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
		toastr.success('查看商品的视频列表啦！');
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