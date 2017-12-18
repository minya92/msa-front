<template>
	<div class="delivery-section">
		<div class="checkout-heading">Способ получения заказа</div>
		<div class="delivery-block" v-for="deliv in delivery" v-if="total >= deliv.minOrderSum" :key="deliv.id">
			<input 
        type="radio" 
        :value="deliv.id" 
        @change="$emit('input', $event.target.value)" 
        v-model="selectDelivery">
			<label class="delivery-block__title" :for="deliv.id">{{deliv.deliveryName}}</label>
			<div class="delivery-block__description">{{deliv.deliveryDefinition}}</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
      delivery: {
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
				selectDelivery: 1
			}
		}
	}
</script>