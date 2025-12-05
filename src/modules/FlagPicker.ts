import countries from "../assets/countries.json";

const random = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export type TFlag = [code: string, name: string];
type TFlagData = readonly [TFlag, TFlag[]];
const FlagPicker = () => {
    const totalFlags: TFlag[] = Object.entries(countries);
    const usedFlags: TFlag[] = [];
    let flagList: TFlag[] = [];

    const reset = () => {
        usedFlags.length = 0;
        flagList = [...totalFlags];
    }
    reset();

    let nextFlagData: TFlagData | null = null;
    const pick = (): TFlagData => {
        if (nextFlagData !== null) {
            const temp = nextFlagData;
            nextFlagData = null;
            return temp;
        }

        const output: TFlag[] = [];

        while (output.length !== 4 && flagList.length !== 0) {
            const index = random(0, flagList.length - 1);
            const selectedFlag = flagList[index]!;
            output.push(selectedFlag);
            usedFlags.push(selectedFlag);
            flagList[index] = flagList.pop()!;
        }

        return [
            output[random(0, output.length - 1)]!,
            output,
        ] as const;
    }

    const selectNextFlag = () => {
        nextFlagData = pick();
        return nextFlagData;
    }

    return {
        reset,
        pick,
        selectNextFlag,
    }
}

export default FlagPicker;