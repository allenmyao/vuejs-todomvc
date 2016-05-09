import Vue from 'vue';
import Todo from 'src/components/Todo';
import * as chai from 'chai';
chai.should();

describe('Todo.vue', function () {
  it('should have name Todo', function () {
    (Todo.name).should.be.equal('Todo');
  });

  describe('props', function () {
    (Todo.props).should.include.keys('todo');
  });

  describe('data', function () {
    it('should have data', function () {
      (Todo.data).should.be.a('function');
    });

    it('should set correct default data', function () {
      let defaultData = Todo.data();
      (defaultData.isEditing).should.be.false;
      should.not.exist(defaultData.beforeEdit);
    });
  });

  describe('directives', function () {
    describe('todo-focus', function () {
      let hasFocus;
      const todo = {
        el: {
          focus: function () {
            hasFocus = true;
          }
        }
      };

      beforeEach(function () {
        hasFocus = false;
      });

      it('should do nothing if the value is false', function (done) {
        Todo.directives['todo-focus'].call(todo, false);
        Vue.nextTick(function () {
          (hasFocus).should.be.false;
          done();
        });
      });

      it('should focus on edit input if the value is true', function (done) {
        Todo.directives['todo-focus'].call(todo, true);
        Vue.nextTick(function () {
          (hasFocus).should.be.true;
          done();
        });
      });
    });
  });

  describe('rendered elements', function () {
    let data;
    const vm = new Vue({
      template: '<div><todo :todo="todo"></todo></div>',
      components: { Todo },
      data: {
        todo: {
          title: null,
          completed: null
        }
      }
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

    it('should render the todo element', function () {
      (vm.$el.querySelectorAll('.todo').length).should.equal(1);
    });

    it('should render a label with the title', function () {
      (vm.$el.querySelectorAll('.todo__title').length).should.equal(1);
      (vm.$el.querySelector('.todo__title').textContent).should.equal('test');
    });

    it('should render a checkbox for toggling completion', function () {
      (vm.$el.querySelectorAll('.todo__completed-toggle').length).should.equal(1);
    });

    it('should render a button for removing the todo', function () {
      (vm.$el.querySelectorAll('.todo__btn-remove').length).should.equal(1);
    });

    it('should not show input for editing the todo', function () {
      (vm.$el.querySelectorAll('.todo__edit-todo').length).should.equal(0);
    });
  });

  describe('methods', function () {
    let data = {
      title: 'test',
      completed: false
    };
    let vm;
    let todo;

    beforeEach(function (done) {
      vm = new Vue({
        template: '<div><todo :todo="todo"></todo></div>',
        components: { Todo },
        data: {
          todo: data
        }
      }).$mount();
      Vue.nextTick(done);
      todo = vm.$children[0];
    });

    describe('#remove', function () {
      it('should dispatch "remove-todo" event', function (done) {
        todo.$once('remove-todo', function (todoData) {
          (todoData).should.equal(data);
          done();
        });
        todo.remove(todo.$get('todo'));
      });
    });

    describe('#edit', function () {
      it('should save old title in "beforeEdit"', function () {
        todo.edit(todo.$get('todo'));
        (todo.$get('beforeEdit')).should.equal(data.title);
      });

      it('should set "isEditing" to true', function () {
        todo.edit(todo.$get('todo'));
        (todo.$get('isEditing')).should.be.true;
      });
    });

    describe('#save', function () {
      it('should set "isEditing" to false', function () {
        todo.save(todo.$get('todo'));
        (todo.$get('isEditing')).should.be.false;
      });

      it('should cancel edit if title is empty', function () {
        let beforeEdit = todo.$get('todo.title');
        todo.$set('beforeEdit', beforeEdit);
        todo.$set('todo.title', '');
        todo.save(todo.$get('todo'));
        (todo.$get('todo.title')).should.equal(beforeEdit);
      });
    });

    describe('#cancel', function () {
      it('should set "isEditing" to false', function () {
        let beforeEdit = todo.$get('todo.title');
        todo.$set('beforeEdit', beforeEdit);
        todo.cancel(todo.$get('todo'));
        (todo.$get('isEditing')).should.be.false;
      });

      it('should set title to what it was before editing', function () {
        let beforeEdit = todo.$get('todo.title');
        todo.$set('beforeEdit', beforeEdit);
        todo.cancel(todo.$get('todo'));
        (todo.$get('todo.title')).should.equal(beforeEdit);
      });
    });
  });
});
