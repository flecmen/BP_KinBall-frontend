<template>
  <q-card class="q-pa-md q-ma-md">
    <q-card-section>
      <userProfilePicture :image="user.profile_picture" />
      <h2>{{ props.user.full_name }}</h2>
      <RoleChip :user="props.user" />
      <div class="row q-pt-md q-gutter-xs">
        <q-badge
          v-for="group in props.user.groups"
          v-bind:key="group.id"
          :color="group.color ?? 'primary'"
          text-color="white"
          >{{ group.name }}</q-badge
        >
      </div>
    </q-card-section>
    <q-card-setion class="row justify-center">
      <RewardsOnProfile
        class="col-8"
        :xp="props.user.reward_system.xp"
        :maxXp="100"
        :level="props.user.reward_system.level"
        :awards="[]"
      />
    </q-card-setion>

    <q-card-section>
      <div class="user-profile-body q-gutter-sm">
        <InstaIcon :link="props.user.instagram" />
        <FbIcon :link="props.user.facebook" />
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import userProfilePicture from 'src/components/images/userProfilePicture.vue';
import RoleChip from 'src/components/RoleChip.vue';
import RewardsOnProfile from 'src/components/rewards/RewardsOnProfile.vue';
import InstaIcon from 'src/components/icons/soc_media/instaIcon.vue';
import FbIcon from 'src/components/icons/soc_media/FbIcon.vue';
import { User_extended } from 'src/types/dbTypes';

const props = defineProps<{
  user: User_extended;
}>();
</script>

<style scoped></style>
