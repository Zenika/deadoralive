<script>
    export let error;
    export let timer;
    export let maxtime;
</script>

<style>
    .progress {
        background-color: transparent;
        border: 0;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        -webkit-appearance: none;
    }

    .progress > span {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: #007f00;
        z-index: 0;
    }

    .progress.error > span {
        background-color: #7f0000;
    }
</style>
<div class="progress" class:error>
    <span style="width: {Math.round((timer / maxtime) * 100)}%">{Math.round(timer / 1000)}</span>
</div>
