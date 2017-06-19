"use strict";

angular.module('common_directive',[])
.directive('pageScroll',function(){
    return {
        link:function(scope, element, attrs){

            var pageContainer = '.'+$(element).attr('page-name');

            // 页数
            var page = 0;
            // 每页展示10个
            var size = 10;

            console.log(scope.storeItemList.length)

            var dropload = $(pageContainer).dropload({
                scrollArea : window,
                domUp : {
                    domClass   : 'dropload-up',
                    domRefresh : '<div class="dropload-refresh">↓下拉刷新-自定义内容</div>',
                    domUpdate  : '<div class="dropload-update">↑释放更新-自定义内容</div>',
                    domLoad    : '<div class="dropload-load"><span class="loading"></span>加载中-自定义内容...</div>'
                },
                domDown : {
                    domClass   : 'dropload-down',
                    domRefresh : '<div class="dropload-refresh">↑上拉加载更多-自定义内容</div>',
                    domLoad    : '<div class="dropload-load"><span class="loading"></span>加载中-自定义内容...</div>',
                    domNoData  : '<div class="dropload-noData">暂无数据-自定义内容</div>'
                },
                loadUpFn : function(me){
                    $.ajax({
                        type: 'GET',
                        url: '/data/find_store/findStore_indexList.json',
                        dataType: 'json',
                        success: function(data){
                            // 为了测试，延迟1秒加载
                            setTimeout(function(){
                                scope.storeItemList = data.storeItemList;
                                // 每次数据加载完，必须重置
                                me.resetload();
                                // 重置页数，重新获取loadDownFn的数据
                                page = 0;
                                // 解锁loadDownFn里锁定的情况
                                me.unlock();
                                me.noData(false);
                            },1000);
                        },
                        error: function(xhr, type){
                            toastr.success('Ajax error!');
                            // 即使加载出错，也得重置
                            me.resetload();
                        }
                    });
                },
                loadDownFn : function(me){
                    page++;
                    // 拼接HTML
                    var result = '';
                    $.ajax({
                        type: 'post',
                        url: '/data/find_store/findStore_indexList.json',
                        dataType: 'json',
                        success: function(data){
                            var arrLen = data.storeItemList.length;

                            if(arrLen > 0){ 
                                scope.storeItemList = scope.storeItemList.concat(data.storeItemList)
                                scope.$apply();
                            // 如果没有数据
                            }else{
                                // 锁定
                                me.lock();
                                // 无数据
                                me.noData();
                            }
                            // 为了测试，延迟1秒加载
                            setTimeout(function(){
                                // 插入数据到页面，放到最后面
                                $('.lists').append(result);
                                // 每次数据插入，必须重置
                                me.resetload();
                            },1000);
                        },
                        error: function(xhr, type){
                            toastr.success('Ajax error!');
                            // 即使加载出错，也得重置
                            me.resetload();
                        }
                    });
                },
                threshold : 50
            });

        }
    }
})
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
                    toastr.success('取消关注啦！'); 
                }else{
                    $(element).removeClass('consultant-follow');
                    $(element).addClass('consultant-already-follow'); 
                    $(element).find('span').html('已关注');
                    followed = true;
                    toastr.success('关注成功啦！'); 
                }
                scope.storeDetailInfo.recommendedConsultants[dataIndex].followed=followed;
                scope.$apply();
                //todo 调用后台接口更新粉丝状态
                $.post('',{'consultant':dataId},function(data){

                });
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
                }
            });
            
        }
    }
});