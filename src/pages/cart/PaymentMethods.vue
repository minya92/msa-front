<template>
	<div class="payment-section">
		<div class="checkout-heading">Способ оплаты</div>
		<div class="delivery-block" v-for="payment in payments" v-if="total >= payment.minOrderSum" :key="payment.id">
			<input 
				type="radio" 
				:value="payment.id" 
				@change="$emit('input', $event.target.value)" 
				v-model="selectPayment">
			<label class="delivery-block__title" :for="payment.id">{{payment.payName}}</label>
			<div class="delivery-block__description">{{payment.payDefinition}}</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
      payments: {
        type: Array,
        default: []
      },
      total: {
        type: Number,
        default: 0
      }
    },
		data() {
			return {
				selectPayment: 1
			}
		}
	}
</script>