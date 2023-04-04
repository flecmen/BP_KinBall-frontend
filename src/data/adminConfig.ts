export interface Tile {
  icon: string,
  title: string,
  description: string,
  link: string,
}

export const AdminTiles = [
  {
    icon: 'delete',
    title: 'events',
    description: 'Manage your events',
    link: 'admin-events',
  },
  {
    icon: 'person',
    title: 'users',
    description: 'Manage users',
    link: 'users-crud',
  },
]

export const EventsTiles = [
  {
    title: 'create event',
    icon: 'edit',
    description: 'Create an event',
    link: 'create-event',
  },
  {
    title: 'today\'s agenda',
    icon: '',
    description: 'See what is happening today',
    link: 'today-agenda',
  },
  {
    title: 'my events',
    icon: '',
    description: 'See what events you are planning',
    link: 'events-crud',
  }
]

