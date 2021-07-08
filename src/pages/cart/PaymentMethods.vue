<template>
	<div class="payment-section" v-if="payments">
		<div class="checkout-heading">Способ оплаты</div>
		<div class="delivery-block" v-for="payment in payments" v-if="total >= payment.minOrderSum" :key="payment.id">
			<input 
				type="radio" 
				:value="payment"
				v-model="selectPayment">
			<label class="delivery-block__title" :for="payment">{{payment.payName}}</label>
			<div class="delivery-block__description">{{payment.payDefinition}}</div>
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
				selectPayment: null,
				payments: null
			}
		},
		watch: {
			selectPayment(val) {
				this.$emit('input', val);
			}
		},
		mounted() {
			this.$API.get('getPayTypes').then(response => {
				this.payments = response.data.data;
				if (this.payments && this.payments.length > 0) {
					this.selectPayment = this.payments[0];
				}
			});
		}
	}
</script>