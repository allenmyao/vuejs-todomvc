<template>
  <div class="todo-view">
    <header>
      <input type="text" class="todo-view__new-todo" autofocus autocomplete="off" placeholder="Enter todo" v-model="newTodo" @keyup.enter="addTodo" />
      <div class="todo-view__info">
        <span><span v-text="remaining"></span> {{ remaining | pluralize 'task' }} remaining</span>
        <ul>
          <li><label>Show:</label></li>
          <li><a href="#/all" class="todo-view__info__filter" :class="{ 'todo-view__info__filter--selected': filter == 'all' }">all</a></li>
          <li><a href="#/active" class="todo-view__info__filter" :class="{ 'todo-view__info__filter--selected': filter == 'active' }">active</a></li>
          <li><a href="#/completed" class="todo-view__info__filter" :class="{ 'todo-view__info__filter--selected': filter == 'completed' }">completed</a></li>
        </ul>
      </div>
    </header>
    <ul class="todo-view__todos" v-if="todos">
      <todo
        v-for="todo in filteredTodos"
        :todo="todo">
      </todo>
    </ul>
  </div>
</template>

<script>
import store from '../store';
import Todo from './Todo.vue';

const filters = {
  all: function (todos) {
    return todos;
  },
  active: function (todos) {
    return todos.filter(function (todo) {
      return !todo.completed;
    });
  },
  completed: function (todos) {
    return todos.filter(function (todo) {
      return todo.completed;
    });
  }
};

export default {

  name: 'TodoView',

  components: {
    Todo
  },

  data() {
    return {
      todos: [],
      newTodo: '',
      filter: 'all'
    };
  },

  watch: {
    todos: {
      deep: true,
      handler: store.save
    }
  },

  computed: {
    filteredTodos: function () {
      return filters[this.filter](this.todos);
    },
    remaining: function () {
      return filters.active(this.todos).length;
    },
    done: {
      get: function () {
        return this.remaining === 0;
      },
      set: function (value) {
        this.todos.forEach(function (todo) {
          todo.completed = value;
        });
      }
    }
  },

  methods: {
    addTodo: function () {
      let value = this.newTodo && this.newTodo.trim();
      if (!value) {
        return;
      }
      this.todos.push({ title: value, completed: false });
      this.newTodo = '';
    },

    removeTodo: function (todo) {
      this.todos.$remove(todo);
    }
  },

  events: {
    'remove-todo': function (todo) {
      this.removeTodo(todo);
    }
  },

  route: {
    data({ to }) {
      const filter = to.params.filter;

      if (!(filter in filters)) {
        this.$route.router.go('/all');
      }

      return {
        todos: store.fetch(),
        filter: filter
      };
    }
  }

};
</script>

<style lang="postcss" scoped>
.todo-view {
  width: 100%;
  height: 100%;

  &__new-todo {
    display: block;
    width: 100%;
    padding: 10px;
    font-size: 1rem;
  }

  &__info {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    padding: 10px;

    li {
      display: inline-block;
    }

    label {
      margin-right: 10px;
    }

    &__filter {
      display: block;
      padding: 5px 10px;
      border: 1px solid transparent;
      border-radius: 3px;
      color: inherit;
      text-decoration: none;
      transition: border-color 0.15s ease-out;

      &--selected {
        border-color: #ccc;
      }
    }
  }

  &__todos {
    display: block;
    width: 100%;
  }
}
</style>
