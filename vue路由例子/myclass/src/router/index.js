import Vue from "vue";
import Router from "vue-router";
import news from "../components/news";
import hello from "../components/Hello";
import edu from "../components/edu";
import news1 from "../components/news1";

Vue.use(Router);
//npm i vue-router -S
let routes = [
  {
    path:'/',
    component:hello
  },
  {
    path:'/news',
    component:news,
    children:[
    	{
    		path:'news1',
    		component:news1
    	}
    ]
  },
  {
    path:'/edu',
    component:edu
  }
];

export default new Router({
  mode:'history',
  routes
});


