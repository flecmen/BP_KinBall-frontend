// This is just an example,
// so you can safely delete all default props below

export default {
  failed: 'Akce selhala',
  success: 'Akce byla úspěšná',
  present: 'přítomen',
  btn: {
    log: {
      in: 'Přihlásit se',
      out: 'Odhlásit se'
    },
    send: 'odeslat',
    save: 'uložit',
    register: 'Registrovat se',
    set: {
      attendence: 'Zadat docházku',
      rewards: 'Rozdat odměny',
      note: 'Přidat poznámku',
    }
  },
  email: {
    address: 'Emailová adresa'
  },
  forgot: {
    your: {
      password: 'Zapomněli jste své heslo?'
    }
  },
  form: {
    rules: {
      required: 'Povinné',
      isEmail: 'Zadejte platný email',
      time: 'Zadejte platný čas',
      groups: 'Vyberte alespoň jednu skupinu',
      surveyOptions: 'Vyberte alespoň dvě možnosti',
      email: {
        taken: 'Email je již použitý',
        avaiable: 'Email je k dispozici',
      }
    },
    input: {
      password: {
        confirm: 'Potvrzení hesla',
        text: 'Heslo',
      },
      type: 'Typ',
      price: 'Cena',
      max: {
        people: 'Maximální počet osob',
        substitutes: 'Maximální počet náhradníků',
      },
      address: {
        long: 'Adresa',
        short: 'Krátká adresa',
      },
    },
  },
  is: {
    periodic: 'Je pravidelný',
  },
  find: {
    on: {
      maps: 'Najít na mapě',
    }
  },
  notify: {
    wrong: {
      credentials: 'Nesprávné přihlašovací údaje'
    },
    missing: {
      time: 'Chybí čas',
      groups: 'Chybí skupiny',
    },
    invalid: {
      input: 'Neplatný vstup',
    },
    reLoginToSeeChanges: 'Uživatel se může muset znovu přihlásit, aby viděl všechny změny',
  },
  post: {
    type: {
      text: 'Příspěvek',
      event: 'Událost',
      survey: 'Anketa',
      // plural for feed filter
      texts: 'Příspěvky',
      events: 'Události',
      surveys: 'Ankety',
    },
    reaction: {
      likes: 'lajky',
      comments: 'komentáře',
      follow: 'Sledovat',
    },
    comment: {
      write: 'Napsat komentář',
    },
  },
  user: {
    full_name: 'Celé jméno',
  },

  tooltip: {
    like: 'lajk',
    comment: {
      show: 'Zobrazit komentáře',
    },
    post: {
      show: 'Zobrazit příspěvek',
      delete: 'Smazat příspěvek',
    },
    set: {
      date: 'Nastavit datum',
      time: 'Nastavit čas',
    },
  },
  event: {
    reaction: {
      going: 'jdu',
      not_going: 'nejdu',
      substitute: 'náhradník',
    },
    description: 'Popis',
  },
  profile: {
    change: {
      details: 'Změnit údaje',
    },
    settings: 'Nastavení uživatele',
  },
  tiles: {
    events: {
      title: 'události',
      description: 'Spravujte své události',
    },
    users: {
      title: 'uživatelé',
      description: 'Spravujte uživatele',
    },
    groups: {
      title: 'skupiny',
      description: 'Spravujte skupiny',
    },
    create: {
      event: {
        title: 'vytvořit událost',
        description: 'Vytvořte novou událost',
      },
    },
    today: {
      title: 'dnešní program',
      description: 'Zobrazte si, co se dnes děje',
    },
    my: {
      events: {
        title: 'moje události',
        description: 'Zobrazit, které události plánuji',
      },
    }
  },
  settings: {
    email_notification: 'Upozornění e-mailem',
    push_notification: 'Upozornění push',
    notification: 'Nastavení upozornění',
  },
  admin: {
    today: 'Dnešní program',
    attendence: 'Docházka',
  },
  dayofweek: {
    Sunday: 'Neděle',
    Monday: 'Pondělí',
    Tuesday: 'Úterý',
    Wednesday: 'Středa',
    Thursday: 'Čtvrtek',
    Friday: 'Pátek',
    Saturday: 'Sobota',
  },
  weeks: 'týdny',
  role: {
    admin: 'admin',
    coach: 'trenér',
    player: 'hráč',
  }
};
