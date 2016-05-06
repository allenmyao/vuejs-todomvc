# Vue.js TodoMVC

> A TodoMVC webapp using Vue.js components. Includes unit tests (run on PhantomJS via Karma using Mocha + Chai with Sinon.JS mocking available) and E2E tests (run on Chrome and Firefox via Nightwatch.js).

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# run unit tests
# make sure karma-cli is installed
npm run unit

# run e2e tests
# make sure Chrome, Firefox, and Xvfb are installed
npm run e2e

# run all tests
npm test
```

## Testing

### Dependencies

Unit tests require karma-cli:
``` bash
npm install -g karma-cli
```

E2E testing requires Chrome, Firefox, and Xvfb:
``` bash
# Install Firefox and Xvfb
sudo apt-get install firefox xvfb

# Install chrome
sudo apt-get install libxss1 libappindicator1 libindicator7
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
sudo dpkg -i google-chrome*.deb
sudo apt-get install -f
```
