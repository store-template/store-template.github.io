;

document.body.onload = function(){
    var preloader = document.getElementById('preloader');
    if(!preloader.classList.contains('preloader_done')){
      preloader.classList.add('preloader_done');
    }
};

svg4everybody();
(function() {
  var str = document.querySelectorAll(".letter-animations");
  [].forEach.call(str, function(item){
    var arr = item.innerHTML.split('');
    item.innerHTML = '';
    arr.forEach(function(letter, i){
      item.innerHTML += '<span class="letter-animations__item" style="transition-delay: ' + i*.05 + 's">' + letter + '</span>'
    })
  })
}());

function animateLetters(){
  var str = document.querySelectorAll('.letter-animations');
  [].forEach.call(str, function(item){
    var animated = item.classList.contains('letter-animations_show')
    var visible = detectInViewBox(item);
    if(visible && !animated){
      item.classList.add('letter-animations_show')
    }
  })
}

window.addEventListener('scroll', animateLetters);
window.addEventListener('load', animateLetters);


function animateHeader() {
	var topPannel = document.getElementById('advice');
	var pageHeader = document.getElementById('page-header');
	if(topPannel.offsetHeight<window.pageYOffset) {
		pageHeader.classList.add('header_scrolled')
	}

	if(window.pageYOffset == 0) {
			pageHeader.classList.remove('header_scrolled')
	}

};
window.addEventListener('scroll', animateHeader);
window.addEventListener('load', animateHeader);


$('.banner__slider').slick({
  dots: true,
  autoplay: true,
  infinite: true,
  autoplaySpeed: 4000,
  fade: true,
  cssEase: 'linear'
});



//DETECT ELEMENT IN VIEWPORT
function detectInViewBox(elem){
  var elem = elem;
  var elementTop = $(elem).offset().top;
  var elementBottom = elementTop + $(elem).outerHeight();
  var viewportTop = $(window).scrollTop();
  var viewportBottom = viewportTop + $(window).height();
  return (elementBottom > viewportTop && elementTop < viewportBottom)
}

function animateProducts(){
var elem = document.getElementById("products");
var animated = $(elem).hasClass("products_animate")
var isInViewBox = detectInViewBox(elem);
if(isInViewBox && !animated){
	$(elem).addClass("products_animate");
	$.each($('.product__pic'), function () {
			$(this).addClass("product__pic_animate");
	});
}
};
window.addEventListener('scroll', animateProducts);
window.addEventListener('load', animateProducts);


function animateForm(){
var elem = document.getElementById("subscribe-form");
var animated = $(elem).hasClass("subscribe-form_show")
var isInViewBox = detectInViewBox(elem);
if(isInViewBox && !animated){
	$(elem).addClass("subscribe-form_show");
}
};
window.addEventListener('scroll', animateForm);
window.addEventListener('load', animateForm);


function animateVideo(){
var elem = document.getElementById("video-file-box");
var text = document.getElementById("video-text-box");
var animated = $(elem).hasClass("video__file-box_animate")
var isInViewBox = detectInViewBox(elem);
if(isInViewBox && !animated){
	$(elem).addClass("video__file-box_animate");
	$(text).addClass("video__text-box_animate");
}
};

window.addEventListener('scroll', animateVideo);
window.addEventListener('load', animateVideo);

(function() {
var navBtn = document.getElementById('toggle-navigation-btn');
var pageHeader = document.getElementById('page-header');
var headerLogo = document.getElementById('headerLogo');
var mainNav = document.getElementById('mainNav')
navBtn.onclick = function() {
	pageHeader.classList.add('header_scrolled');
	navBtn.classList.toggle('toggle-navigation-btn_closed');
	headerLogo.classList.toggle('logo_color-inverse');
	mainNav.classList.toggle('nav__list_open')
}
}());


(function() {
	var show = document.getElementById('shopping-cart-icon');
	var close = document.getElementById('cart-close-btn');
	var pageHeader = document.getElementById('page-header');
  var cartDetails = document.getElementById('cart-details');
	show.onclick = function() {
		pageHeader.classList.add('header_scrolled');
		this.classList.add('header__shopping-cart_translation')
		cartDetails.classList.remove('cart_hidden')
		cartDetails.classList.add('cart_show')
	}
	close.onclick = function() {
		cartDetails.classList.add('cart_hidden');
		cartDetails.classList.remove('cart_show');
		show.classList.remove('header__shopping-cart_translation');
		animateHeader();
	}
}());

