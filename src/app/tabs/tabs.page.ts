import { Platform } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { NativeAudio } from '@ionic-native/native-audio/ngx';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  radius: number = 100
  percent: number = 0
  fullTime: string = "00:01:30"

  timer: any = false
  elapseTimerInterval: any = false

  minutes: any = 1
  secondes: any = 30
  progress: any = 0
  elapseTime: any = {
    hour: "00",
    minutes: "00",
    secondes: "00"
  }
  constructor(private nativeAudio: NativeAudio, private platform: Platform) { }

  // ngOnInit(){

  //   if(this.platform.is("hybrid")){
  //     this.nativeAudio.preloadSimple('uniqSong','assets/songs/beep.mp3').then(()=>{
  //       console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');

  //     }).catch()
  //   }

  //   this.nativeAudio.play('uniqSong')
  // }

  starTimer() {
    if (this.timer) {
      clearInterval(this.timer)
      clearInterval(this.elapseTimerInterval)
    }

    // if(!this.elapseTimerInterval){
    this.progressTimer()
    //}

    this.timer = false
    this.percent = 0
    this.progress = 0

    let fullTimeSplit = this.fullTime.split(':')

    this.minutes = fullTimeSplit[1]
    this.secondes = fullTimeSplit[2]

    const totalSecondes = Math.floor(this.minutes * 60) + parseInt(this.secondes)

    this.timer = setInterval(() => {

      if (this.percent == this.radius) {
        clearInterval(this.timer)
        clearInterval(this.elapseTimerInterval)
        new Audio('assets/songs/beep.mp3').play()
        this.timer = false


      }

      this.percent = Math.floor((this.progress / totalSecondes) * 100)
      this.progress++
      console.log(this.percent);


    }, 1000)
  }
  progressTimer() {
    let countDownDate = new Date()

    this.elapseTimerInterval = setInterval(() => {
      const now = new Date().getTime()

      const distance = now - countDownDate.getTime()
      this.elapseTime.hour = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      this.elapseTime.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      this.elapseTime.secondes = Math.floor((distance % (1000 * 60)) / (1000))

      this.elapseTime.hour = this.pad(this.elapseTime.hour, 2)
      this.elapseTime.minutes = this.pad(this.elapseTime.minutes, 2)
      this.elapseTime.secondes = this.pad(Math.abs(this.elapseTime.secondes - 2), 2)


    }, 1000)
  }

  pad(num, size) {
    let s = num + ""
    while (s.length < size) s = "0" + s
    return s
  }
  stopTimer() {
    clearInterval(this.elapseTimerInterval)
    clearInterval(this.timer)
    this.timer = false

  }

}
