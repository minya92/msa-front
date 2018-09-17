<template>
	<div class="delivery-section" v-if="delivery">
		<div class="checkout-heading">Способ получения заказа</div>
		<div class="delivery-block" v-for="deliv in delivery" v-if="total >= deliv.minOrderSum" :key="deliv.id">
			<input 
        type="radio" 
        :value="deliv"  
        v-model="selectDelivery">
			<label class="delivery-block__title" :for="deliv">{{deliv.deliveryName}}</label>
			<div class="delivery-block__description">{{deliv.deliveryDefinition}}</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
      total: {
        type: Number,
        default: 0
      }
    },
		data() {
			return {
				selectDelivery: null,
				delivery: null
			}
		},
		watch: {
			selectDelivery(val) {
				this.$emit('input', val);
			}
		},
		mounted() {
			this.$API.get('getDelivery').then(r => {
				this.delivery = r.data.data;
				if (this.delivery && this.delivery.length > 0) {
					this.selectDelivery = this.delivery[0];
				}
			});
		}
	}
</script>