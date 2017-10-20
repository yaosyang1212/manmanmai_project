$(function () {
    console.log(GetQueryString("categoryid"));
    var categoryid = GetQueryString("categoryid");
    getNav(categoryid)
    var pageid = GetQueryString("pageid")
    // console.log(pageid)
    getProductList(categoryid, pageid)
})

function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

function getNav(categoryid) {
    $.ajax({
        url: url + "api/getcategorybyid?categoryid=" + categoryid,
        success: function (data) {
            // console.log(data)
            // console.log(data.result)
            // console.log(data.result[0])
            // console.log(data.result[0].category)
            $(".product_name").html(data.result[0].category)
        }
    })
}
function getProductList(categoryid, pageid) {
    var pageid = parseInt(pageid);
    $.ajax({
        url: url + "api/getproductlist",
        data: {
            "categoryid": categoryid,
            "pageid": pageid || 1
        },
        success: function (data) {
            // console.log(data)
            var html = template("prosuct_listTpl", data);
            $("#product_list ul").html(html)
            var pagesize = data.pagesize;
            var totalCount = data.totalCount;
            var page = parseInt(Math.ceil(totalCount / pagesize));
            option = "";
            for (var i = 0; i < page; i++) {
                if ((i + 1) == pageid) {
                    option += " <option selected value=" + (i + 1) + ">第" + (i + 1) + "页</option>"
                } else {
                    option += " <option value=" + (i + 1) + ">第" + (i + 1) + "页</option>"
                }

            }
            //   console.log(option)
            $("#select").html(option)
            $("#select").on("change", function () {
                console.log($(this).val())
                window.location.href = "./productlist.html?categoryid=" + categoryid + "&pageid=" + $(this).val();
            })
            var previousUrl = "./productlist.html?categoryid=" + categoryid + "&pageid=" + (pageid - 1);
            var nextUrl = "./productlist.html?categoryid=" + categoryid + "&pageid=" + (pageid + 1);
            if (pageid == 1) {
                previousUrl = "./productlist.html?categoryid=" + categoryid + "&pageid=1";
            }if(pageid==page){
                nextUrl = "./productlist.html?categoryid=" + categoryid + "&pageid="+page;
            }


            $(".previous a").attr("href", previousUrl)
            $(".next a").attr("href", nextUrl)
        }
    })


}