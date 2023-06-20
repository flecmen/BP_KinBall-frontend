<template>
  <q-dialog ref="dialog">
    <q-card>
      <q-card-section>
        <div class="text-h6">{{ $t('heading.createOrUpdate.group') }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-form ref="form">
          <q-input
            v-model="group.name"
            label="Name"
            :rules="[formRules.required]"
          />
          <q-input
            filled
            v-model="group.color"
            :rules="['anyColor', formRules.required]"
            hint="With validation"
            class="my-input"
          >
            <template v-slot:append>
              <q-icon name="colorize" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-color v-model="group.color" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </q-form>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          label="Submit"
          color="primary"
          @click="createOrUpdateGroup()"
          :loading="isLoading"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useAdminStore } from 'src/stores/admin-store';
import { Group } from 'src/types/dbTypes';
import { ref, computed } from 'vue';
import formRules from 'src/helpers/formRules';

const props = defineProps<{
  groupId: number;
}>();

const adminStore = useAdminStore();

const isThisNewPost = computed(() => {
  return props.groupId === -1;
});

const group = ref(
  isThisNewPost.value
    ? ({} as Group)
    : JSON.parse(JSON.stringify(adminStore.getGroup(props.groupId) ?? {}))
);

const isLoading = ref(false);
const dialog = ref();
const form = ref();

async function createOrUpdateGroup() {
  // validate
  if (!(await form.value.validate())) {
    return;
  }
  isLoading.value = true;
  if (isThisNewPost.value) {
    await adminStore.createGroup(group.value);
  } else {
    await adminStore.updateGroup(group.value);
  }
  isLoading.value = false;
  dialog.value.hide();
}
</script>

<style scoped></style>