(function(){
  var productsContainer = document.getElementById('products');
  productsContainer.onclick = function(e){
    var target = e.target;
    while(target != productsContainer){
      if(target.classList.contains('product__btn')){
        return;
      }
      if(target.classList.contains('products__item')){
        setProduct(productsContainer, target);
        return;
      }
      target = target.parentNode;
    }
  }
}());


function setProduct(productsContainer, target){
  var pic = target.querySelector('.product__pic'),
  name = target.querySelector('.product__name-text'),
  price = target.querySelector('.product__price'),
  id = target.querySelector('.product__btn').getAttribute('data-item');
  productsContainer.classList.add('products_show-details');
  var item = productsContainer.querySelector('.product-details');
  setTimeout(function(){
    item.classList.add('product-details_visible');
  }, 100);
  var detailsImg = document.getElementById('product-main-img');
  detailsImg.style.backgroundImage = pic.style.backgroundImage;
  var detailsName = document.getElementById('product-name');
  detailsName.innerHTML = name.innerHTML;
  var detailsPrice = document.getElementById('product-price');
  detailsPrice.innerHTML = price.innerHTML;
  var detailsBtn = document.getElementById('add-to-cart-btn');
  detailsBtn.setAttribute('data-item', id);
};

(function(){
  document.onclick = function(e){
    var elemVisible = document.getElementById('product-details'),
        container = document.getElementById('products'),
        wraper = elemVisible.querySelector('.product-details');
if(getComputedStyle(elemVisible, null).display != 'none'){
  if(elemVisible == e.target){
      container.classList.remove('products_show-details');
      wraper.classList.remove('product-details_visible');
    }
}
  }
}());

/*
(function() {
var imgContainer = document.getElementById('product-prev-img');
var mainImg = document.getElementById('product-main-img');
imgContainer.onclick = function(e) {
	var target = e.target;
	mainImg.style.backgroundImage = target.style.backgroundImage;
}
}());
*/


(function() {
  var products = document.querySelectorAll('.product__link');
  [].forEach.call(products, function(item) {
    item.onclick = function() {
    localStorage.setItem('id', item.getAttribute('data-item'));
    }
  })
}());



(function() {
  var addToCartBtn = document.querySelectorAll('.product__btn');
  [].forEach.call(addToCartBtn, function(item) {
    item.onclick = function() {
      var productsToCart = JSON.parse(localStorage.getItem('productsToCart')) || [];
      productsToCart.push(item.getAttribute('data-item'))
      localStorage.setItem('productsToCart', JSON.stringify(productsToCart))
      refreshCartCounter();
    }
  })
}());


//CART
function refreshCartCounter(data) {
  var cartCounter =  document.getElementById('shopping-cart__counter');
  var productsToCart = JSON.parse(localStorage.getItem('productsToCart')) || 0;
  cartCounter.innerHTML = productsToCart.length || 0;
}
window.addEventListener('load', refreshCartCounter);


