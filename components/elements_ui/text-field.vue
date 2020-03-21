<template>
  <div class="v-input v-text-field" :class="message ? 'error--text' : ''">
    <div class="v-input__control">
      <div class="v-text-field__slot">
        <input
          type="text"
          :value="value"
          :placeholder="placeholder"
          @input="$emit('input', $event.target.value)"
          v-mask="mask ? mask : value"
        />
      </div>
      <div class="v-text-field__details">
        <div class="v-messages">{{ message }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { VueMaskDirective } from 'v-mask';
export default {
  directives: {
    mask: VueMaskDirective
  },
  props: {
    message: null,
    value: null,
    placeholder: null,
    mask: null
  },
  data() {
    return {};
  }
};
</script>

<style>
.v-input {
  align-items: flex-start;
  display: flex;
  flex: 1 1 auto;
  font-size: 16px;
  margin-top: 10px;
  text-align: left;
}
.v-input__control {
  display: flex;
  flex-direction: column;
  height: auto;
  flex-grow: 1;
  flex-wrap: wrap;
  position: relative;
  width: 100%;
}
.v-text-field__slot {
  display: flex;
  flex: 1 1 auto;
  height: 100%;
  position: relative;
  margin-bottom: 4px;
}
.v-input input {
  max-height: 36px;
}
.v-text-field input {
  flex: 1 1 auto;
  line-height: 20px;
  padding: 8px 10px;
  max-width: 100%;
  min-width: 0;
  width: 100%;
  outline: none;
  border: 1px solid #ccc;
}
.v-text-field__details {
  display: flex;
  flex: 1 0 auto;
  max-width: 100%;
  overflow: hidden;
}
.v-messages {
  color: #e8747b;
  flex: 1 1 auto;
  font-size: 12px;
  min-height: 12px;
  min-width: 1px;
  position: relative;
  line-height: 1;
  word-break: break-word;
  overflow-wrap: break-word;
  word-wrap: break-word;
}
.error--text input {
  border-color: #e8747b;
  background: rgba(232, 116, 123, 0.1);
}
</style>
