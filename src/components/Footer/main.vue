<script setup>
import { ref, watch, toRef, onMounted, watchEffect, computed, reactive, nextTick, isRef } from 'vue'
import mitter from '../../mitt/main'
import emiter from '../../mitt/main';
const audio = ref(null)
const currentTime = ref(0)
const durationTime = ref(0)
const playState = ref(true)
const pauseState = ref(false)
const title = ref('天天音樂，天天快樂！')
const index = ref('0')
const listShow = ref(false)
const currentM = computed(() => Math.floor(currentTime.value / 60))
const currentS = computed(() => currentTime.value % 60)
const durationM = computed(() => Math.floor(durationTime.value / 60))
const durationS = computed(() => Math.floor(durationTime.value % 60))
const dot = computed(() => Math.ceil(currentTime.value / (durationTime.value / 100) * 5))
const mod = ref('顺序播放')
const modShow = ref(false)
const prev = () => {
  if (mod.value === '随机播放') {
    random()
    return
  }
  console.log('prev');
  if (index.value === 1) {
    index.value = listArr.length
    let arr = [listArr[index.value - 1].url, listArr[index.value - 1].name]
    emiter.emit('play', arr)
  } else {
    index.value = index.value - 1
    let arr = [listArr[index.value - 1].url, listArr[index.value - 1].name]
    emiter.emit('play', arr)
  }
  audio.value.currentTime = 0
}
const next = () => {
  if (mod.value === '随机播放') {
    random()
    return
  }
  if (index.value === listArr.length) {
    index.value = 0
    emiter.emit('play', [listArr[index.value].url, listArr[index.value].name])
  } else {
    index.value = index.value + 1
    let arr = [listArr[index.value - 1].url, listArr[index.value - 1].name]
    emiter.emit('play', arr)
  }
  audio.value.currentTime = 0
}
const play = () => {
  if (title.value === '天天音樂，天天快樂！') return
  pauseState.value = true
  playState.value = false
  audio.value.play()
}
const pause = () => {
  pauseState.value = false
  playState.value = true
  audio.value.pause()
}
const number = ref('0')
const random = () => {
  let n = 0
  let m = listArr.length - 1
  let num = Math.floor(Math.random() * (m - n + 1)) + n;
  number.value = num
  index.value = num
  audio.value.src = listArr[number.value].url
  title.value = listArr[number.value].name
  audio.value.play()
  playState.value = false
  pauseState.value = true
  return
}
let timer
const canplay = () => {
  durationTime.value = Math.floor(audio.value.duration)
  timer = setInterval(() => {
    currentTime.value = Math.floor(audio.value.currentTime)
    if (currentTime.value >= durationTime.value) {
      if (mod.value === '循环播放') {
        return
      }
      if (mod.value === '随机播放') {
        random()
        return
      }
      next()
      clearInterval(timer)
    }
  }, 1000)
}
const listArr = reactive([])
mitter.on('play', (arr) => {
  console.log(arr[0], arr[1]);
  if (title.value === arr[1]) return
  let bol = false
  listArr.forEach((item) => {
    if (item.name === arr[1]) {
      bol = true
      index.value = item.index
    }
  })
  if (!bol) {
    listArr.push({
      name: arr[1],
      url: arr[0],
      index: listArr.length + 1
    })
    index.value = listArr.length
  }
  audio.value.src = arr[0]
  title.value = arr[1]
  audio.value.play()
  playState.value = false
  pauseState.value = true
})
const showList = () => {
  listShow.value = !listShow.value
  modShow.value = false
}
const modList = () => {
  modShow.value = !modShow.value
  listShow.value = false
}
const changeMod = (value) => {
  mod.value = value
  modShow.value = false
}
const audioDot = ref(null)
const mousedown = (e) => {
  clearInterval(timer)
  let x = e.clientX
  let old = audioDot.value.style.left.slice(0, -2) || 0
  let mousemove = (e) => {
    if (x > e.clientX) {
      audioDot.value.style.left = +old - (x - e.clientX) + 'px'
      if (audioDot.value.style.left.slice(0, -2) < 0) {
        audioDot.value.style.left = 0 + 'px'
      }
    } else {
      audioDot.value.style.left = +old + (e.clientX - x) + 'px'
      if (audioDot.value.style.left.slice(0, -2) > 500) {
        audioDot.value.style.left = 500 + 'px'
      }
    }
  }
  let mouseup = (e) => {
    audio.value.currentTime = Math.ceil(audioDot.value.style.left.slice(0, -2) / 5 * (durationTime.value / 100))
    currentTime.value = audio.value.currentTime
    timer = setInterval(() => {
      if (currentTime.value >= durationTime.value) {
        if (mod.value === '循环播放') {
          return
        }
        if (mod.value === '随机播放') {
          random()
          return
        }
        next()
        clearInterval(timer)
      }
    }, 1000)
    audioDot.value.removeEventListener('mousedown', mousedown)
    audioDot.value.removeEventListener('mousemove', mousemove)
    audioDot.value.removeEventListener('mouseup', mouseup)
  }
  audioDot.value.addEventListener('mousemove', mousemove)
  audioDot.value.addEventListener('mouseup', mouseup)
}
const move = (e) => {
  if (e.target.className !== 'audioTime') {
    return
  }
  clearInterval(timer)
  let x = e.offsetX
  audioDot.value.style.left = x + 'px'
  audio.value.currentTime = Math.ceil(x / 5 * (durationTime.value / 100))
  currentTime.value = audio.value.currentTime
  timer = setInterval(() => {
    if (currentTime.value >= durationTime.value) {
      if (mod.value === '循环播放') {
        return
      }
      if (mod.value === '随机播放') {
        random()
        return
      }
      next()
      clearInterval(timer)
    }
  }, 1000)
}
</script>

