function ChangeCharacter(character)
{
switch(character)
{
    case "Gerald":
        document.getElementById("img").src = "images/gerald.png";
        document.getElementById("name").innerHTML = "Gerald of Rivia";
        break;
    case "Triss":
        document.getElementById("img").src = "images/triss.png";
        document.getElementById("name").innerHTML = "Triss Merigold";
        break;
    case "Vesemir":
        document.getElementById("img").src = "images/vesemir.png";
        document.getElementById("name").innerHTML = "Vesemir Bodnia";
        break;
    case "Caesar":
        document.getElementById("img").src = "images/caesar.png";
        document.getElementById("name").innerHTML = "Caesar Czar";
        break;
    case "Yennefer":
        document.getElementById("img").src = "images/yennefer.png";
        document.getElementById("name").innerHTML = "Yennefer of Vengerberg";
        break;
}
}