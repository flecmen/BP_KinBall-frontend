// This is just an example,
// so you can safely delete all default props below

export default {
  failed: 'Action failed',
  success: 'Action was successful',
  btn: {
    log: {
      in: 'Log in',
      out: 'Log out'
    },
    send: 'send',
    register: 'Register',
  },
  email: {
    address: 'Email address'
  },
  forgot: {
    your: {
      password: 'Forgot your password?'
    }
  },
  form: {
    rules: {
      required: 'Required',
      isEmail: 'Enter a valid email',
      time: 'Enter a valid time',
      groups: 'Pick atleast one group',
      surveyOptions: 'Pick atleast two options',
      email: {
        taken: 'Email is already taken',
        avaiable: 'Email is avaiable',
      }
    },
    input: {
      password: {
        confirm: 'Confirm password',
        text: 'Password',
      },
      type: 'Type',
      price: 'Price',
      max: {
        people: 'Max people',
        substitutes: 'Max substitutes',
      },
      address: {
        long: 'Address',
        short: 'Short address',
      },
    },
  },
  is: {
    periodic: 'Is periodic',
  },
  find: {
    on: {
      maps: 'Find on maps',
    }
  },
  notify: {
    wrong: {
      credentials: 'Wrong credentials'
    },
    missing: {
      time: 'Missing time',
      groups: 'Missing groups',
    },
    invalid: {
      input: 'Invalid input',
    },
    reLoginToSeeChanges: 'User may need to re-login to see all changes',
  },
  post: {
    type: {
      text: 'Post',
      event: 'Event',
      survey: 'Poll',
      // plural for feed filter
      texts: 'Posts',
      events: 'Events',
      surveys: 'Polls',
    },
    reaction: {
      likes: 'likes',
      comments: 'comments',
      follow: 'Follow',
    },
    comment: {
      write: 'Write a comment',
    },
  },
  user: {
    full_name: 'Full name',
  },

  tooltip: {
    like: 'like',
    comment: {
      show: 'Show comments',
    },
    post: {
      show: 'Show post',
      delete: 'Delete post',
    },
    set: {
      date: 'Set a date',
      time: 'Set a time',
    },
  },
  event: {
    reaction: {
      going: 'going',
      not_going: 'not going',
      dont_know: 'dont know',
      substitute: 'substitute',
    },
    description: 'Description',
  },
  profile: {
    change: {
      details: 'Change details',
    },
    settings: 'User settings',
  },
  tiles: {
    events: {
      title: 'events',
      description: 'Manage your events',
    },
    users: {
      title: 'users',
      description: 'Manage users',
    },
    groups: {
      title: 'groups',
      description: 'Manage groups',
    },
    create: {
      event: {
        title: 'create event',
        description: 'Create an event',
      },
    },
    today: {
      title: 'today\'s agenda',
      description: 'See what is happening today',
    },
    my: {
      events: {
        title: 'my events',
        description: 'See what events you are planning',
      },
    }
  },
  settings: {
    email_notification: 'Email notification',
    push_notification: 'Push notification',
    notification: 'Notification settings',
  },
  dayofweek: {
    Sunday: 'Sunday',
    Monday: 'Monday',
    Tuesday: 'Tuesday',
    Wednesday: 'Wednesday',
    Thursday: 'Thursday',
    Friday: 'Friday',
    Saturday: 'Saturday',
  },
  weeks: 'weeks',
  role: {
    admin: 'admin',
    coach: 'coach',
    player: 'player',
  }
};
