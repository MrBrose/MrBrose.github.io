<script setup>
  import SiteCarousel from "../components/SiteCarousel.vue"
</script>

<template>
  <main vert>
    <div horz>
      <a component="panel-link" href="/official-logos">
        <h2>Official Logos</h2>
        <p>Find and download all the official Minecraft Logos</p>
      </a>
      <a component="panel-link" href="/download-fonts">
        <h2>Fonts</h2>
        <p>Discover and download 40+ Minecraft Style fonts for your logos</p>
      </a>
      <a component="panel-link" href="https://grid-calculator.theannoying.dev/" target="_blank">
        <h2>Grid Calculator</h2>
        <p>Calculate grid sizes for Adobe Illustrator Minecraft logos.</p>
      </a>
    </div>
    <div class="about-us">
      <h2>Meet the Community</h2>
      <SiteCarousel>
        <li img-src="/images/heads/MrBrose.png">
          <div class="about-me">
            <h2>MrBrose</h2>
            <p>Hi there! I'm MrBrose and I am a graphic designer who creates Minecraft related things. You might know me for my Minecraft Style Logos, which you can see in my <a href="/portfolio" target="_blank">portfolio</a>, and you can purchase one too, just click here for <a href="/commissions" target="_blank">commissions.</a> <br> I also help other people learn how to make their very own Minecraft Style logos themselves! Using resources from this website you too can become a Minecraft Logo expert.</p>
            <div class="fake-img" style="--src:url('/images/MrBrose.webp');"></div>
          </div>
        </li>
        <li img-src="/images/heads/Annoying.png">
          <div class="about-me">
            <h2>TheAnnoying</h2>
            <p>Hey, I'm TheAnnoying! I always wanted to create Minecraft titles, but never knew there was a community for it. After I came across the Minecraft Titles Discord server, I realized there are others like me, who find these titles really awesome. I started using Mine-imator and Photoshop for my logos, but then moved to Adobe Illustrator. I'm very happy with how my logos look, and I'm glad there are many guides on the server to help out!</p>
            <div class="fake-img" style="--src:url('/images/TheAnnoying.webp');"></div>
          </div>
        </li>
        <li img-src="/images/heads/Ewan.png">
          <div class="about-me">
            <h2>Ewan Howell</h2>
            <p>Hi my name is Ewan Howell. I am a resource pack and Blockbench plugin developer. I created the Minecraft Title Generator Blockbench plugin so I could quickly and easily generate high quality title logos for any of my projects, and released it so that others could do the same! You can view my other projects on my website <a href="https://ewanhowell.com/" target="_blank">ewanhowell.com</a></p>
            <div class="background-img" style="background-image: linear-gradient(90deg, var(--colour-bg-object) 40%, transparent 75%), url('/images/Ewan.webp');"></div>
          </div>
        </li>
        <li img-src="/images/heads/RJ.png">
          <div class="about-me">
            <h2>RJ_Infinity</h2>
            <p>Hello. I am the guy who created almost all the website that you see in front of you. including much time spent creating the excellent particles in the background (if you want to see how cool they can be look at the 404 page). I also make other programs and the odd other thing. you can find most of my work at <a href="http://github.com/RJ-Infinity/" target="_blank">github.com/RJ-Infinity/</a><a href="/particles">.</a></p>
            <div class="fake-img" style="--src:url('/images/RJ.webp');"></div>
          </div>
        </li>
        <li img-src="/images/heads/patred.png">
          <div class="about-me">
            <h2>Patred</h2>
            <p>Hello! I am the person who created a lot of the fonts that most people use for their Minecraft logos and designs, including MC Ten Drip, Serif, Dungeons, and others. These fonts were all created in FontStruct, you can check out my profile <a href="https://fontstruct.com/fontstructors/2161953/patred" target="_blank">here</a> and get them or download them <a href="/download-fonts/patred" target="_blank">here</a> at MCTitles to make your logo typography cooler. No need for credit.</p>
            <div class="fake-img" style="--src:url('/images/patred.png');"></div>
          </div>
        </li>
        <li img-src="/images/heads/TitusHM.png">
          <div class="about-me">
            <h2>TitusHM</h2>
            <p>I do the website development sometimes along with the cloudflare side of things. You can see more of what I do on my <a href="https://github.com/titushm" target="_blank">github</a></p>
          </div>
        </li>
        <li img-src="/images/heads/Floiden.png">
          <div class="about-me">
            <h2>FloideN</h2>
            <p>Hey, my name is FloideN, I am a graphic designer, I love to create something unique, beautiful and professional. I am always looking for something new and when I start doing something I try to make it perfect! And I also love to create Minecraft related content, logos, key art, unique fonts inspired by official fonts (you can find them in the "fonts" tab) and much more!							</p>
            <div class="fake-img" style="--src:url('/images/FloideN.webp');"></div>
          </div>
        </li>
        <li img-src="/images/heads/discord.png">
          <div class="about-me">
            <h2>Join the community!</h2>
            <p>Join the Minecraft Titles Discord to become part of the community, you can receive help, show off your creations, learn even more tricks and tips or just hang out!<br>You can join using the link here: <a href="https://mctitles.com/discord" target="_blank">mctitles.com/discord</a></p>
            <div class="background-img" style="background-image: url('/images/discord.webp');"></div>
          </div>
        </li>
      </SiteCarousel>
      <div component="title">
        MAKING YOUR OWN LOGO
      </div>
    </div>
    <a component="panel-link-long" href="making-a-logo/illustrator">
      <img src="/images/adobe-illustrator.svg" alt="illustrator logo">
      <h2>illustrator</h2>
      <p>The more powerful but also an expensive method, the official logos were made in a similar way to this.<br><em>(This method is more complex than the blockbench method)</em></p>
    </a>
    <a component="panel-link-long" href="making-a-logo/blockbench">
      <img src="/images/blockbench_logo_white.svg" alt="blockbench logo">
      <h2>BlockBench</h2>
      <p>Not as powerful as the Illustrator method, however it is free and really quick and easy to use <br><em>(I highly recommend using this method rather than mine-imator)</em></p>
    </a>
    <a component="panel-link-long" href="making-a-logo/photoshop">
      <img src="/images/ps.svg" alt="photoshop logo">
      <h2>Photoshop</h2>
      <p>Not as powerful as the Illustrator method, however it is still powerful<br><em>(I recommend using the Illustrator method rather than this method if possible)</em></p>
    </a>
  </main>
  <main component="small-text">
    <p>Do you want to support the website and get a Minecraft logo out of it?<br><a href="https://www.fiverr.com/mrbrose_/create-you-a-custom-minecraft-title" target="_blank">Just click here</a> to purchase a Minecraft Logo and help keep this website running.</p>
  </main>
  <span class="bottom-img"></span>
</template>
