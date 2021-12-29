<template>
  <div class="page-home">
    <div class="pic-slider-container" >
      <img :src="banner_image" class="image-slider"/>
    </div>
    <div class="package-offer-slider">
      <div class="package-offer-slider-container">
        <h1 class="package-offer-text">ERIC PASTRY SPECIAL Gift package</h1>
        <div class="package-offer-slider-image">
          <img :src = "gift_package.url" class="package-slider"/>
          <div class="flex-container">
            <div class="package-offer-title">{{gift_package.name}}</div>
            <div class="package-offer-description">{{gift_package.description}}</div>
            <div class="package-offer-price">NTD{{gift_package.price}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="philosophy">
      <section>
        <h1>OUR PHILOSOPHY</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint autem vel eos cumque praesentium sunt reprehenderit odit odio aperiam eligendi neque impedit libero nisi labore nobis, adipisci totam perspiciatis consectetur ipsam esse. Itaque molestiae eos culpa saepe quod ipsa asperiores, maiores accusamus, impedit officiis ab laudantium recusandae distinctio blanditiis facere!</p>
      </section>
    </div>
    <div class="branch">
      <h2>OUR SHOPS</h2>
      <div class="branch-container">
        <section>
          <div class="branch-pic"></div>
          <div>
            <h3 class="branch-txt">Taipei</h3>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid dolorem accusamus, minima non sequi alias laudantium? Nemo animi odit eius.</p>
          </div>
        </section>
        <section>
          <div class="branch-pic"></div>
          <div>
            <h3 class="branch-txt">Taichung</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates aperiam explicabo consequatur adipisci similique dolor doloribus vel! Maiores, sed culpa.</p>
          </div>
        </section>
        <section>
          <div class="branch-pic"></div>
          <div>
            <h3 class="branch-txt">Tainan</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur porro iste sapiente quaerat itaque odit at ratione quasi odio ut?</p>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
// fake data
const banner_images = [
  "https://storage.googleapis.com/web-piture/home/banner/bread-banner-slide-desktop.jpg",
  "https://storage.googleapis.com/web-piture/home/banner/cake-banner-slide-desktop.jpg",
  "https://storage.googleapis.com/web-piture/home/banner/cookie-banner-slide-desktop.jpg",
  "https://storage.googleapis.com/web-piture/home/banner/dessert-banner-slide-desktop.jpg"
]
const gift_packages = [
  {
    name:"chocolate package 1",
    url:"https://storage.googleapis.com/web-piture/home/gift-package/chocolate-package-square.jpg",
    price: 79.00,
    description:"The chocolate is handmade, organic and great selected which will bring you the best for the new year."
  },
  {
    name:"cookie package",
    url: "https://storage.googleapis.com/web-piture/home/gift-package/cookie-package-square.jpg",
    price: 49.00,
    description: "Homemade oatmel is special healthy for the gift."
  },
  {
    name:"dessert package",
    url: "https://storage.googleapis.com/web-piture/home/gift-package/dessert-package-sqare.jpg",
    price: 79.00,
    description: "Royally luxury is the best choice for the party with friends and family."
  }
]
export default {
  name: "Home",
  data() {
    return{
      indexBanner: 0,
      indexGift: 0,
      banner_image: banner_images[0],
      gift_package: gift_packages[0]
    }
  },
  methods: {
    next_banner() {
      this.indexBanner = (this.indexBanner + 1) % banner_images.length
      this.banner_image = banner_images[this.indexBanner]
    },
    next_gift() {
      this.indexGift = (this.indexGift + 1) % gift_packages.length
      this.gift_package = gift_packages[this.indexGift]
    },
    autoChangeSlide(){
      setInterval( () => {
        this.next_banner()
      }, 9000)
      setInterval( ()=> {
        this.next_gift()
      }, 7000)
    }
  },
  // beforeMount(){
  //   this.autoChangeSlide()
  // }
};
</script>
