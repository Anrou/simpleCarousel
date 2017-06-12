
document.addEventListener("DOMContentLoaded", ready);
function ready() {
    Slider();
}


function Slider() {

    var slidBlock = document.querySelectorAll('.slid__block'),
        slider , sliderUl , div , sliderUlChildren , selector,auto;

    slider = document.querySelector(".slider");
    sliderUl = slider.children[0];
    div = slider.children;

    function colorGenerator() {
        var  color = '#';
        var letters = '0123456789ABCDEF';
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

        for(var i = 0; i< slidBlock.length; i++){
            slidBlockAll = slidBlock[i];
            slidBlockAll.style.width = window.innerWidth + 'px' ;
            slidBlockAll.style.height = window.innerHeight + 'px';
            slidBlockAll.style.backgroundColor = colorGenerator();
        }

    function reset(){
        'use strict';
        for ( var i =  0 ; i < sliderUl.children.length;i++ )
        {
            sliderUl.children[i].style.width = slider.offsetWidth + 'px';
        }
        sliderUl.style.width = slider.offsetWidth * sliderUl.children.length + 'px';
    };
    reset();
    window.onresize = function(){ reset() }

    function slide(){
        for ( var i = 1 ; i < div.length ; i++  )
        {
            div[i].onclick = function(){
                'use strict';
                selector = document.querySelector('.active');
                if( this.className =="next" )
                {
                    if( selector == sliderUl.children[sliderUl.children.length - 1] )
                    {
                        selector.classList.remove('active');
                        sliderUl.children[0].classList.add('active');
                        sliderUl.style.left ='0px';
                    }
                    else
                    {
                        selector.classList.remove('active');
                        selector.nextElementSibling.classList.add('active');
                        sliderUl.style.left = -( selector.offsetLeft+slider.offsetWidth )+'px';
                    }
                }
                else
                {
                    if( selector == sliderUl.children[0] )
                    {
                        selector.classList.remove('active');
                        sliderUl.children[sliderUl.children.length - 1].classList.add('active');
                        sliderUl.style.left =-(slider.offsetWidth * (sliderUl.children.length - 1)) + 'px';
                    }
                    else
                    {
                        selector.classList.remove('active');
                        selector.previousElementSibling.classList.add('active');
                        sliderUl.style.left = -( selector.offsetLeft-slider.offsetWidth )+'px';

                    }
                }
            };
        }
    };

    function autoPlay(){
        auto = setInterval(function(){
            document.getElementsByClassName('next')[0].click();
        },4000)
    };

    for ( var i = 1 ; i < div.length ; i++  )
    {
        div[i].onmouseenter = function(){ clearInterval(auto) };
        div[i].onmouseleave = function(){ autoPlay() };
    }

    slide();
    autoPlay();

}
