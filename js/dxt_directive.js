"use strict";

angular.module('common_directive',[])
//取消关注或者关注粉丝事件处理
.directive('followFensi',function(){
    return {
        link:function(scope, element, attrs){

            var elementObj = element[0];

            elementObj.addEventListener('click',function(){
                var followed =  $(element).attr('data-followed'); 
                var dataId = $(element).attr('data-id');
                var dataIndex = $(element).attr('data-index');
                if(followed == 'true'){
                    $(element).removeClass('consultant-already-follow');
                    $(element).addClass('consultant-follow'); 
                    $(element).find('span').html('+ 关注');  
                    followed = false;
                    mui.toast('取消关注啦！',{ duration:'long', type:'div' })
                }else{
                    $(element).removeClass('consultant-follow');
                    $(element).addClass('consultant-already-follow'); 
                    $(element).find('span').html('已关注');
                    followed = true;
                    mui.toast('关注成功啦！',{ duration:'long', type:'div' })
                }
                scope.storeDetailInfo.recommendedConsultants[dataIndex].followed=followed;
                scope.$apply();
                //todo 调用后台接口更新粉丝状态
                // $.post('',{'consultant':dataId},function(data){

                // });
            },false);
        }
    }
})
//我的卖家搜索选择商品，输入文字时隐藏搜索历史信息
.directive('searchHideHistory',function(){
    return {
        link:function(scope, element, attrs){

            $(element).bind('input propertychange', function() {
                var inputVaule = $(element).val();
                if(inputVaule == ''){
                    $('.search-result-list-container').hide();
                    $('.history-search-container').show();
                }else{
                    $('.history-search-container').hide();
                    $('.search-result-list-container').show();
                }
            });
        }
    }
})
//我的卖家搜索选择商品，选择某个商品选中效果
.directive('searchSelectGoods',function(){
    return {
        link:function(scope, element, attrs){

            $(element).click(function(e) {
                if($(element).hasClass('search-result-item')){
                    $(element).siblings('div').removeClass('selected');
                    $(element).siblings('div').find('.iconfont').removeClass('icon-gou');
                    $(element).find('.iconfont').addClass('icon-gou');

                    $(element).addClass('selected'); 

                }else if($(element).hasClass('history-item')){

                    $(element).toggleClass('selected');  
                }else if($(element).hasClass('store-list-item')){
                    $(element).siblings('div').find('.select-icon span').removeClass('icon-xuanzedui');
                    $(element).siblings('div').find('.select-icon span').addClass('icon-quan');
                    $(element).find('.select-icon span').removeClass('icon-quan');
                    $(element).find('.select-icon span').addClass('icon-xuanzedui');
                    scope.selectedStoreId = $(element).attr('data-id');
                    scope.$apply();
                }
            });
            
        }
    }
})
//找潮货-管理收货地址，设置默认地址
.directive('setDefaultGetGoodsAddress',function(){
    return {
        link:function(scope, element, attrs){

            var addressId = $(element).attr('data-id');
            $(element).click(function(e) {
                if($(element).find('.iconfont').hasClass('icon-quan')){
                    $(element).parents('.manage-address-container').find('.set-default .iconfont').removeClass('icon-xuanzedui');
                    $(element).parents('.manage-address-container').find('.set-default span:nth-child(even)').removeClass('default-text');
                    $(element).parents('.manage-address-container').find('.set-default .iconfont').addClass('icon-quan');          
                    $(element).find('.iconfont').addClass('icon-xuanzedui');
                    $(element).find('span:nth-child(even)').addClass('default-text');
                    //todo 调用后台接口修改默认地址   
                    // $.post('',{'addressId':addressId},function(data){

                    // }); 
                }
            });
            
        }
    }
})
//找潮货-添加或者编辑收货地址，初始化选择区域插件
.directive('selectUserArea',function(){
    return {
        link:function(scope, element, attrs){

            (function($, doc) {
                $.init();
                $.ready(function() {
                    //地址
                    var cityPicker3 = new $.PopPicker({
                        layer: 3
                    });
                    cityPicker3.setData(cityData);

                    document.getElementById('userArea').addEventListener('tap', function(event) {
                        document.activeElement.blur();
                        cityPicker3.show(function(items) {
                            if(!(items[2] || {}).text){
                                var cityDom = (items[0] || {}).text + " " + (items[1] || {}).text;
                            } else {
                                var cityDom = (items[0] || {}).text + " " + (items[1] || {}).text + " " + (items[2] || {}).text;
                            }
                            var hcity = (items[0] || {}).text+"";
                            if(hcity != null && hcity != ""){
                                scope.address.getGoodsUserOfProvince = hcity;
                            }

                            var hproper = (items[1] || {}).text+"";
                            if(hproper != null && hproper != ""){
                                scope.address.getGoodsUserOfCity = hproper;
                            }

                            var harea = (items[2] || {}).text+"";
                            if(harea != null && harea != ""){
                                if(harea=='undefined'){
                                    scope.address.getGoodsUserOfArea = '';
                                } else {
                                    scope.address.getGoodsUserOfArea = harea;
                                }
                            }
                            scope.$apply();
                        });
                    }, false);
                });
            })(mui, document);
            
        }
    }
})
.directive('buyGoods',function(){
    return {
        link:function(scope, element, attrs){

            
            
        }
    }
})
;