import Vue from 'vue';
import TodoView from 'src/components/TodoView';
// import Todo from 'src/components/Todo';
import * as chai from 'chai';
chai.should();

describe('TodoView.vue', function () {
  it('should have name TodoView', function () {
    (TodoView.name).should.be.equal('TodoView');
  });

  describe('components', function () {
    it('should have components', function () {
      (TodoView.components).should.be.a('object');
    });

    it('should have Todo component available', function () {
      (TodoView.components.Todo).should.be.a('object');
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

  describe('watched data', function () {
    it('should have watched data', function () {
      (TodoView.watch).should.be.a('object');
    });

    it('should be watching todos', function () {
      (TodoView.watch.todos).should.be.a('object');
    });
  });

  describe('computed data', function () {
    it('should have computed data', function () {
      (TodoView.computed).should.be.a('object');
    });

    let activeTodo = {
      title: 'active',
      completed: false
    };
    let completedTodo = {
      title: 'completed',
      completed: true
    };
    let data;

    let todoView;

    beforeEach(function () {
      todoView = new Vue(TodoView);
      data = [
        activeTodo,
        completedTodo
      ];
      todoView.$set('todos', data);
    });

    describe('filteredTodos', function () {
      it('should return all todos when filter is "all"', function () {
        todoView.$set('filter', 'all');
        (todoView.filteredTodos).should.deep.equal(data);
      });

      it('should return active todos when filter is "active"', function () {
        todoView.$set('filter', 'active');
        (todoView.filteredTodos).should.deep.equal([ activeTodo ]);
      });

      it('should return completed todos when filter is "completed"', function () {
        todoView.$set('filter', 'completed');
        (todoView.filteredTodos).should.deep.equal([ completedTodo ]);
      });
    });

    describe('remaining', function () {
      it('should return number of active todos', function () {
        (todoView.remaining).should.equal(1);
      });

      it('should ignore completed todos', function () {
        todoView.$set('todos', [ completedTodo ]);
        (todoView.remaining).should.equal(0);
      });
    });

    describe('done', function () {
      it('should return true if no active todos remain', function () {
        todoView.$set('todos', [ completedTodo ]);
        (todoView.done).should.be.true;
      });

      it('should return false if active todos remain', function () {
        todoView.$set('todos', [ activeTodo, completedTodo ]);
        (todoView.done).should.be.false;
      });

      it('should set completed status of all todos', function () {
        todoView.$set('todos', [ activeTodo, completedTodo ]);
        todoView.done = false;
        (todoView.remaining).should.equal(todoView.$get('todos').length);
        todoView.done = true;
        (todoView.remaining).should.equal(0);
      });
    });
  });

  describe('methods', function () {
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

    describe('#removeTodo', function () {
      it('should remove the speficied todo', function () {
        let todoView = new Vue(TodoView);
        let activeTodo = {
          title: 'active',
          completed: false
        };
        let completedTodo = {
          title: 'completed',
          completed: true
        };
        todoView.$set('todos', [ activeTodo, completedTodo ]);
        todoView.removeTodo(activeTodo);
        (todoView.$get('todos')).should.deep.equal([ completedTodo ]);
        todoView.removeTodo(completedTodo);
        (todoView.$get('todos')).should.deep.equal([]);
      });
    });
  });

  describe('event listeners', function () {
    describe('remove-todo', function () {
      it('should trigger removal of the given todo', function () {
        let todoView = new Vue(TodoView);
        let activeTodo = {
          title: 'active',
          completed: false
        };
        let completedTodo = {
          title: 'completed',
          completed: true
        };
        todoView.$set('todos', [ activeTodo, completedTodo ]);
        todoView.$emit('remove-todo', activeTodo);
        (todoView.$get('todos')).should.deep.equal([ completedTodo ]);
        todoView.$emit('remove-todo', completedTodo);
        (todoView.$get('todos')).should.deep.equal([]);
      });
    });
  });

  describe('route handlers', function () {
    it('should redirect unknown routes to all', function () {
      let called = false;
      const _this = {
        $route: {
          router: {
            go: function (path) {
              called = path === '/all';
            }
          }
        }
      };
      TodoView.route.data.call(_this, { to: { params: { filter: 'test' } } });
      (called).should.equal.true;
    });

    it('should return data object if filter param is valid', function () {
      let data = TodoView.route.data({ to: { params: { filter: 'all' } } });
      (data).should.be.a('object');
    });
  });

  describe('rendered elements', function () {
    it('should render an input for new todos', function () {
      const vm = new Vue({
        template: '<div><todo-view></todo-view></div>',
        components: { TodoView }
      }).$mount();
      (vm.$el.querySelectorAll('.todo-view__new-todo').length).should.equal(1);
    });
  });
});
