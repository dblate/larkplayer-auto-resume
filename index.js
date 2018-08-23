/**
 * @file larkplayer 断点续播插件
 * @author yuhui06
 * @date 2018/8/22
 */

import {Plugin, DOM} from 'larkplayer';
import storageAvailable from 'storage-available';
import throttle from 'lodash.throttle';
import isPlainObject from 'lodash.isplainobject';

export default class AutoResume extends Plugin {

    /**
     * AutoResume 构造函数
     *
     * @param {Player} player 播放器实例
     * @param {Object=} options 配置项，可选
     * @param {Function=} options.key 记录视频的 key，默认为 src，也可通过函数设置自定义的值（函数会传入 src 作为参数）
     * @param {number=} options.minPlayed 最小播放时长，默认为 0。上次播放时长需大于此值才会执行断点续播的逻辑
     * @param {number=} options.maxPlayed 最大播放时长，默认为视频总时长 - 5。该值可为正数或负数：
     *                                    - 为正数时，指最大播放时长
     *                                    - 为负数时，视频总时长减去该值（的绝对值）为最大播放时长
     */
    constructor(player, options) {
        super(player, options);

        this.NAME = 'larkplayer-auto-resume';
        this.recordTime = throttle(this.recordTime, 500);
        this.recordTime = this.recordTime.bind(this);
        this.resumePlaying = this.resumePlaying.bind(this);
        this.player.on('timeupdate', this.recordTime);
        this.player.on('firstplay', this.resumePlaying);
    }

    getMinPlayed() {
        const minPlayed = parseInt(this.options.minPlayed, 10) || 0;
        return Math.max(minPlayed, 0);
    }

    getMaxPlayed() {
        const duration = this.player.duration() || 0;
        const defaultMax = Math.max(duration - 5, 0);
        const maxPlayed = parseInt(this.options.maxPlayed, 10) || 0;

        if (!maxPlayed) {
            return defaultMax;
        }

        if (maxPlayed > 0) {
            return maxPlayed;
        }

        if (maxPlayed < 0) {
            return duration + maxPlayed;
        }
    }

    getKey() {
        const src = this.player.src();
        return (typeof this.options.key === 'function') ? this.options.key(src) : src;
    }

    getRecord() {
        try {
            const record = JSON.parse(localStorage.getItem(this.NAME));
            return isPlainObject(record) ? record : {};
        } catch (ex) {
            return {};
        }
    }

    resumePlaying() {
        const lastRecord = this.getRecord();
        if (lastRecord) {
            const key = this.getKey();
            const lastPlayed = lastRecord[key];
            const maxPlayed = this.getMaxPlayed();
            const minPlayed = this.getMinPlayed();

            if (lastPlayed && lastPlayed > minPlayed && lastPlayed < maxPlayed) {
                this.player.currentTime(lastPlayed);
            }
        }
    }

    recordTime() {
        const lastRecord = this.getRecord();
        const currentTime = this.player.currentTime();
        const key = this.getKey();

        lastRecord[key] = currentTime;

        try {
            localStorage.setItem(this.NAME, JSON.stringify(lastRecord));
        } catch (e) {
            const isQuotaExceed = (e instanceof DOMException && (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED'));
            if (isQuotaExceed) {
                lastRecord.shift();
                localStorage.setItem(this.NAME, JSON.stringify(lastRecord));
            }
        }
    }

    dispose() {
        this.player.off('timeupdate', this.recordTime);
        this.player.off('firstplay', this.resumePlaying);

        super.dispose();
    }
}

if (storageAvailable('localStorage')) {
    Plugin.register(AutoResume, {name: 'autoResume'});
}
