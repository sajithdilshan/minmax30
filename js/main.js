/*
 This file is part of MinMax30 Developed by Sajith Dilshan.

 MinMax30 is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 MinMax30 is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with MinMax30.  If not, see <http://www.gnu.org/licenses/>.

 */

var timerId,
    minOrMax,
    min,
    max,
    clickCount = 0;

$(document).ready(function () {
    newStep();
    startGame();

});

function showModalAndReset(isTimeOut) {
    stopTimer();
    timerId = null;
    $("#time").html("5");
    $("#progress-bar").html("0");
    var score = clickCount * 10;
    clickCount = 0;

    if (isTimeOut) {
        $("#myModalLabel").html("Time's Up!!!");
    } else {
        $("#myModalLabel").html("That's Incorrect...");
    }

    var message;
    if (minOrMax == 0) {
        message = "The minimum value was " + min + ". Your Score is " + score + ". Try again... "
    } else {
        message = "The maximum value was " + max + ".  Your Score is " + score + ". Try again..."
    }
    $('#modal-body-text').html(message);

    updateTweetButtonText('I have scored ' + score + ' on #MinMax30. ');

    $('#myModal').modal('show');

    $('#myModal').on('hidden.bs.modal', function () {
        newStep();
    })

}

function updateTweetButtonText(message) {
    var tweetButton = document.getElementById('tweet-button');
    tweetButton.src = tweetButton.src.replace(/\?text=[^&]+/, "?text=" + encodeURIComponent(message));
}

function checkAnswer(divId) {
    stopTimer();
    timerId = null;
    $("#time").html("5");

    var divTag = "#" + divId;
    var value = parseInt($(divTag).text());

    if (minOrMax == 0 && value != min) {
        showModalAndReset(false);
    } else if (minOrMax == 1 && value != max) {
        showModalAndReset(false);
    } else {
        clickCount++;
        $("#progress-bar").html(clickCount * 10);
        newStep();
        startTimer();
    }
}

function newStep() {
    var numList = generateNumbers(10, 99);
    max = Math.max.apply(Math, numList);
    min = Math.min.apply(Math, numList);

    drawBlocks(numList);

    var random = Math.random();
    if (random <= 0.5) {
        $("#minmax-text").html("Min");
        minOrMax = 0;
    } else {
        $("#minmax-text").html("Max");
        minOrMax = 1
    }
}

function startTimer() {
    timerId = setInterval(function () {
        timerFunc()
    }, 1000);
}

function stopTimer() {
    clearInterval(timerId);
}

function timerFunc() {
    var currentTime = $("#time").text();
    var newTime = parseInt(currentTime, 10) - 1;
    $("#time").html(newTime);

    if (newTime == 0) {
        showModalAndReset(true);
    }
}

function drawBlocks(numList) {
    var htmlString = "";
    for (var i = 0; i < numList.length; i++) {
        var remainder = numList[i] % 4;
        var blockClass;
        switch (remainder) {
            case 0:
                blockClass = "block-blue";
                break;
            case 1:
                blockClass = "block-green";
                break;
            case 2:
                blockClass = "block-purple";
                break;
            case 3:
                blockClass = "block-orange";
                break;
        }
        htmlString = htmlString + '<div ' + 'id="block-div-' + i + '" class="' + blockClass + '">' + numList[i] + '</div>';
    }
    $('#block-container').html(htmlString);
}

function generateNumbers(lowerBound, upperBound) {
    var limit = 10,
        amount = 16,
        uniqueRandomNumbersList = [];

    if (amount > limit) limit = amount;
    while (uniqueRandomNumbersList.length < limit) {
        var randomNumber = Math.round(Math.random() * (upperBound - lowerBound) + lowerBound);
        if (uniqueRandomNumbersList.indexOf(randomNumber) == -1) {
            uniqueRandomNumbersList.push(randomNumber);
        }
    }
    return uniqueRandomNumbersList
}


function startGame() {
    $('#block-container').click(function (e) {
        e.stopPropagation();
        checkAnswer(e.target.id);
    });
}