"use strict";
cc._RF.push(module, 'f16b47wx4dPgrwwvbOw/kQN', 'default.config');
// scripts/config/default.config.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    /**
     * Server Request Config
     */
    server: {
        host: 'https://io.slmblog.com',
        devHost: 'http://127.0.0.1:7100',
        children: {},
    },
    /**
     * Socket.io Port Conifg
     */
    io: {
        main: 'https://io.slmblog.com',
        dev: {
            main: 'http://127.0.0.1:7100',
        },
    },
};

cc._RF.pop();