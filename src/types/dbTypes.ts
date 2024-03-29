/**
 * Model User
 *
 */
export type User = {
  id: number
  full_name: string
  email: string
  password: string
  role: role
  date_of_birth: Date | null
  last_signed_in: Date | null
  facebook: string | null
  instagram: string | null
  imageId: number | null
}

export type User_extended = (User & {
  profile_picture: Image | null
  settings: Settings
  reward_system: Reward_system
  groups: Group[]
})
/**
 * Model Settings
 *
 */
export type Settings = {
  userId: number
  email_notification: boolean
  push_notification: boolean
}

/**
 * Model Reward_system
 *
 */
export type Reward_system = {
  userId: number
  xp: number
  level: number
}

/**
 * Model Post
 *
 */
export type Post = {
  id: number
  type: postType
  heading: string
  text: string | null
  time_of_creation: Date
  authorId: number
}

export type Post_extended = (Post & {
  author: User_extended;
  groups: Group[];
  event: Event_extended | null;
  images: Image[];
  likes: User[];
  comments: Post_comment_extended[];
  survey_options: Survey_option_extended[];
  user_notification: User[];
  reaction_deadline: Date | null;
})


/**
 * Model Post_comment
 *
 */
export type Post_comment = {
  id: number
  time_of_creation: Date
  text: string
  postId: number
  authorId: number
}

export type Post_comment_extended = (Post_comment & {
  author: User_extended;
  likes: User[];
})

/**
 * Model Event
 *
 */
export type Event = {
  id: number
  type: eventType
  price: number | null
  time: Date
  address: string
  description: string | null
  people_limit: number | null
  substitues_limit: number | null
  note: string | null
  address_short: string | null
  organiserId: number
  postId: number
  address_lat: string | null
  address_lng: string | null
}

export type Event_extended = (Event & {
  organiser: User_extended;
  players: UserOnEvent_extended[];
  teams: Team[];
  groups: Group[];
})

export type UserOnEvent = {
  status: UserOnEventStatus
  userId: number
  eventId: number
  present: boolean
}

export type UserOnEvent_extended = (UserOnEvent & {
  user: User_extended;
})

/**
 * Model Team
 *
 */
export type Team = {
  id: number
  name: string
  eventId: number
}

/**
 * Model Album
 *
 */
export type Album = {
  id: number
  name: string
}

/**
 * Model Image
 *
 */
export type Image = {
  id: number
  image_path: string
  userId: number | null
  postId: number | null
  albumId: number | null
}

/**
 * Model Survey_option
 *
 */
export type Survey_option = {
  id: number
  text: string
  postId: number
}

export type Survey_option_extended = (Survey_option & {
  votes: User[];
})

/**
 * Model Group
 *
 */
export type Group = {
  id: number
  name: string
  color: string | null
}

export const UserOnEventStatus = {
  going: 'going',
  not_going: 'not_going',
  dont_know: 'dont_know',
  substitute: 'substitute'
};
export type UserOnEventStatus = (typeof UserOnEventStatus)[keyof typeof UserOnEventStatus]

export const eventType = {
  trenink: 'trenink',
  kurz_pro_mladez: 'kurz_pro_mladez',
  turnaj: 'turnaj',
  jednorazova_akce: 'jednorazova_akce',
};

export type eventType = (typeof eventType)[keyof typeof eventType]


export const postType = {
  event: 'event',
  text: 'text',
  survey: 'survey'
};

export type postType = (typeof postType)[keyof typeof postType]


export const role = {
  admin: 'admin',
  coach: 'coach',
  player: 'player',
};

export type role = (typeof role)[keyof typeof role]
