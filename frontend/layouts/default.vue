<template>
    <Navbar />
    <div class="page">
        <slot />
    </div>
</template>

<style lang="scss" scoped>
.page {
    height: calc(100vh - 80px);
    padding: 1rem 2rem;

    overflow-y: scroll;
    scrollbar-gutter: stable;
}
</style>