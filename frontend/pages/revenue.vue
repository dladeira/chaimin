<template>
    revenue
</template>

<script setup>
const user = useUserStore()
user.update()

definePageMeta({
    layout: 'user'
})
</script>