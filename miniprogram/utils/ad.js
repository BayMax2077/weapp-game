/**
 * 广告管理器
 * 处理微信广告展示
 */

class AdManager {
  constructor() {
    this.bannerAd = null;
    this.interstitialAd = null;
    this.rewardedVideoAd = null;
    
    // 广告配置
    this.config = {
      banner: {
        adUnitId: 'adunit-banner-test', // 测试广告位ID，正式环境需要替换
        enabled: false // 开发阶段禁用，避免测试时显示广告
      },
      interstitial: {
        adUnitId: 'adunit-interstitial-test', // 测试广告位ID，正式环境需要替换
        enabled: false // 开发阶段禁用，避免测试时显示广告
      },
      rewardedVideo: {
        adUnitId: 'adunit-rewarded-test', // 测试广告位ID，正式环境需要替换
        enabled: false // 开发阶段禁用，避免测试时显示广告
      }
    };
  }
  
  /**
   * 显示横幅广告
   */
  showBannerAd() {
    if (!this.config.banner.enabled) {
      console.log('横幅广告已禁用');
      return Promise.resolve();
    }
    
    return new Promise((resolve, reject) => {
      if (!this.bannerAd) {
        this.bannerAd = wx.createBannerAd({
          adUnitId: this.config.banner.adUnitId,
          style: {
            left: 0,
            top: 0,
            width: 375
          }
        });
        
        this.bannerAd.onLoad(() => {
          console.log('横幅广告加载成功');
        });
        
        this.bannerAd.onError((error) => {
          console.error('横幅广告加载失败:', error);
        });
      }
      
      this.bannerAd.show()
        .then(() => {
          console.log('横幅广告显示成功');
          resolve();
        })
        .catch((error) => {
          console.error('横幅广告显示失败:', error);
          reject(error);
        });
    });
  }
  
  /**
   * 隐藏横幅广告
   */
  hideBannerAd() {
    if (this.bannerAd) {
      this.bannerAd.hide();
      console.log('横幅广告已隐藏');
    }
  }
  
  /**
   * 销毁横幅广告
   */
  destroyBannerAd() {
    if (this.bannerAd) {
      this.bannerAd.destroy();
      this.bannerAd = null;
      console.log('横幅广告已销毁');
    }
  }
  
  /**
   * 显示插屏广告
   */
  showInterstitialAd() {
    if (!this.config.interstitial.enabled) {
      console.log('插屏广告已禁用');
      return Promise.resolve(false);
    }
    
    return new Promise((resolve, reject) => {
      if (!this.interstitialAd) {
        this.interstitialAd = wx.createInterstitialAd({
          adUnitId: this.config.interstitial.adUnitId
        });
        
        this.interstitialAd.onLoad(() => {
          console.log('插屏广告加载成功');
        });
        
        this.interstitialAd.onError((error) => {
          console.error('插屏广告加载失败:', error);
        });
        
        this.interstitialAd.onClose(() => {
          console.log('插屏广告已关闭');
          resolve(true);
        });
      }
      
      this.interstitialAd.show()
        .then(() => {
          console.log('插屏广告显示成功');
        })
        .catch((error) => {
          console.error('插屏广告显示失败:', error);
          reject(error);
        });
    });
  }
  
  /**
   * 显示激励视频广告
   */
  showRewardedVideoAd() {
    if (!this.config.rewardedVideo.enabled) {
      console.log('激励视频广告已禁用');
      return Promise.resolve(false);
    }
    
    return new Promise((resolve, reject) => {
      if (!this.rewardedVideoAd) {
        this.rewardedVideoAd = wx.createRewardedVideoAd({
          adUnitId: this.config.rewardedVideo.adUnitId
        });
        
        this.rewardedVideoAd.onLoad(() => {
          console.log('激励视频广告加载成功');
        });
        
        this.rewardedVideoAd.onError((error) => {
          console.error('激励视频广告加载失败:', error);
          reject(error);
        });
        
        this.rewardedVideoAd.onClose((res) => {
          if (res && res.isEnded) {
            console.log('激励视频广告观看完成');
            resolve(true);
          } else {
            console.log('激励视频广告未观看完成');
            resolve(false);
          }
        });
      }
      
      this.rewardedVideoAd.show()
        .then(() => {
          console.log('激励视频广告显示成功');
        })
        .catch((error) => {
          console.error('激励视频广告显示失败:', error);
          // 重新加载广告
          this.rewardedVideoAd.load()
            .then(() => this.rewardedVideoAd.show())
            .catch((err) => reject(err));
        });
    });
  }
  
  /**
   * 预加载激励视频广告
   */
  preloadRewardedVideoAd() {
    if (!this.config.rewardedVideo.enabled) {
      return;
    }
    
    if (!this.rewardedVideoAd) {
      this.rewardedVideoAd = wx.createRewardedVideoAd({
        adUnitId: this.config.rewardedVideo.adUnitId
      });
      
      this.rewardedVideoAd.onLoad(() => {
        console.log('激励视频广告预加载成功');
      });
      
      this.rewardedVideoAd.onError((error) => {
        console.error('激励视频广告预加载失败:', error);
      });
    }
    
    this.rewardedVideoAd.load();
  }
}

// 创建单例
const ad = new AdManager();

module.exports = ad;

