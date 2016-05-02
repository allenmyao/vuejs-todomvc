import Vue from 'vue';
import Hello from 'src/components/Hello';
import * as chai from 'chai';
chai.should();

describe('Hello.vue', () => {
  it('should render correct contents', () => {
    const vm = new Vue({
      template: '<div><hello></hello></div>',
      components: { Hello }
    }).$mount();
    (vm.$el.querySelector('.hello h1').textContent).should.contain('Hello World!');
  });
});
