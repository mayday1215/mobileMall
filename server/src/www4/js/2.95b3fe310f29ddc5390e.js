webpackJsonp([2],{"09v8":function(t,e){},REbv:function(t,e){},ltQH:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n("mvHQ"),c=n.n(r),o={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"no-data"},[e("van-icon",{attrs:{name:"warning-o"}}),this._v(" "),e("div",{staticClass:"text"},[this._v(this._s(this.text))])],1)},staticRenderFns:[]};var i={data:function(){return{}},components:{"no-data":n("VU/8")({props:["text"]},o,!1,function(t){n("09v8")},"data-v-2e8327c0",null).exports},computed:{productCounts:function(){var t=0;return this.selectedList.reduce(function(e,n,r){return t+=n.count},t)},selectedList:function(){return this.cart.filter(function(t){return t.checked})},cart:function(){return this.$store.cart},totalPrice:function(){var t=0;return 100*this.selectedList.reduce(function(e,n){return t+=n.price*n.count},t)}},mounted:function(){var t=this;this.$axios.get("/cart/all").then(function(e){0===e.errcode&&(t.$store.cart=e.data)})},methods:{handleSelect:function(t){this.$axios.post("/cart/update",{product_id:t.product_id,checked:t.checked?1:0}).then(function(t){t.errcode})},del:function(t){var e=this;this.$axios.get("/cart/delete",{params:{product_id:this.cart[t].product_id}}).then(function(n){0===n.errcode?e.$store.cart.splice(t,1):90101===n.errcode&&(e.$store.cart.splice(t,1),localStorage.cart=c()(e.$store.cart))})},changeCount:function(t,e){var n=this;this.$nextTick(function(){n.$axios.post("/cart/update",{product_id:t.product_id,count:t.count}).then(function(t){90111===t.errcode&&(localStorage.cart=c()(n.$store.cart))})})},order:function(){sessionStorage.buyProducts=c()(this.cart.filter(function(t){return t.checked})),this.$router.push({name:"orderConfirm"})}}},a={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("van-nav-bar",{attrs:{"left-arrow":"","left-text":"返回",title:"购物车"},on:{"click-left":function(e){return t.$router.back()}}}),t._v(" "),n("div",{staticClass:"list"},[t.$store.user.id?t._e():n("van-button",{attrs:{type:"primary",size:"large"},on:{click:function(e){t.$store.showSignin=!0}}},[t._v("登录后体验更好")]),t._v(" "),t.cart.length>0?t._l(t.cart,function(e,r){return n("van-checkbox",{key:e.product_id,staticClass:"card-goods__item",attrs:{name:e.product_id},on:{change:function(n){return t.handleSelect(e)}},model:{value:e.checked,callback:function(n){t.$set(e,"checked",n)},expression:"item.checked"}},[n("van-card",{attrs:{title:e.name,num:e.count,price:e.price,thumb:e.cover}},[n("div",{attrs:{slot:"num"},on:{click:function(t){t.stopPropagation()}},slot:"num"},[n("van-stepper",{on:{plus:function(n){return t.changeCount(e,r)},minus:function(n){return t.changeCount(e,r)}},model:{value:e.count,callback:function(n){t.$set(e,"count",n)},expression:"item.count"}}),t._v(" "),t.$store.user?n("van-button",{staticClass:"trash-btn",attrs:{type:"danger",size:"mini",icon:"delete"},on:{click:function(e){return t.del(r)}}}):t._e()],1)])],1)}):n("no-data",{attrs:{text:"你的购物车为空"}})],2),t._v(" "),n("van-submit-bar",{attrs:{price:t.totalPrice,disabled:!t.selectedList.length,"button-text":"结算"},on:{submit:t.order}},[t._v("\n    共"+t._s(t.productCounts)+"件")])],1)},staticRenderFns:[]};var s=n("VU/8")(i,a,!1,function(t){n("REbv")},null,null);e.default=s.exports}});
//# sourceMappingURL=2.95b3fe310f29ddc5390e.js.map