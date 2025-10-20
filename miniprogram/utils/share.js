/**
 * 分享功能工具
 * 游戏分享、房间邀请、朋友圈分享
 */

class ShareManager {
  constructor() {
    this.shareConfig = {
      defaultTitle: '一起来玩游戏吧！',
      defaultPath: '/pages/index/index',
      defaultImageUrl: '/assets/images/share.jpg'
    };
  }

  /**
   * 游戏分享
   * @param {string} gameId 游戏ID
   * @param {string} gameName 游戏名称
   */
  shareGame(gameId, gameName) {
    return {
      title: `一起来玩${gameName}吧！`,
      path: `/pages/games/games?gameId=${gameId}&gameName=${gameName}`,
      imageUrl: '/assets/images/game-share.jpg'
    };
  }

  /**
   * 房间邀请
   * @param {string} roomCode 房间号
   * @param {string} gameId 游戏ID
   * @param {string} gameName 游戏名称
   */
  shareRoom(roomCode, gameId, gameName) {
    return {
      title: `房间号：${roomCode}，一起来玩${gameName}吧！`,
      path: `/pages/room/room?roomCode=${roomCode}&gameId=${gameId}`,
      imageUrl: '/assets/images/room-share.jpg'
    };
  }

  /**
   * 朋友圈分享
   * @param {string} content 分享内容
   * @param {string} imageUrl 分享图片
   */
  shareTimeline(content, imageUrl) {
    return {
      title: content,
      imageUrl: imageUrl || this.shareConfig.defaultImageUrl
    };
  }

  /**
   * 通用分享
   * @param {Object} options 分享选项
   */
  share(options = {}) {
    const {
      title = this.shareConfig.defaultTitle,
      path = this.shareConfig.defaultPath,
      imageUrl = this.shareConfig.defaultImageUrl,
      query = ''
    } = options;

    return {
      title,
      path: query ? `${path}?${query}` : path,
      imageUrl
    };
  }

  /**
   * 设置分享菜单
   * @param {Object} options 分享选项
   */
  setupShareMenu(options = {}) {
    const {
      withShareTicket = true,
      menus = ['shareAppMessage', 'shareTimeline']
    } = options;

    wx.showShareMenu({
      withShareTicket,
      menus
    });
  }

  /**
   * 获取分享信息
   * @param {string} type 分享类型
   * @param {Object} data 分享数据
   */
  getShareInfo(type, data) {
    switch (type) {
      case 'game':
        return this.shareGame(data.gameId, data.gameName);
      case 'room':
        return this.shareRoom(data.roomCode, data.gameId, data.gameName);
      case 'timeline':
        return this.shareTimeline(data.content, data.imageUrl);
      default:
        return this.share(data);
    }
  }
}

// 创建单例
const shareManager = new ShareManager();

module.exports = shareManager;
