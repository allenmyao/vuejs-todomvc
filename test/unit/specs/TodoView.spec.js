import Vue from 'vue';
import TodoView from 'src/components/TodoView';
// import Todo from 'src/components/Todo';
import * as chai from 'chai';
chai.should();

describe('TodoView.vue', () => {
  it('should have name TodoView', function () {
    (TodoView.name).should.be.equal('TodoView');
  });

  describe('components', function () {
    it('should have components', function () {
      (TodoView.components).should.be.a('object');
    });

    it('should have Todo component available', function () {
      (TodoView.components.Todo).should.be.a('function');
    });
  });

  describe('data', function () {
    it('should have data', function () {
      (TodoView.data).should.be.a('function');
    });

    it('should set correct default data', function () {
      let defaultData = TodoView.data();
      (defaultData.todos).should.be.deep.equal([]);
      (defaultData.newTodo).should.be.equal('');
      (defaultData.filter).should.be.equal('all');
    });
  });

  describe('#addTodo', function () {
    it('should add new todo based on value of newTodo', function () {
      const todoView = new Vue(TodoView);
      let title = 'test';
      todoView.$set('newTodo', title);
      todoView.addTodo();
      (todoView.$get('todos')[0].title).should.be.equal(title);
    });

    it('should not add empty todo', function () {
      const todoView = new Vue(TodoView);
      todoView.addTodo();
      (todoView.$get('todos')).should.be.deep.equal([]);
    });
  });

  it('should render an input for new todos', () => {
    const vm = new Vue({
      template: '<div><todo-view></todo-view></div>',
      components: { TodoView }
    }).$mount();
    (vm.$el.querySelectorAll('input.new-todo').length).should.equal(1);
  });
});
