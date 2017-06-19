"use strict";

//营业员-我的点赞列表
dxtApp.controller('MySellerCtrl',function($scope,$http){
	$('html,body').css({'backgroundColor':'#efefef'});

	//获取（营业员）点赞列表
	$http.post('/data/my_seller/mySeller_thumbUpList.json',{}).success(function(data){
        if(data.success == true){
            $scope.thumbUpList = data.thumbUpList;
        }else{
            toastr.success('数据加载失败！');
        }
    }); 

	//（营业员）查看被点赞的笔记详情
    $scope.viewNoteDetail = function(thumbUpNoteId){
    	//todo 根据笔记类型查看笔记详情
        toastr.success('查看笔记详情！去原生啦！');
    }

});

//营业员-选择（搜索）商品
dxtApp.controller('SearchSelectGoodsCtrl',function($scope,$http,$routeParams){
    $('html,body').css({'backgroundColor':'#fff'}); 

    $scope.inputText = '';
    $scope.selectedHistorySearch = '';

    //默认选择的商品名称
    var defaultSelectedName = $routeParams.goodsName;
    

    //获取（营业员）搜索历史信息
    $http.post('/data/my_seller/mySeller_historySearch.json',{}).success(function(data){
        if(data.success == true){
            $scope.historySearchList = data.historySearchList;
        }else{
            toastr.success('数据加载失败！');
        }
    }); 


     //搜索事件
     $scope.searchSecectGoods = function(){
        var param = $scope.inputText;
        //根据数据内容后台模糊搜索结果
        $http.post('/data/my_seller/mySeller_searchResult.json',{}).success(function(data){
            if(data.success == true){
                $scope.searchResultList = data.searchResultList;
            }else{
                toastr.success('数据加载失败！');
            }
        }); 
     }

     //多选历史搜索记录
     $scope.selectHistorySearch = function(selectHistoryGoodsId){
        $scope.selectedHistorySearch += selectHistoryGoodsId+",";
     }

     //删除搜索历史
     $scope.deleteHistorySearch = function(){
        alert($scope.selectedHistorySearch);
     }
    

});