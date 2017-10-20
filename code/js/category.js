$(function(){
    $("#categroy_title").on("click",".category_ul>li>a",function(){
        // console.log($(this))  a
        $(this).siblings("ul").toggle();
        //  $(this).parent()  li
        //   $(this).parent().siblings("li")  兄弟元素li
        //  $(this).parent().siblings("li").find("ul")   兄弟元素li的ul
        $(this).parent().siblings("li").find("ul").slideUp();
        //console.log( $(this).attr("data_title_id"));
        var titleid = $(this).attr("data_title_id");
        var $that = $(this);
        getcategoryMenu(titleid,$that)

    })


    getcategoryTitle();

})
function getcategoryTitle(){
    $.ajax({
        url:url+"api/getcategorytitle",
        success:function( data ){
            // console.log(data)
            var html = template("categoryTtileTpl",data);
            $(".category_ul").html(html)
        }
    })
}


function getcategoryMenu(titleid,$that){
    if($that.siblings("ul").find("li").length==0){

         $.ajax({
        url:url+"api/getcategory?titleid="+titleid,
        success:function(data){
            // console.log(data);
            var html = template("categoryMenuTpl",data);
            var $ul = $that.siblings("ul");
            $ul.html(html);
            var lastlis = $ul.children().length%3 ||3 ;
            // console.log(lastlis)
            $ul.children("li:nth-last-child(-n"+lastlis+")").css("border-bottom","none")
        }

    })




    }
   



}