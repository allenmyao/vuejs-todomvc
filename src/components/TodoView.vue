<template>
  <div class="todo-view">
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
      filter: 'all'
    };
  },

  watch: {
    todos: {
      deep: true,
      handler: store.save
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

}
</style>
