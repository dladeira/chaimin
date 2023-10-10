<template>
    <form class="form" @submit.prevent="updateItem">
        <input class="form-item" type="text" placeholder="name" name="name" v-model="name" />
        <select class="form-item" name="category" v-model="category">
            <option value="snack">Snack</option>
            <option value="drink">Drink</option>
            <option value="utility">Utility</option>
        </select>
        <input class="form-item" type="number" step="any" placeholder="price" name="price" v-model="price" />
        <input class="form-item" type="number" step="any" placeholder="cost" name="cost" v-model="cost" />
        <button class="form-item form-button" type="submit">Update</button>
        <button class="form-item form-button" @click.prevent="deleteItem">Delete</button>
    </form>
</template>

<style lang="scss" scoped>
.form {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: stretch;

    margin-bottom: 0.75rem;
}

.form-item {
    width: 15.6%;

    border: 1px solid black;
    border-radius: 5px;

    padding: 0.5rem 1rem;

    font-size: 1rem;

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
const user = useUserStore();
const name = ref(props.item.name);
const category = ref(props.item.category);
const price = ref(props.item.currentPrice);
const cost = ref(props.item.currentCost);

function updateItem(e) {
    user.updateItem(props.item._id, e.target.name.value, e.target.category.value, e.target.price.value, e.target.cost.value);
}

function deleteItem() {
    user.deleteItem(props.item._id);
}

const props = defineProps({
    item: Object,
});
</script>
