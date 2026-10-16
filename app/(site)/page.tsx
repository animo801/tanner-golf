import About from '@/components/home/About'
import Faq from '@/components/home/Faq'
import Hero from '@/components/Hero'
import Testimonials from '@/components/home/Testimonials'
import HomeIntro from '@/components/intro/HomeIntro'
import RevealOnScroll from '@/components/intro/RevealOnScroll'
import { home } from '@/content/home'

export default function HomePage() {
  return (
    <HomeIntro>
      <main className="overflow-x-clip px-3 md:px-4">
        <Hero heading={home.hero.heading} image={home.hero.image} short intro />
        <RevealOnScroll>
          <div>
            <About {...home.about} />
            <Faq {...home.faq} />
            <Testimonials {...home.testimonials} />
          </div>
        </RevealOnScroll>
      </main>
    </HomeIntro>
  )
}
