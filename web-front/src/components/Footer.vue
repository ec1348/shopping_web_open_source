<template>
    <footer class="page-footer">
        <div class="page-footer-container">
        <div class="sub-footer-container footer-up">
            <div class="footer-up-subscription footer-up-box">
            <p class="text-subscription">NEWSLETTER SUBSCRITION: LET'S STAY IN TOUCH!</p>
            <div class="input-block">
                <input type="email" class="email-box" placeholder="SUBSCRIPTION EMAIL">
                <button class="sub-button">Subscribe</button>
            </div>
            <div class="social-media">
                <p class="text-social-media">DISCOVER ERIC PASTRY TAIPEI ON</p>
                <div class="icon-social-media-block">
                <a href="https://www.facebook.com" target="_blank" class="footer-link facebook"> <!--inline-->
                <svg-icon iconClass="facebook" className="facebook-icon" /> <!--inline-->
                </a>
                <a href="https://www.instagram.com" target="_blank" class="footer-link instagram"> <!--inline-->
                    <svg-icon iconClass="instagram" className="instagram-icon" /> <!--inline-->
                </a>
                <a href="https://www.twitter.com" target="_blank" class="footer-link twitter"> <!--inline-->
                    <svg-icon iconClass="twitter" className="twitter-icon" /> <!--inline-->
                </a>
                </div>
                
            </div>
            </div>
            <div class="footer-up-contact footer-up-box">
            <div class="customer-contact-box">
                <svg-icon iconClass="phone" className="phone-icon" /> <!--inline-->
                <p class="customer-contact-text contact-text">CUSTOMER SERVICE</p>
                <p class="customer-contact-text ">Phone: +886 9 70834201</p>
                <p class="customer-contact-text bus-hour-contact-text">Monday to Sunday</p>
                <p class="customer-contact-text bus-hour-contact-text">from 10AM to 6PM</p>
            </div>
            <div class="order-contact-box">
                <svg-icon iconClass="phone" className="phone-icon" /> <!--inline-->
                <p class="order-contact-text contact-text">PLACE YOUR ORDER</p>
                <p class="order-contact-text">Phone: +886 9 70834201</p>
                <p class="order-contact-text bus-hour-contact-text">Monday to Sunday</p>
                <p class="order-contact-text bus-hour-contact-text">from 10AM to 6PM</p>
            </div>
            </div>
        </div>
        <div class="sub-footer-container footer-down">
            <div class="footer-down-container">
            <div class="find-us footer-down-container-item">
                <div class="footer-down-container-item-text">FIND US</div>
                <div class="footer-down-container-item-content">
                    <a href="/about" class="find-us-about">About</a>
                    <a href="/our-shops" class="find-us-our-shops">Our Shops</a>
                    <a href="/contact" class="find-us-contact">Contact</a>
                </div>
            </div>
            <div class="know-more footer-down-container-item">
                <div class="footer-down-container-item-text">More</div>
                <div class="footer-down-container-item-content">
                    <a href="/collection" class="know-more-special">Special Collection</a>
                    <a href="/our-family" class="know-more-our-family">Our Family</a>
                    <a href="/customer-service" class="know-more-customer-help">Need help?</a>
                </div>
            </div>
            <div class="terms-conditions footer-down-container-item">
                <div class="footer-down-container-item-text">TERMS &amp; CONDITIONS</div>
                <div class="footer-down-container-item-content">
                    <a href="/terms-of-delivery" class="terms-conditions-delivery">Our terms of delivery</a>
                    <a href="/terms-of-sale" class="terms-conditions-sale">Terms of sale</a>
                    <a href="/terms-of-cookie" class="terms-conditions-cookie">Cookies</a>
                    <a href="/terms-of-privacy" class="terms-conditions-privacy">Privacy policy</a>
                </div>
            </div>
            <div class="copyright footer-down-container-item">
                <svg-icon iconClass="logo" className="logo-icon" />
                <div>&copy;Copyright Eric Pastry 2022</div>
            </div>
            </div>
        </div>

        </div>
    </footer>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scope>
.instagram-icon,
.facebook-icon,
.twitter-icon{
    color: #000;
    :hover{
        color:#7a0404
    }
}

.logo-icon{
    width: 50% !important;
}

</style>