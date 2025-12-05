<script lang="ts">
    import { fade } from "svelte/transition";
    import selectFlags, { type TFlag } from "../modules/FlagPicker";
    import { getFlagURL } from "../modules/FlagLoader";

    let { inGame = $bindable(false) }: { inGame: boolean } = $props();

    const resetGame = () => {
        inGame = false;
    }

    const MAX_TESTS = 10;
    const flagState = selectFlags();

    let testCount = $state(0);
    let rightAnswerCount = $state(0);
    let finished = $state(false);

    let selected = $state<string | null>(null);
    let rightAnswer = $state<TFlag | null>(null);
    let flagList = $state<TFlag[]>([]);
    
    const updateFlagState = () => {
        if (testCount >= MAX_TESTS) {
            finished = true;
            return;
        }
        
        const flagData = flagState.pick();
        rightAnswer = flagData[0];
        flagList = flagData[1];

        const preloaded = flagState.selectNextFlag();
        getFlagURL(preloaded[0][0]);

        selected = null;
        testCount += 1;
    }

    let buttonTimeout: ReturnType<typeof setTimeout>;
    const selectAnswer = (code: string) => {
        clearTimeout(buttonTimeout);
        selected = code;
        if (rightAnswer !== null && code === rightAnswer[0]) {
            rightAnswerCount += 1;
        }

        buttonTimeout = setTimeout(() => {
            updateFlagState();
        }, 650);
    }

    updateFlagState();
</script>

{#if finished}
    <button in:fade onclick={resetGame} class="absolute inset-0 p-8 flex items-center justify-center bg-[rgba(0,0,0,0.3)]">
        <div class="bg-[rgba(35,35,35,0.9)] shadow-[rgba(0,0,0,1)] shadow-2xl text-gray-100 p-10 px-18 rounded-2xl flex flex-col items-center gap-3">
            <h1 class="text-3xl font-bold font-sans">Completed quiz!</h1>
            <p class="text-2xl font-sans mb-3">Your score: {rightAnswerCount}/{MAX_TESTS}</p>
            <p class="p-4 font-bold cursor-pointer">Click to continue...</p>
        </div>
    </button>
{/if}

<section in:fade class="mx-auto bg-blue-300 p-8 rounded-2xl shadow-primary bg-linear-to-br from-blue-300 via-blue-300 to-blue-200 h-full max-h-1/2">
    <span class="font-extralight font-mono text-neutral-900">{testCount}/{MAX_TESTS}</span>
    <div class="flex flex-col items-center gap-2">
        <div class="w-full h-full max-h-50 flex items-center justify-center mb-4">
            {#if rightAnswer !== null}
                <div class="w-full max-h-50 aspect-3/2 overflow-hidden rounded-lg">
                    {#await getFlagURL(rightAnswer[0]) then { default: src }}
                        <img
                            src={src} 
                            alt="Flag"
                            class="w-full h-full object-cover" 
                        />
                    {/await}
                </div>
            {/if}
        </div>

        {#each flagList as flag}
            <button
                disabled={selected !== null}
                class:pointer-events-none={selected !== null}

                onclick={() => selectAnswer(flag[0])}
                class="w-80 px-5 py-3 rounded-xl defaultAnswer transition-all hover:-translate-y-px text-gray-100 font-bold text-2xl cursor-pointer shadow-primary"
                
                class:wrongAnswer={rightAnswer !== null && selected !== null && selected !== rightAnswer[0] && selected === flag[0]}
                class:correctAnswer={rightAnswer !== null && selected !== null && rightAnswer[0] === flag[0]}
            >{flag[1]}</button>
        {/each}
    </div>
</section>