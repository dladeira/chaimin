export const useUserStore = defineStore("user", () => {
    const token = useCookie("token");
    const userData = ref({});
    const items = ref([]);
    const sales = ref([]);
    const runtimeConfig = useRuntimeConfig();

    async function login(username, password) {
        console.log(runtimeConfig.public.API);
        const { data, error } = await useFetch(runtimeConfig.public.API + "/login", {
            method: "POST",
            body: JSON.stringify({
                username,
                password,
            }),
        });

        if (!error.value && data.value.token) {
            token.value = data.value.token;
            update();
            return null;
        }

        return "Invalid username or password";
    }

    async function signup(username, password) {
        const { data, error } = await useFetch(runtimeConfig.public.API + "/signup", {
            method: "POST",
            body: JSON.stringify({
                username,
                password,
            }),
        });

        if (!error.value && data.value.token) {
            token.value = data.value.token;
            update();
            return null;
        }

        return "Invalid username or password";
    }

    async function loadItems() {
        const { data, error } = await useFetch(runtimeConfig.public.API + "/items", {
            method: "POST",
            body: {
                token: token.value,
            },
        });

        if (!error.value && data.value) items.value = data.value;
    }

    async function loadSales() {
        const { data, error } = await useFetch(runtimeConfig.public.API + "/sales", {
            method: "POST",
            body: {
                token: token.value,
            },
        });

        if (!error.value && data.value) sales.value = data.value;
    }

    async function loadUser() {
        const { data, error } = await useFetch(runtimeConfig.public.API + "/user", {
            method: "POST",
            body: {
                token: token.value,
            },
        });

        if (!error.value && data.value) userData.value = data.value;
    }

    async function update() {
        await loadUser();
        await loadItems();
        await loadSales();
    }

    function logout() {
        token.value = null;
        userData.value = null;
        navigateTo("/");
    }

    function loggedIn() {
        return token.value;
    }

    async function createItem(name, category, price, cost) {
        await useFetch(runtimeConfig.public.API + "/items/new", {
            method: "POST",
            body: {
                token: token.value,
                name,
                category,
                price,
                cost,
            },
        });

        await update();
    }

    async function updateItem(_id, name, category, price, cost) {
        await useFetch(runtimeConfig.public.API + "/items/update", {
            method: "POST",
            body: {
                token: token.value,
                _id,
                name,
                category,
                price,
                cost,
            },
        });

        await update();
    }

    async function deleteItem(_id) {
        await useFetch(runtimeConfig.public.API + "/items/delete", {
            method: "POST",
            body: {
                token: token.value,
                _id,
            },
        });

        await update();
    }

    function getSales(time) {
        const date = new Date(time);
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);

        return sales.value.filter((i) => i.time < date.getTime() + 1000 * 60 * 60 * 24 && i.time > date.getTime());
    }

    async function registerSale(item) {
        await useFetch(runtimeConfig.public.API + "/sales/register", {
            method: "POST",
            body: {
                token: token.value,
                time: Date.now(),
                item,
            },
        });

        await update();
    }

    async function cancelSale(_id) {
        await useFetch(runtimeConfig.public.API + "/sales/cancel", {
            method: "POST",
            body: {
                token: token.value,
                _id,
            },
        });

        await update();
    }

    return {
        data: userData,
        token,
        logout,
        login,
        signup,
        update,
        loggedIn,
        items,
        createItem,
        updateItem,
        deleteItem,
        getSales,
        registerSale,
        cancelSale,
    };
});
