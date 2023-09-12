<template>
    <nav class="navbar">
        <div class="links">
            <NuxtLink to="/" class="navbar-brand">Chaimin</NuxtLink>
            <NuxtLink to="/items" class="navbar-link" v-if="user.loggedIn()">Items</NuxtLink>
            <NuxtLink to="/sales" class="navbar-link" v-if="user.loggedIn()">Sales</NuxtLink>
            <NuxtLink to="/revenue" class="navbar-link" v-if="user.loggedIn()">Revenue</NuxtLink>
        </div>
        <div class="auth">
            <NuxtLink to="/" class="login-button" v-if="!user.loggedIn()">Log in</NuxtLink>
            <div class="logout" v-else>
                <div class="logout-text" v-if="user.data.username">Logged in as: <strong>{{ user.data.username }}</strong></div>
                <button class="logout-button" @click.prevent="user.logout">Logout</button>
            </div>
        </div>
    </nav>
</template>

<style lang="scss" scoped>
.navbar {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    height: 80px;
    width: 100%;

    padding: 0 2rem;

    background-color: black;
    color: white;
}

.links {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
}

.navbar-brand {
    margin: 0.5rem;
    padding: 0.5rem;

    font-size: 1.5rem;
    font-weight: 700;
    text-decoration: none;
    color: inherit;
}

.navbar-link {
    margin: 0.5rem;
    padding: 0.5rem;

    font-weight: 400;
    text-decoration: none;
    color: inherit;
}

.login-button,
.logout-button {
    display: block;

    width: 150px;

    padding: 0.5rem 1.5rem;

    border: 2px solid white;
    border-radius: 1000px;

    font-size: 1rem;
    text-align: center;
    text-decoration: none;
    background-color: transparent;
    color: white;

    outline: none;

    &:hover {
        background-color: white;
        color: black;
        cursor: pointer;
    }
}

.logout {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
}

.logout-text {
    margin-right: 1rem;
}
</style>

<script setup>
const user = useUserStore()
</script>