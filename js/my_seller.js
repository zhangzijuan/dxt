"use strict";

//营业员-我的点赞列表
dxtApp.controller('MySellerCtrl',function($scope,$http){
	$('html,body').css({'backgroundColor':'#efefef'});

    $scope.url = '/data/my_seller/mySeller_thumbUpList.json';
	//获取（营业员）点赞列表
	$http.post($scope.url,{}).success(function(data){
        if(data.success == true){
            $scope.pageNo = data.thumbUpListPage.pageNo;
            $scope.totalPages = data.thumbUpListPage.totalPages;
            $scope.totalSize = data.thumbUpListPage.totalSize;
            $scope.currentList = $scope.thumbUpList = data.thumbUpListPage.rows;
        }else{
            toastr.success('数据加载失败！');
        }
    }); 

    //上拉刷新
    paginationPage($scope,'.thumb-up-item-content','thumbUpList','thumbUpListPage');

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

        $scope.url = '/data/my_seller/mySeller_searchResult.json';
        //根据数据内容后台模糊搜索结果
        $http.post($scope.url,{}).success(function(data){
            if(data.success == true){
                $scope.pageNo = data.searchResultListPage.pageNo;
                $scope.totalPages = data.searchResultListPage.totalPages;
                $scope.totalSize = data.searchResultListPage.totalSize;
                $scope.currentList = $scope.searchResultList = data.searchResultListPage.rows;
            }else{
                toastr.success('数据加载失败！');
            }
        }); 

        //上拉刷新
        paginationPage($scope,'.search-result-list-container','searchResultList','searchResultListPage');
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