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
 * 存档管理器
 */
const SAVE_KEY = 'math-rpg-kids-v2-save';
const SAVE_VERSION = 1;

export class SaveManager {
    static save(store) {
        const pet = store.get('pet');
        if (!pet) return;
        const data = {
            version: SAVE_VERSION,
            timestamp: Date.now(),
            pet: {
                type: pet.type, name: pet.name, level: pet.level,
                xp: pet.xp, xpToNext: pet.xpToNext,
                hp: pet.hp, maxHP: pet.maxHP,
                attack: pet.attack, evolved: pet.evolved, potions: pet.potions
            },
            progress: {
                level: store.get('level'),
                subLevel: store.get('subLevel'),
                monstersDefeated: store.get('monstersDefeated')
            }
        };
        try {
            localStorage.setItem(SAVE_KEY, JSON.stringify(data));
        } catch (e) { /* storage full or unavailable */ }
    }

    static load() {
        try {
            const raw = localStorage.getItem(SAVE_KEY);
            if (!raw) return null;
            const data = JSON.parse(raw);
            if (!data || !data.pet || !data.progress) return null;
            return data;
        } catch (e) { return null; }
    }

    static delete() {
        try { localStorage.removeItem(SAVE_KEY); } catch (e) { /* */ }
    }

    static hasSave() {
        return this.load() !== null;
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
