<template>
    <h2>Sales for {{ new Date(date).getDate() }}/{{ new Date().getMonth(date) + 1 }}/{{ new Date(date).getFullYear() }}</h2>
    <div class="day-links">
        <h4 class="day-link" @click="() => manipulateDate(-(1000 * 60 * 60 * 24))">Previous day</h4>
        <h4 class="day-link" @click="() => manipulateDate(+(1000 * 60 * 60 * 24))">Next day</h4>
    </div>

    <div class="sales-header">
        <div class="sale">
            <p class="sale-data sale-name">Name</p>
            <p class="sale-data sale-category">Category</p>
            <p class="sale-data sale-price">Price</p>
            <p class="sale-data sale-profit">Profit</p>
            <p class="sale-data sale-time">Time Sold</p>
        </div>
    </div>

    <div class="sales">
        <Sale v-for="sale of user.getSales(date)" :key="sale._id" :sale="sale" @cancel="updateSales" />
    </div>

    <h2>Register Sale</h2>

    <form class="form" @submit.prevent="registerSale">
        <select class="form-item" name="item">
            <option v-for="item of user.items" :value="item._id">{{ item.name }}</option>
        </select>
        <button class="form-item form-button" type="submit">Register <i>(for today)</i></button>
    </form>

    <h2>Results</h2>

    <div class="results">
        <p class="result">
            Revenue: <strong>{{ getRevenue() }}</strong>
        </p>
        <p class="result">
            Profit: <strong>{{ getProfit() }}</strong>
        </p>
    </div>
</template>

<style lang="scss" scoped>
.day-links {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
}

.day-link {
    margin: 0 2rem 2rem 0;

    text-decoration: underline;

    user-select: none;

    &:hover {
        cursor: pointer;
    }
}

.form {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: stretch;
}

.form-item {
    width: 200px;

    margin-right: 2rem;

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

.text {
    margin: 0.5rem 0;
}

$salePadding: 6rem;

.sales {
    height: 500px;

    margin: 0 $salePadding;

    overflow-y: scroll;

    &-header {
        margin: 0 $salePadding;
    }
}

.sale {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    width: calc(100%);

    margin-left: auto;

    &-data {
        font-size: 1rem;
        font-weight: 300;
        text-align: left;
    }

    &-name {
        width: 25%;
    }

    &-category {
        width: 20%;
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

.results {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    width: 60%;

    margin: 0 auto;
}

.result {
    font-size: 2rem;
    font-weight: 200;
}
</style>

<script setup>
const user = useUserStore();
const date = ref(Date.now());

function manipulateDate(value) {
    date.value = date.value + value;
}

function getProfit() {
    var profit = 0;
    for (var sale of user.getSales(date.value)) {
        profit += sale.price - sale.cost;
    }

    return profit;
}

function getRevenue() {
    var revenue = 0;
    for (var sale of user.getSales(date.value)) {
        revenue += sale.price;
    }

    return revenue;
}

async function registerSale(e) {
    await user.registerSale(e.target.item.value);
}

definePageMeta({
    layout: "user",
});
</script>
