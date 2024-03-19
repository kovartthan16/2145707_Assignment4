<template>
  <div class="home-view">
    <Header :activeTab="'home'" />
    <div class="home-cards">
      <div v-for="crypto in currencies" :key="crypto.symbol" class="crypto-card">
        <div class="crypto-info">
          <h3>Currency Symbol: {{ crypto.symbol }}</h3>
          <h4>Available Exchanges</h4>
          <p v-for="exchange in crypto.available_exchanges" :key="exchange">{{ exchange }}</p>
          <p>Currency Base: {{ crypto.currency_base }}</p>
          <p>Currency Quote: {{ crypto.currency_quote }}</p>
        </div>
        <button @click="addToWishlist(crypto)" class="add-button">Add To Wishlist</button>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header.vue';
import { ref, onMounted } from 'vue';
import CurrencyService from '../services/CurrencyService';

export default {
  name: 'HomeView',
  components: {
    Header,
  },
  data() {
    return {
      currencies: [],
    };
  },
  methods: {
    addToWishlist(currency) {
      //Call saveCurrency method from CurrencyService with proper error handling.
      CurrencyService.saveCurrency(currency)
        .then(() => {
          console.log('Currency added to wishlist');
        })
        .catch((error) => {
          console.error('There was an error!', error);
        });

      

    },
  },
  setup() {
    const currencies = ref([]);

    onMounted(async () => {
      const response = await CurrencyService.fetchCurrencies();
      currencies.value = response.data;
    });

    return {
      currencies,
    };
  },
};
</script>

<style scoped>
/* Add the same CSS as WishlistView here */
.home-view {
  /* Add your custom styles here */
}

.home-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.crypto-card {
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.crypto-info {
  margin-bottom: 10px;
}

.add-button {
  background-color: #00ff00;
  color: #ffffff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
}
</style>
