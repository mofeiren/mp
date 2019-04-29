import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index/index'
import editMenu from '@/components/mp/menu/editMenu'
import message from '@/components/mp/message/msg'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      children:[
      	{
		      path: '/editMenu',
		      component: editMenu
    		},
        {
          path: '/message',
          component: message
        }
    	]
    }
  ]
})
