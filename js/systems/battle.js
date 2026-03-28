/**
 * 战斗系统 — 遭遇生成 & 伤害计算
 */
import { PokemonDB, GymData, EliteFourData, ChampionData } from '../config/pokemon-data.js';
import { ENEMY_SCALING, BATTLE_REWARDS, TRAINER_NAMES } from '../config/constants.js';

function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * 生成敌方数据
 * @returns {{ name, trainerName, hp, maxHP, attack, xp, emoji, type, encounterType }}
 */
export function createEncounter(level, subLevel) {
    // 冠军
    if (level === 9 && subLevel === 5) return createChampionEncounter();
    // 四大天王
    if (level === 9) return createEliteFourEncounter(subLevel);
    // 道馆馆主
    if (subLevel === 5) return createGymLeaderEncounter(level);
    // 普通训练师
    return createTrainerEncounter(level);
}

function createTrainerEncounter(level) {
    const gymInfo = GymData[level - 1];
    const useGymType = Math.random() < ENEMY_SCALING.GYM_TYPE_CHANCE;
    const pool = useGymType ? (PokemonDB[gymInfo.pokemonType] || PokemonDB.common) : PokemonDB.common;
    const pokemon = pick(pool);
    const mult = 1 + (level - 1) * ENEMY_SCALING.TRAINER_LEVEL_FACTOR;

    return {
        name: pokemon.name,
        trainerName: pick(TRAINER_NAMES),
        hp: Math.floor(pokemon.baseHP * mult),
        maxHP: Math.floor(pokemon.baseHP * mult),
        attack: Math.floor(pokemon.attack * mult),
        xp: Math.floor(BATTLE_REWARDS.TRAINER_BASE_XP * mult),
        emoji: pokemon.emoji,
        type: pokemon.type,
        encounterType: 'trainer'
    };
}

function createGymLeaderEncounter(level) {
    const gym = GymData[level - 1];
    const pool = PokemonDB[gym.pokemonType];
    const pokemon = pool.find(p => p.name === gym.signaturePokemon) || pool[pool.length - 1];
    const mult = 1 + (level - 1) * ENEMY_SCALING.GYM_LEVEL_FACTOR;

    return {
        name: pokemon.name,
        trainerName: `${gym.leader}（${gym.name}）`,
        hp: Math.floor(pokemon.baseHP * mult * ENEMY_SCALING.GYM_HP_BONUS),
        maxHP: Math.floor(pokemon.baseHP * mult * ENEMY_SCALING.GYM_HP_BONUS),
        attack: Math.floor(pokemon.attack * mult * ENEMY_SCALING.GYM_ATTACK_BONUS),
        xp: Math.floor(BATTLE_REWARDS.GYM_LEADER_BASE_XP * mult),
        emoji: pokemon.emoji,
        type: pokemon.type,
        encounterType: 'gymLeader',
        gymType: gym.type,
        gymLeader: gym.leader,
        gymName: gym.name
    };
}

function createEliteFourEncounter(subLevel) {
    const elite = EliteFourData[subLevel - 1];
    const pool = PokemonDB[elite.pokemonType];
    const pokemon = pool.find(p => p.name === elite.signaturePokemon) || pool[pool.length - 1];
    const mult = 1 + (9 - 8) * ENEMY_SCALING.ELITE_LEVEL_FACTOR;

    return {
        name: pokemon.name,
        trainerName: `${elite.name}（${elite.title}）`,
        hp: Math.floor(pokemon.baseHP * mult * ENEMY_SCALING.ELITE_HP_BONUS),
        maxHP: Math.floor(pokemon.baseHP * mult * ENEMY_SCALING.ELITE_HP_BONUS),
        attack: Math.floor(pokemon.attack * mult * ENEMY_SCALING.ELITE_ATTACK_BONUS),
        xp: Math.floor(BATTLE_REWARDS.ELITE_FOUR_BASE_XP * mult),
        emoji: pokemon.emoji,
        type: pokemon.type,
        encounterType: 'eliteFour',
        eliteName: elite.name,
        eliteTitle: elite.title
    };
}

function createChampionEncounter() {
    const info = ChampionData;
    const pool = PokemonDB[info.pokemonType];
    const pokemon = pool.find(p => p.name === info.signaturePokemon) || pool[0];

    return {
        name: pokemon.name,
        trainerName: `${info.name}（${info.title}）`,
        hp: pokemon.baseHP,
        maxHP: pokemon.baseHP,
        attack: pokemon.attack,
        xp: BATTLE_REWARDS.CHAMPION_XP,
        emoji: pokemon.emoji,
        type: pokemon.type,
        encounterType: 'champion'
    };
}

/**
 * 造成伤害
 */
export function dealDamage(target, amount) {
    target.hp = Math.max(0, target.hp - amount);
    return target.hp <= 0;
}
