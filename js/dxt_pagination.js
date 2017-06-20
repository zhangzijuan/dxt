/**
 * 分页函数调用
 * @param scope 全局变量
 * @param element 对应分页元素
 * @param listName 页面上循环的对象
 * @param page json数据中返回的分页对象 
 */
var hasRequest = false;
var paginationPage = function (scope, element, listName ,page) {

    if (!element || !page) {
        return;
    }

    //解绑事件
    $(window).off('scroll.' + listName);
    $(window).on('scroll.' + listName, function (e) {
        if ($(element).length == 0) {
            return;
        }
        var pageNo = Number(scope.pageNo);
        var $this = $(this), windowScrollTop = $this.scrollTop(), loading = $(".wx-list-loading").outerHeight();
        var isBottom = ((windowScrollTop + $this.height() >= $(element).outerHeight()) && pageNo < scope.totalPages);
        if (scope.totalPages <= 1) {
            scope.bottomShow = false;
            scope.$apply();
        }

        if (isBottom && !hasRequest) {
            hasRequest = true;
            scope.bottomPrompt = true;
            pageNo = Number(scope.pageNo) + 1;
            if (pageNo == scope.pageNo) {
                return false;
            }
            scope.pageNo = pageNo;
            var url = scope.url;
            url = (url.lastIndexOf("?")>-1)? url+"&":url+"?";
            $.post(url + 'page.pageNo=' + pageNo).success(function (data) {
                hasRequest = false;
                var newRequestList ;   
                newRequestList = data[page].rows;
                var preRequestList = scope.currentList;
                var preRequestListLength = preRequestList.length;
                for (var i = 0; i < newRequestList.length; i++) {
                    preRequestList[preRequestListLength + i] = newRequestList[i];
                }
                scope.currentList = preRequestList;
                listName && (scope[listName] = scope.currentList);
                scope.pageNo = data[page].pageNo;
                if (scope.pageNo < scope.totalPages) {
                    scope.bottomShow = true;
                } else {
                    scope.bottomShow = false;
                }
                scope.$apply();
                //寻好店首页列表
                if(page == "storeListPage"){
                    scope.renderStoreListView();        
                }
            }).error(function () {
                hasRequest = false;
            });
        }
    });
};