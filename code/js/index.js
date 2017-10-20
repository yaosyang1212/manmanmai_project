$(function(){
    $("#menu").on("click",".row>div:nth-child(8)",function(){
         $("#menu>.row>div:nth-last-child(-n+4)").toggle();

    })

//获取menu数据
   getMenuStyle();

   getRecommendStyle()

})
//menu数据 B
 function getMenuStyle(){
        $.ajax({
            url:url+"api/getindexmenu",
            success:function(data){
                // console.log(data)
                var html = template("indexMenuTpl",data)
                $("#menu .row").html(html);
            }

        })
 }

//menu数据 E

//  recommend 数据 B
function getRecommendStyle(){
    $.ajax({
        url:url+"api/getmoneyctrl",
        success:function(data){
            // console.log(data)
            var html = template("indexRecommendTpl",data)
            $(".recommend_product").html(html)
        }



    })
}







//  recommend 数据 E


