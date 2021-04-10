<template>
  <div class="music">
    <div class="music__main">
      <div :class="['music__main__cover', isPlay ? 'active' : '']" @click="play">
        <img :src="audioImg" />
      </div>
      <div class="music__main__timeBar">
        <div class="time">
          <span>{{ realMusicTime }}</span>
          <span>{{ totalMusicTime }}</span>
        </div>
        <div class="bar" ref="bar" @click="handClickBar">
          <div class="bar__slid" ref="slid" @click="handClickBar"></div>
        </div>
      </div>
    </div>
    <div class="music__btn">
      <i class="el-icon-refresh" @click="switchMusic"></i>
    </div>
    <div class="music__mask"></div>
    <audio ref="music" :src="audioSrc"></audio>
  </div>
</template>

<script>
export default {
  data() {
    this.audioSrcs = [
      "http://ws.stream.qqmusic.qq.com/C4000019y9Uh3r0F0f.m4a?guid=274179332&vkey=80C6B1E7F144EF200F54E0BF22684876E4652E5768ED2589F71A25E8F00E932F10D2BB11C98EB9E1124E1D1AAFA2284FD93BFC56AC4522DE&uin=&fromtag=66",
      "http://ws.stream.qqmusic.qq.com/C400000INtkL1UG74D.m4a?guid=274179332&vkey=C3026549C407A4194D7553E334DF20A5D42B17A8B077CB7F457FFC042EACB329B6AEDF527DEB739D76A38B6465B5B3AD9CED951BA7B2B53B&uin=&fromtag=66",
      "http://ws.stream.qqmusic.qq.com/C4000027Wf4n1DmnPL.m4a?guid=274179332&vkey=4F8240BE2A446BE5730F5C74A720F9CFC19CB996F8B7B2F5DDCA60E51AF3ABC676FB57CEFD2F606C4D16C835393468B5DA445A1F381957DB&uin=&fromtag=66",
      "http://ws.stream.qqmusic.qq.com/C400001jISY805h19T.m4a?guid=274179332&vkey=836C8318B35CB0538B3ACBB96EB481BE0E0A5708473379BF9B5F63E53D6689CADD3FBE02341B97BE5A33A5CC9E0558073B44C9CCAD17C734&uin=&fromtag=66",
      "http://ws.stream.qqmusic.qq.com/C400000SnyUq1MI0vt.m4a?guid=274179332&vkey=2C8AF0C2C1F3FF36C6D7046D215F234D8D0169F575A585A5DBDAF001514157AC6558D80586DD858BA7AEC04D429DCCBE07AC4EE5D9E29701&uin=&fromtag=66",
      "http://ws.stream.qqmusic.qq.com/C400003lDaDU1FUvCU.m4a?guid=274179332&vkey=21DD15B6C94517F7404A3A861E992FAAD59363DF1559449DE03B33A99AD548937D9699B8C1017804D4FA70ABE699EDD537D16DBB7517E12F&uin=&fromtag=66",
      "http://ws.stream.qqmusic.qq.com/C400002h5VIO1RdYKh.m4a?guid=274179332&vkey=4C3CA659978053FB6E03129C6E8C7A9F5B7C0B98A23B41C9CBABBC6B42CFE97C069AA3FD7110076EC097C43F700499B8E593444C4F68C515&uin=&fromtag=66",
    ];
    this.audioImgs = {
      "http://ws.stream.qqmusic.qq.com/C4000019y9Uh3r0F0f.m4a?guid=274179332&vkey=80C6B1E7F144EF200F54E0BF22684876E4652E5768ED2589F71A25E8F00E932F10D2BB11C98EB9E1124E1D1AAFA2284FD93BFC56AC4522DE&uin=&fromtag=66":
        "https://y.gtimg.cn/music/photo_new/T002R300x300M000003HPbX63TJ6ZM.jpg?max_age=2592000",
      "http://ws.stream.qqmusic.qq.com/C400000INtkL1UG74D.m4a?guid=274179332&vkey=C3026549C407A4194D7553E334DF20A5D42B17A8B077CB7F457FFC042EACB329B6AEDF527DEB739D76A38B6465B5B3AD9CED951BA7B2B53B&uin=&fromtag=66":
        "https://y.gtimg.cn/music/photo_new/T002R300x300M000003dpOND4YEbV7.jpg?max_age=2592000",
      "http://ws.stream.qqmusic.qq.com/C4000027Wf4n1DmnPL.m4a?guid=274179332&vkey=4F8240BE2A446BE5730F5C74A720F9CFC19CB996F8B7B2F5DDCA60E51AF3ABC676FB57CEFD2F606C4D16C835393468B5DA445A1F381957DB&uin=&fromtag=66":
        "https://y.gtimg.cn/music/photo_new/T002R300x300M000000ZIJ2U0WRk3l.jpg?max_age=2592000",
      "http://ws.stream.qqmusic.qq.com/C400001jISY805h19T.m4a?guid=274179332&vkey=836C8318B35CB0538B3ACBB96EB481BE0E0A5708473379BF9B5F63E53D6689CADD3FBE02341B97BE5A33A5CC9E0558073B44C9CCAD17C734&uin=&fromtag=66":
        "https://y.gtimg.cn/music/photo_new/T002R300x300M000000bPFt10lCMU3.jpg?max_age=2592000",
      "http://ws.stream.qqmusic.qq.com/C400000SnyUq1MI0vt.m4a?guid=274179332&vkey=2C8AF0C2C1F3FF36C6D7046D215F234D8D0169F575A585A5DBDAF001514157AC6558D80586DD858BA7AEC04D429DCCBE07AC4EE5D9E29701&uin=&fromtag=66":
        "https://y.gtimg.cn/music/photo_new/T002R300x300M000002UE1R60FfR9g.jpg?max_age=2592000",
      "http://ws.stream.qqmusic.qq.com/C400003lDaDU1FUvCU.m4a?guid=274179332&vkey=21DD15B6C94517F7404A3A861E992FAAD59363DF1559449DE03B33A99AD548937D9699B8C1017804D4FA70ABE699EDD537D16DBB7517E12F&uin=&fromtag=66":
        "https://y.gtimg.cn/music/photo_new/T002R300x300M000002DEzhh2wbfr5.jpg?max_age=2592000",
      "http://ws.stream.qqmusic.qq.com/C400002h5VIO1RdYKh.m4a?guid=274179332&vkey=4C3CA659978053FB6E03129C6E8C7A9F5B7C0B98A23B41C9CBABBC6B42CFE97C069AA3FD7110076EC097C43F700499B8E593444C4F68C515&uin=&fromtag=66":
        "https://y.gtimg.cn/music/photo_new/T002R300x300M000004WQBdl3X7CKD.jpg?max_age=2592000",
    };
    return {
      isPlay: false,
      realMusicTime: "00:00",
      totalMusicTime: "00:00",
      audioSrc: this.audioSrcs[0],
      audioImg: this.audioImgs[this.audioSrcs[0]],
    };
  },
  created() {
    // this.play()
  },
  mounted() {
    this.watchMusicTime();
    console.log(this.audioSrc);
    console.log(this.audioImgs);
  },
  methods: {
    play() {
      if (this.music.paused) {
        this.music.play();
        this.isPlay = true;
      } else {
        this.music.pause();
        this.isPlay = false;
      }
    },
    // 处理时间
    handlMusicTime() {
      //用秒数来显示当前播放进度
      let timeDisplay = Math.floor(this.music.currentTime); //获取实时时间
      //分钟
      let minute = parseInt(timeDisplay / 60);
      if (minute < 10) {
        minute = "0" + minute;
      }
      //秒
      let second = Math.round(timeDisplay % 60);
      if (second < 10) {
        second = "0" + second;
      }
      this.realMusicTime = minute + ":" + second;
    },
    // 处理进度条
    handMusicBar() {
      let slid = this.$refs.slid;
      let duration = this.music.duration;
      let x = ((this.music.currentTime / duration) * 100).toFixed(2) + "%";
      slid.style.width = x;
    },
    // 处理点击进度条事件
    handClickBar(e) {
      const barTotalWidth = this.bar.offsetWidth; // bar 总宽度
      const rect = e.target.getBoundingClientRect(); // 元素右边距离页面边距的距离 返回上下左右
      let length = e.pageX - rect.left;
      this.music.currentTime = (length / barTotalWidth) * this.music.duration; // 计算播放时间 位置百分比*总时间
      this.$nextTick(() => {
        this.music.play();
        this.isPlay = true;
      });
    },
    // 切换歌曲
    switchMusic() {
      this.isPlay = false;
      const index = Math.floor(Math.random() * 7);
      if (this.audioSrc === this.audioSrcs[index]) {
        this.audioSrc = this.audioSrcs[index - 1];
      }
      this.audioSrc = this.audioSrcs[index];
      this.audioImg = this.audioImgs[this.audioSrc];
      this.music.load();
      // 文件下载完毕，如果不用等到全部下载完毕，可以用canplay事件
      this.music.addEventListener("canplaythrough", () => {
        this.music.play();
        this.isPlay = true;
      });
    },
    //使用事件监听方式捕捉事件
    watchMusicTime() {
      this.music = this.$refs.music;
      this.bar = this.$refs.bar;
      this.music.addEventListener(
        "timeupdate",
        () => {
          this.handlMusicTime();
          this.$nextTick(() => {
            this.handMusicBar();
          });
        },
        false
      );
      // 播放完毕
      this.music.addEventListener("ended", () => {
        this.switchMusic(); // 自动播放
      });
      // 捕获音频文件已准备完毕
      // 当媒体文件可以播放的时候会触发oncanplay事件,也可以用oncanplay
      this.music.oncanplaythrough = () => {
        let time = this.music.duration;
        //分钟
        let minutes = parseInt(time / 60);
        if (minutes < 10) {
          minutes = "0" + minutes;
        }
        //秒
        let seconds = Math.round(time % 60);
        if (seconds < 10) {
          seconds = "0" + seconds;
        }
        this.totalMusicTime = minutes + ":" + seconds;
      };
    },
  },
};
</script>

