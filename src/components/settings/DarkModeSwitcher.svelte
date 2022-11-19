<script>
    let checked = JSON.parse(localStorage.getItem("dark-mode")) ?? false;

    function setMode() {
        localStorage.setItem("dark-mode", JSON.stringify(checked));
        if (checked) {
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }
    }
</script>

<div>
    <h5>Switch dark mode</h5>
    <input type="checkbox" bind:checked on:change={setMode} />
</div>

<style>
    div {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
</style>
