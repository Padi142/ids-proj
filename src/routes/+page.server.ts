import db from '$lib/db/client';
import type { MenuItem } from '$lib/db/types/menuItem';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    const menu = await db.menuitem.getAll();
    console.log(menu);
    return {
        menu: menu.map(item => ({ ...item })) // Make a shallow copy of each menu item
    };
};
