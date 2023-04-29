export interface Tile {
  icon: string,
  title: string,
  description: string,
  link: string,
}

export const AdminTiles = [
  {
    title: 'tiles.events.title',
    icon: 'event',
    description: 'tiles.events.description',
    link: 'admin-events',
  },
  {
    title: 'tiles.users.title',
    icon: 'person',
    description: 'tiles.users.description',
    link: 'users-crud',
  },
  {
    title: 'tiles.groups.title',
    icon: 'groups',
    description: 'tiles.groups.description',
    link: 'groups-crud',
  }
]

export const EventsTiles = [
  {
    title: 'tiles.create.event.title',
    icon: 'edit',
    description: 'tiles.create.event.description',
    link: 'create-event',
  },
  {
    title: 'tiles.today.title',
    icon: 'today',
    description: 'tiles.today.description',
    link: 'today-agenda',
  },
  {
    title: 'tiles.my.events.title',
    icon: 'date_range',
    description: 'tiles.my.events.description',
    link: 'events-crud',
  }
]

