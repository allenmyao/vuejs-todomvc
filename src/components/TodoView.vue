<template>
  <div class="todo-view">
    <input type="text" class="new-todo" autofocus autocomplete="off" placeholder="Enter todo" v-model="newTodo" @keyup.enter="addTodo" />
    <ul class="todos" v-if="todos">
      <todo
        v-for="todo in todos"
        :todo="todo">
      </todo>
    </ul>
  </div>
</template>

<script>
import store from '../store';
import Todo from './Todo.vue';

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
      const filter = +to.params.filter;
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

  .new-todo {
    display: block;
    width: 100%;
    padding: 10px;
    font-size: 1rem;
  }

  .todos {
    display: block;
  }
}
</style>
