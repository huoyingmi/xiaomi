//处理购物车函数调用
handleCart();
//处理导航下拉框调用
handleNav();
// 处理轮播图调用
handleCarousel();
//处理show-list轮播列表调用
handleShowlist();
//处理倒计时调用
handleCountdown();
//处理闪购商品切换调用
handleFlashProduct();
//处理家电选项卡部分调用
handleJiadianProduct();



//处理购物车封装函数
function handleCart(){
	//1.获取元素
	var oCart = document.querySelector('.topnav .shop-cart');
	var oShopCartA = document.querySelector('.topnav .shop-cart a');
	var oCartCentent = document.querySelector('.shop-cart .cart-centent');
	var oLoader = oCartCentent.querySelector('.loader');
	var oEmptyCart = oCartCentent.querySelector('.empty-cart');

	oCart.onmouseenter = function(){
		// alert('a');
		//1.改变购物车图标的背景颜色和字体颜色
		oShopCartA.style.background = '#fff';
		oShopCartA.style.color = '#ff6700';
		//2.加载loading图标
		oLoader.style.display = 'block';
		//2.显示购物车内容
	    // oCartCentent.style.height = '100px';
	    // animate(oCartCentent,{height:100},true);
	    //2.显示购物车内容，假设购物车完全显示就获取到了购物车数据
	    animate(oCartCentent,{height:100},true,function(){
	    	oLoader.style.display = 'none';
	    	//此处会向后台请求数据
	    	oEmptyCart.style.display = 'block';
	    });
	}

	oCart.onmouseleave = function(){
		//1.改变购物车图标的背景颜色和字体颜色
		oShopCartA.style.background = '#424242';
		oShopCartA.style.color = '#b0b0b0';
		//2.隐藏购物车内容
	    animate(oCartCentent,{height:0},true,function(){
	    	oLoader.style.display = 'none';
	    	oEmptyCart.style.display = 'none';
	    });
	}
}

//处理导航下拉框
function handleNav(){
	//1.获取导航列表
	var aNavItem = document.querySelectorAll('.header .centernav2 .nav-li-item');
	var oNavCentent = document.querySelector('.header .nav-centent');
	var oNavCententContainer = oNavCentent.querySelector('.container');
	var hiddenTime = 0;
	var loadTime = 0;

	//2.批量监听列表事件
	for(var i=0; i<aNavItem.length-2; i++){
		// 2.1.鼠标移入事件
		aNavItem[i].index = i;
		aNavItem[i].onmouseenter = function(){
			clearTimeout(hiddenTime);
			oNavCentent.style.borderTop = '1px solid #ccc';
			animate(oNavCentent,{height:200},true,function(){
				oNavCentent.style.overflow = 'visible';
			});
			// 模拟数据加载完成
			var index1 = this.index;
			//去除不必要的加载
			clearTimeout(loadTime);
			loadTime = setTimeout(function(){
				loadData(index1);
			},1000);
		}
        // 2.2.鼠标移出事件
        aNavItem[i].onmouseleave = function(){
            hiddenNavCentent();
		}
	}
	oNavCentent.onmouseenter = function(){
		clearTimeout(hiddenTime);
	}
	oNavCentent.onmouseleave = function(){
		hiddenNavCentent();
	}
	function hiddenNavCentent(){
    	hiddenTime = setTimeout(function(){
            oNavCentent.style.overflow = 'hidden';
			animate(oNavCentent,{height:0},true,function(){
				oNavCentent.style.borderTop = 'none';
			})	
        },300)
    }
	function loadData(index){
        var data = aNavItemData[index];
        var html = '<ul>';
        for(var i=0; i<data.length; i++){
        	html += '<li>';
			html +=		'<div class="img-box">';
			html +=		    '<a href="'+data[i].url+'">';
			html +=                   '<img src="'+data[i].img+'" alt="">';
			html +=              '</a>';
			html +=	    '</div>';
			html +=	    '<p>'+data[i].name+'</p>';
			html +=	    '<strong>'+data[i].price+'元起</strong>';
			if(data[i].tag){
				html +=	'<span>'+data[i].tag+'</span>';
        	}
			html +=	'</li>';
        }
        html += '</ul>';

        oNavCententContainer.innerHTML = html;
	}
}

// 处理轮播图
function handleCarousel(){
	new Carousel({
		id:'carousel',
		aImg:['img/lbt1.png','img/lbt2.png','img/lbt3.png','img/lbt4.png','img/lbt5.png'],
		width:1226,
		height:460,
		playDuration:1000
	});
}

