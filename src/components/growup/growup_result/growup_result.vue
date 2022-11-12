<template>
  <div class="blankgap page_result" id="pdfDom" >
    <div class="header_page_box">
      <div class="lefticon" @click="back">
        <span class="el-icon-arrow-left"></span>
      </div>
      <div class="text">评测结果</div>
      <div class="rightpage" @click='sheetVisible1= true'>
        <img src='./share@2x.png'>
      </div>
    </div>
    <div class="container_page_result">
      <div class="colum colum_info">
        <img src='./point@2x.png' class="point">
        <img :src='imgurl' class="touxiang">
        <span class="exe">超过</span>
        <img src='./china_map@2x.png' class="map">
        <div class="people">
          <ul>
            <li v-for='index in itmes' :key="index" :class="{'active':(index*10)<=OverAllCount}"></li>
          </ul>
        </div>
        <span class="per">{{OverAllCount}}%</span>
      </div>
      <div class="colum colum_dev">
        <div class="one">
          <img src='./point@2x.png' class="point">
          <span class="texts">当前宝宝能力发展图</span>
          <img :src="ItemQuotientImagePath" class="result" alt="发育情况">
          <img src='./book_content@2x.png' class="book" @click='show'>
        </div>
        <p class="ts">
          根据宝宝当前月龄能力分析
        </p>
        <!-- 图表 -->
        <div id="myChart">
        </div>
      </div>
      <div class="colum colum_dev">
        <div class="one">
          <img src='./point@2x.png' class="point">
          <span class="texts">五大领域发育商</span>
          <img src='./book_content@2x.png' class="book" @click='show1'>
        </div>
        <p class="ts">
          衡量婴幼儿心智水平的核心指标之一
        </p>
        <p class="type">您的宝宝为'{{TestResultName}}'型宝宝</p>
        <div id="grow"></div>
      </div>
      <div class="type_people colum1">
        <img :src='ImagePath' alt="结果" class="person">
      </div>
    </div>
    <div class="show1" v-show='isshow1'>
      <div class="content">
        <div class="stitle">宝宝当前能力分析
          <img src='./assessment_dialog_close.png' class="x" @click='xx'>
        </div>
        <div class="scontent">
          <div class="title">发育概述</div>
          <div> {{SummaryDesc.SummaryDesc}}</div>
          <div class="title">大动作</div>
          <div> {{SummaryDesc.ItemAdesc}}</div>
          <div class="title">精细动作</div>
          <div> {{SummaryDesc.ItemBdesc}}</div>
          <div class="title">认知能力</div>
          <div> {{SummaryDesc.ItemCdesc}}</div>
          <div class="title">语言</div>
          <div> {{SummaryDesc.ItemDdesc}}</div>
          <div class="title">社会能力</div>
          <div> {{SummaryDesc.ItemEdesc}}</div>

        </div>
      </div>
      <div class="v-mo" @click='xx'></div>
    </div>
    <div class="show1" v-show='isshow2'>
      <div class="content">
        <div class="stitle">
          <p>'{{Name}}'型的宝宝</p>
          <p>未来具有一下特征</p>
          <img src='./assessment_dialog_close.png' class="x" @click='xx1'>
        </div>
        <div class="scontent">
          {{ResultAnalysis}}
        </div>
      </div>
      <div class="v-mo" @click='xx1'></div>
    </div>
    <mt-actionsheet :actions="actions2" v-model="sheetVisible1" id='sext1'></mt-actionsheet>
  </div>
</template>
<script>

import html2canvas from 'html2canvas'
import {
  GetCustTestReport,
  GetCustTestDetailAnalysis,
  GetCustTestResultAnalysis
} from "api/growup";
import axios from "axios";
import { share } from "common/js/share";
import { Message } from "element-ui";
import { MessageBox } from "mint-ui";
import {
  deviceInit,
  shotscreen,
  getshotscreenurl,
  wxshare,
  getwxshare
} from "api/device";


import '../../../api/canvas2image.js'

import { Indicator } from "mint-ui";

