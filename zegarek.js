/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function odliczanie()
    {
    var dzisiaj = new Date();    
        var dzien = dzisiaj.getDate();
        var dzientyg = dzisiaj.getDay();
            var tablica = ["niedziela","poniedziałek","wtorek","środa","czwartek","piątek","sobota"];
        dzientyg = tablica[dzientyg];    
        var miesiac = dzisiaj.getMonth()+1;
        var rok = dzisiaj.getFullYear();
        var godzina = dzisiaj.getHours();
            if (godzina<10) godzina="0"+godzina;
        var minuta = dzisiaj.getMinutes();
            if (minuta<10) minuta="0"+minuta;
        var sekunda = dzisiaj.getSeconds();
            if (sekunda<10) sekunda="0"+sekunda;
        document.getElementById("zegar").innerHTML = "("+dzientyg+") "+dzien+"/"+miesiac+"/"+rok+" | "+godzina+":"+minuta+":"+sekunda;
    setTimeout("odliczanie(),1000");
    }

function sprawdz()
    {
    var liczba = document.getElementById("pole").value;
    if (liczba<0) document.getElementById("wynik").innerHTML="ujemna";
    else if (liczba>0) document.getElementById("wynik").innerHTML="dodatnia";
    else if (liczba=="0") document.getElementById("wynik").innerHTML="zero";    
    else document.getElementById("wynik").innerHTML="zasrany napis albo puste pole";         
    }
    
function sprawdz2()
    {
    var liczba1 = document.getElementById("pole2").value;
    var liczba2 = document.getElementById("pole3").value;
    var napis = "";
    if (liczba1<liczba2)
        {
        for (i=liczba1;i<=liczba2;i++)
            {
            napis=napis+" "+i;    
            }
        document.getElementById("wynik2").innerHTML=napis;            
        }
    else if (liczba1>liczba2)
        {
        for (i=liczba1;i>=liczba2;i--)
            {
            napis=napis+" "+i;    
            }
        document.getElementById("wynik2").innerHTML=napis;     
        }
    else document.getElementById("wynik2").innerHTML="nie da sie :P";
    }
    
//Slajdery----------------------------------------------------------------------

var numer = Math.floor(Math.random()*5)+1;
var numer2 = Math.floor(Math.random()*5)+1;
var timer1 =0;
var timer2 =0;
window.onload = zmianSlajd2;
window.onload = zmianSlajd;


function zmianSlajd()
    {
    numer++;
    if (numer>5) numer=1;
    var plik = "<img src=\"jpg/slajd"+numer+".png\"/>";
    document.getElementById("slajder").innerHTML=plik;
    setTimeout("zmianSlajd()",3000);
    }


function ustawslajd(nrslajdu)
{
    clearTimeout(timer1);
    clearTimeout(timer2);
    numer2 = nrslajdu - 1;
    
    schowaj();
    setTimeout("zmianSlajd2()",500);
}
function schowaj()
{
$("#slajder2").fadeOut(500);    
}
function zmianSlajd2()
    {
    numer2++;
    if (numer2>5) numer2=1;
    var plik = "<img src=\"jpg/slajd"+numer2+".png\"/>";
    document.getElementById("slajder2").innerHTML=plik;
    $("#slajder2").fadeIn(500);
    timer1 = setTimeout("zmianSlajd2()",3000);
    timer2 = setTimeout("schowaj()",2500);
    }

var haslo = "lubie chleb ze smalcem";
haslo = haslo.toUpperCase();
haslo1 = "";
var dl = haslo.length;
for (i=0;i<haslo.length;i++){
    if (haslo.charAt(i)==" ") haslo1=haslo1 + " ";
    else haslo1=haslo1 +"-";
}

//GRA W WISIELCA----------------------------------------------------------------

window.onload = wypisz_haslo;
var litery = new Array(35);
var ile_skuch = 0;
var yes = new Audio("yes.wav");
var no = new Audio("no.wav");


function wypisz_haslo()
{
    document.getElementById("plansza").innerHTML = haslo1;
}

function start()
{
    var tresc_diva = "";    
    litery = ['A','Ą','B','C','Ć','D','E','Ę','F','G','H','I','J','K','L','Ł','M','N','Ń','O','Ó','P','Q','R','S','Ś','T','U','V','W','X','Y','Z','Ż','Ź'];
    for (i=0; i<35; i++)
    {
        var element = "lit"+i;
        tresc_diva = tresc_diva + '<div class="litera" onclick="gra('+i+')" id="'+element+'">'+litery[i]+'</div>';
        if ((i+1)%7 == 0) tresc_diva = tresc_diva + '<div style="clear: both"></div>';
    }
    document.getElementById("alfabet").innerHTML = tresc_diva;
    wypisz_haslo();    
}

String.prototype.ustawZnak = function(miejsce, znak)
{
if (miejsce > this.length - 1) return this.toString();
else return this.substr(0,miejsce) + znak + this.substr(miejsce+1);
}    

function gra(literka)
{
    var trafiona = false;
    //alert(literka); 
    for(i=0;i<dl;i++)
    {   
        if (haslo.charAt(i) == litery[literka])
        {
        //alert(i);
        haslo1 = haslo1.ustawZnak(i,litery[literka]);
        trafiona = true;
        }
    }

    if (trafiona == true)
    {
    yes.play();
    var element = "lit" + literka;
    document.getElementById(element).style.background = "#003300";
    document.getElementById(element).style.color = "#00C000";
    document.getElementById(element).style.border = "2px solid #00C000";
    document.getElementById(element).style.cursor = "default";    
    wypisz_haslo();        
    }
    else
    {
    no.play();
    var element = "lit" + literka;
    document.getElementById(element).style.background = "#330000";
    document.getElementById(element).style.color = "#C00000";
    document.getElementById(element).style.border = "2px solid #C00000";
    document.getElementById(element).style.cursor = "default";
    document.getElementById(element).setAttribute("onclick",";");
    
    //skucha
    ile_skuch=ile_skuch+1;
    var obraz = "img/s"+ile_skuch+".jpg";
    document.getElementById("szubienica").innerHTML = '<img src ="'+obraz+'" alt=""/>';
    }
    //wygrana
    if (haslo == haslo1) document.getElementById("alfabet").innerHTML = "Tak jest!:"+haslo+
       '<br/><br/> <span class="reset" onclick="location.reload()">JESZCZE RAZ?</span>';
    //przegrana
    if (ile_skuch == 9) document.getElementById("alfabet").innerHTML = "PRZEGRANA!"+
       '<br/><br/> <span class="reset" onclick="location.reload()" style="color: red;">JESZCZE RAZ?</span>';
    
}