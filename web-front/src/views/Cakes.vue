<template>
    <div class="product-page cake-page">
        <div v-for=" product in inventory.slice(0,10)" :key="product.id" class="product-card">
            <div class="product-img">
                <img :src= product.img_url alt="">
            </div>
            <div class="product-info">
                <h2 class="product-name">{{product.name}}</h2>
                <p class="product-short-description">{{product.remark}}</p>
                <h3 class="product-price">NTD.{{product.price}}</h3>
                <div class="product-delivery-info">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel dolorem excepturi cumque corporis architecto omnis natus quasi consequatur corrupti perferendis?</div>
                <div class="cart">
                    <button  @click="addToCart(product.name)">
                        ADD TO CART
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:"Cakes",
    props:{
        "inventory": Array,
        "cart": Object,
        "addToCart": Function
    },
    data() {
        return{
        }
    },
    methods:{
        
    }
}
</script>