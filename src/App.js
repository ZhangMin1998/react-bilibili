import './index.css'
import avatar from './images/avatar.png'
import React from 'react'
import { v4 as uuid } from 'uuid'

// 时间格式化
function formatDate (time) {
  return `${time.getFullYear()}-${time.getMonth()}-${time.getDate()}`
}

class App extends React.Component {
  state = {
    // hot: 热度排序  time: 时间排序
    tabs: [
      {
        id: 1,
        name: '热度',
        type: 'hot'
      },
      {
        id: 2,
        name: '时间',
        type: 'time'
      }
    ],
    active: 'hot',
    list: [
      {
        id: 1,
        author: '刘德华',
        comment: '给我一杯忘情水',
        time: new Date('2021-10-10 09:09:00'),
        // 1: 点赞 0：无态度 -1:踩
        attitude: 1
      },
      {
        id: 2,
        author: '周杰伦',
        comment: '哎哟，不错哦',
        time: new Date('2021-10-11 09:09:00'),
        // 1: 点赞 0：无态度 -1:踩
        attitude: 0
      },
      {
        id: 3,
        author: '五月天',
        comment: '不打扰，是我的温柔',
        time: new Date('2021-10-11 10:09:00'),
        // 1: 点赞 0：无态度 -1:踩
        attitude: -1
      }
    ],
    comment: ''
  }
  // tab切换
  switchTab = (type) => {
    this.setState({
      active: type
    })
  }
  // 受控组件回调
  textareaChange = (e) => {
    this.setState({
      comment: e.target.value
    })
  }
  submitComment = () => {
    this.setState({
      list: [
        ...this.state.list,
        {
          id: uuid(),
          author: '林俊杰',
          comment: '江南',
          time: new Date('2023-08-13 22:35:00'),
          // 1: 点赞 0：无态度 -1:踩
          attitude: 1
        }
      ]
    })
  }
  deleteComment = (id) => {
    this.setState({
      list: this.state.list.filter(item => item.id !== id)
    })
  }
  toggleLike = (curItem) => {
    const { attitude, id } = curItem
    this.setState({
      list: this.state.list.map(item => {
        if (item.id === id) {
          return {
            ...item,
            attitude: attitude === 1 ? 0 : 1
          }
        } else {
          return item
        }
      })
    })
  }
  toggleHate = (curItem) => {
    const { attitude, id } = curItem
    this.setState({
      list: this.state.list.map(item => {
        if (item.id === id) {
          return {
            ...item,
            attitude: attitude === -1 ? 0 : -1
          }
        } else {
          return item
        }
      })
    })
  }
  render () {
    return (
      <div className="App">
        <div className="comment-container">
          {/* 评论数 */}
          <div className="comment-head">
            <span>5 评论</span>
          </div>
          {/* 排序 */}
          <div className="tabs-order">
            <ul className="sort-container">
              {
                this.state.tabs.map(tab => (
                  <li
                    onClick={() => this.switchTab(tab.type)}
                    key={tab.id}
                    className={tab.type === this.state.active ? 'on' : ''}
                  >按{tab.name}排序</li>
                ))
              }
            </ul>
          </div>

          {/* 添加评论 */}
          <div className="comment-send">
            <div className="user-face">
              <img className="user-head" src={avatar} alt="" />
            </div>
            <div className="textarea-container">
              <textarea
                cols="80"
                rows="5"
                placeholder="发条友善的评论"
                className="ipt-txt"
                value={this.state.comment}
                onChange={this.textareaChange}
              />
              <button className="comment-submit" onClick={this.submitComment}>发表评论</button>
            </div>
            <div className="comment-emoji">
              <i className="face"></i>
              <span className="text">表情</span>
            </div>
          </div>

          {/* 评论列表 */}
          <div className="comment-list">
            {
              this.state.list.map(item => (
                <div className="list-item" key={item.id}>
                  <div className="user-face">
                    <img className="user-head" src={avatar} alt="" />
                  </div>
                  <div className="comment">
                    <div className="user">{item.author}</div>
                    <p className="text">{item.comment}</p>
                    <div className="info">
                      <span className="time">{formatDate(item.time)}</span>
                      <span
                        className={item.attitude === 1 ? 'like liked' : 'like'}
                        onClick={() => this.toggleLike(item)}
                      >
                        <i className="icon" />
                      </span>
                      <span
                        className={item.attitude === -1 ? 'hate hated' : 'hate'}
                        onClick={() => this.toggleHate(item)}
                      >
                        <i className="icon" />
                      </span>
                      <span className="reply btn-hover" onClick={() => this.deleteComment(item.id)}>删除</span>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>)
  }
}

export default App
