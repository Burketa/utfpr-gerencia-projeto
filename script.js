var repositorio_nome = "/burketa/utfpr-gerencia-projeto/"; //modifique somente esta linha

var repositorio_api = "https://api.github.com/repos" + repositorio_nome;
var repositorio = "https://raw.githubusercontent.com" + repositorio_nome + "master/";

function zoomin() {
    var myImg = document.getElementById("sky");
    var currWidth = myImg.clientWidth;
    myImg.style.width = (currWidth + 100) + "px";
}

function zoomout() {
    var myImg = document.getElementById("sky");
    var currWidth = myImg.clientWidth;
    myImg.style.width = (currWidth - 100) + "px";
}

function nozoom() {
    var myImg = document.getElementById("sky");
    var currWidth = myImg.clientWidth;
    myImg.style.width = "500px";
}


function lerGitHubTag(elementID, elementID2) {
    var requestURL = repositorio_api.concat("tags");
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();

    request.onload = function () {
        var MyJson = request.response;
        document.getElementById(elementID).innerHTML = "Tag:" + MyJson[0].name;
        document.getElementById(elementID2).innerHTML = MyJson[0].commit.sha;
    }
}

function lerGitHubCommit(elementID, tamanho) {
    var requestURL = repositorio_api.concat("commits");
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();

    request.onload = function () {
        var MyJson = request.response;
        if (tamanho > 0) {
            document.getElementById(elementID).innerHTML = "  (" + MyJson[0].sha.substring(0, tamanho) + ")";
        } else {
            document.getElementById(elementID).innerHTML = MyJson[0].sha;
        }
    }
}

function createTable_file(vetor, elementID) {
    var array = vetor;
    var content = "";
    var cabec = true;
    array.forEach(function (row) {
        if (cabec) {
            content += "<thead>";
        }
        content += "<tr>";
        row.forEach(function (cell) {
            content += "<td>" + cell + "</td>";
        });
        content += "</tr>";
        if (cabec) {
            content += "</thead>";
            cabec = false;
        }
    });
    document.getElementById(elementID).innerHTML = content;
}

var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }
    });
}

function parseResult(result) {
    var resultArray = [];
    result.split("\n").forEach(function (row) {
        var rowArray = [];
        row.split(",").forEach(function (cell) {
            rowArray.push(cell);
        });
        resultArray.push(rowArray);
    });
    return resultArray;
}


function readTextFile(file, elementID) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                var allText = rawFile.responseText;
                createTable_file(parseResult(allText), elementID);

            }
        }
    }
    rawFile.send(null);
}


function readTextFileDiv(file, elementID) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                var allText = rawFile.responseText;

                document.getElementById(elementID).innerHTML = allText;
            }
        }
    }
    rawFile.send(null);
}

/*
readTextFile("https://raw.githubusercontent.com/alerario/teste/master/processo/tarefas.csv",1);
readTextFile("https://raw.githubusercontent.com/alerario/teste/master/processo/artefatos.csv",2);
readTextFile("https://raw.githubusercontent.com/alerario/teste/master/processo/artefatos.csv",3);
readTextFileDiv("https://raw.githubusercontent.com/alerario/teste/master/processo/grupo.txt","grupo");
readTextFileDiv("https://raw.githubusercontent.com/alerario/teste/master/processo/autores.txt","autores");
readTextFileDiv("https://raw.githubusercontent.com/alerario/teste/master/processo/autores.txt","descricao");
*/
repositorio
readTextFile(repositorio + "tarefas.csv", 1);
readTextFile(repositorio + "artefatos.csv", 2);
readTextFile(repositorio + "papeis.csv", 3);
readTextFileDiv(repositorio + "grupo.txt", "grupo");
readTextFileDiv(repositorio + "autores.txt", "autores");
readTextFileDiv(repositorio + "autores.txt", "descricao");



lerGitHubTag("ultimatag");
lerGitHubCommit("ultimocommit", 5);
lerGitHubTag("utag", "utagc");
lerGitHubCommit("ucommit", 0);