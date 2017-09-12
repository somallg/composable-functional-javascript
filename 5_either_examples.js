const openSite = () => {
  if (current_user) {
    return renderPage(current_user);
  } else {
    return showLogin();
  }
};

const openSite = () => {
  fromNullable(current_user)
    .fold(showLogin, renderPage);
};

const getPrefs = user => {
  if (user.premium) {
    return loadPrefs(user.preferences);
  } else {
    return defaultPrefs;
  }
};

const getPrefs = user =>
  (user.primium ? Right(user) ? Left('not primium'))
    .map(u => u.preferences)
    .fold(() => defaultPrefs, prefs => loadPrefs(prefs));


const streetName = user => {
  const address = user.address;

  if (address) {
    const street = address.street;

    if (street) {
      return street.name;
    }
  }

  return 'no street';
};

const streetName = user =>
  fromNullable(user.address)
    .chain(address => fromNullable(address.street))
    .map(s => s.name)
    .fold(e => 'no street',
      n => n);

const concatUniq = (x, ys) => {
  const found = ys.filter(y => y === x)[0];
  return found ? ys : ys.concat(x);
};

const concatUniq = (x, ys) =>
  fromNullable(ys.filter(y => y === x)[0])
    .fold(e => ys.concat(x),
      e => ys);

const wrapExamples = example => {
  if (example.previewPath) {
    try {
      example.preview = fs.readFileSync(example.previewPath);
    } catch (e) {

    }

    return example;
  }
};


const readFile = x => tryCatch(() => fs.readFileSync(x));

const wrapExamples = example =>
  fromNullable(example.previewPath)
    .map(readFile)
    .fold(() => example,
      ex => Object.assign({ preview: '' }, ex));

const parseDbUrl = cfg => {
  try {
    const c = JSON.parse(cfg);

    if (c.url) {
      return c.url.match(/postgres/);
    }
  } catch (e) {
    return null;
  }
};

const parseDbUrl = cfg =>
  tryCatch(cfg)
    .chain(c => fromNullable(c.url))
    .map(url => url.match(/postgres/))
    .fold(e => null,
          m => m);
