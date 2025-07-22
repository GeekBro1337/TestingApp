<script setup lang="ts">
defineProps<{questions: questions[]}>()
</script>

<template>
    <div>
        <div
        v-for="q in questions"
        :key="q.id"
        class="p-2 border-b"
        >
        <strong>#{{ q.id }}</strong>
        {{ q.question }}
        </div>
    </div>
</template>