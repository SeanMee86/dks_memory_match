var count = 1;
var clickCount = 0;
var first_card_clicked = null;
var second_card_clicked = null;
var match_counter = 0;
var games_played = 0;
var canIflip = true;
var i=0;


$(document).ready(function(){
    $("#backgroundMusic").get(0).play();
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
function card_clicked(){
    $('.container').on('click', function () {
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
        case 'url("http://52.43.235.31/memory_match/images/artorias.jpg")':
            $('#artorias').get(0).play();
            break;
        case 'url("http://52.43.235.31/memory_match/images/brador.jpg")':
            $('#brador').get(0).play();
            break;
        case 'url("http://52.43.235.31/memory_match/images/eileen.jpg")':
            $('#eileen').get(0).play();
            break;
        case 'url("http://52.43.235.31/memory_match/images/iosefka.jpg")':
            $('#iosefka').get(0).play();
            break;
        case 'url("http://52.43.235.31/memory_match/images/lady_maria.jpg")':
            $('#lady_maria').get(0).play();
            break;
        case 'url("http://52.43.235.31/memory_match/images/logan.jpg")':
            $('#logan').get(0).play();
            break;
        case 'url("http://52.43.235.31/memory_match/images/ornstein.jpg")':
            $('#ornstein').get(0).play();
            break;
        case 'url("http://52.43.235.31/memory_match/images/oscar.jpg")':
            $('#oscar').get(0).play();
            break;
        case 'url("http://52.43.235.31/memory_match/images/quelaag.jpg")':
            $('#quelaag').get(0).play();
            break;
    }
}
//**********************************************************************************************************
function checkMatch(){
    if(first_card_clicked === second_card_clicked && match_counter < 8 ){
        audioPlay();
        clickCount++;
        match_counter++;
        cardDefault();
    }
    else if (first_card_clicked !== second_card_clicked) {
        clickCount++;
        setTimeout(flipBack, 800);
    }
    else {
        audioPlay();
        match_counter++;
    }
}
//**********************************************************************************************************
function resetGame() {
    $('#reset').click(function () {
        $('.flipped').removeClass('flipped');
        $('.attempt .value').html("");
        $('.accuracy .value').html("");
        count=1;
        games_played++;
        $('.games-played .value').text(games_played);
        clickCount=0;
        match_counter=0;
        cardDefault();
        $('#staminaAnimation').css('animation-name','staminaLoss');
    });
}
function takeDamage(n){
    var maxHealth = $('#health').css('width');
    maxHealth = maxHealth.slice(0,maxHealth.length-2);
    maxHealth = parseInt(maxHealth);
    var currentHealth = maxHealth - (maxHealth*(n/6));
    function setNewHealth() {
        $("#health").css('width', currentHealth + 'px');
        if(n === 7){
            $("#stamina").removeClass('staminaAnimation');
            $("#health").css('width','100%');
        }
    }
    setTimeout(setNewHealth, 10000*n);
    if(n<=6){
        return takeDamage(n+1);
    }
}
//**********************************************************************************************************
function gameInit(){
    applyBackground();
    card_clicked();
    resetGame();
    takeDamage(1);
}
