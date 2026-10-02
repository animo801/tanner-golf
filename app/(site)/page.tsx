import About from '@/components/home/About'
import Faq from '@/components/home/Faq'
import Hero from '@/components/Hero'
import Testimonials from '@/components/home/Testimonials'
import HomeIntro from '@/components/intro/HomeIntro'
import RevealOnScroll from '@/components/intro/RevealOnScroll'
import { sanityFetch } from '@/sanity/lib/live'
import { homePageQuery } from '@/sanity/lib/queries'

export default async function HomePage() {
  const { data } = await sanityFetch({ query: homePageQuery })

  return (
    <HomeIntro>
      <main className="overflow-x-clip px-3 md:px-4">
        <Hero heading={data?.hero?.heading} image={data?.hero?.image} short intro />
        <RevealOnScroll>
          <div>
            <About heading={data?.about?.heading} body={data?.about?.body} images={data?.about?.images} />
            <Faq heading={data?.faq?.heading} items={data?.faq?.items} />
            <Testimonials heading={data?.testimonials?.heading} items={data?.testimonials?.items} />
          </div>
        </RevealOnScroll>
      </main>
    </HomeIntro>
  )
}
