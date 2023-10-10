<template>
    <h1>Welcome to Chaimin</h1>
    <div v-if="!user.data.username">
        <form @submit.prevent="loginUser" class="form">
            <h1 class="form-title">Log in</h1>
            <input class="form-input" type="text" name="username" placeholder="username" />
            <input class="form-input" type="password" name="password" placeholder="password" />
            <button class="form-button" type="submit">Submit</button>
        </form>

        <!-- Signup:
        <form @submit.prevent="signupUser">
            <input type="text" name="username" placeholder="username" />
            <input type="password" name="password" placeholder="password" />
            <button type="submit">Submit</button>
        </form> -->
    </div>
    <div v-else>
        <h2 :style="{ margin: '2rem auto' }">Already logged in</h2>
    </div>
</template>

<style lang="scss" scoped>
.form {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;

    width: fit-content;

    margin: 0 auto;
}

.form-title {
    margin-bottom: 2rem;

    text-align: center;
}

.form-input,
.form-button {
    margin: 0.5rem;
}

.form-input {
    padding: 0.5rem 1rem;

    font-size: 1.25rem;
}

.form-button {
    padding: 0.5rem 1rem;

    border: 0.08rem solid #666;
    border-radius: 0.1rem;

    font-size: 1.25rem;
    background-color: transparent;
    color: #777;

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

function loginUser(e) {
    user.login(e.target.username.value, e.target.password.value).then((err) => {
        if (!err) {
            navigateTo("/sales");
        }
    });
}

function signupUser(e) {
    user.signup(e.target.username.value, e.target.password.value).then((err) => {
        if (!err) {
            navigateTo("/sales");
        }
    });
}
</script>
