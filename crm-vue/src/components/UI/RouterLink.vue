<script setup>
    import { RouterLink } from 'vue-router'

    defineProps({
        to: String
    })
</script>

<template>
    <RouterLink 
        :to="{ name: to }"
        class="block md:inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm shadow">
        <slot></slot>
    </RouterLink>
</template>