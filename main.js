var count = 1;
var clickCount = 0;
var first_card_clicked = null;
var second_card_clicked = null;
var match_counter = 0;
var games_played = 0;
var canIflip = true;
var mismatchesAllowed = 10;
var i=0;
var darkEnding = "https://www.youtube.com/embed/LrywuSxARcY?autoplay=1";
var youDied = "https://www.youtube.com/embed/jtI_1SJMCb8?autoplay=1";


$(document).ready(function(){
    // $("#backgroundMusic").get(0).play();
    gameInit();
});


//**********************************************************************************************************
function randomizeBackground(){
    var imagesArray = ['images/artorias.jpg','images/brador.jpg','images/eileen.jpg','images/iosefka.jpg','images/lady_maria.jpg','images/logan.jpg','images/ornstein.jpg','images/oscar.jpg','images/quelaag.jpg','images/artorias.jpg','images/brador.jpg','images/eileen.jpg','images/iosefka.jpg','images/lady_maria.jpg','images/logan.jpg','images/ornstein.jpg','images/oscar.jpg','images/quelaag.jpg'];
    var randomArray =[];
    for(var i=0;i<18;i++){
        var randomNumber = Math.floor(Math.random()*imagesArray.length);
        randomArray.push(imagesArray[randomNumber]);
        imagesArray.splice(randomNumber, 1);
    }
    return randomArray;
}
var backgroundArray = randomizeBackground();
//**********************************************************************************************************
function applyBackground(){
    for(var i =1; i<=backgroundArray.length; i++){
        $('#card'+i).css('background-image',"url("+backgroundArray[i-1]+")");
    }
}
//**********************************************************************************************************
function isSoundPaused(audio){
    var isSoundPaused;
    for(var i=0; i<audio.length; i++){
        if(audio[i].paused){
            isSoundPaused = true;
        }
        else{
            isSoundPaused = false;
            break;
        }
    }
    return isSoundPaused;
}
function card_clicked(){
    $('.container').on('click', function () {
        if(isSoundPaused($('.dialogue'))) {
            if (!$(this).find('.flip').hasClass('flipped')) {
                if (canIflip === true) {
                    if (first_card_clicked === null) {
                        $(this).find('.flip').addClass('flipped');
                        first_card_clicked = $(this).find('.back').css('background-image');
                        clickCount++;
                    }
                    else {
                        if (!$(this).find('.flip').hasClass('flipped')) {
                            $(this).find('.flip').addClass("flipped");
                            second_card_clicked = $(this).find('.back').css('background-image');
                            canIflip = false;
                            checkMatch();
                        }
                    }
                    if (clickCount % 2 === 0) {
                        $('.attempt .value').text(count++);
                        $('.accuracy .value').html((((match_counter) / (clickCount / 2)) * 100).toFixed(0) + "%");
                    }
                }
            }
        }
    });
}
//**********************************************************************************************************
function cardDefault(){
    first_card_clicked = null;
    second_card_clicked = null;
    canIflip = true;
}
//**********************************************************************************************************
function flipBack() {
    $('.flipped').filter(function () {
        var back = $(this).find('.back');
        var source = back.css('background-image');
        return source === first_card_clicked || source === second_card_clicked;
    }).removeClass('flipped');
    cardDefault();
}

//**********************************************************************************************************
function audioPlay(){
    switch (first_card_clicked){
        case 'url("https://dev.seanmeedev.com/dks_memory_match/images/artorias.jpg")':
            $('#artorias').get(0).play();
            break;
        case 'url("https://dev.seanmeedev.com/dks_memory_match/images/brador.jpg")':
            $('#brador').get(0).play();
            break;
        case 'url("https://dev.seanmeedev.com/dks_memory_match/images/eileen.jpg")':
            $('#eileen').get(0).play();
            break;
        case 'url("https://dev.seanmeedev.com/dks_memory_match/images/iosefka.jpg")':
            $('#iosefka').get(0).play();
            break;
        case 'url("https://dev.seanmeedev.com/dks_memory_match/images/lady_maria.jpg")':
            $('#lady_maria').get(0).play();
            break;
        case 'url("https://dev.seanmeedev.com/dks_memory_match/images/logan.jpg")':
            $('#logan').get(0).play();
            break;
        case 'url("https://dev.seanmeedev.com/dks_memory_match/images/ornstein.jpg")':
            $('#ornstein').get(0).play();
            break;
        case 'url("https://dev.seanmeedev.com/dks_memory_match/images/oscar.jpg")':
            $('#oscar').get(0).play();
            break;
        case 'url("https://dev.seanmeedev.com/dks_memory_match/images/quelaag.jpg")':
            $('#quelaag').get(0).play();
            break;
    }
}
//**********************************************************************************************************
function playVideo(video){
    $('iframe')[0].src=video;
}
function showModal(){
    $('.modal').css("display","block");
}
function checkMatch(){
    if(first_card_clicked === second_card_clicked && match_counter < 8  ){
        audioPlay();
        clickCount++;
        match_counter++;
        cardDefault();
    }
    else if (first_card_clicked !== second_card_clicked) {
        mismatchesAllowed--;
        takeDamage(mismatchesAllowed);
        if(mismatchesAllowed <= 0){
            showModal();
            playVideo(youDied);
        }
        clickCount++;
        setTimeout(flipBack, 800);
    }
    else{
        audioPlay();
        match_counter++;
        var currentTrackLength;
        for(var i=0;i<$('.dialogue').length; i++){
            if(!$('.dialogue')[i].paused){
                currentTrackLength = $('.dialogue')[i].duration*1000;
            }
        }
        setTimeout(function() {
            showModal();
            playVideo(darkEnding);
        },currentTrackLength);
    }
}
//**********************************************************************************************************
function resetGame() {
    $('.flipped').removeClass('flipped');
    $('.attempt .value').html("");
    $('.accuracy .value').html("");
    count = 1;
    mismatchesAllowed = 10;
    games_played++;
    $('#health').css("width","100%");
    $('.games-played .value').text(games_played);
    clickCount = 0;
    match_counter = 0;
    cardDefault();
    $('#staminaAnimation').css('animation-name','staminaLoss');

}
function modalClose(){
    $('.modal').click(function(){
        $('.modal').css("display","none");
        $('iframe')[0].src='';
        resetGame();
    })
}
function takeDamage(mismatchCountdown){
    var health = 10*mismatchCountdown;
    $('#health').css("width",`${health}%`);
}
//**********************************************************************************************************
function gameInit(){
    applyBackground();
    card_clicked();
    $('#reset').click(resetGame);
    modalClose();
}
