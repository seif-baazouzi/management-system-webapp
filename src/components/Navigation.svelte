<script lang="ts">
    let forwardStack: string[] = [];
    let backwardStack: string[] = [];

    let prevActive = false;
    let nextActive = false;

    window.addEventListener("hashchange", (e) => {
        const { newURL, oldURL } = e;
        const lastForwardUrl = forwardStack[forwardStack.length - 1];
        const lastBackwardUrl = backwardStack[backwardStack.length - 1];

        // go back
        if (newURL === lastBackwardUrl) {
            backwardStack.pop();
            forwardStack.push(oldURL);
        }

        // go forward
        else if (lastForwardUrl === newURL) {
            forwardStack.pop();
            backwardStack.push(oldURL);
        }

        // new url
        else {
            backwardStack.push(oldURL);
        }

        prevActive = backwardStack.length != 0;
        nextActive = forwardStack.length != 0;
    });

    const prev = () => prevActive && window.history.back();
    const next = () => nextActive && window.history.forward();
</script>

<div class="arrows">
    <span class="arrow {prevActive ? 'active' : ''}" on:click={prev}>←</span>
    <span class="arrow {nextActive ? 'active' : ''}" on:click={next}>→</span>
</div>

<style>
    .arrow {
        font-size: 0.75rem;
        padding: 0.25rem;
        cursor: pointer;
        color: var(--gray);
    }

    .active {
        color: var(--black);
    }
</style>
