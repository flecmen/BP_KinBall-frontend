import { i18n } from 'src/utils/i18n'
export interface Tile {
  icon: string,
  title: string,
  description: string,
  link: string,
}

export const AdminTiles = [
  {
    title: i18n.t('tiles.events.title'),
    icon: 'event',
    description: i18n.t('tiles.events.description'),
    link: 'admin-events',
  },
  {
    title: i18n.t('tiles.users.title'),
    icon: 'person',
    description: i18n.t('tiles.users.description'),
    link: 'users-crud',
  },
  {
    title: i18n.t('tiles.groups.title'),
    icon: 'groups',
    description: i18n.t('tiles.groups.description'),
    link: 'groups-crud',
  }
]

export const EventsTiles = [
  {
    title: i18n.t('tiles.create.event.title'),
    icon: 'edit',
    description: i18n.t('tiles.create.event.description'),
    link: 'create-event',
  },
  {
    title: i18n.t('tiles.today.title'),
    icon: 'today',
    description: i18n.t('tiles.today.description'),
    link: 'today-agenda',
  },
  {
    title: i18n.t('tiles.my.events.title'),
    icon: 'date_range',
    description: i18n.t('tiles.my.events.description'),
    link: 'events-crud',
  }
]

