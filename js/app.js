$(document).ready(function(){
  var $setMin = 0;
  var $setBreak = 5;
  var $setWork = 25;
  var $oneTime = true;
  var $timerOff = true;
  var $reset = false;
  var $finish = false;
  var $timerHTML = $setWork;
  var $breakHTML = $setBreak;
  var $workHTML = $setWork;
  var $seconds = 60;
  var $countingDown;
  $('#timer-type').html("SESSION");
  $('#timer').html(`${$timerHTML}:00`);
  $('#breaktime').html($breakHTML);
  $('#worktime').html($workHTML);
  const countDown = () => {
    $countingDown = setInterval(function() {
      $seconds -= 1;
      if ($setMin.toString().match(/[0-9]/g).length === 1 && $seconds.toString().match(/[0-9]/g).length === 1) {
        $timerHTML = `0${$setMin}:0${$seconds}`;
      } else if ($setMin.toString().match(/[0-9]/g).length === 1) {
        $timerHTML = `0${$setMin}:${$seconds}`;
      } else if ($seconds.toString().match(/[0-9]/g).length === 1) {
        $timerHTML = `${$setMin}:0${$seconds}`;
      } else {
        $timerHTML = `${$setMin}:${$seconds}`;
      }
      $('#timer').html($timerHTML);
      if ($finish && $seconds === 0 && $setMin === 0) {
        $finish = false;
        $('#alarm').trigger('play');
        $('#timer-type').html("SESSION");
        $setMin = $setWork;
      } else if ($seconds === 0 && $setMin === 0) {
        $finish = true;
        $('#alarm').trigger('play');
        $('#timer-type').html("BREAK TIME");
        $setMin = $setBreak;
      }
      if ($seconds === 0) {
        $setMin -= 1;
        $seconds = 60;
      }
    },
    1000);
  }
  $('#timer-box').click(function() {
    if ($timerOff && $oneTime) {
      $timerOff = false;
      $oneTime = false;
      $setMin = $setWork;
      $setMin -= 1;
      countDown();
    } else if ($timerOff && $oneTime === false && $finish) {
      alert("Can not stop time on break.");
    } else if ($timerOff && $oneTime === false && $reset) {
      $finish = false;
      $timerOff = false;
      $reset = false;
      $seconds = 60;
      $('#timer-type').html("SESSION");
      $setMin = $setWork;
      $setMin -= 1;
      countDown();
    } else if ($timerOff && $oneTime === false) {
      $timerOff = false;
      countDown();
    } else if ($finish !== true) {
      clearInterval($countingDown);
      $timerOff = true;
    }
  });
  $('#subtractBreak').click(function() {
    if ($setBreak > 1 && $timerOff && $oneTime === false) {
      $reset = true;
      $setBreak -= 1;
      $('#breaktime').html($setBreak);
    } else if ($setBreak > 1 && $timerOff) {
      $setBreak -= 1;
      $('#breaktime').html($setBreak);
    }
  });
  $('#addBreak').click(function() {
    if ($setBreak < 1000 && $timerOff && $oneTime === false) {
      $reset = true;
      $setBreak += 1;
      $('#breaktime').html($setBreak);
    } else if ($setBreak < 1000 && $timerOff) {
      $setBreak += 1;
      $('#breaktime').html($setBreak);
    }
  });
  $('#subtractWork').click(function() {
    if ($setWork > 1 && $timerOff && $oneTime === false) {
      $reset = true;
      $setWork -= 1;
      if ($setWork.toString().match(/[0-9]/g).length === 1) {
        $('#timer').html(`0${$setWork}:00"`);
      } else if ($setWork.toString().match(/[0-9]/g).length >= 1) {
        $('#timer').html(`${$setWork}:00`);
      }
      $('#worktime').html($setWork);
    } else if ($setWork > 1 && $timerOff) {
      $setWork -= 1;
      if ($setWork.toString().match(/[0-9]/g).length === 1) {
        $('#timer').html(`0${$setWork}:00`);
      } else if ($setWork.toString().match(/[0-9]/g).length >= 1) {
        $('#timer').html(`${$setWork}:00"`);
      }
      $('#worktime').html($setWork);
    }
  });
  $('#addWork').click(function() {
    if ($setWork < 1000 && $timerOff && $oneTime === false) {
      $reset = true;
      $setWork += 1;
      if ($setWork.toString().match(/[0-9]/g).length === 1) {
        $('#timer').html(`0${$setWork}:00`);
      } else if ($setWork.toString().match(/[0-9]/g).length >= 1) {
        $('#timer').html(`${$setWork}:00`);
      }
      $('#worktime').html($setWork);
    } else if ($setWork < 1000 && $timerOff) {
      $setWork += 1;
      if ($setWork.toString().match(/[0-9]/g).length === 1) {
        $('#timer').html(`0${$setWork}:00`);
      } else if ($setWork.toString().match(/[0-9]/g).length >= 1) {
        $('#timer').html(`${$setWork}:00`);
      }
      $('#worktime').html($setWork);
    }
  });
}); // document ready end
