"use strict";


dxtApp.controller('LookSomethingCtrl',function($scope,$http){
    $('html,body').css({'backgroundColor':'#fff'});  
	//获取推广专题数据
	$http.post('/data/look_something/lookSomething_promoteBar.json',{}).success(function(data){
        if(data.success == true){
            $scope.promoteBarInfo = data.promoteBarInfo;
        }else{
            toastr.success('数据加载失败！');
        }
    }); 

    $scope.url = '/data/look_something/lookSomething_subjectList.json';
    //获取专题列表数据
	$http.post($scope.url,{}).success(function(data){
        if(data.success == true){
            $scope.pageNo = data.subjectListPage.pageNo;
            $scope.totalPages = data.subjectListPage.totalPages;
            $scope.totalSize = data.subjectListPage.totalSize;
            $scope.currentList = $scope.subjectList = data.subjectListPage.rows;
        }else{
            toastr.success('数据加载失败！');
        }
    }); 

    //上拉刷新
    paginationPage($scope,'.look-something-content','subjectList','subjectListPage');

    //查看推广栏详情
    $scope.viewPromoteItemDetail = function(promoteId){
        toastr.success('查看推广栏详情！');
    }

    //查看专题详情
    $scope.viewSubjectDetail = function(subjectId){
        toastr.success('查看专题详情！');
    }
});