<template>
    <div class="grid place-content-center text-white font-bold mb-3">
       <div class="xl:text-8 lg:text-8 md:text-7 sm:text-5 xs:text-5 text-5 slogan-color slogan-font">
            {{ slogan_output }}{{ showCursor }}
       </div>
    </div>
</template>


<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import setting from '@/setting'


//打字效果
const slogan = ref(setting.slogan);
const slogan_output = ref('');
const showCursor = ref(".|");

const typeEffect = () => {
    let i = 0;
    const typingInterval = setInterval(() => {
        slogan_output.value += slogan.value.charAt(i);
        i++;
        if (i === slogan.value.length) {
            window.setTimeout(() => {
                showCursor.value = " ";
            }, 600);
            clearInterval(typingInterval);
        }
    }, 230); // 间隔时间，可以根据需要调整
}

onMounted(() => {
    typeEffect();
})
</script>


<style lang="scss" scoped>
.slogan-color{
    @include font_color(themeSloganFontColor);
}
.slogan-font{
    font-family: 'mashanzhengmaobikaishu',sans-serif;
}
</style>