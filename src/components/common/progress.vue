<template>
  <div class="vue-progress">
    <div class="barBg">
      <div class="bar" :style="{'width': `${barWidth}%`}"></div>
    </div>
    <ul>
      <li v-for="(item, index) in progressArray" :key="index">
        <div :class="[{'selected' : item.settings.selected}, 'before']" v-if="item.settings.type === 'max'">
          <div :class="{'titleed': !item.settings.selected}">{{item.title}}</div>
        </div>
        <div :class="[{'selected' : item.settings.selected}, 'after']" v-else-if="item.settings.type === 'min'">
          <div :class="{'titleed': !item.settings.selected}">{{item.title}}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "Progress",
    props: {
      type: { //1竣工验收 2设计方案 3施工许可
        type: Number,
        required: true
      },
      bar: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        barWidth: 0,// 15, 45, 75, 100
        titles1: ['竣工验收', '接收', '受理', '办结'],
        titles2: ['设计方案', '接收', '受理', '办结'],
        titles3: ['施工许可', '接收', '受理', '办结'],
        progressArray: [
          {
            settings: {
              type: 'max',
              selected: false
            }
          },
          {
            settings: {
              type: 'min',
              selected: false
            }
          },
          {
            settings: {
              type: 'min',
              selected: false
            }
          },
          {
            settings: {
              type: 'max',
              selected: false
            }
          }
        ],
      }
    },
    created() {
      this.progressArray.forEach((item, index) => {
        item.title = this[`titles${this.type}`][index];
      });
      for (let i = 0; i < this.bar; i++) {
        this.progressArray[i].settings.selected = true;
      }
      if (this.bar !== 0) {
        if (this.bar === 1) {
          this.barWidth = 15;
        } else if (this.bar === 2) {
          this.barWidth = 45;
        } else if (this.bar === 3) {
          this.barWidth = 75;
        } else if (this.bar === 4) {
          this.barWidth = 100;
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .vue-progress {
    width: 100%;
    height: 70px;
    position: relative;

    .barBg {
      position: absolute;
      top: 23px;
      left: 50%;
      transform: translateX(-50%);
      display: block;
      height: 3px;
      width: 88%;
      background: #bec5cf;

      .bar {
        width: 0;
        height: 100%;
        background: rgb(1, 157, 216);
        transition: width 2s;
      }
    }


    ul, li {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    ul {
      width: 100%;
      height: 100%;
      float: left;
      display: flex;
    }

    li {
      flex: 1;
      position: relative;

      .before {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background: #bec5cf;
        position: absolute;
        left: 50%;
        top: 10px;
        transform: translateX(-50%);

        div {
          position: absolute;
          height: 20px;
          width: 70px;
          text-align: center;
          word-wrap: break-word;
          bottom: -25px;
          left: 50%;
          transform: translateX(-50%);
        }

        &:before {
          content: '';
          display: block;
          height: 18px;
          width: 18px;
          border-radius: 50%;
          background: #fff;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
      }

      .selected {
        background: rgb(1, 157, 216) !important;
      }

      .titleed {
        color: #bec5cf;
      }

      .after {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: #bec5cf;
        position: absolute;
        left: 50%;
        top: 15px;
        transform: translateX(-50%);

        div {
          position: absolute;
          height: 20px;
          width: 70px;
          text-align: center;
          word-wrap: break-word;
          bottom: -30px;
          left: 50%;
          transform: translateX(-50%);
        }

        &:before {
          content: '';
          display: block;
          height: 10px;
          width: 10px;
          border-radius: 50%;
          background: #fff;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }
  }
</style>
