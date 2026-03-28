/**
 * 宝可梦 & 关卡数据
 *
 * spriteId = 宝可梦全国图鉴编号，用于加载 PokeAPI 精灵图
 * 图片URL: https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{spriteId}.png
 */

const SPRITE_BASE = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';

/** 根据图鉴编号获取精灵图URL */
export function spriteUrl(id) {
    return `${SPRITE_BASE}${id}.png`;
}

// 玩家宠物数据
export const PetData = {
    fire: {
        name: '小火龙', baseHP: 100, baseAttack: 12,
        color: '#ff6b6b', emoji: '🔥', spriteId: 4,
        evolvedEmoji: '🌋', evolvedSpriteId: 6, evolutionName: '喷火龙'
    },
    water: {
        name: '杰尼龟', baseHP: 120, baseAttack: 10,
        color: '#74b9ff', emoji: '💧', spriteId: 7,
        evolvedEmoji: '🌊', evolvedSpriteId: 9, evolutionName: '水箭龟'
    },
    grass: {
        name: '妙蛙种子', baseHP: 110, baseAttack: 11,
        color: '#00b894', emoji: '🌱', spriteId: 1,
        evolvedEmoji: '🌿', evolvedSpriteId: 3, evolutionName: '妙蛙花'
    }
};

// 宝可梦数据库
export const PokemonDB = {
    common: [
        { name: '绿毛虫', emoji: '🐛', spriteId: 10, baseHP: 25, attack: 5, type: '虫' },
        { name: '独角虫', emoji: '🪱', spriteId: 13, baseHP: 28, attack: 5, type: '虫' },
        { name: '波波', emoji: '🐦', spriteId: 16, baseHP: 30, attack: 6, type: '普通/飞��' },
        { name: '小拉达', emoji: '🐀', spriteId: 19, baseHP: 28, attack: 6, type: '普通' },
        { name: '烈雀', emoji: '🐤', spriteId: 21, baseHP: 30, attack: 7, type: '普通/飞行' },
        { name: '阿柏蛇', emoji: '🐍', spriteId: 23, baseHP: 32, attack: 7, type: '毒' },
        { name: '皮卡丘', emoji: '⚡', spriteId: 25, baseHP: 30, attack: 7, type: '电' },
        { name: '穿山鼠', emoji: '🦔', spriteId: 27, baseHP: 35, attack: 7, type: '地面' },
        { name: '尼多兰', emoji: '🐭', spriteId: 29, baseHP: 35, attack: 6, type: '毒' },
        { name: '尼多朗', emoji: '🐭', spriteId: 32, baseHP: 38, attack: 7, type: '毒' },
        { name: '皮皮', emoji: '🧚', spriteId: 35, baseHP: 40, attack: 5, type: '妖精' },
        { name: '六尾', emoji: '🦊', spriteId: 37, baseHP: 35, attack: 6, type: '火' },
        { name: '胖丁', emoji: '🎈', spriteId: 39, baseHP: 45, attack: 5, type: '普通/妖精' },
        { name: '超音蝠', emoji: '🦇', spriteId: 41, baseHP: 32, attack: 6, type: '毒/飞行' },
        { name: '走路草', emoji: '🌸', spriteId: 43, baseHP: 35, attack: 6, type: '草/毒' },
        { name: '毛球', emoji: '🪰', spriteId: 48, baseHP: 38, attack: 6, type: '虫/毒' },
        { name: '地鼠', emoji: '🐹', spriteId: 50, baseHP: 28, attack: 7, type: '地面' },
        { name: '喵喵', emoji: '🐱', spriteId: 52, baseHP: 35, attack: 7, type: '普通' },
        { name: '可达鸭', emoji: '🦆', spriteId: 54, baseHP: 40, attack: 6, type: '水' },
        { name: '猴怪', emoji: '🐒', spriteId: 56, baseHP: 35, attack: 8, type: '格斗' },
        { name: '卡蒂狗', emoji: '🐕', spriteId: 58, baseHP: 40, attack: 8, type: '火' },
        { name: '蚊香蝌蚪', emoji: '🐸', spriteId: 60, baseHP: 35, attack: 6, type: '水' },
        { name: '凯西', emoji: '✨', spriteId: 63, baseHP: 25, attack: 5, type: '超能力' },
        { name: '腕力', emoji: '💪', spriteId: 66, baseHP: 45, attack: 9, type: '格斗' },
        { name: '喇叭芽', emoji: '🌺', spriteId: 69, baseHP: 35, attack: 7, type: '草/毒' },
        { name: '玛瑙水母', emoji: '🪼', spriteId: 72, baseHP: 35, attack: 6, type: '水/毒' },
        { name: '小磁怪', emoji: '🧲', spriteId: 81, baseHP: 32, attack: 7, type: '电/钢' },
        { name: '嘟嘟', emoji: '🐦', spriteId: 84, baseHP: 38, attack: 8, type: '普通/飞行' },
        { name: '小海狮', emoji: '🦭', spriteId: 86, baseHP: 45, attack: 6, type: '水/冰' },
        { name: '臭泥', emoji: '🟤', spriteId: 88, baseHP: 50, attack: 8, type: '毒' }
    ],
    rock: [
        { name: '小拳石', emoji: '🪨', spriteId: 74, baseHP: 40, attack: 8, type: '岩石/地面' },
        { name: '隆隆石', emoji: '🪨', spriteId: 75, baseHP: 55, attack: 9, type: '岩石/地面' },
        { name: '大岩蛇', emoji: '🐍', spriteId: 95, baseHP: 60, attack: 10, type: '岩石/地面' }
    ],
    water: [
        { name: '海星星', emoji: '⭐', spriteId: 120, baseHP: 40, attack: 7, type: '水' },
        { name: '宝石海星', emoji: '⭐', spriteId: 121, baseHP: 55, attack: 9, type: '水/超能力' },
        { name: '角金鱼', emoji: '🐟', spriteId: 118, baseHP: 40, attack: 7, type: '水' },
        { name: '金鱼王', emoji: '🐠', spriteId: 119, baseHP: 55, attack: 9, type: '水' }
    ],
    electric: [
        { name: '皮卡丘', emoji: '⚡', spriteId: 25, baseHP: 40, attack: 8, type: '电' },
        { name: '雷丘', emoji: '⚡', spriteId: 26, baseHP: 55, attack: 10, type: '电' },
        { name: '电击兽', emoji: '⚡', spriteId: 125, baseHP: 60, attack: 11, type: '电' }
    ],
    grass: [
        { name: '臭臭花', emoji: '🌺', spriteId: 44, baseHP: 45, attack: 8, type: '草/毒' },
        { name: '霸王花', emoji: '🌸', spriteId: 45, baseHP: 60, attack: 10, type: '草/毒' },
        { name: '蔓藤怪', emoji: '🌿', spriteId: 114, baseHP: 55, attack: 9, type: '草' }
    ],
    poison: [
        { name: '阿柏蛇', emoji: '🐍', spriteId: 23, baseHP: 45, attack: 8, type: '毒' },
        { name: '阿柏怪', emoji: '🐍', spriteId: 24, baseHP: 60, attack: 10, type: '毒' },
        { name: '双弹瓦斯', emoji: '☁️', spriteId: 110, baseHP: 65, attack: 9, type: '毒' }
    ],
    psychic: [
        { name: '凯西', emoji: '✨', spriteId: 63, baseHP: 35, attack: 7, type: '超能力' },
        { name: '勇吉拉', emoji: '✨', spriteId: 64, baseHP: 50, attack: 9, type: '超能力' },
        { name: '胡地', emoji: '✨', spriteId: 65, baseHP: 65, attack: 12, type: '超能力' }
    ],
    fire: [
        { name: '卡蒂狗', emoji: '🐕', spriteId: 58, baseHP: 50, attack: 9, type: '火' },
        { name: '风速狗', emoji: '🐕', spriteId: 59, baseHP: 70, attack: 11, type: '火' },
        { name: '鸭嘴火兽', emoji: '🔥', spriteId: 126, baseHP: 65, attack: 12, type: '火' }
    ],
    ground: [
        { name: '穿山王', emoji: '🦔', spriteId: 28, baseHP: 55, attack: 9, type: '地面' },
        { name: '尼多后', emoji: '🦕', spriteId: 31, baseHP: 70, attack: 10, type: '毒/地面' },
        { name: '尼多王', emoji: '🦕', spriteId: 34, baseHP: 70, attack: 11, type: '毒/地面' }
    ],
    ice: [
        { name: '白海狮', emoji: '🦭', spriteId: 87, baseHP: 65, attack: 10, type: '水/冰' },
        { name: '迷唇姐', emoji: '💃', spriteId: 124, baseHP: 60, attack: 11, type: '冰/超能力' },
        { name: '铁甲贝', emoji: '🐚', spriteId: 91, baseHP: 70, attack: 12, type: '水/冰' }
    ],
    fighting: [
        { name: '豪力', emoji: '💪', spriteId: 67, baseHP: 65, attack: 12, type: '格斗' },
        { name: '怪力', emoji: '💪', spriteId: 68, baseHP: 80, attack: 14, type: '格斗' },
        { name: '沙瓦郎', emoji: '🦵', spriteId: 106, baseHP: 60, attack: 13, type: '格斗' }
    ],
    ghost: [
        { name: '鬼斯', emoji: '👻', spriteId: 92, baseHP: 50, attack: 10, type: '幽灵/毒' },
        { name: '鬼斯通', emoji: '👻', spriteId: 93, baseHP: 60, attack: 12, type: '幽灵/毒' },
        { name: '耿鬼', emoji: '👻', spriteId: 94, baseHP: 70, attack: 14, type: '幽灵/毒' }
    ],
    dragon: [
        { name: '迷你龙', emoji: '🐲', spriteId: 147, baseHP: 60, attack: 10, type: '龙' },
        { name: '哈克龙', emoji: '🐲', spriteId: 148, baseHP: 75, attack: 12, type: '龙' },
        { name: '快龙', emoji: '🐲', spriteId: 149, baseHP: 90, attack: 15, type: '龙/飞行' }
    ],
    champion: [
        { name: '皮卡丘', emoji: '⚡', spriteId: 25, baseHP: 80, attack: 14, type: '电' },
        { name: '喷火龙', emoji: '🔥', spriteId: 6, baseHP: 90, attack: 15, type: '火/��行' },
        { name: '水箭龟', emoji: '🌊', spriteId: 9, baseHP: 95, attack: 14, type: '水' },
        { name: '妙蛙花', emoji: '🌿', spriteId: 3, baseHP: 90, attack: 14, type: '草/毒' },
        { name: '卡比兽', emoji: '🐻', spriteId: 143, baseHP: 110, attack: 13, type: '普通' },
        { name: '快龙', emoji: '🐲', spriteId: 149, baseHP: 100, attack: 16, type: '龙/飞行' }
    ]
};

