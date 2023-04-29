<template>
  <div>
    <q-input
      v-model="password"
      :type="showPassword ? 'text' : 'password'"
      :label="label"
      :rules="[formRules.required]"
      @update:model-value="emit('update:password', password)"
      :error="showError"
      :error-message="errorMessage"
    >
      <template v-slot:append>
        <q-icon
          :name="showPassword ? 'visibility' : 'visibility_off'"
          class="cursor-pointer"
          @click="showPassword = !showPassword"
        />
      </template>
    </q-input>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import formRules from 'src/helpers/formRules';
import { useI18n } from 'vue-i18n';

const props = defineProps({
  label: {
    type: String,
    default: useI18n().t('form.input.password.text'),
  },
  minCharacters: {
    type: Number,
    default: 8,
  },
  showError: {
    type: Boolean,
    default: false,
    required: false,
  },
  errorMessage: {
    type: String,
    default: 'error',
    required: false,
  },
  outlined: {
    type: Boolean,
    defalut: false,
    required: false,
  },
});

const emit = defineEmits<{
  (event: 'update:password', password: string): void;
}>();

const password = ref('');
const showPassword = ref(false);

const minCharactersRule = {
  min: props.minCharacters,
  message: `The password must be at least ${props.minCharacters} characters long`,
};
</script>
