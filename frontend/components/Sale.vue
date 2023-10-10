<template>
    <div class="sale">
        <p class="sale-data sale-name">{{ getItem().name }}</p>
        <p class="sale-data sale-category">{{ getItem().category }}</p>
        <p class="sale-data sale-price">{{ sale.price }}</p>
        <p class="sale-data sale-profit">{{ sale.price - sale.cost }}</p>
        <p class="sale-data sale-time">{{ new Date(sale.time).getHours() }}:{{ new Date(sale.time).getMinutes() }}</p>
        <button class="sale-button" @click.prevent="cancelSale">Cancel</button>
    </div>
</template>

<style lang="scss" scoped>
.sale {
    border-bottom: 1px solid rgba(black, 0.1);

    &-data {
        margin: 0;

        font-size: 1rem;
        font-weight: 300;
        text-align: left;
    }

    &-name {
        width: 25%;

        font-weight: 500;
    }

    &-category {
        width: 20%;

        font-style: italic;
        color: #999;
    }

    &-price {
        width: 12%;
    }

    &-profit {
        width: 12%;
    }

    &-time {
        width: 15%;
    }
}

.sale-button {
    width: 16%;

    padding: 0.5rem 2rem;

    border: none;

    font-size: 1rem;
    background-color: rgba(black, 0.03);

    transition: 300ms all cubic-bezier(0.175, 0.885, 0.32, 1.275);

    &:hover {
        background-color: rgba(black, 0.05);
        cursor: pointer;
    }
}
</style>

<script setup>
const user = useUserStore();
const emit = defineEmits(["cancel"]);

async function cancelSale() {
    await user.cancelSale(props.sale._id);
    emit("cancel");
}

function getItem() {
    return user.items.find((i) => i._id == props.sale.item);
}

const props = defineProps({
    sale: Object,
});
</script>
