/**
 * 宠物/成长系统
 */
import { PetData } from '../config/pokemon-data.js';
import { PET_GROWTH } from '../config/constants.js';

/**
 * 创建玩家宠物
 */
export function createPet(type) {
    const info = PetData[type];
    return {
        type,
        name: info.name,
        level: 1,
        xp: 0,
        xpToNext: PET_GROWTH.XP_BASE,
        hp: info.baseHP,
        maxHP: info.baseHP,
        attack: info.baseAttack,
        evolved: false,
        potions: PET_GROWTH.INITIAL_POTIONS
    };
}

/**
 * 添加经验值，处理升级和进化
 * @returns {{ leveled: boolean, evolved: boolean, newLevel: number }[]}
 */
export function addXP(pet, amount) {
    const events = [];
    pet.xp += amount;

    while (pet.xp >= pet.xpToNext) {
        pet.level++;
        pet.xp -= pet.xpToNext;
        pet.maxHP += PET_GROWTH.HP_PER_LEVEL;
        pet.hp = pet.maxHP;
        pet.attack += PET_GROWTH.ATTACK_PER_LEVEL;
        pet.xpToNext = Math.floor(pet.xpToNext * PET_GROWTH.XP_MULTIPLIER);

        const evt = { leveled: true, evolved: false, newLevel: pet.level };

        if (pet.level >= PET_GROWTH.EVOLUTION_LEVEL && !pet.evolved) {
            pet.evolved = true;
            const info = PetData[pet.type];
            pet.name = info.evolutionName;
            evt.evolved = true;
        }

        events.push(evt);
    }

    return events;
}

/**
 * 使用药水
 * @returns {{ success: boolean, message: string, healAmount?: number }}
 */
export function usePotion(pet) {
    if (pet.potions <= 0) {
        return { success: false, message: '没有药水了！' };
    }
    if (pet.hp >= pet.maxHP) {
        return { success: false, message: '血量已满，不需要使用药水！' };
    }

    pet.potions--;
    const healAmount = Math.floor(pet.maxHP * PET_GROWTH.POTION_HEAL_PERCENT);
    pet.hp = Math.min(pet.maxHP, pet.hp + healAmount);
    return { success: true, message: `使用了药水，恢复了${healAmount}点生命值！`, healAmount };
}

/**
 * 战败恢复
 */
export function recoverFromDefeat(pet) {
    pet.hp = Math.floor(pet.maxHP * PET_GROWTH.DEFEAT_RECOVER_PERCENT);
}

/**
 * 获取宠物显示信息
 */
export function getPetDisplay(pet) {
    const info = PetData[pet.type];
    return {
        name: pet.evolved ? info.evolutionName : info.name,
        emoji: pet.evolved ? info.evolvedEmoji : info.emoji,
        spriteId: pet.evolved ? info.evolvedSpriteId : info.spriteId
    };
}
