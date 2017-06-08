var interval;

var app = new Vue({
  el: "#clock",

  data: {
    workTimeInMin: 25,
    breakTimeInMin: 5,
    timeRemainInMillisecond: 0,
    timerOn: false,
    rest: true
  },

  methods: {
    startOrStopTheTimer: function() {
      var self = this;
      if (this.timerOn){
        window.clearInterval(interval);
        this.timerOn = !this.timerOn;

      }else {
        interval = setInterval(function(){
        if (self.timeRemainInMillisecond <= 0) {
          self.rest = !self.rest;
          if (self.rest) {
            self.timeRemainInMillisecond = self.breakTimeInMin*60*1000;
          }else {
            self.timeRemainInMillisecond = self.workTimeInMin*60*1000;
          }
        }
        self.timeRemainInMillisecond = self.timeRemainInMillisecond-1000;
        }, 1000);
        this.timerOn = !this.timerOn;
      }
    },
    addBreakTime: function() {
      if (!this.timerOn){
        this.timeRemainInMillisecond = 0;
        this.rest = true;
        if (this.breakTimeInMin >= 10){
          alert("Don't take too much rest man!")
        }else {
          ++this.breakTimeInMin;
        }
      }
    },

    minusBreakTime: function() {
      if (!this.timerOn) {
        this.timeRemainInMillisecond = 0;
        this.rest = true;
        if (this.breakTimeInMin <= 1){
          alert("You should have some rest Pal!")
        }else {
          --this.breakTimeInMin;
        }
      }
    },

    addWorkTime: function() {
      if (!this.timerOn) {
        this.timeRemainInMillisecond = 0;
        this.rest = true;
        if (this.workTimeInMin >= 60){
          alert("Don't overwork man, have some rest!")
        }else {
          ++this.workTimeInMin;
        }
      }
    },

    minusWorkTime: function() {
      if (!this.timerOn) {
        this.timeRemainInMillisecond = 0;
        this.rest = true;
        if (this.workTimeInMin <= 1){
          alert("Do some work Bitch")
        }else {
          --this.workTimeInMin;
        }
      }
    }
  },

  computed: {
    changeState: function() {
      if(this.timerOn) {
        if (this.rest){
          return "REST TIME!!!"
        }else {
          return "Work hard bitch."
        }
      }
    },

    state: function() {
      if(this.timerOn) {
        return "Stop";
      }else {
        return "Start";
      }
    },
    time: function() {
      var seconds = Math.floor((this.timeRemainInMillisecond/1000)%60);
      var minutes = Math.floor(this.timeRemainInMillisecond/1000/60%60);
      if (seconds.toString().length === 1){
        seconds = "0" + seconds;
      }
      if (minutes.toString().length === 1) {
        minutes = "0" + minutes;
      }
      return minutes + ":" + seconds;
    }
  }
});
