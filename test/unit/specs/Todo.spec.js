import Vue from 'vue';
import Todo from 'src/components/Todo';
import * as chai from 'chai';
chai.should();

describe('Todo.vue', () => {
  it('should have name Todo', function () {
    (Todo.name).should.be.equal('Todo');
  });

  describe('rendered elements', function () {
    let data;
    const vm = new Vue({
      template: '<div><todo :todo="todo"></todo></div>',
      components: { Todo }
    }).$mount();

    beforeEach(function (done) {
      data = {
        todo: {
          title: 'test',
          completed: false
        }
      };
      vm.$data = data;

      // render data changes before running test
      Vue.nextTick(done);
    });

    it('should render an input for new todos', () => {
      (vm.$el.querySelectorAll('.todo').length).should.equal(1);
    });

    it('should have a label with the title', () => {
      (vm.$el.querySelectorAll('.todo__title').length).should.equal(1);
      (vm.$el.querySelector('.todo__title').textContent).should.equal(data.todo.title);
    });
  });
});
