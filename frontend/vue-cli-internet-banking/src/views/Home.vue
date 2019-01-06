<template>
  <div class="home">
    <header class="masthead text-center text-white d-flex">
      <div class="container my-auto">
        <div class="row">
          <div class="col-lg-10 mx-auto">
            <h1 class="text-uppercase">
              <strong>Best Online Banking System In The World</strong>
            </h1>
            <hr>
          </div>
          <div class="col-lg-8 mx-auto">
            <p class="text-faded mb-5">JOIN WITH US NOW </p>
          </div>
        </div>
      </div>
    </header>
    <section id="services">
      <div class="container">
        <div class="row">
          <div class="col-lg-12 text-center">
            <h2 class="section-heading">At Your Service</h2>
            <hr class="my-4">
          </div>
        </div>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-lg-3 col-md-6 text-center">
            <div class="service-box mt-5 mx-auto">
              <i class="fas fa-4x fa-shield-alt text-primary mb-3 sr-icon-1"></i>
              <h3 class="mb-3">Security</h3>
              <p class="text-muted mb-0">Lorem ipsum dolor, sit amet consectetur adipisicing elit. At ullam amet deleniti.</p>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 text-center">
            <div class="service-box mt-5 mx-auto">
              <i class="fas fa-4x fa-clock text-success mb-3 sr-icon-2"></i>
              <h3 class="mb-3">Save Your Time</h3>
              <p class="text-muted mb-0">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, perspiciatis.</p>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 text-center">
            <div class="service-box mt-5 mx-auto">
              <i class="fas fa-4x fa-coins text-warning mb-3 sr-icon-3"></i>
              <h3 class="mb-3">Keep Your Money</h3>
              <p class="text-muted mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio dolore molestiae fugit.</p>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 text-center">
            <div class="service-box mt-5 mx-auto">
              <i class="fas fa-4x fa-heart text-danger mb-3 sr-icon-4"></i>
              <h3 class="mb-3">Made with Love</h3>
              <p class="text-muted mb-0">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Amet quis voluptatem facilis.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
     <section class="bg-light" id="team">
      <div class="container">
        <div class="row">
          <div class="col-lg-12 text-center">
            <h2 class="section-heading text-uppercase">Our Amazing Team</h2>
            <h3 class="section-subheading text-muted">Lorem ipsum dolor sit amet consectetur.</h3>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-6">
            <div class="team-member">
              <img class="mx-auto rounded-circle" src="../assets/quyquang.jpg" alt="">
              <h4>Nguyễn Phước Quý Quang</h4>
              <p class="text-muted">Back-end Developer</p>
              <ul class="list-inline social-buttons">
                <li class="list-inline-item">
                  <a href="#">
                    <i class="fab fa-twitter"></i>
                  </a>
                </li>
                <li class="list-inline-item">
                  <a href="#">
                    <i class="fab fa-facebook-f"></i>
                  </a>
                </li>
                <li class="list-inline-item">
                  <a href="#">
                    <i class="fab fa-linkedin-in"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="team-member">
              <img class="mx-auto rounded-circle" src="../assets/badong.jpg" alt="">
              <h4>Cao Bá Đông</h4>
              <p class="text-muted">Front-end Developer</p>
              <ul class="list-inline social-buttons">
                <li class="list-inline-item">
                  <a href="#">
                    <i class="fab fa-twitter"></i>
                  </a>
                </li>
                <li class="list-inline-item">
                  <a href="#">
                    <i class="fab fa-facebook-f"></i>
                  </a>
                </li>
                <li class="list-inline-item">
                  <a href="#">
                    <i class="fab fa-linkedin-in"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-8 mx-auto text-center">
            <p class="large text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut eaque, laboriosam veritatis, quos non quis ad perspiciatis, totam corporis ea, alias ut unde.</p>
          </div>
        </div>
      </div>
    </section>
    <section id="contact">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 mx-auto text-center">
            <h2 class="section-heading">Let's Get In Touch!</h2>
            <hr class="my-4">
            <p class="mb-5">Yesterday is a history. Tomorrow is a mystery. Today is a gift. That's why we call it the present</p>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-4 ml-auto text-center">
            <i class="fas fa-phone fa-3x mb-3 sr-contact-1"></i>
            <p>123-456-6789</p>
          </div>
          <div class="col-lg-4 mr-auto text-center">
            <i class="fas fa-envelope fa-3x mb-3 sr-contact-2"></i>
            <p>
              <a href="mailto:your-email@your-domain.com">caobadong19@gamil.com</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      url: 'Welcome to the International'
    }
  }
}
</script>
<style>
.home{
    text-align: center
}
body,html {
    width: 100%;
    height: 100%;
}

body {
    font-family: 'Merriweather', sans-serif !important;
}

section {
  padding: 8rem 0;
}

.section-heading {
  margin-top: 0;
}

strong{
    color: orange;
}
header.masthead {
    padding-top: 10rem;
    padding-bottom: calc(10rem - 56px);
    background-image: url("../assets/header1.jpg");
    background-position: center center;
    background-size: cover;
}

header.masthead hr {
    margin-top: 30px;
    margin-bottom: 30px;
}

header.masthead h1 {
    font-size: 2rem;
}

header.masthead p {
    font-weight: 300;
}

@media (min-width: 768px) {
    header.masthead p {
        font-size: 1.15rem;
    }
}

@media (min-width: 992px) {
    header.masthead {
        height: 100vh;
        min-height: 650px;
        padding-top: 0;
        padding-bottom: 0;
    }
    header.masthead h1 {
        font-size: 3rem;
    }
}

@media (min-width: 1200px) {
    header.masthead h1 {
        font-size: 4rem;
    }
}
.service-box {
  max-width: 400px;
}

.team-member {
  margin-bottom: 50px;
  text-align: center;
}

.team-member img {
  width: 225px;
  height: 225px;
  border: 7px solid #fff;
}

.team-member h4 {
  margin-top: 25px;
  margin-bottom: 0;
  text-transform: none;
}

.team-member p {
  margin-top: 0;
}

</style>
