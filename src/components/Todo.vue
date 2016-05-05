<template>
  <li class="todo">
    <div>
      <label class="todo__title">{{todo.title}}</label>
      <button class="todo__btn-remove" @click="remove(todo)"></button>
    </div>
  </li>
</template>

<script>
export default {

  name: 'Todo',

  props: {
    todo: Object
  },

  data() {
    return {
    };
  },

  methods: {
    remove(todo) {
      this.$dispatch('remove-todo', todo);
    }
  }

};
</script>

<style lang="postcss" scoped>
.todo {
  position: relative;
  display: block;
  line-height: 20px;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  text-align: left;

  &:hover {
    button {
      display: block;
    }
  }

  &__title {
    display: inline-block;
    height: 20px;
    line-height: 20px;
  }

  &__btn-remove {
    position: absolute;
    top: 0;
    right: 10px;
    display: none;
    width: 40px;
    height: 40px;
    margin: auto 0;
    border-radius: 50%;
    font-size: 30px;
    color: #cc9a9a;
    transition: color 0.2s ease-out;
    cursor: pointer;

    &::after {
      content: '×';
    }

    &:hover {
      color: #af5b5e;
    }
  }
}
</style>
