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
      "http://ws.stream.qqmusic.qq.com/C400003wHKPr14SXxM.m4a?guid=274179332&vkey=6FCE28CC21ADED6FE8C0E9078BB7E751CF000E412EF616C8E3E8224E098651A9E2115EAD75BE3D67883AB82701624E50A4A59940AD6D752B&uin=&fromtag=66",
      "http://ws.stream.qqmusic.qq.com/C400000Q6RaV2Ew54y.m4a?guid=274179332&vkey=7D313F4F542D6D8C895B8681AFF29A66BF6EEF8D5ED8A33C96BAF086183197C75F8C3726EC2C30660FD4AF89BA6B15269A59E86407DA5154&uin=&fromtag=66",
      "http://ws.stream.qqmusic.qq.com/C400002EMm9N2sEoiA.m4a?guid=274179332&vkey=2241AD2D70199B1415B1DA214D76408522B285332063565CD0C866DA50021BB55BF22D76002DF783290ED95C350C112D5F89AE0AEBEA3C92&uin=&fromtag=66",
      "http://ws.stream.qqmusic.qq.com/C4000019y9Uh3r0F0f.m4a?guid=274179332&vkey=94BB44029426DDC2EAF3D7F10DC99D03BEC545F830DA1B6D3A9406D02743132901653D21F505130131EA3C7B73F0F3E918065F2098D57305&uin=&fromtag=66",
      "http://ws.stream.qqmusic.qq.com/C400000INtkL1UG74D.m4a?guid=274179332&vkey=B5A7095AF72FCB38EE8D9226D01E1680E6E8ED157CDB069AA96E0DEA1DDD6F8E30C64C2F573E623DBDA2394CE6C9DE07870D8E2C0E9DAA57&uin=&fromtag=66",
      "http://ws.stream.qqmusic.qq.com/C4000027Wf4n1DmnPL.m4a?guid=274179332&vkey=6BE2D96BBD1616524EAD9B45F19EFFF5309CC6115A3E93B1E5C176A5F6F8A12E338C7192395AD95D329DE4E3ECAF205195512E523972B1B3&uin=&fromtag=66",
      "http://ws.stream.qqmusic.qq.com/C400001jISY805h19T.m4a?guid=274179332&vkey=E135C3FB8E40E43EE04C75FE1E7E093152DF9C098D359D3CBF671E928E1B5C53969B2815A6966940EC3232DF6A9D8A9FE9909D84A2041580&uin=&fromtag=66",
    ];
    this.audioImgs = {
      "http://ws.stream.qqmusic.qq.com/C400003wHKPr14SXxM.m4a?guid=274179332&vkey=6FCE28CC21ADED6FE8C0E9078BB7E751CF000E412EF616C8E3E8224E098651A9E2115EAD75BE3D67883AB82701624E50A4A59940AD6D752B&uin=&fromtag=66":
        "https://y.gtimg.cn/music/photo_new/T002R300x300M000000594pp3tMxzF.jpg?max_age=2592000",
      "http://ws.stream.qqmusic.qq.com/C400000Q6RaV2Ew54y.m4a?guid=274179332&vkey=7D313F4F542D6D8C895B8681AFF29A66BF6EEF8D5ED8A33C96BAF086183197C75F8C3726EC2C30660FD4AF89BA6B15269A59E86407DA5154&uin=&fromtag=66":
        "https://y.gtimg.cn/music/photo_new/T002R300x300M000003V36Um1K2JZC.jpg?max_age=2592000",
      "http://ws.stream.qqmusic.qq.com/C400002EMm9N2sEoiA.m4a?guid=274179332&vkey=2241AD2D70199B1415B1DA214D76408522B285332063565CD0C866DA50021BB55BF22D76002DF783290ED95C350C112D5F89AE0AEBEA3C92&uin=&fromtag=66":
        "https://y.gtimg.cn/music/photo_new/T002R300x300M0000033vUNi15wQCA.jpg?max_age=2592000",
      "http://ws.stream.qqmusic.qq.com/C4000019y9Uh3r0F0f.m4a?guid=274179332&vkey=94BB44029426DDC2EAF3D7F10DC99D03BEC545F830DA1B6D3A9406D02743132901653D21F505130131EA3C7B73F0F3E918065F2098D57305&uin=&fromtag=66":
        "https://y.gtimg.cn/music/photo_new/T002R300x300M000003HPbX63TJ6ZM.jpg?max_age=2592000",
      "http://ws.stream.qqmusic.qq.com/C400000INtkL1UG74D.m4a?guid=274179332&vkey=B5A7095AF72FCB38EE8D9226D01E1680E6E8ED157CDB069AA96E0DEA1DDD6F8E30C64C2F573E623DBDA2394CE6C9DE07870D8E2C0E9DAA57&uin=&fromtag=66":
        "https://y.gtimg.cn/music/photo_new/T002R300x300M000003dpOND4YEbV7.jpg?max_age=2592000",
      "http://ws.stream.qqmusic.qq.com/C4000027Wf4n1DmnPL.m4a?guid=274179332&vkey=6BE2D96BBD1616524EAD9B45F19EFFF5309CC6115A3E93B1E5C176A5F6F8A12E338C7192395AD95D329DE4E3ECAF205195512E523972B1B3&uin=&fromtag=66":
        "https://y.gtimg.cn/music/photo_new/T002R300x300M000000ZIJ2U0WRk3l.jpg?max_age=2592000",
      "http://ws.stream.qqmusic.qq.com/C400001jISY805h19T.m4a?guid=274179332&vkey=E135C3FB8E40E43EE04C75FE1E7E093152DF9C098D359D3CBF671E928E1B5C53969B2815A6966940EC3232DF6A9D8A9FE9909D84A2041580&uin=&fromtag=66":
        "https://y.gtimg.cn/music/photo_new/T002R300x300M000000bPFt10lCMU3.jpg?max_age=2592000",
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
    background-image: url("../assets/logo/avartar.png");
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
