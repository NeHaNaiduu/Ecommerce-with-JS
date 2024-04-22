let cartIcon=document.querySelector('#cart-icon');
        let cart=document.querySelector('.cart');
        let closeCart=document.querySelector('#close-cart');

        cartIcon.addEventListener('click',()=>{
            cart.classList.add("active");
        });
        
        closeCart.addEventListener('click',()=>{
            cart.classList.remove("active");
        });

        if(document.readyState=='loading'){
            document.addEventListener('DOMContentLoaded',ready);
        }else{
            ready();
        }

        function ready(){
            let removeCartButton=document.getElementsByClassName('cart-remove');
            console.log(removeCartButton);
            for(let i=0;i<removeCartButton.length;i++){
                let button=removeCartButton[i];
                button.addEventListener('click',removeCartItem);
            }
            let quantityInputs=document.getElementsByClassName('cart-quantity');
            for(let i=0;i<quantityInputs.length;i++){
                 let input=quantityInputs[i];
                 input.addEventListener('change',quantityChanged);
            }
            let addCart=document.getElementsByClassName('add-cart');
            for(let i=0;i<addCart.length;i++){
                let button=addCart[i];
                button.addEventListener('click',addCartClicked);
            }
            document.getElementsByClassName('buy')[0].addEventListener('click',buyButtonClicked);
        }

        function buyButtonClicked(){
            alert('Your order is placed');
            let cartContent=document.getElementsByClassName('cart-container')[0]
            while(cartContent.hasChildNodes()){
                cartContent.removeChild(cartContent.firstChild);
            }
            updateTotal();
        }

        function removeCartItem(e){
            let buttonClicked=e.target;
            buttonClicked.parentElement.remove();
            updateTotal();
        }

        function quantityChanged(e){
            let input=e.target;
            if(isNaN(input.value) || input.value <=0){
                input.value=1;
            }
            updateTotal();
        }

        function addCartClicked(e){
            var button=e.target;
            var shopProducts=button.parentElement;
            var title=shopProducts.getElementsByClassName('product-title')[0].innerText;
            var price=shopProducts.getElementsByClassName('price')[0].innerText;
            var productImg=shopProducts.getElementsByClassName('product-img')[0].src;
            addProductToCart(title,price,productImg);
            updateTotal();
        }

        function addProductToCart(title,price,productImg){
            var cartShopBox=document.createElement('div');
            cartShopBox.classList.add('cart-box');
            var cartItems=document.getElementsByClassName('cart-container')[0];
            var cartItemsNames=cartItems.getElementsByClassName('cart-product-title');
            for(let i=0;i<cartItemsNames.length;i++){
                if(cartItemsNames[i].innerText==title){
                    alert('You have already added this item');
                    return;
                }
            }

            var cartBoxContent=`
                        <img src="${productImg}" alt="" class="cart-img">
                        <div class="detail-box">
                            <div class="cart-product-title">${title}</div>
                            <div class="cart-price">${price}</div>
                            <input type="number" value="1" class="cart-quantity">
                        </div>
                        <i class="fa fa-trash cart-remove"></i>`;
            cartShopBox.innerHTML=cartBoxContent;
            cartItems.append(cartShopBox);
            cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click',removeCartItem);
            cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change',quantityChanged);
        }

        function updateTotal(){
            let cartContent=document.getElementsByClassName('cart-container')[0];
            let cartBoxes=cartContent.getElementsByClassName('cart-box');
            let total=0;
            for(let i=0; i<cartBoxes.length; i++){
                let cartBox=cartBoxes[i];
                let priceElement=cartBox.getElementsByClassName('cart-price')[0];
                console.log(priceElement);
                let quantityElement=cartBox.getElementsByClassName('cart-quantity')[0];
                let price=parseFloat(priceElement.innerText.replace("$",""));
                let quantity=quantityElement.value;
                total=total+price*quantity;
            }
                total=Math.round(total*100)/100;

                document.getElementsByClassName('total-price')[0].innerText="$"+total;
        }