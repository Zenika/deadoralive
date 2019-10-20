<script>
    export let error;
    export let progress;

    // const progressColor = () => {
    //     if (timer <= maxtime / 6) return "error"
    //     if (timer <= maxtime / 3 && timer >= maxtime / 6) return "warning"
    // }
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

    .progress-error {
        font-size: 18px;
        position: absolute;
        bottom: 0;
        right: 5px;
        z-index: 1;
    }
</style>
<div class="progress" class:error>
    <span style="progress: {progress}%">{progress}%</span>
</div>
