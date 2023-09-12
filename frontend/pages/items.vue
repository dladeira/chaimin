<template>
    <h2 class="page-title">Store Items</h2>

    <Item v-for="item of user.items" :item="item" :key="item._id" />

    <h2>Create Item</h2>

    <form class="form" @submit.prevent="createItem">
        <input class="form-item" type="text" placeholder="name" name="name" />
        <select class="form-item" name="category">
            <option>snack</option>
            <option>drink</option>
            <option>utility</option>
        </select>
        <input class="form-item" type="number" placeholder="price" name="price" />
        <input class="form-item" type="number" placeholder="cost" name="cost" />
        <button class="form-item form-button" type="submit">Submit</button>
    </form>
</template>

<style lang="scss" scoped>
.form {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: stretch;
}

.form-item {
    width: 19%;

    border: 1px solid black;
    border-radius: 5px;

    padding: 0.5rem 1rem;

    font-size: 1.25rem;

    outline: none;
}

.form-button {
    padding: 0.5rem 1rem;
    
    border: 0.08rem solid #666;
    border-radius: 5px;

    font-size: 1.25rem;
    background-color: black;
    color: white;

    transition: 300ms all cubic-bezier(0.175, 0.885, 0.32, 1.275);

    &:hover {
        scale: 1.02 1.05;
        cursor: pointer;
    }

    &:active {
        scale: 0.9;
    }
}
</style>

<script setup>
const user = useUserStore()

function createItem(e) {
    user.createItem(e.target.name.value, e.target.category.value, e.target.price.value, e.target.cost.value)
}

definePageMeta({
    layout: 'user'
})
</script>