//处理show-list轮播列表
function handleShowlist(){
	var aShowItem = document.querySelectorAll('.hot .slideshow .show-list .show-item');
	var oShowlistContent = document.querySelector('.hot .slideshow .show-list-content');
    var oSlideShow = document.querySelector('.hot .slideshow');

	for(var i = 0; i<aShowItem.length; i++){
		aShowItem[i].index = i;
		aShowItem[i].onmouseenter = function(){
			for(var j = 0; j<aShowItem.length; j++){
				aShowItem[j].className = 'show-item';
			}
			oShowlistContent.style.display = 'block';
			this.className = 'show-item active';
			//加载数据
			loadData(this.index);
		}
	}
	oSlideShow.onmouseleave = function(){
		oShowlistContent.style.display = 'none';
		for(var j = 0; j<aShowItem.length; j++){
			aShowItem[j].className = 'show-item';
		}
	}
	function loadData(index){
		var data = aShowItemData[index];
		// console.log(data);
		var html = '<ul>';
         for(var i=0; i<data.length; i++){
	        html += '<li>';
			html +=		'<a href="'+data[i].url+'">';
			html +=			'<img src="'+data[i].img+'" alt="">';
			html +=			'<span>'+data[i].name+'</span>';
			html +=		'</a>';
			html +=  '</li>';
         }
		html += '</ul>';
		oShowlistContent.innerHTML = html;
	}
}

//处理倒计时
function handleCountdown(){
	var aTime = document.querySelectorAll('.flash-shop .bottom-img .time');
    var endDate = new Date('2019-1-30 23:59:59');
    var timer = 0;

    function to2Star(num){
        return num > 9 ? ''+num : "0"+num;
    }
    function handleTimer(){
    	var endTime = endDate.getTime();
	    var allMinSeconds = endTime - Date.now();
	    if(allMinSeconds < 0){
	    	allMinSeconds = 0;
	    	clearInterval(timer);
	    }
	    // console.log(allMinSeconds);
	    var allSeconds = parseInt(allMinSeconds / 1000);
	    var iHour = parseInt(allSeconds / 3600);
	    var iMinute = parseInt((allSeconds % 3600) / 60);
	    var iSecond = (allSeconds % 3600) % 60;
	    aTime[0].innerHTML = to2Star(iHour);
	    aTime[1].innerHTML = to2Star(iMinute);
	    aTime[2].innerHTML = to2Star(iSecond);
    }
    timer = setInterval(handleTimer,500);
    handleTimer();
}

//处理闪购商品切换
function handleFlashProduct(){
	var oProductlist = document.querySelector('.flash-shop .bottom-img .product-list');
	var aSpan = document.querySelectorAll('.hot .flash-shop .top-text span');
    
    aSpan[0].onclick = function(){
    	oProductlist.style.marginLeft = '0px';
    }
    aSpan[1].onclick = function(){
    	oProductlist.style.marginLeft = '-978px';
    }

}

//处理家电选项卡部分
function handleJiadianProduct(){
	//1.获取元素
	var aTopItem = document.querySelectorAll('.main .jiadian .top-item');
	var aRightimg2 = document.querySelector('.main .jiadian .rightimg2');
	// console.log(aTopItem);
	console.log(aRightimg2);
	//初始化加载
	loadData(0);
	// 2.添加事件
	for(var i =0; i< aTopItem.length; i++){
		aTopItem[i].index = i;
		aTopItem[i].onmouseenter = function(){
			//2-1.清除所有
			for(var j =0; j< aTopItem.length; j++){
				aTopItem[j].className = 'top-item';
			}
			this.className = 'top-item top-item-active';
			//2-2.加载数据
			loadData(this.index);
		}
	}
	function loadData(index){
		// console.log(index);
		var data = aTopItemData[index];
		// console.log(data);
		var html = '';
		//根据数据创建html
		html += '<ul>';
		for(var i =0; i<data.length-1; i++){
			html += '<li>';
			html +=    '<a href="'+data[i].url+'">';
			html +=		  '<img src="'+data[i].img+'" alt="">';
			html +=    '</a>';
			html +=	   '<p>'+data[i].name+'</p>';
			html +=	   '<p>'+data[i].desc+'</p>';
			html +=	   '<p>'+data[i].price+'元</p>';
			html +=    '<del>4699元</del>';
			html +=	   '<span>'+data[i].flag+'元</span>';
			if(data[i].box){
				html +=	   '<div class="box">'  ;
				html +=        '<p>'+data[i].box.recontent+'</p>';
				html +=        '<p>'+data[i].box.author+'</p>';
				html +=    '</div>'
			}
            html += '</li>';
		}
		html += '</ul>';
        var lastData = data[data.length-1];
        // console.log(lastData);
        html += '<li>'
		html +=	   '<a href="'+lastData.top.url+'">'
		html +=	       '<div class="div1">'
		html +=	           '<p>'+lastData.top.name+'</p>'
		html +=	           '<span>'+lastData.top.price+'</span>'
		html +=	           '<img src="'+lastData.top.img+'" alt="">'
		html +=	       '</div>'
		html +=	   '</a>'
		html +=	   '<a href="'+lastData.bottom.url+'">'
		html +=	        '<div class="div2">'
		html +=	            '<p>'+lastData.bottom.txt+'</p>'
		html +=	            '<span>'+lastData.bottom.tag+'</span>'
		html +=	            '<img src="'+lastData.bottom.img+'" alt="">'
		html +=	        '</div>'
		html +=     '</a>'
		html +=	'</li>'
		aRightimg2.innerHTML = html;
	}
}