// 用于musi当中的请求的代理
const express = require('express')
const axios = require('axios')
const proxy = require('http-proxy-middleware')
const app = express()
// 获取vkey
// app.get('/api/getVkey', (req, res) => {
  // axios.post('https://u.y.qq.com/cgi-bin/musicu.fcg?_=1548133859489', {
  //   params: {
  //     "req_0": {
  //       "module":"vkey.GetVkeyServer",
  //       "method":"CgiGetVkey",
  //       "param":{
  //         "guid":"2880535306",
  //         "songmid":["002krvKI4Jgvq9", "002E3MtF0IAMMY"],
  //         "songtype":[],
  //         "uin":"0",
  //         "loginflag":0,
  //         "platform":"23",
  //         "h5to":"speed"
  //         }
  //       },
  //     "comm": {
  //       "g_tk":5381,
  //       "uin":0,
  //       "format":"json",
  //       "ct":23,
  //       "cv":0
  //     }
  //   },
  //   headers: {
  //     ':authority' : 'u.y.qq.com',
  //     ':method': 'POST',
  //     ':path:' : '/cgi-bin/musicu.fcg?_=1548133859489',
  //     ':scheme': 'https',
  //     referer: 'https://y.qq.com/w/toplist.html?ADTAG=myqq&from=myqq&channel=10007100&id=26&type=top',
  //     host: 'c.y.qq.com'
  //   }
  // }).then( response => {
  //   console.log(response)
  //   // res.json(response)
  // }, error => {
  //   console.log(error)
  // })
// })
app.use('/', (req, res, next) => {
  console.log(req.method)
  next()
})
// 获取轮播图数据
app.use('/api/getSwiperList', proxy({
  target: "https://c.y.qq.com",
  changeOrigin: true,
  pathRewrite: {'^/api/getSwiperList' : `/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?
  g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_=${new Date().valueOf()}`}
}))
// 获取歌单数据
app.get('/api/getDiscList', (req, res) => {
  let url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then( response => {
    res.json(response.data)
  }, error => {
    console.log(error)
  })
})
// 获取歌手列表数据
app.get('/api/getSingerList', (req, res) => {
  let url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'
  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then( response => {
    res.json(response.data)
  }, error => {
    console.log(error)
  })
})
// 获取歌手歌曲数据
app.get('/api/getSingerDetail', (req, res) => {
  let url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'
  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then( response => {
    res.json(response.data)
  }, error => {
    console.log(error)
  })
})
// 获取歌曲歌词数据
app.get('/api/getLyric', (req, res) => {
  let url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg'
  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then( response => {
    let ret = response.data
    if (typeof ret === 'string') {
      let reg = /^\w+\(({[^()]+})\)$/
      let matches = ret.match(reg)
      if (matches) {
        ret = JSON.parse(matches)
      }
    }
    res.json(ret)
  }, error => {
    console.log(error)
  })
})
// 获取歌单歌曲数据
app.get('/api/getSongList', (req, res) => {
  let url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then( response => {
    res.json(response.data)
  }, error => {
    console.log(error)
  })
})
// 获取排行列表
app.get('/api/getTopList', (req, res) => {
  let url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'
  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then( response => {
    res.json(response.data)
  }, error => {
    console.log(error)
  })
})
// 获取单个排行的音乐列表
app.get('/api/getTopMusicList', (req, res) => {
  let url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'
  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then( response => {
    res.json(response.data)
  }, error => {
    console.log(error)
  })
})
// 获取搜索热词
app.get('/api/getHotKey', (req, res) => {
  let url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'
  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then( response => {
    res.json(response.data)
  }, error => {
    console.log(error)
  })
})
// 根据关键词搜索歌曲
app.get('/api/search', (req, res) => {
  let url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp'
  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then( response => {
    res.json(response.data)
  }, error => {
    console.log(error)
  })
})
app.listen(8081, () => {
  console.log('开启8081端口')
})