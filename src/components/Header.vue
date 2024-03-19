<template>
    <div class="header" v-if="loggedIn">
        <div class="tab" :class="{ active: activeTab === 'home' }" @click="changeTab('home')">Home</div>
        <div class="tab" :class="{ active: activeTab === 'wishlist' }" @click="changeTab('wishlist')">Wishlist</div>
        <!--Add logout button-->
        <button class="logout-btn" @click="logout">Logout</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            activeTab: 'home',
            showHeader: false
        };
    },
    //On computed of component check if user is logged in or not. If user is logged in then only show header
    computed: {
        loggedIn() {
            return sessionStorage.getItem('loggedIn');
        }
    },
    
    methods: {
        changeTab(tab) {
            this.activeTab = tab;
            //On click of tab navigate to different components using router
                if (tab === 'home') {
                        this.$router.push({ name: 'Home' });
                } else {
                        this.$router.push({ name: 'Wishlist' });
                }
        },
        logout() {
            //On click of logout button remove the token from session storage and navigate to login page
            sessionStorage.removeItem('jwttoken');
            sessionStorage.setItem('loggedIn', false);
            this.$router.push({ name: 'Login' });
        }
    }
};
</script>

<style>
.header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #fff;
    padding: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.tab {
    padding: 10px;
    cursor: pointer;
}

.tab.active {
    background-color: #ccc;
}

.logout-btn {
    float: right;
    padding: 10px;
    cursor: pointer;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
}
</style>
