/*jshint esversion:6*/



console.log("hello world of full stacks !!");
const x = 42;
const foo = (p) => x + p;

$(function () {
    setInterval(function () {
        $(".slideshow ul").animate({
            marginLeft: -350
        }, 800, function () {
            $(this).css({
                marginLeft: 0
            }).find("li:last").after($(this).find("li:first"));
        })
    }, 3500);
});

window.addEventListener("DOMContentLoaded", () => {
    console.log([...document.querySelectorAll("*")]);
    
    if (document.getElementById("FormContact")) mailer.start();
    
});




