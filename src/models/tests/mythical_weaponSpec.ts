import { Weapon, MythicalWeaponStore } from "../mythical_weapon";

const store = new MythicalWeaponStore()

describe ("Mythical Weapon Model", () => {
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });
});