export default {
  name: "growup_result",
  data() {
    return {
      itmes: 10,
      data: {},
      TestResultName: "",
      imgurl: "",
      ImagePath: "",
      ItemQuotientImagePath: "",
      OverAllCount: 30,
      isshow1: false,
      isshow2: false,
      SummaryDesc: "",
      Name: "",
      sheetVisible1: false,
      ResultAnalysis: "",
      actions2: [],
      pt: [
        "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjM1RDZBOTg4OUU5RDExRTdCNzFCQUI4MDQ5MUE3QzgzIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjM1RDZBOTg5OUU5RDExRTdCNzFCQUI4MDQ5MUE3QzgzIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MzVENkE5ODY5RTlEMTFFN0I3MUJBQjgwNDkxQTdDODMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MzVENkE5ODc5RTlEMTFFN0I3MUJBQjgwNDkxQTdDODMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4NDQ5vAAANJ0lEQVR42rxa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",
        "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjU4NUY2OTI4OUU5QzExRTdCRTgwQjI1QjFBNTk2RjVGIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjU4NUY2OTI5OUU5QzExRTdCRTgwQjI1QjFBNTk2RjVGIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NTg1RjY5MjY5RTlDMTFFN0JFODBCMjVCMUE1OTZGNUYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NTg1RjY5Mjc5RTlDMTFFN0JFODBCMjVCMUE1OTZGNUYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6XyaipAAANs0lEQVR42sRa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",
        "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjExNjg4NjgwOUU5QzExRTdCN0UzOURCNzIyMUIxOEZEIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjExNjg4NjgxOUU5QzExRTdCN0UzOURCNzIyMUIxOEZEIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MTE2ODg2N0U5RTlDMTFFN0I3RTM5REI3MjIxQjE4RkQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MTE2ODg2N0Y5RTlDMTFFN0I3RTM5REI3MjIxQjE4RkQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz43dkoeAAAP1klEQVR42rxaaYxcV1b+3qt937q73O7N3d7a2PGW2B4HJ2QyDoEZkVnEQBCJGDGsAolF4seA+DM/4AcIgQAhBlAQ+2zKhJkggsZiomyOHW/dXrtj92K3211d3bV27fUe37mvqtfqxU6G1zpd9d67775z7jnnO8st7eU/+BpaHibWP7SW93fw+gleP8HvA6RuUgcp1HgiS0qQ7pHGSB/w6nsc/2HLObVNeFh12PHRjk7Sz5C+QHp6kxcHSF2kI6sW6xzpVdJ/kMYflRH9EZ/bT3qlsbJ/roR42ENb/Hac9McUSub6BunY/4cgbsW4iav8/BLJ9ci6bK29LzY0JPYe+2EJ8lnSLdJvPRLj2kON/mUKOsLPX/i4Bfkq6Tuk3o+kgYcTJkr6R9JffVzO/u2GM2/5MAwT5WoNlUoNhmnCrmuw2TTYbTbY7Xbo+kNJ9BsNn3x2IxzbTJDXSZ/eitlo/CsUK6QyPG4nomGfIpfTgUKlru6ViiUsFEooFypw8rrb5YRpbgljnyGdJZ14FEFe3YoQsrplrnwmW0R7zI8Th/vR1duJYDSMgM8Jp25C0wykFmqYSRWQS+WQnE5ifPIB0pk8vB43HA77VgQSdPtf0ifNFoqxr2PP4hOf24oQaQogTDx9fDeOHt+PaDQIRyYJJCfgT6Zgq1dx5ZYNVY0a8Hvg6Yig+8R+7No/gFtDH+LmyCTNsAq/17MVYUQzf0/9/5K2RhBzjT8+x48/3NSaNA3J+TxiYS8+8+NPYOdgPzBzD54LH8CfT8BnFuGwm7gxYcPdazqMugmPU4fmcUKLR+B9rA/Hnj6Mrp44zr43jHRuAaGAF1uwtC+Txzf5+c8r+Hnp97+22twz/AhuqAkKMUshuuJB/OxPP4NwNAT92jnEH9yA3aii5vLC5rLj3FUdN8Z0hP0mnR0Wk7U6jIUSNJsO24E+RJ9+TPnVm98/h5m5DIXxbclvTIvH3BJPDVRs0F9uKgSfSKby6KYQL/3cafqBG95zb6Br6goMmwNFTwh2tx3zGQ1jUxoC3mVCKBuwQQ/7oREQapduI/mtt+Hg5dM/+STisRAy1Ixoewv48i8yrEnL44gkeb+5mSay+RLt2YkvfPYUPF43QpfPoC09gZInCMPugEaO6waIXCZc5JCLv2wVTcWkx+GA1++lv0RhTM0h/dpZ6HzuqWefoOAehWza5hD9Aqc72iog/slmT1ZoFtVqHZ85fRRt8Si8l99EJDtFLYStZWksO30XlBEnDxnoiJhgSFGHTaM56TomZ5MYHptAMpuDm85vJtJIvX5eOfwnThxQ1lFtPrTx8RfKsc0lQcScXtxMG6lMAU8c7MOPHNqD6qULiIxfR67kQr1cXzQHWUmTATGbrKArUMSpwRICbgecdhd9xYfp+RSGJiYozBwu3xlDrlBArHsb3PdTKF68jd69Pdg1sB0L4kebm9gpVT7IIh166qes3GaTmCGxwkOGPv3MITgdGnOVMQQ6XHD2xmBWDVSzZTq4DQY1JhYc2hmBoysCnWb4n69PIslFKBtFTCaSalF8bjfq9TqKlYqK/nO5PLJzaXh642hrj2Dq/izfWWUmYNssXytRIWf0RnD50sZQSyijbxwc7EZ7G+06n8L2IxEEntyJ6JFetB3vQp3Ru5QsoDhbgK87iNjJAQQPdKHj1A70POHF8Og4UWwMBv9c9BFBJo/LhRyj/fDYJEaSs7h+40PMT86go7MNO3dsR6lcpc9pm2XML9MGRCMvxHnyZy1zJr5MzL5O73Uy+n7q5CCcfLmOMnpCRL6aQQGqcARccIXdirngQBSRg3EyQJglrIrtHntmN/btC+CDt2Z4zlhi05ahoM54wxyM/sMXovPwbniJXlQ6HszOo0JfMRUfAhQ6WlhbkHde1RvJ2Ap4lWRvLr2AAnMiUe/kNDUQD6G7M4pysYh82YmFMpMCvab8oV6swtcfRudzOxE70QXdriu/EXAXTTFw4MiP7cShxzuQSpVaBtcqkcod8sNPJMtnFhAJBxCLBFUaI+YlAhc4plgqq/HaSih+XlKUk8uFSGVpGoy+Tx3bjR5GYKfThltjM9jeHlKagSZ27cTkfAD7dhSYgtAvDDJeqFpRSVRoitM3TEHOdanHqpifL8Hu0NcIUSca5pIZDBB+/UTDfIKa4MN9XXElTLwtrKZKp/MYHb+P+VQWPoHFpeOoCNK3lDcV0B4N4Is/cVStvqhVUvI9/XGVvWZyRTXO56zh9lwQfmcVPduYT1EQ1PVlDmkuOZfDhiRjxTf+ZgjDF+4jFvWgxHkWQYQrXC9VsO/5Yxj41BMoZXJqkiLNMk5o7nG2KwsRgTsoUH9fJ945fxUT9xII+j1NxO8VQXqaqCR+8PnTh5UQM8ksedAUnNbrEuRMJYSmhDbhtBkYuh9DuuREdzQPN8/NhgzNkGJjhK/k6vjrP7qKK5fmsXN/N81E4LnpfwbczAz2PrkP/acO4u79PKpcMN2mK38o09lrXEypZWTuTLYCj8eF40cGkc0VCNFFuFgKSLdGBNkm33LE7U8cHkBvlyWE0lC+ihKhNRpwMLPQlTBNa3GQcRvT8zFqJrkQZJyoczHqTMl1NVa+y1iDgHD0xedx6ssONaeLiaMsjNx302y9IS/sZC4xlUKFjGn6kunpFECSzblcWRVnQZ9D+UmYvjRAzVwYGqUgamhInvILe3ZO0B0PK1MSTeRp81PJEmbTFSRIWsNSFpFQVpxPR3w13JxI4eZkAW0RL+7PVfHu9TTKNU35jqHZEWr3w+MnstH3hjkuka+jryeEqUwd7w8lkJ1JwaT/afpKJ7ZJhk0hZuhb03NFZBeqtBqbivrhoF8VbYZhyFCXvYnPMomgg6hcOF6egIpw6/XMbHxuhkhUKNfQF3dhfDqHB3zxoX6/9VJqpEYfgKwuH75zN4PpGRuCLg3DI0lqBzjYH1CTN169qmxuhgKLmo6oMuSlBxS2LIgjVRiRE3M5hemSTwW8DmyLupVZdURciya1Ms5YJe7BnSEVrV97ZxoJCnVkd5iR24YahWjyVatLEqnh8K4QE8kavsuxFZrt4d0hmphOJKwrppcLIovaFnQiFnIhTl5CNC3J96SiTGXzKjTo1gMSDFQbc5vX4+AKTeHYwR0IBr10LOZAQWazmlP5hti1VZuv1IowsC3qwqnH2jCdLFLlTmyPuflCY3Fc85lyxaDWmPVSU4lMWS1QB5ks8nqlajbqEG0xiMt77YxJ22MeKxnlnJJY5ulLdwjDUvc3joze6MUyW3WxWMrhez8YVrbZEQsqycX5pObw+1zKxFp1dUpkJEqhD+8Jo6fdY5lTfW0nSDQoY+MUVLTWEbYErtUs51/eXZFAK6mMj4zb7Hby4kAo6OPcdZy9cJ3lREE1LxpHUjQyYTmviWjIh+uj9/EP33wHJ4lgHW1+BYO3J2aVvfd1x1Q8aZUnCINCTQ2sHrJCi+UlKR2E44ViXV0TtGvy4vO6cO9+UpXAnYz2ci3FKH+bmkhnF1bX+HdFkPdJv96MXyLMvQfz+OZ/zyPC7zZOPvUgxSgbwy/2/ajyIYnw5gYNenMdYNBa9OtUsVaoWeeNAQI8Nr5n7O40Rm5PoY2ltDBdKlcUIAV8axoVl2QJziyHVBkQCniUOcnqZ3Ni94RVFj8jYwliuNdCtmXMacsYW+8cqwRd1EapTqivEfKXacPjwUwihQTTFhFCJhCz81MAt7tlL+yNpo9cW2EGppUDuZx22qFDRXx5+/nhcYVo6nydVTdXfV/vvsC2fJ9Nl5XvqDRNBUFdMT06NsXUxKpHpKrUm4FybSqf5KWLeuP6P23YsaBkopXROzM4PzTOwOdfgcXmOp/rmZUwbbdJ/KkojYhmzIaDh1hF3hmfxjjrEr9vS72ufxNmmjjxylb6WOKA33/3BoPaLNqJanXD3LQBr63SjLzQyTRmNlNhLKgwtdEXg24w4FVp+8Wro0Qp25IWNu7q/63VfLDeNkv6r8204mPZKqb17987z+CZZXod3HDFVpuWXTWydQbNijIpObcSTEsIceYfnB1Snx6Gg5Zzr7x0mafXJSjrzbfxmd/dSpc9QmeXdP+Vb7+Lu9Pz6GSdIsytfqm2Ko1xUQsS3acYNC0hdKtAIoVDARXkzrx1Cal0jkDjXZpv4/7DbzdvN5sPMn5ObWJqOLSxZqBMTGqToVv3CM82DPS2qTij6gZZHTInzAuz8ikBMpWrKp+QeCEZsq6ZCkjcXPk7E9N4+9xVJUxwi53GRkP7q4sL9/LKlqm7sfvq2GwXV5BlgfCcyxdZeLXj2ZMHsL0joDojwrhQmblUkc4sDl2uWVm1OLaqaxhocwtlXLk2ikkWSR6PGx5GasPc8laubMQ+WK8bLwX1S6Svb7bfZ9UkGiRHyxR0fDCSwTam8JIYSu0gzAoYqHYm/7mpBWFSNCIClilobqGCmslah+mH9nBb0r+zXAhLkLU2KDurn+SEv7YRgpXL0o8y8PihQfhDbZijbU8+yFv+wILJqQosSyCz2Y0xzIa2TJUdSIzYu2cX+ns7cGXoRmOTyLWZab3W2Elef1th2SEpy4FGJ2/NUZPWKenE0UHs29OL+VQeuuFEwaWrLLZKJgvFWssURQQT8/KzyJL0Pegx0NbVyYxYx1vvD6s+gUDvOnwNy75Nq1t2c50naMVPNfKw46u1IU55YN8ODO7uxVwqx8zZwZW0q4aarHaZEC0IVaNAqjDSmkFQV2Yn2hKSzEFihcyxo3ebShAvXB5RWW6L4zbpyWYp8bB7iNIqekO6/s0VFfW3xULYv2cHHb2gHDQxl1EtHely6Fqd12yLsadZYmiNRWgWTOLss3PW9ka7bCcwox3c1cPqcQ6J2fTqqH6x0X/LP+r2tKznc40NfKW7Wq2GPQPd8HpdiskaUercxZtM/EqqflnyA0NppVmUyffmdTmXHV6pvd+/dJPoV1ZZtlzbu7NHAYTRrHGBb5Eeh7UB9RH32TX8Kv//Ck0n3x4Lo2t7G82rpIQZuTOFmdnUhnuAZsuE0iTiuVQAvHV7UhVJYrKd8Si2xWMoWcXN7zV+DfGx/vLh76iNPZGw/+s+MuBiMJPW/8TdGWubGeaGvxNYU1malolJx3DyboJFU059l85I0O/9bt0wBjnqT38ov0VhjTxNH3nxxsjkacLv/ySSaeUnIpTWonBanmGsuaf6t5oqCcS0xC+Ytr99Y3Tyc5ncwgt81+jD8PZIP3Pii84wrTjD0vMAU5SfJ2uf5+W9EticUj2aVpxodtGbaCdka+RY4k+NFtAE4fY7XJR/Jayfzxes7e6H/HXEowki6pdoTYe8ygD4FSLQV6Zm5o6xRH2Wgj3GQqifzLXrmh6R+qyBVBXTMNILhfosn5sgXZtJps/w/nscbxqNlqxoV4DDNB+Op/8TYAC/BW+x1IPr8AAAAABJRU5ErkJggg==",
        "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjc3MTE4QTcwOUU5RTExRTdCQUQ1QjNBRUNGMDYyMDg5IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjc3MTE4QTcxOUU5RTExRTdCQUQ1QjNBRUNGMDYyMDg5Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NzcxMThBNkU5RTlFMTFFN0JBRDVCM0FFQ0YwNjIwODkiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NzcxMThBNkY5RTlFMTFFN0JBRDVCM0FFQ0YwNjIwODkiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6vMhHPAAAL70lEQVR42rxa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",
        "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkVERDg3RTIwOUU5RTExRTdCMEM0Qzc5NDA0QjE1QjkwIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkVERDg3RTIxOUU5RTExRTdCMEM0Qzc5NDA0QjE1QjkwIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RUREODdFMUU5RTlFMTFFN0IwQzRDNzk0MDRCMTVCOTAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RUREODdFMUY5RTlFMTFFN0IwQzRDNzk0MDRCMTVCOTAiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6b4OIoAAAMIklEQVR42rxa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"
      ],
      screenHeight: ""
    };
  },
  props: {
    title: {
      type: String,
      default: "我正在使用育花园app，快来加入我吧..."
    },
    content: {
      type: String,
      default: "我正在使用育花园app，快来加入我吧..."
    },
    thumbs: {
      type: String,
      default: ""
    },
    pictures: {
      type: String,
      default: ""
    },
    href: {
      type: String,
      default: ""
    }
  },
  created() {
    let userinfo = JSON.parse(localStorage.getItem("userdata"));
    this.imgurl = userinfo.HeadImageUrl;
    let data =
      "?CustID=" +
      JSON.parse(localStorage.getItem("userdata")).CustID +
      "&testID=" +
      this.$route.query.testID;
    let self = this;
    // console.log(data)
    //获取单个测试报告
    axios
      .all([
        GetCustTestReport(data),
        GetCustTestDetailAnalysis(data),
        GetCustTestResultAnalysis(data)
      ])
      .then(
        //合并请求
        axios.spread(function(res1, res2, res3) {
          if (res1.Code === 1) {
            self.data = res1;
            self.TestResultName = res1.Data.TestResultName;
            self.ImagePath = res1.Data.ImagePath;
            self.ItemQuotientImagePath = res1.Data.ItemQuotientImagePath;
            self.OverAllCount = res1.Data.OverAllCount;
            //调用方法，画图
            self.drawLine();
            self.draw();
          }
          if (res2.Code === 1) {
            self.SummaryDesc = res2.Data;
          }
          if (res3.Code === 1) {
            self.Name = res3.Data.Name;
            self.ResultAnalysis = res3.Data.ResultAnalysis;
          }
        })
      );
  },
  mounted() {
    this.actions2 = [
      {
        name: "微信朋友",
        method: this.choicesex
      },
      {
        name: "微信朋友圈",
        method: this.choicesex
      }
    ];
  },
  methods: {
    shareSort(...arg) {
      Indicator.open({
        text: "Loading...",
        spinnerType: "fading-circle"
      });

      //shotscreen(this, 2, "https://bateersoft.cc/adhoc/updateimg.php", ...arg);

      setTimeout(() => {
        Indicator.close();
      }, 5000);
      setTimeout(() => {

        // html2Canvas(document.body).then(function(canvas) {
        //   document.body.appendChild(canvas);
        //   // var imgUri = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"); // 获取生成的图片的url
        //   // console.log(imgUri);
        //
        //   // wxshare(this, arg[1] == "WXSceneSession" ? 1 : 0,imgUri);
        // });

        var cntElem = document.getElementById("pdfDom");

        var shareContent = cntElem;//需要截图的包裹的（原生的）DOM 对象
        var width = shareContent.offsetWidth; //获取dom 宽度
        var height = shareContent.offsetHeight; //获取dom 高度
        var canvas = document.createElement("canvas"); //创建一个canvas节点
        var scale = 2; //定义任意放大倍数 支持小数
        canvas.width = width * scale; //定义canvas 宽度 * 缩放
        canvas.height = height * scale; //定义canvas高度 *缩放
        canvas.getContext("2d").scale(scale, scale); //获取context,设置scale
        var opts = {
          scale: scale, // 添加的scale 参数
          canvas: canvas, //自定义 canvas
          // logging: true, //日志开关，便于查看html2canvas的内部执行流程
          width: width, //dom 原始宽度
          height: height,
          useCORS: true // 【重要】开启跨域配置
        };

        html2canvas(shareContent, opts).then(function (canvas) {

          // document.body.appendChild(canvas);
          var imgUri = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"); // 获取生成的图片的url
          console.log(imgUri);

          wxshare(this, arg[1] == "WXSceneSession" ? 1 : 0,imgUri);
          // var context = canvas.getContext('2d');
          // // 【重要】关闭抗锯齿
          // context.mozImageSmoothingEnabled = false;
          // context.webkitImageSmoothingEnabled = false;
          // context.msImageSmoothingEnabled = false;
          // context.imageSmoothingEnabled = false;
          //
          // // 【重要】默认转化的格式为png,也可设置为其他格式
          // var img = Canvas2Image.convertToJPEG(canvas, canvas.width, canvas.height);
          //
          // document.body.appendChild(img);
          //
          // $(img).css({
          //   "width": canvas.width / 2 + "px",
          //   "height": canvas.height / 2 + "px",
          // }).addClass('f-full');

        });

      }, 1000);
      this.timer = setInterval(() => {
        getwxshare(this);
      }, 1000);

      return;
    },
    getwxsharewxshare_success(data) {
      if (data.data.application == 1 || data.data.application == 4) {
        if (data.data.wxshare < 1) {
          clearInterval(this.timer);

          if (data.data.wxshare == 0) {
            // Message.success({
            //   message: "分享成功2",
            //   center: true,
            //   duration: 1000
            // });
          } else if (data.data.wxshare == -2) {
            console.log("分享取消");
          } else {
            // Message.error({
            //   message: "分享失败",
            //   center: true,
            //   duration: 1000
            // });
          }
        } else {
          //alert("分享返回");
          clearInterval(this.timer);
        }
      }
    },
    getwxshare_failed(data) {
      Indicator.close();
    },
    back() {

      clearInterval(this.timer);
      this.$parent.loadDatas();
      this.$router.push("/growup");
    },
    show() {
      this.isshow1 = true;
    },
    show1() {
      this.isshow2 = true;
    },
    xx() {
      this.isshow1 = false;
    },
    xx1() {
      this.isshow2 = false;
    },
    //柱状图
    drawLine() {
      let self = this;
      // console.log(this.$echarts);
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        grid: {
          x: 70,
          y: "auto",
          x2: "auto",
          y2: "auto"
        },
        xAxis: {
          type: "value",
          show: false,
          min: 0,
          max: 100,
          axisLabel: { interval: 0 },
          textStyle: {
            fontSize: 12,
            color: "#8f908b"
          }
        },
        yAxis: {
          type: "category",
          data: ["社会行为", "语言", "认知能力", "精细动作", "大动作"],
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: { interval: 0 },
          splitNumber: 50,
          textStyle: {
            fontSize: 12,
            color: "#fff"
          }
        },

        series: [
          {
            data: [
              self.data.Data.ItemAbilitys.ItemE,
              self.data.Data.ItemAbilitys.ItemD,
              self.data.Data.ItemAbilitys.ItemC,
              self.data.Data.ItemAbilitys.ItemB,
              self.data.Data.ItemAbilitys.ItemA
            ],
            type: "bar",
            color: ["#f4438b"],
            itemStyle: { normal: { label: { show: true } } }
          }
        ]
      });
    },
    draw() {
      // 基于准备好的dom，初始化echarts实例
      let self = this;
      let Chart = this.$echarts.init(document.getElementById("grow"));
      Chart.setOption({
        grid: {
          x: -20,
          y: 80,
          x2: -10,
          y2: 30
        },
        xAxis: {
          type: "category",
          boundaryGap: true,
          data: ["大动作", "精细动作", "认知能力", "语言", "社会行为"],
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: { interval: 0 }
        },
        textStyle: {
          color: "#8f908b"
        },

        yAxis: {
          type: "value",
          show: false
        },
        series: [
          {
            data: [
              {
                value: self.data.Data.ItemQuotients[0].ItemQuotient,
                symbol: self.pt[0]
              },
              {
                value: self.data.Data.ItemQuotients[1].ItemQuotient,
                symbol: self.pt[1]
              },
              {
                value: self.data.Data.ItemQuotients[2].ItemQuotient,
                symbol: self.pt[2]
              },
              {
                value: self.data.Data.ItemQuotients[3].ItemQuotient,
                symbol: self.pt[3]
              },
              {
                value: self.data.Data.ItemQuotients[4].ItemQuotient,
                symbol: self.pt[4]
              }
            ],
            type: "line",
            interval: 0,
            areaStyle: {
              color: ["#f33e8d"]
            },
            itemStyle: { normal: { label: { show: true } } },
            symbolSize: 18
          }
        ]
      });
    },
    choicesex: function(index) {
      if (index.name == "微信朋友") {
        this.shareSort("weixin", "WXSceneSession");
        // this.shareSort("weixin", "WXSceneSession");
      } else {
        this.shareSort("weixin", "WXSceneTimeline");
      }
    }
  }
};
</script>
<style lang="scss" scoped type="text/css">
@import "~common/scss/variable";
@import "~common/scss/mixin";
.page_result {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  width: 100%;
  @include bg-image("./ansertest_bg");
  background-size: 100%;
  .header_page_box {
    height: 69px;
    text-align: center;
    color: #fff;
    display: flex;
    justify-content: space-between;
    .lefticon {
      font-size: rem(50);
      margin-left: rem(20);
      line-height: 80px;
    }
    .text {
      font-size: rem(45);
      display: inline-block;
      line-height: 80px;
    }
    .rightpage {
      padding-right: rem(20);
      width: rem(46);
      img {
        width: 100%;
        margin-top: rem(45);
      }
    }
  }
  .container_page_result {
    margin-top: rem(20);
    .colum1 {
      width: 96%;
      margin: 0 auto rem(15) auto;
      /*padding: rem(10);*/
      /*background: #fff;*/
      /*box-shadow: 1px 1px 5px #909399;*/
      text-align: left;
      align-items: center;
      &.type_people {
        img {
          width: 100%;
          /*height: rem(300);*/
        }
      }
    }
    .colum {
      width: 90%;
      margin: 0 auto rem(25) auto;
      padding: rem(10);
      background: #fff;
      box-shadow: 1px 1px 5px #909399;
      text-align: left;
      align-items: center;
      &.colum_info {
        display: flex;
        vertical-align: middle;
        .point {
          width: rem(16);
          height: rem(16);
        }
        .touxiang {
          width: rem(70);
          height: rem(70);
          margin-left: rem(10);
          margin-right: rem(30);
          border-radius: 100px;
        }
        .exe {
          color: #979797;
          margin-right: rem(10);
        }
        .map {
          width: rem(54);
          height: rem(38);
        }
        .people {
          ul {
            li {
              display: inline-block;
              width: rem(24);
              height: rem(37);
              @include bg-image("./person_nor");
              background-size: 100%;
              margin-left: rem(4);
              &.active {
                @include bg-image("./person_pre");
              }
            }
          }
        }
        .per {
          font-size: rem(40);
          color: #f4438b;
          margin-left: rem(20);
        }
      }
      &.colum_dev {
        .one {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          position: relative;
          .point {
            width: rem(16);
            height: rem(16);
          }
          .texts {
            font-size: rem(35);
            color: #000;
            margin-right: auto;
          }
          .result {
            width: rem(160);
            /*height: rem(80);*/
            margin-right: rem(30);
          }
          .book {
            margin-right: rem(10);
            // margin-top: rem(10);
            width: rem(50);
            height: rem(60);
          }
        }
        p.ts {
          color: #787878;
          font-size: rem(25);
          // margin-top: rem(5);
          margin-left: rem(15);
        }
        p.type {
          font-size: rem(35);
          color: #000;
          text-align: center;
          margin-top: rem(20);
        }
        .icon {
          position: absolute;
          left: 50%;
          right: 50%;
          margin-top: rem(100);
          width: rem(60);
          height: rem(60);
        }
        #myChart {
          height: rem(170);
          width: 100%;
        }
        #grow {
          height: rem(280);
          width: 100%;
        }
      }
      &.type_people {
        img {
          width: 100%;
          /*height: rem(300);*/
        }
      }
    }
  }
  .show1 {
    touch-action: none;
    .content {
      z-index: 999;
      width: rem(592);
      position: fixed;
      top: rem(400);
      left: 50%;
      transform: translate(-50%);
      background-size: 100%;
      .stitle {
        width: 100%;
        height: rem(100);
        background: #f27b9a;
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
        line-height: rem(100);
        font-size: rem(45);
        color: #fff;
        position: relative;
        p {
          font-size: rem(40);
          line-height: rem(50);
        }
        .x {
          position: absolute;
          top: rem(15);
          right: rem(30);
          width: rem(50);
          height: rem(50);
        }
      }
      .scontent {
        background: #fff;
        height: rem(400);
        padding: rem(20);
        border-bottom-left-radius: 20px;
        border-bottom-right-radius: 20px;
        overflow-y: scroll;
        line-height: 20px;
        text-align: left;
        div {
          margin-bottom: rem(15);
          margin-top: 0;
          padding-top: 0;
          font-size: rem(32);
          &.title {
            color: #f4438b;
            font-size: rem(35);
          }
        }
      }
    }
    .v-mo {
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      left: 0;
      background: #000;
      z-index: 200;
      opacity: 0.5;
    }
  }
  @media (min-height: 737px) {
    .header_page_box {
      height: 120px;
      .text {
        line-height: 120px;
      }
      .lefticon {
        line-height: 120px;
      }
      .rightpage {
        img {
          margin-top: 1.2rem;
        }
      }
    }
  }
}
</style>
