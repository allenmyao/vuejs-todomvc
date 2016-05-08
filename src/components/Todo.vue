<template>
  <li class="todo" :class="{ 'todo--completed': todo.completed }">
    <div>
      <input type="checkbox" class="todo__completed-toggle" v-model="todo.completed" />
      <label class="todo__title" @click="edit(todo)">{{todo.title}}</label>
      <button class="todo__btn-remove" @click="remove(todo)"></button>
    </div>
    <textarea class="todo__edit" v-model="todo.title" v-if="isEditing" v-todo-focus="isEditing" @blur="save(todo)" @keyup.enter="save(todo)" @keyup.esc="cancel(todo)"></textarea>
  </li>
</template>

<script>
import Vue from 'vue';

export default {

  name: 'Todo',

  // data from the parent component
  props: {
    todo: {
      type: Object,
      required: true
    }
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
      // todo.title = todo.title.trim();
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
  width: 100%;
  border-bottom: 1px solid #ccc;
  text-align: left;

  &:hover {
    button {
      display: block;
    }
  }

  &--completed & {
    &__title,
    &__edit {
      text-decoration: line-through;
      color: #ccc;
    }
  }

  &__completed-toggle {
    -webkit-appearance: none;
    -moz-appearance: checkbox;
    appearance: none;
    position: absolute;
    top: 0;
    bottom: 0;
    width: 40px;
    height: auto;
    margin: auto 0;
    border: none;
    outline: none;
    text-align: center;
    cursor: pointer;

    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      display: block;
      width: 40px;
      height: 40px;
      margin: -1px 0 0 -1px;
      border: 1px solid #ededed;
      border-radius: 50%;
      box-sizing: content-box;
      transform: translateY(-50%);
      transition: border-color 0.15s ease-out;
    }

    &::after {
      content: '';
      position: absolute;
      top: 48%;
      left: 52%;
      display: block;
      width: 7px;
      height: 20px;
      margin: -1px 0 0 -1px;
      border-width: 0 2px 2px 0;
      border-style: solid;
      border-color: transparent;
      box-sizing: content-box;
      transform: translateX(-50%) translateY(-50%) rotateZ(35deg);
      transition: border 0.15s ease-out;
    }

    &:checked{
      &::after {
        border-color: #5dc2af;
      }

      &::before {
        border-color: #bddad5;
      }
    }
  }

  &__title {
    display: block;
    min-height: 53px;
    margin-left: 40px;
    padding: 15px 60px 15px 15px;
    white-space: pre-wrap;
    word-break: break-all;
  }

  &__btn-remove {
    position: absolute;
    top: 0;
    right: 10px;
    bottom: 0;
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
    top: 0;
    right: 0;
    bottom: 0;
    left: 40px;
    display: block;
    width: calc(100% - 40px);
    padding: 15px 60px 15px 15px;
    border: 0;
    outline: none;
    background: none;
    font-family: inherit;
    font-size: 1rem;
    color: #5DC2AF;
    resize: none;
    overflow: hidden;
  }
}

/* Display checkbox with normal size in Firefox by only setting height in webkit browsers */
@media screen and (-webkit-min-device-pixel-ratio:0) {
  .todo {
    .todo__completed-toggle {
      height: 40px;
    }
  }
}

</style>
