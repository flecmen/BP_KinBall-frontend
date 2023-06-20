<template>
  <div>
    <q-input
      v-model="password"
      :type="showPassword ? 'text' : 'password'"
      :label="$t(props.label)"
      :rules="[formRules.required]"
      @update:model-value="emit('update:password', password)"
      :error="showError"
      :error-message="$t('errorMessage')"
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

const props = defineProps({
  label: {
    type: String,
    default: 'form.input.password.text',
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
