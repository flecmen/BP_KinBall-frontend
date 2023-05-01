import { usePostStore } from './../stores/post-store';
import { useEventStore } from './../stores/event-store';
import { router } from 'src/router/index'
import { role } from 'src/types/dbTypes';

export interface NavigationButton {
  title: string;
  icon: string;
  handler: () => void;
  roles: role[];
}

export const buttons = [
  {
    title: 'Write a post',
    icon: 'edit_square',
    handler: () => {
      usePostStore().openPostDialog();
    },
    roles: [role.admin, role.coach, role.player],
  },
  {
    title: 'Create an event',
    icon: 'event',
    handler: () => {
      useEventStore().openEventDialog();
    },
    roles: [role.admin, role.coach],
  },
  {
    title: 'Admin',
    icon: 'settings',
    handler: () => {
      router.push({ name: 'admin' });
    },
    roles: [role.admin, role.coach],
  },
]
