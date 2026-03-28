/**
 * 宝可梦 & 关卡数据
 */

// 玩家宠物数据
export const PetData = {
    fire: {
        name: '小火龙', baseHP: 100, baseAttack: 12,
        color: '#ff6b6b', emoji: '🔥',
        evolvedEmoji: '🌋', evolutionName: '喷火龙'
    },
    water: {
        name: '杰尼龟', baseHP: 120, baseAttack: 10,
        color: '#74b9ff', emoji: '💧',
        evolvedEmoji: '🌊', evolutionName: '水箭龟'
    },
    grass: {
        name: '妙蛙种子', baseHP: 110, baseAttack: 11,
        color: '#00b894', emoji: '🌱',
        evolvedEmoji: '🌿', evolutionName: '妙蛙花'
    }
};

// 宝可梦数据库
export const PokemonDB = {
    common: [
        { name: '绿毛虫', emoji: '🐛', baseHP: 25, attack: 5, type: '虫' },
        { name: '独角虫', emoji: '🪱', baseHP: 28, attack: 5, type: '虫' },
        { name: '波波', emoji: '🐦', baseHP: 30, attack: 6, type: '普通/飞行' },
        { name: '小拉达', emoji: '🐀', baseHP: 28, attack: 6, type: '普通' },
        { name: '烈雀', emoji: '🐤', baseHP: 30, attack: 7, type: '普通/飞行' },
        { name: '阿柏蛇', emoji: '🐍', baseHP: 32, attack: 7, type: '毒' },
        { name: '皮卡丘', emoji: '⚡', baseHP: 30, attack: 7, type: '电' },
        { name: '穿山鼠', emoji: '🦔', baseHP: 35, attack: 7, type: '地面' },
        { name: '尼多兰', emoji: '🐭', baseHP: 35, attack: 6, type: '毒' },
        { name: '尼多朗', emoji: '🐭', baseHP: 38, attack: 7, type: '毒' },
        { name: '皮皮', emoji: '🧚', baseHP: 40, attack: 5, type: '妖精' },
        { name: '六尾', emoji: '🦊', baseHP: 35, attack: 6, type: '火' },
        { name: '胖丁', emoji: '🎈', baseHP: 45, attack: 5, type: '普通/妖精' },
        { name: '超音蝠', emoji: '🦇', baseHP: 32, attack: 6, type: '毒/飞行' },
        { name: '走路草', emoji: '🌸', baseHP: 35, attack: 6, type: '草/毒' },
        { name: '毛球', emoji: '🪰', baseHP: 38, attack: 6, type: '虫/毒' },
        { name: '地鼠', emoji: '🐹', baseHP: 28, attack: 7, type: '地面' },
        { name: '喵喵', emoji: '🐱', baseHP: 35, attack: 7, type: '普通' },
        { name: '可达鸭', emoji: '🦆', baseHP: 40, attack: 6, type: '水' },
        { name: '猴怪', emoji: '🐒', baseHP: 35, attack: 8, type: '格斗' },
        { name: '卡蒂狗', emoji: '🐕', baseHP: 40, attack: 8, type: '火' },
        { name: '蚊香蝌蚪', emoji: '🐸', baseHP: 35, attack: 6, type: '水' },
        { name: '凯西', emoji: '✨', baseHP: 25, attack: 5, type: '超能力' },
        { name: '腕力', emoji: '💪', baseHP: 45, attack: 9, type: '格斗' },
        { name: '喇叭芽', emoji: '🌺', baseHP: 35, attack: 7, type: '草/毒' },
        { name: '玛瑙水母', emoji: '🪼', baseHP: 35, attack: 6, type: '水/毒' },
        { name: '小磁怪', emoji: '🧲', baseHP: 32, attack: 7, type: '电/钢' },
        { name: '嘟嘟', emoji: '🐦', baseHP: 38, attack: 8, type: '普通/飞行' },
        { name: '小海狮', emoji: '🦭', baseHP: 45, attack: 6, type: '水/冰' },
        { name: '臭泥', emoji: '🟤', baseHP: 50, attack: 8, type: '毒' }
    ],
    rock: [
        { name: '小拳石', emoji: '🪨', baseHP: 40, attack: 8, type: '岩石/地面' },
        { name: '隆隆石', emoji: '🪨', baseHP: 55, attack: 9, type: '岩石/地面' },
        { name: '大岩蛇', emoji: '🐍', baseHP: 60, attack: 10, type: '岩石/地面' }
    ],
    water: [
        { name: '海星星', emoji: '⭐', baseHP: 40, attack: 7, type: '水' },
        { name: '宝石海星', emoji: '⭐', baseHP: 55, attack: 9, type: '水/超能力' },
        { name: '角金鱼', emoji: '🐟', baseHP: 40, attack: 7, type: '水' },
        { name: '金鱼王', emoji: '🐠', baseHP: 55, attack: 9, type: '水' }
    ],
    electric: [
        { name: '皮卡丘', emoji: '⚡', baseHP: 40, attack: 8, type: '电' },
        { name: '雷丘', emoji: '⚡', baseHP: 55, attack: 10, type: '电' },
        { name: '电击兽', emoji: '⚡', baseHP: 60, attack: 11, type: '电' }
    ],
    grass: [
        { name: '臭臭花', emoji: '🌺', baseHP: 45, attack: 8, type: '草/毒' },
        { name: '霸王花', emoji: '🌸', baseHP: 60, attack: 10, type: '草/毒' },
        { name: '蔓藤怪', emoji: '🌿', baseHP: 55, attack: 9, type: '草' }
    ],
    poison: [
        { name: '阿柏蛇', emoji: '🐍', baseHP: 45, attack: 8, type: '毒' },
        { name: '阿柏怪', emoji: '🐍', baseHP: 60, attack: 10, type: '毒' },
        { name: '双弹瓦斯', emoji: '☁️', baseHP: 65, attack: 9, type: '毒' }
    ],
    psychic: [
        { name: '凯西', emoji: '✨', baseHP: 35, attack: 7, type: '超能力' },
        { name: '勇吉拉', emoji: '✨', baseHP: 50, attack: 9, type: '超能力' },
        { name: '胡地', emoji: '✨', baseHP: 65, attack: 12, type: '超能力' }
    ],
    fire: [
        { name: '卡蒂狗', emoji: '🐕', baseHP: 50, attack: 9, type: '火' },
        { name: '风速狗', emoji: '🐕', baseHP: 70, attack: 11, type: '火' },
        { name: '鸭嘴火兽', emoji: '🔥', baseHP: 65, attack: 12, type: '火' }
    ],
    ground: [
        { name: '穿山王', emoji: '🦔', baseHP: 55, attack: 9, type: '地面' },
        { name: '尼多后', emoji: '🦕', baseHP: 70, attack: 10, type: '毒/地面' },
        { name: '尼多王', emoji: '🦕', baseHP: 70, attack: 11, type: '毒/地面' }
    ],
    ice: [
        { name: '白海狮', emoji: '🦭', baseHP: 65, attack: 10, type: '水/冰' },
        { name: '迷唇姐', emoji: '💃', baseHP: 60, attack: 11, type: '冰/超能力' },
        { name: '铁甲贝', emoji: '🐚', baseHP: 70, attack: 12, type: '水/冰' }
    ],
    fighting: [
        { name: '豪力', emoji: '💪', baseHP: 65, attack: 12, type: '格斗' },
        { name: '怪力', emoji: '💪', baseHP: 80, attack: 14, type: '格斗' },
        { name: '沙瓦郎', emoji: '🦵', baseHP: 60, attack: 13, type: '格斗' }
    ],
    ghost: [
        { name: '鬼斯', emoji: '👻', baseHP: 50, attack: 10, type: '幽灵/毒' },
        { name: '鬼斯通', emoji: '👻', baseHP: 60, attack: 12, type: '幽灵/毒' },
        { name: '耿鬼', emoji: '👻', baseHP: 70, attack: 14, type: '幽灵/毒' }
    ],
    dragon: [
        { name: '迷你龙', emoji: '🐲', baseHP: 60, attack: 10, type: '龙' },
        { name: '哈克龙', emoji: '🐲', baseHP: 75, attack: 12, type: '龙' },
        { name: '快龙', emoji: '🐲', baseHP: 90, attack: 15, type: '龙/飞行' }
    ],
    champion: [
        { name: '皮卡丘', emoji: '⚡', baseHP: 80, attack: 14, type: '电' },
        { name: '喷火龙', emoji: '🔥', baseHP: 90, attack: 15, type: '火/飞行' },
        { name: '水箭龟', emoji: '🌊', baseHP: 95, attack: 14, type: '水' },
        { name: '妙蛙花', emoji: '🌿', baseHP: 90, attack: 14, type: '草/毒' },
        { name: '卡比兽', emoji: '🐻', baseHP: 110, attack: 13, type: '普通' },
        { name: '快龙', emoji: '🐲', baseHP: 100, attack: 16, type: '龙/飞行' }
    ]
};

