
function openNav() {
    document.getElementById("mySidenav").style.width = "280px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

$(document).ready(function () {

    // if(getCurentFileName() == "home")
    //     $('#iMenu').hide();
    // else
    //     $('#iMenu').show();

    var ftr = $(window).height();
    var calculate = ftr - 135;
    $('.body-content').css("min-height", calculate);



$(document).click(function(e){
if( e.target!= $('.fa-list')[0] && e.target != document.getElementById('mySidenav') )
        document.getElementById("mySidenav").style.width = "0";

});

    //$(window).scroll(function () {
    //    if ($(window).scrollTop() > 0) {
    //        var tblProfile = $('#tablProfiles');
    //        tblProfile.css({
    //            'overflow': 'scroll',
    //            'height': '200px'
               
    //        });
    //    } else {
           
    //    }
    //});
    
});



function getCurentFileName(){
    var pagePathName= window.location.pathname;
    return pagePathName.substring(pagePathName.lastIndexOf("/") + 1);
}





   // var myTitle = document.getElementById("Profiles-data-table_wrapper").childNodes[0];
   // myTitle.classList.add("top-paging");

   