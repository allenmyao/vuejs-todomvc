// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {

  beforeEach: function (browser) {
    browser
      .url('http://localhost:8080')
        .waitForElementVisible('#wrapper', 1000)
        .waitForElementVisible('.todo-view', 1000);
  },

  'Displays input for new todos': function (browser) {
    browser
      .assert.elementPresent('input.new-todo')
      .end();
  },

  'Displays no todos': function (browser) {
    browser
      .assert.elementCount('.todo', 0)
      .end();
  }

};
