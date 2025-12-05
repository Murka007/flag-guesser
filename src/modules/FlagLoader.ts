const flagList = import.meta.glob("../assets/flags/*.png", { eager: true });
for (const path in flagList) {
    console.log(path);
}

const flagCache = new Map<string, object>();
export const getFlagURL = async (code: string) => {
    if (flagCache.has(code)) return flagCache.get(code)!;

    const mod = await import(`../assets/flags/${code.toLowerCase()}.svg`);
    flagCache.set(code, mod);
    return mod;
}