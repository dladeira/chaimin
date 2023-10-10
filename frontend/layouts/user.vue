<template>
    <NuxtLayout name="default">
        <div v-if="load">
            <slot />
        </div>
    </NuxtLayout>
</template>

<script setup>
const load = ref(false);
const user = useUserStore();
user.update();

if (!user.loggedIn()) {
    navigateTo("/");
} else {
    load.value -= true;
}
</script>