function addProductToCart() {
  var getProductsFromBase = new Promise(function(resolve, reject) {
      var xml = new XMLHttpRequest();
      xml.open('GET', '../products.json', true);
      xml.onload = function(){
        if(xml.status == 200){
          resolve(this.response);
        } else {
          var error = new Error();
          reject(error)
        }
      };
      xml.onerror = function() {
        reject(new Error("Network Error"));
      };
      xml.send();
    });
    getProductsFromBase.then(function(result) {
        var productsFromBase = JSON.parse(result);
        var productsToCart = JSON.parse(localStorage.getItem('productsToCart'));
        var results = [];
        if(!productsToCart) {
          throw new Error('No products in LocalStorage')
        } else {
          for(var i=0; i<productsToCart.length; i++){
            for(var j=0; j<productsFromBase.length; j++){
              if(productsToCart[i] == productsFromBase[j].id){
                results.push(productsFromBase[j]);
              }
            }
          }
        }
        return results;
      }
    )
    .then(function(result) {
      var countNumberOfItems = {};
      result.forEach(function(item) {
        if(countNumberOfItems[item.name]){
          countNumberOfItems[item.name].count++
          return false;
        } else {
          countNumberOfItems[item.name] = item;
          countNumberOfItems[item.name].count = 1;
        }
      })
      var resultArr = [];
      for(key in countNumberOfItems) {
        resultArr.push(countNumberOfItems[key])
      }
      return resultArr;
    })
    .then(function(result) {
      var cart = document.getElementById('cart-prod');
      cart.innerHTML = '';
      var subtotalPanel = document.getElementById('cart-sum-line');
      var subtotalElem = document.getElementById('cart-subtotal-data');
      var subtotal = 0;
      var subtotalPanDelay = .3*result.length;
      subtotalPanel.style.opacity = '0';
      //subtotalPanel.style.transitionDelay = subtotalPanDelay + 's';
      //subtotalPanel.style.visibility = 'hidden';
      result.forEach(function(item, index) {
        var line = document.createElement('div');
        line.classList.add('cart__prod-line');
        line.id = 'product-' + item.id;
        line.style.transitionDelay = .3*(index+1) + .3 + 's';
        //subtotalPanDelay += line.style.transitionDelay;
        //line.style.cssText = "transition-duration: .5s; transition-delay: " + .5*(index+1) + "s; transform-origin: right; transform: translateX(0); transition-timing-function: cubic-bezier(.165,.84,.44,1)";
        line.innerHTML = "<div class='cart__counter counter'><button class='counter__btn counter__btn_plus' type='button'><span class='hidden-text'>Plus one</span></button><span class='counter__data'>" + item.count + "</span><button class='counter__btn counter__btn_minus' type='button'><span class='hidden-text'>Minus one</span></button></div><div class='cart__prod-price'>$" + item.price + "</div><img class='cart__prod-pic' src='static/img/content/products/" + item.name.toLowerCase() + "/" + item.name.toLowerCase() + "-prev.jpg' alt='prod'><span class='cart__prod-name'>" + item.name + "</span><button class='cart__remove-btn' onclick='removeFromCart("+ item.id + ")' type='button'><span class='hidden-text'>Remove product from shopping cart</span></button>"
        cart.appendChild(line);
        //subtotal += +item.price;
        countSubtotal('add', +item.price)
      });
      setTimeout(function(){
        subtotalPanel.style.transitionDelay = subtotalPanDelay + 's';
        cart.classList.add('cart__prod-wrap_show');
      }, 500);
      //subtotalElem.innerHTML = '$' + subtotal;
      subtotalPanel.style.opacity = '1';
    })
    .catch(function(error) {
        document.getElementById('cart-prod').classList.add('cart__prod-wrap_show');
    })

}

var cartIcon = document.getElementById('shopping-cart-icon');
cartIcon.addEventListener('click', addProductToCart, false);

//COUNT SUBTOTAL
function countSubtotal(method, sum) {
  var subtotalElem = document.getElementById('cart-subtotal-data');
  var subtotal = +subtotalElem.innerHTML;
  switch(method){
    case 'add':
      subtotal += sum;
      subtotalElem.innerHTML = '' + subtotal;
      break
    case 'subtract':
      subtotal -= sum;
      subtotalElem.innerHTML = '' + subtotal;
      break}
  subtotalElem.innerHTML = subtotal;

}

//REMOVE PRODUCT FROM CART
function removeFromCart(id, price){
  var removingProd = document.getElementById('product-'+ id);
  //var removingProdPrice = removingProd.getElementsByClassName('cart__prod-price')[0].innerHTML
  //removingProd.remove();
  removingProd.parentNode.removeChild(removingProd);
  var productsToCart = JSON.parse(localStorage.getItem('productsToCart')) || [];
  var index = productsToCart.indexOf(id.toString());
  productsToCart.splice(index, 1);
  localStorage.setItem('productsToCart', JSON.stringify(productsToCart))
  refreshCartCounter();
  countSubtotal('subtract', price);
}
