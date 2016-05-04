import Vue from 'vue';
import Router from 'vue-router';

import App from './App';
import TodoView from './components/TodoView';

Vue.use(Router);

let router = new Router();

router.map({
  '/:filter': {
    component: TodoView
  }
});

router.beforeEach(function () {
  window.scrollTo(0, 0);
});

router.redirect({
  '*': '/all'
});

router.start(App, '#app');
