/**
 * Created by Phuong Anh Nguyen on 10/29/2015.
 */
window.EVENTCODE="JpiI-L7mLwj8jFtCmlSLnd9f1mUnPbGavCvmaI6blOV";
$(document).ready(function(){
    var client = new Asteroid('localhost:3000');
    $('.modal-trigger').leanModal({
        dismissible: true, // Modal can be dismissed by clicking outside of the modal
        opacity: .5, // Opacity of modal background
        in_duration: 300, // Transition in duration
        out_duration: 200, // Transition out duration
        //ready: function() { alert('Ready'); }, // Callback for Modal open
        //complete: function() { alert('Closed'); } // Callback for Modal close
    });
    $('select').material_select();
    $('.dropdown-button').dropdown({
        inDuration: 200,
        outDuration: 300,
        constrain_width: true, // Does not change width of dropdown to that of the activator
        hover: false, // Activate on hover
        gutter: 0, // Spacing from edge
        belowOrigin: false, // Displays dropdown below the button
        alignment: 'left', // Displays dropdown with edge aligned to the left of button
    });
    $('ul.dropdown-content.validate.chuongtrinh').on('click', function(event){
        event.stopPropagation();
    });
    $('ul.dropdown-content.validate.hinhthucduhoc').on('click', function(event){
        event.stopPropagation();
    });
    $('ul.dropdown-content.validate.kenh').on('click', function(event){
        event.stopPropagation();
    });
    $('#dk-form').on('submit', function (e) {
        e.preventDefault();
            var hovaten = $("#hovaten").val();
            var sodienthoai = $("#sodt").val();
            var email = $("#email").val();
            var nguoidangkyla = $("#danhtinh").val();
            var chuongtrinh = "";
            var hinhthucduhoc = "";
            var thoigianduhoc = $("#tgduhoc").val();
            var thanhphodangsong = $("#diachi").val();
            var bietchuongtrinhquakenh = "";
            jQuery("input[name='dh[]']:checked").each(function () {
                chuongtrinh = chuongtrinh + ', ' + jQuery(this).val();
            });
            if (chuongtrinh.length > 1) {
                chuongtrinh = chuongtrinh.substring(1);
            }
            jQuery("input[name='chk[]']:checked").each(function () {
                hinhthucduhoc = hinhthucduhoc + ', ' + jQuery(this).val();
            });
            if (hinhthucduhoc.length > 1) {
                hinhthucduhoc = hinhthucduhoc.substring(1);
            }
            jQuery("input[name='kenh[]']:checked").each(function () {
                bietchuongtrinhquakenh = bietchuongtrinhquakenh + ', ' + jQuery(this).val();
            });
            if (bietchuongtrinhquakenh.length > 1) {
                bietchuongtrinhquakenh = bietchuongtrinhquakenh.substring(1);
            }
            if(hovaten && sodienthoai && email && thanhphodangsong && nguoidangkyla && chuongtrinh && hinhthucduhoc && thoigianduhoc && bietchuongtrinhquakenh) {
                var obj = {
                    hovaten: hovaten,
                    sodienthoai: sodienthoai,
                    email: email,
                    thanhphodangsong: thanhphodangsong,
                    nguoidangkyla: nguoidangkyla,
                    chuongtrinh: chuongtrinh.split(",").map(function(i){return i.trim()}),
                    hinhthucduhoc: hinhthucduhoc.split(",").map(function(i){return i.trim()}),
                    thoigianduhoc: thoigianduhoc,
                    bietchuongtrinhquakenh: bietchuongtrinhquakenh.split(",").map(function(i){return i.trim()})
                }
                console.log(obj);
                //window.location.href = '/thankyou.html';
                var ret = client.call('registerEventGLVH', window.EVENTCODE, obj);
                ret.result
                    .then(function (result) {
                        if(result && result !== 'FAILED'){
                            /*analytics.identify(result, {
                             name : obj.hovaten,
                             email : obj.email,
                             phone : obj.sodienthoai
                             },{
                             anonymousId : analytics.user().anonymousId()
                             });*/
                            window.location.href = '/thankyou.html';
                        }
                    }).catch(function (error) {
                        console.error('Error:', error);
                    });
            }
            else {alert("Chua nhap du thong tin")};
            return false;
    });
    /*$(document).on('click','.navbar-nav li a', function(event) {
        event.preventDefault();
        $('.navbar-nav li').each(function(){
            $(this).removeClass('active');
        });
        $(this).parent().addClass('active');
        var target = "#" + this.getAttribute('data-target');
        $('html, body').animate({
            scrollTop: ($(target).offset().top - 50)
        }, 1000);
    });*/
});
