<template>
  <div class="wishlist-view">
    <Header :activeTab="'wishlist'"/>
    <div class="wishlist-cards">
      <div v-for="crypto in wishlist" :key="crypto.symbol" class="crypto-card">
        <div class="crypto-info">
          <h3>Currency Symbol: {{ crypto.symbol }}</h3>
          <h4>Available Exchanges</h4>
          <p v-for="exchange in crypto.available_exchanges" :key="exchange">{{ exchange }}</p>
          <p>Currency Base: {{ crypto.currency_base }}</p>
          <p>Currency Quote: {{ crypto.currency_quote }}</p>
        </div>
        <button @click="removeFromWishlist(crypto)" class="delete-button">Delete From Wishlist</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import Header from "@/components/Header.vue";
import CurrencyService from "@/services/CurrencyService";

export default {
  name: "WishlistView",
  components: {
    Header,
  },
  setup() {
    const wishlist = ref([]);

    const removeFromWishlist = (currency) => {
      // Call removeCurrency method from CurrencyService with proper error handling.
      CurrencyService.deleteCurrency(currency)
        .then(() => {
          console.log("Currency removed from wishlist");
          getWishlist();
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    };

    onMounted(() => {
      getWishlist();
    });

    const getWishlist = async () => {
      try {
        const response = await CurrencyService.getWishlist();
        console.log(response);
        wishlist.value = response;
      } catch (error) {
        console.error(error);
      }
    };

    return {
      wishlist,
      removeFromWishlist,
    };
  },
};
</script>

<style scoped>
.wishlist-view {
  /* Add your custom styles here */
}

.wishlist-cards {
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
  text-align: center;
}

.crypto-info {
  margin-bottom: 10px;
}

.delete-button {
  background-color: #ff0000;
  color: #ffffff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}
</style>
