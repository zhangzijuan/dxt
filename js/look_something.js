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

    //获取专题列表数据
	$http.post('/data/look_something/lookSomething_subjectList.json',{}).success(function(data){
        if(data.success == true){
            $scope.subjectList = data.subjectList;
        }else{
            toastr.success('数据加载失败！');
        }
    }); 
    //查看推广栏详情
    $scope.viewPromoteItemDetail = function(promoteId){
        toastr.success('查看推广栏详情！');
    }

    //查看专题详情
    $scope.viewSubjectDetail = function(subjectId){
        toastr.success('查看专题详情！');
    }
});