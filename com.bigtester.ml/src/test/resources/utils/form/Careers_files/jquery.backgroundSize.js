/*
 * backgroundSize: A jQuery cssHook adding support for "cover" and "contain" to IE6,7,8
 *
 * Requirements:
 * - jQuery 1.7.0+
 *
 * Limitations:
 * - doesn't work with multiple backgrounds (use the :after trick)
 * - doesn't work with the "4 values syntax" of background-position
 * - doesn't work with lengths in background-position (only percentages and keywords)
 * - doesn't work with "background-repeat: repeat;"
 * - doesn't work with non-default values of background-clip/origin/attachment/scroll
 * - you should still test your website in IE!
 *
 * latest version and complete README available on Github:
 * https://github.com/louisremi/jquery.backgroundSize.js
 *
 * Copyright 2012 @louis_remi
 * Licensed under the MIT license.
 *
 * This saved you an hour of work?
 * Send me music http://www.amazon.co.uk/wishlist/HNTU0468LQON
 *
 */
(function(e,t,n,r,i){var s=e("<div>")[0],o=/url\(["']?(.*?)["']?\)/,u=[],a={top:0,left:0,bottom:1,right:1,center:.5};if("backgroundSize"in s.style&&!e.debugBGS)return;e.cssHooks.backgroundSize={set:function(t,n){var r=!e.data(t,"bgsImg"),i,s,o;e.data(t,"bgsValue",n),r?(u.push(t),e.refreshBackgroundDimensions(t,!0),s=e("<div>").css({position:"absolute",zIndex:-1,top:0,right:0,left:0,bottom:0,overflow:"hidden"}),o=e("<img>").css({position:"absolute"}).appendTo(s),s.prependTo(t),e.data(t,"bgsImg",o[0]),i=(e.css(t,"backgroundPosition")||e.css(t,"backgroundPositionX")+" "+e.css(t,"backgroundPositionY")).split(" "),e.data(t,"bgsPos",[a[i[0]]||parseFloat(i[0])/100,a[i[1]]||parseFloat(i[1])/100]),e.css(t,"zIndex")=="auto"&&(t.style.zIndex=0),e.css(t,"position")=="static"&&(t.style.position="relative"),e.refreshBackgroundImage(t)):e.refreshBackground(t)},get:function(t){return e.data(t,"bgsValue")||""}},e.cssHooks.backgroundImage={set:function(t,n){return e.data(t,"bgsImg")?e.refreshBackgroundImage(t,n):n}},e.refreshBackgroundDimensions=function(t,n){var r=e(t),i={width:r.innerWidth(),height:r.innerHeight()},s=e.data(t,"bgsDim"),o=!s||i.width!=s.width||i.height!=s.height;e.data(t,"bgsDim",i),o&&!n&&e.refreshBackground(t)},e.refreshBackgroundImage=function(t,n){var r=e.data(t,"bgsImg"),i=(o.exec(n||e.css(t,"backgroundImage"))||[])[1],s=r&&r.src,u=i!=s,a,f;if(u){r.style.height=r.style.width="auto",r.onload=function(){var n={width:r.width,height:r.height};if(n.width==1&&n.height==1)return;e.data(t,"bgsImgDim",n),e.data(t,"bgsConstrain",!1),e.refreshBackground(t),r.style.visibility="visible",r.onload=null},r.style.visibility="hidden",r.src=i;if(r.readyState||r.complete)r.src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",r.src=i;t.style.backgroundImage="none"}},e.refreshBackground=function(t){var n=e.data(t,"bgsValue"),i=e.data(t,"bgsDim"),s=e.data(t,"bgsImgDim"),o=e(e.data(t,"bgsImg")),u=e.data(t,"bgsPos"),a=e.data(t,"bgsConstrain"),f,l=i.width/i.height,c=s.width/s.height,h;n=="contain"?c>l?(e.data(t,"bgsConstrain",f="width"),h=r.floor((i.height-i.width/c)*u[1]),o.css({top:h}),f!=a&&o.css({width:"100%",height:"auto",left:0})):(e.data(t,"bgsConstrain",f="height"),h=r.floor((i.width-i.height*c)*u[0]),o.css({left:h}),f!=a&&o.css({height:"100%",width:"auto",top:0})):n=="cover"&&(c>l?(e.data(t,"bgsConstrain",f="height"),h=r.floor((i.height*c-i.width)*u[0]),o.css({left:-h}),f!=a&&o.css({height:"100%",width:"auto",top:0})):(e.data(t,"bgsConstrain",f="width"),h=r.floor((i.width/c-i.height)*u[1]),o.css({top:-h}),f!=a&&o.css({width:"100%",height:"auto",left:0})))};var f=e.event,l,c={_:0},h=0,p,d;l=f.special.throttledresize={setup:function(){e(this).on("resize",l.handler)},teardown:function(){e(this).off("resize",l.handler)},handler:function(t,n){var r=this,i=arguments;p=!0,d||(e(c).animate(c,{duration:Infinity,step:function(){h++;if(h>l.threshold&&p||n)t.type="throttledresize",f.dispatch.apply(r,i),p=!1,h=0;h>9&&(e(c).stop(),d=!1,h=0)}}),d=!0)},threshold:1},e(t).on("throttledresize",function(){e(u).each(function(){e.refreshBackgroundDimensions(this)})})})(jQuery,window,document,Math),$(document).ready(function(e){e(".layout-bkg-cover").css("background-size","cover")});