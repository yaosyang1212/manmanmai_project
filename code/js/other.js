$(function(){
    // console.log(GetQueryString("category"))
    // console.log(GetQueryString("categoryid"));
    var categoryid = GetQueryString("categoryid");
    var pageid = GetQueryString("pageid");
    getNav(categoryid);
    getProduct(categoryid,pageid)

})
// 获取地址栏当中的参数
function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}


function getNav(categoryid){
    $.ajax({
        url:url+"api/getcategorybyid?categoryid="+categoryid,
        success:function(data){
            // console.log(data)
            // console.log(data.result)
            // console.log(data.result[0])
            var productlistName = (data.result[0].category);
            $(".product_name").html(productlistName);
        }
    })
}


function getProduct(categoryid,pageid){
    var pageid = parseInt(pageid);
   $.ajax({
        url:url+"api/getproductlist",
        data:{
            "categoryid":categoryid,
            "pageid":pageid||1
        },
        success:function(data){
            var html = template("productlistTpl",data);
            $("#productlist ul").html(html);
            var pagesize = data.pagesize;
            // console.log(pagesize)
            var totalCount = data.totalCount;
            // console.log(totalCount)
            var page = parseInt(Math.ceil(totalCount/pagesize));
            // console.log(page)
            var option ="";
            for(var i = 0;i<page;i++){
               if((i+1)==pageid){
                    option+="<option selected value="+(i+1)+">第"+(i+1)+"页</option>"
               }else{
                   option+="<option value="+(i+1)+">第"+(i+1)+"页</option>";
               }
            }
            // console.log(option)
             $("#select").html(option);
             $("#select").on("change",function(){
                console.log($(this).val());
                window.location.href="./productlist.html?category=电视&categoryid="+categoryid+"&pageid="+$(this).val();
             })
             var previousUrl = "./productlist.html?category=电视&categoryid="+categoryid+"&pageid="+(pageid-1)
             var nextUrl = "./productlist.html?category=电视&categoryid="+categoryid+"&pageid="+(pageid+1)

             $(".previous a").attr("href",previousUrl);
             $(".next a").attr("href",nextUrl);

        }
   })
}
