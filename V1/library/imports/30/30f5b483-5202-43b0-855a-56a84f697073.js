"use strict";
cc._RF.push(module, '30f5bSDUgJDsIVaVqhPaXBz', 'api.config');
// scripts/config/api.config.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    // 用户
    user_reg: 'post./user/:registerCode',
    login: 'post./user',
    reset_pwd: 'put./user/password/:resetPasswordCode',
    user_check: '/user/check',
    get_regCode: '/user/:codeType/:sendType/code',
    check_code: '/user/checkCode/:code/:inputCode',
    wxLogin: 'post./user/wx/:code',
    get_reset_avatar: '/user/reset/avatar',
    get_assets: '/user/assets',
    // 反馈
    get_feedBack: '/notice/feedback/type',
    user_feedBack: 'post./notice/feedback',
    // 首页
    get_games_list: '/game/home/list',
    get_home_message: '/game/home/message',
    server_config: '/game/server',
    // 游戏
    game_record: '/game/record/:gameId',
    // 活动
    home_activity: '/activity',
    // 邮件
    home_email: '/email',
    email_content: '/email/:emailId',
    // 房间
    create_room: 'post./room/:gameName',
    room_join: 'post./room/join',
    room_exit: 'post./room/exit',
    room_info: '/room/info',
    room_isStart: '/room/:gameName/isStart',
    room_random: '/room/random',
    // 商城
    shop_buy: 'post./shop/buy/:goodsId',
    shop_menu: '/shop/main',
    shop_menu_goods: '/shop/main/:menuId',
    // 微服务接口
    // get_city:          'test1:/public/city',                   // 获取城市 [测试阶段接口暂时暂停访问 付费接口]
    get_city: 'test1:/public/city111111',
    get_weather: 'test1:/public/weather',
};

cc._RF.pop();