// 8大道馆
export const GymData = [
    { id: 1, name: '尼比道馆', leader: '小刚', type: '岩石系', emoji: '🪨', signaturePokemon: '大岩蛇', pokemonType: 'rock', baseHP: 60, attack: 8 },
    { id: 2, name: '华蓝道馆', leader: '小霞', type: '水系', emoji: '💧', signaturePokemon: '宝石海星', pokemonType: 'water', baseHP: 70, attack: 9 },
    { id: 3, name: '枯叶道馆', leader: '马志士', type: '电系', emoji: '⚡', signaturePokemon: '雷丘', pokemonType: 'electric', baseHP: 80, attack: 10 },
    { id: 4, name: '彩虹道馆', leader: '莉佳', type: '草系', emoji: '🌿', signaturePokemon: '霸王花', pokemonType: 'grass', baseHP: 90, attack: 11 },
    { id: 5, name: '浅红道馆', leader: '阿桔', type: '毒系', emoji: '☠️', signaturePokemon: '阿柏怪', pokemonType: 'poison', baseHP: 100, attack: 12 },
    { id: 6, name: '金黄道馆', leader: '娜姿', type: '超能力系', emoji: '🔮', signaturePokemon: '胡地', pokemonType: 'psychic', baseHP: 110, attack: 13 },
    { id: 7, name: '红莲道馆', leader: '夏伯', type: '火系', emoji: '🔥', signaturePokemon: '风速狗', pokemonType: 'fire', baseHP: 120, attack: 14 },
    { id: 8, name: '常青道馆', leader: '菊子', type: '地面系', emoji: '🏜️', signaturePokemon: '尼多王', pokemonType: 'ground', baseHP: 130, attack: 15 }
];

// 四大天王
export const EliteFourData = [
    { id: 1, name: '科拿', type: '冰系', emoji: '❄️', title: '冰之天王', signaturePokemon: '铁甲贝', pokemonType: 'ice', baseHP: 150, attack: 16 },
    { id: 2, name: '希巴', type: '格斗系', emoji: '👊', title: '格斗天王', signaturePokemon: '怪力', pokemonType: 'fighting', baseHP: 160, attack: 17 },
    { id: 3, name: '菊子', type: '幽灵系', emoji: '👻', title: '幽灵天王', signaturePokemon: '耿鬼', pokemonType: 'ghost', baseHP: 170, attack: 18 },
    { id: 4, name: '渡', type: '龙系', emoji: '🐲', title: '龙之天王', signaturePokemon: '快龙', pokemonType: 'dragon', baseHP: 180, attack: 19 }
];

// 冠军
export const ChampionData = {
    name: '小智', title: '联盟冠军', emoji: '👑',
    signaturePokemon: '皮卡丘', pokemonType: 'champion',
    baseHP: 200, attack: 20
};
