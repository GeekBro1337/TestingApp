<template>
    <div>
        <h1 class="flex flex-row">
            <span>Loading: </span>
            <span> {{ loader.isLoading }} </span>
        </h1>
        <h1> 
            {{  result }}
        </h1>
    </div>

</template>

<script setup lang="ts">
import { useMyLoaderStore } from "~/stores/loader";
import { getTest } from "~~/composables/Questions";
const route = useRoute()
const loader = useMyLoaderStore()

const id = route.params.id as string
const result = ref<Test.Test | null>(await getTest(id))
</script>