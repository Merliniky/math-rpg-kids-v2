/**
 * 事件驱动的状态管理器
 */
export class EventBus {
    constructor() {
        this._listeners = {};
    }

    on(event, fn) {
        (this._listeners[event] ||= []).push(fn);
        return () => this.off(event, fn);
    }

    off(event, fn) {
        const list = this._listeners[event];
        if (list) this._listeners[event] = list.filter(f => f !== fn);
    }

    emit(event, data) {
        (this._listeners[event] || []).forEach(fn => fn(data));
    }
}

/**
 * 游戏状态存储
 */
export class GameStore {
    constructor(bus) {
        this.bus = bus;
        this.data = {
            gameState: null,
            battlePhase: null,
            pet: null,
            enemy: null,
            question: null,
            level: 1,
            subLevel: 1,
            monstersDefeated: 0,
            encounterType: null  // 'trainer' | 'gymLeader' | 'eliteFour' | 'champion'
        };
    }

    get(key) {
        return this.data[key];
    }

    set(key, value) {
        const old = this.data[key];
        this.data[key] = value;
        this.bus.emit(`change:${key}`, { value, old });
    }

    update(partial) {
        for (const [key, value] of Object.entries(partial)) {
            this.set(key, value);
        }
    }
}
