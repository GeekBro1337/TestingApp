<script setup>
const hours = ref('');
const minutes = ref('');
const showColon = ref(true); 
let intervalId = null; 
let colonIntervalId = null; 


const updateTime = () => {
  const now = new Date();
  hours.value = now.getHours().toString().padStart(2, '0');
  minutes.value = now.getMinutes().toString().padStart(2, '0');
};

const toggleColon = () => {
  showColon.value = !showColon.value;
};

onMounted(() => {
  updateTime();
  intervalId = setInterval(updateTime, 1000);  // Интервал для обновления часов и минут
  
  // Интервал для мерцания двоеточия каждые 500мс (для эффекта 1-секундного мерцания)
  // Двоеточие будет видно 500мс, не видно 500мс, итого цикл 1 секунда.
  colonIntervalId = setInterval(toggleColon, 500); 
});

onBeforeUnmount(() => {
  // Очищаем оба интервала при размонтировании компонента
  clearInterval(intervalId);
  clearInterval(colonIntervalId);
});
</script>
<template>
  <p class="text-2xl font-bold text-primary-500 tracking-wide">
    <span>{{ hours }}</span>
    <span :class="{'opacity-0': !showColon}">:</span>
    <span>{{ minutes }}</span>
  </p>
</template>