<template>
  <el-container>
    <el-footer>
      <div class="audio">
        <audio :loop="mod === '单曲循环'" ref="audio" @canplay="canplay" />
        <h4 :title="title">{{ title }}</h4>
        <i @click="prev">上一首</i>
        <i v-show="playState" @click="play">播放</i>
        <i v-show="pauseState" @click="pause">暫停</i>
        <i @click="next">下一首</i>
        <div class="audioTime" @click="move">
          <div class="audioProgressBar" :style="{ width: dot + 'px' }">
          </div>
          <div @mousedown="mousedown" ref="audioDot" class="audioTimeDot" :style="{ left: dot + 'px' }">
          </div>
        </div>
        <p>{{ currentM }}:<span v-show="currentS < 10">0</span>{{ currentS
        }}/<span>{{ durationM }}:<span v-show="durationS < 10">0</span>{{ durationS }}</span>
        </p>
        <i @click="showList">列表</i>
        <i @click="modList">{{ mod }}</i>
        <ul v-show="modShow" class="modList">
          <li @click="changeMod('单曲循环')">单曲循环</li>
          <li @click="changeMod('随机播放')">随机播放</li>
          <li @click="changeMod('顺序播放')">顺序播放</li>
        </ul>
        <ul v-show="listShow" class="list">
          <li v-show="listArr.length === 0">列表为空</li>
          <li :class="song.name === title ? 'active' : ''" :title="song.name"
            @click="emiter.emit('play', [song.url, song.name])" v-for="(song, index) in listArr">{{
              index + 1 + '-' +
              song.name }}
          </li>
        </ul>
      </div>
    </el-footer>
  </el-container>
</template>

<stylescoped lang='less'>
.el-footer {
  position: relative;
  width: 1800px;
  z-index: 9;
  position: fixed;
  margin: auto;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: pink;

}

.audio {
  display: flex;
  position: relative;
  justify-content: space-around;
  align-items: center;
  margin: auto;
  width: 1000px;
  height: 60px;

  .list {
    position: absolute;
    width: 200px;
    height: 300px;
    bottom: 40px;
    right: -50px;
    font-size: 14px;
    overflow: auto;
    overflow-x: hidden;
    background-color: #e6e2e2;
    box-shadow: 0 0 0 .5px #000;

    .active {
      color: rgb(94, 190, 228);
    }

    li {
      padding: 0 8px;
      cursor: pointer;
      height: 30px;
      line-height: 30px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      &:hover {
        background-color: #b6b5b5;
      }

      &:first-child {
        height: 100%;
        line-height: 300px;
        text-align: center;
      }
    }
  }

  .modList {
    position: absolute;
    width: 100px;
    height: 90px;
    bottom: 40px;
    right: -20px;
    font-size: 14px;
    overflow: auto;
    overflow-x: hidden;
    background-color: #e6e2e2;
    box-shadow: 0 0 0 .5px #000;

    .active {
      color: rgb(94, 190, 228);
    }

    li {
      padding: 0 8px;
      cursor: pointer;
      height: 30px;
      line-height: 30px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      &:hover {
        background-color: #b6b5b5;
      }
    }
  }


  i {
    cursor: pointer;
    color: aliceblue;
    font-size: 16px;

    &:hover {
      color: aqua;
    }
  }

  .audioTime {
    position: relative;
    width: 500px;
    height: 4px;
    background-color: #b6b5b5;
    cursor: pointer;

    .audioTimeDot {
      position: absolute;
      top: -3px;
      left: 0;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: blue;
      cursor: pointer;
    }

    .audioProgressBar {
      background-color: skyblue;
      width: 0px;
      height: 100%;
    }
  }

  p {
    font-size: 16px;
    color: aliceblue;
  }

  h4 {
    width: 150px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: normal;
    font-size: 14px;
    color: aliceblue;
  }
}
</stylescoped>