<style lang="scss" scope>
@keyframes musicRotate {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
.music {
  border-radius: 15px;
  padding: 5px;
  padding-right: 30px;
  position: relative;
  box-sizing: border-box;
  overflow: hidden;
  &__main {
    display: flex;
    &__cover {
      width: 50px;
      height: 50px;
      overflow: hidden;
      border-radius: 50%;
      background-color: #dddddd;
      cursor: pointer;
      animation: musicRotate 10s linear infinite;
      animation-play-state: paused; // 暂定动画
      img {
        width: 100%;
        height: 100%;
      }
      &.active {
        animation-play-state: running; // 运行动画
      }
    }
    &__timeBar {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      padding-left: 20px;
      box-sizing: border-box;
      .time {
        display: flex;
        justify-content: space-between;
        color: #fff;
        span {
          font-size: 19px;
          line-height: 1;
        }
      }
      .bar {
        height: 8px;
        background-color: #fbfbfb;
        border-radius: 8px;
        position: relative;
        border-radius: 8px;
        overflow: hidden;
        cursor: pointer;
        &__slid {
          position: absolute;
          left: 0;
          top: 0;
          background-color: #e24d80;
          height: 100%;
          width: 0;
          transition: width 0.3s;
        }
      }
    }
  }
  &__btn {
    position: absolute;
    right: 5px;
    top: 5px;
    i {
      font-size: 18px;
      color: #fff;
      cursor: pointer;
    }
  }
  &__mask {
    background-image: url("../../assets/meet.jpg");
    z-index: -2;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50%;
    filter: blur(15px);
    opacity: 0.5;
    transition: all 0.8s;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    &::before {
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      z-index: -1;
      content: "";
      background-color: rgba(0, 0, 0, 0.08);
    }
  }
}
</style>
