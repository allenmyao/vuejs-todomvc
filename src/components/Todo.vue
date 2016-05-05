<template>
  <li class="todo">
    <div>
      <label class="todo__title" @dblclick="edit(todo)">{{todo.title}}</label>
      <button class="todo__btn-remove" @click="remove(todo)"></button>
    </div>
    <input type="text" class="todo__edit" v-model="todo.title" v-if="isEditing" v-todo-focus="isEditing" @blur="save(todo)" @keyup.enter="save(todo)" @keyup.esc="cancel(todo)"/>
  </li>
</template>

<script>
import Vue from 'vue';

export default {

  name: 'Todo',

  props: {
    todo: Object
  },

  data() {
    return {
      beforeEdit: null,
      isEditing: false
    };
  },

  methods: {
    remove(todo) {
      this.$dispatch('remove-todo', todo);
    },
    edit(todo) {
      this.isEditing = true;
      this.beforeEdit = todo.title;
    },
    save(todo) {
      todo.title = todo.title.trim();
      this.isEditing = false;
      if (!todo.title) {
        this.cancel(todo);
      }
    },
    cancel(todo) {
      todo.title = this.beforeEdit;
      this.isEditing = false;
    }
  },

  directives: {
    'todo-focus': function (value) {
      // do nothing if directive attribute value does not evaluate to true
      if (!value) {
        return;
      }
      let el = this.el;
      // wait for DOM to update to focus on the input
      // i.e. wait for the input to be displayed
      Vue.nextTick(function () {
        el.focus();
      });
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

  &__edit {
    position: absolute;
    display: block;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
}
</style>
