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
    $("#time").html("30");
    $('.progress-bar').css('width', 0 + '%').attr('aria-valuenow', 0);


    if (isTimeOut) {
        $("#myModalLabel").html("Time's Up!!!");
    } else {
        $("#myModalLabel").html("That's Incorrect...");
    }

    var message;
    if (minOrMax == 0) {
        message = "The minimum value was " + min + ". Your Score is " + clickCount + "/15. Try again... "
    } else {
        message = "The maximum value was " + max + ".  Your Score is " + clickCount + "/15. Try again..."
    }
    $('#modal-body-text').html(message);

    updateTweetButtonText('I have scored ' + clickCount + '/15 on #MinMax30. ');

    $('#myModal').modal('show');

    $('#myModal').on('hidden.bs.modal', function () {
        clickCount = 0;
        newStep();
        startGame();
    })

}

function gameWon() {
    stopTimer();
    timerId = null;
    $("#time").html("30");
    $('.progress-bar').css('width', 0 + '%').attr('aria-valuenow', 0);

    $("#myModalLabel").html("Congratulations!!!");

    var message = "You've won MinMax30. Your Score is 15/15.";

    $('#modal-body-text').html(message);

    updateTweetButtonText('I have scored ' + clickCount + '/15 on #MinMax30. ');

    $('#myModal').modal('show');

    $('#myModal').on('hidden.bs.modal', function () {
        clickCount = 0;
        newStep();
        startGame();
    })
}

function updateTweetButtonText(message) {
    var tweetButton = document.getElementById('tweet-button');
    tweetButton.src = tweetButton.src.replace(/\?text=[^&]+/, "?text=" + encodeURIComponent(message));
}

function checkAnswer(divId) {
    if (timerId == null) {
        startTimer();
    }

    var divTag = "#" + divId;
    var value = $(divTag).text();
    value = parseInt(value);

    if (minOrMax == 0 && value != min) {
        showModalAndReset(false);
    } else if (minOrMax == 1 && value != max) {
        showModalAndReset(false);
    } else {
        clickCount++;
        $('.progress-bar').css('width', clickCount * 6.66 + '%').attr('aria-valuenow', clickCount * 6.66);
        if (clickCount == 15) {
            gameWon();
            return;
        }
        newStep();
        startGame();
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
    //todo find a workaround for this ugly code
    $('#block-div-1').click(function () {
        checkAnswer("block-div-1");
    });
    $('#block-div-2').click(function () {
        checkAnswer("block-div-2");
    });
    $('#block-div-3').click(function () {
        checkAnswer("block-div-3");
    });
    $('#block-div-4').click(function () {
        checkAnswer("block-div-4");
    });
    $('#block-div-5').click(function () {
        checkAnswer("block-div-5");
    });
    $('#block-div-6').click(function () {
        checkAnswer("block-div-6");
    });
    $('#block-div-7').click(function () {
        checkAnswer("block-div-7");
    });
    $('#block-div-8').click(function () {
        checkAnswer("block-div-8");
    });
    $('#block-div-9').click(function () {
        checkAnswer("block-div-9");
    });
    $('#block-div-10').click(function () {
        checkAnswer("block-div-10");
    });
    $('#block-div-11').click(function () {
        checkAnswer("block-div-11");
    });
    $('#block-div-12').click(function () {
        checkAnswer("block-div-12");
    });
    $('#block-div-13').click(function () {
        checkAnswer("block-div-13");
    });
    $('#block-div-14').click(function () {
        checkAnswer("block-div-14");
    });
    $('#block-div-15').click(function () {
        checkAnswer("block-div-15");
    });
    $('#block-div-0').click(function () {
        checkAnswer("block-div-16");
    });
}