// 8大道馆
export const GymData = [
    { id: 1, name: '尼比道馆', leader: '小刚', type: '岩石系', emoji: '🪨', signaturePokemon: '大岩蛇', signatureSpriteId: 95, pokemonType: 'rock', baseHP: 60, attack: 8 },
    { id: 2, name: '华蓝道馆', leader: '小霞', type: '水系', emoji: '💧', signaturePokemon: '宝石海星', signatureSpriteId: 121, pokemonType: 'water', baseHP: 70, attack: 9 },
    { id: 3, name: '枯叶道馆', leader: '马志士', type: '电系', emoji: '⚡', signaturePokemon: '雷丘', signatureSpriteId: 26, pokemonType: 'electric', baseHP: 80, attack: 10 },
    { id: 4, name: '彩虹道馆', leader: '莉佳', type: '草系', emoji: '🌿', signaturePokemon: '霸王花', signatureSpriteId: 45, pokemonType: 'grass', baseHP: 90, attack: 11 },
    { id: 5, name: '浅红道馆', leader: '阿桔', type: '毒系', emoji: '☠️', signaturePokemon: '阿柏怪', signatureSpriteId: 24, pokemonType: 'poison', baseHP: 100, attack: 12 },
    { id: 6, name: '金黄道馆', leader: '娜姿', type: '超能力系', emoji: '🔮', signaturePokemon: '胡地', signatureSpriteId: 65, pokemonType: 'psychic', baseHP: 110, attack: 13 },
    { id: 7, name: '红莲道馆', leader: '夏伯', type: '火系', emoji: '🔥', signaturePokemon: '风速狗', signatureSpriteId: 59, pokemonType: 'fire', baseHP: 120, attack: 14 },
    { id: 8, name: '常青道馆', leader: '菊子', type: '地面系', emoji: '🏜️', signaturePokemon: '尼多王', signatureSpriteId: 34, pokemonType: 'ground', baseHP: 130, attack: 15 }
];

// 四大天王
export const EliteFourData = [
    { id: 1, name: '科拿', type: '冰系', emoji: '❄️', title: '冰之天王', signaturePokemon: '铁甲贝', signatureSpriteId: 91, pokemonType: 'ice', baseHP: 150, attack: 16 },
    { id: 2, name: '希巴', type: '格斗系', emoji: '👊', title: '格斗天王', signaturePokemon: '怪力', signatureSpriteId: 68, pokemonType: 'fighting', baseHP: 160, attack: 17 },
    { id: 3, name: '菊子', type: '幽灵系', emoji: '👻', title: '幽灵天王', signaturePokemon: '耿鬼', signatureSpriteId: 94, pokemonType: 'ghost', baseHP: 170, attack: 18 },
    { id: 4, name: '渡', type: '龙系', emoji: '🐲', title: '龙之天王', signaturePokemon: '快龙', signatureSpriteId: 149, pokemonType: 'dragon', baseHP: 180, attack: 19 }
];

// 冠军
export const ChampionData = {
    name: '小智', title: '联盟冠军', emoji: '👑',
    signaturePokemon: '皮卡丘', signatureSpriteId: 25, pokemonType: 'champion',
    baseHP: 200, attack: 20
};
