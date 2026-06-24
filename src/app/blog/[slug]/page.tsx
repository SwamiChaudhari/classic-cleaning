import { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogPosts, getBlogBySlug } from "@/config/blog";
import { business } from "@/config/business";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StickyBottomBar from "@/components/StickyBottomBar";
import { Calendar, Clock, User, ArrowLeft, Share2, Tag } from "lucide-react";
import Link from "next/link";
import ShareButtons from "./ShareButtons";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return blogPosts.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post) return { title: "Blog Post Not Found" };
  return {
    title: `${post.title} | ${business.name}`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post) notFound();

  const relatedPosts = blogPosts
    .filter((b) => b.id !== post.id && b.category === post.category)
    .slice(0, 3);

  if (relatedPosts.length < 3) {
    const others = blogPosts
      .filter((b) => b.id !== post.id && b.category !== post.category)
      .slice(0, 3 - relatedPosts.length);
    relatedPosts.push(...others);
  }

  const shareUrl = `https://classiccleaning.in/blog/${post.slug}`;

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-navy via-navy-light to-navy py-12 lg:py-16 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-teal rounded-full blur-[100px]" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-white/60 hover:text-white text-sm mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="bg-teal text-white text-xs font-bold px-3 py-1 rounded-full">
              {post.category}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-[family-name:var(--font-poppins)] mb-4">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-white/60">
            <span className="flex items-center gap-1">
              <User className="w-3.5 h-3.5" />
              {post.author}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {post.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime} read
            </span>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-8 relative z-10">
        <div className="rounded-2xl overflow-hidden shadow-xl">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-[300px] lg:h-[450px] object-cover"
          />
        </div>
      </div>

      {/* Content */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            {post.excerpt}
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            Maintaining a clean and hygienic space is essential for both health and peace of mind. 
            In a bustling city like Pune, where dust and pollution are constant challenges, professional 
            cleaning services offer the perfect solution for busy families and businesses.
          </p>
          <h2 className="text-2xl font-bold text-navy mt-8 mb-4 font-[family-name:var(--font-poppins)]">
            Why Professional Cleaning Matters
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Professional cleaning goes beyond surface-level tidying. Our trained experts use 
            eco-friendly products and industrial-grade equipment to eliminate germs, allergens, 
            and stubborn stains that regular cleaning misses.
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Deep sanitization of high-touch surfaces</li>
            <li>Eco-friendly products safe for children and pets</li>
            <li>Background-verified, trained professionals</li>
            <li>Same-day service available across Pune</li>
          </ul>
          <h2 className="text-2xl font-bold text-navy mt-8 mb-4 font-[family-name:var(--font-poppins)]">
            Our Recommendation
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            For optimal results, we recommend scheduling a deep cleaning every 2-3 weeks, with 
            weekly maintenance cleaning in between. This keeps your space consistently clean 
            without the stress of last-minute preparation.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Ready to experience the Classic Cleaning difference? Contact us today for a free 
            customized quote tailored to your specific needs.
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2 mt-8 pt-6 border-t border-border">
          <Tag className="w-4 h-4 text-gray-400" />
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="bg-surface text-gray-600 text-xs px-3 py-1 rounded-full border border-border"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Share */}
        <div className="mt-6">
          <ShareButtons title={post.title} url={shareUrl} />
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="bg-surface py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-extrabold text-navy font-[family-name:var(--font-poppins)] mb-8">
              Related Articles
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((p) => (
                <Link
                  key={p.id}
                  href={`/blog/${p.slug}`}
                  className="bg-white rounded-2xl border border-border overflow-hidden shadow-card hover:shadow-card-hover transition-all group"
                >
                  <div className="aspect-[16/9] overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <span className="inline-block bg-teal-light text-teal text-[10px] font-bold px-2 py-0.5 rounded-full mb-2">
                      {p.category}
                    </span>
                    <h3 className="font-bold text-navy text-sm mb-2 line-clamp-2 group-hover:text-blue transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-xs text-gray-400">{p.readTime} read</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-12 bg-gradient-to-r from-navy to-navy-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-extrabold text-white mb-4 font-[family-name:var(--font-poppins)]">
            Ready to Get Started?
          </h2>
          <p className="text-white/70 mb-6">
            Book Classic Cleaning today and see why 1,500+ families trust us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#quote"
              className="bg-gradient-to-r from-orange to-gold text-white font-bold px-8 py-4 rounded-xl"
            >
              Get Free Quote
            </a>
            <a
              href={`https://wa.me/${business.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald text-white font-bold px-8 py-4 rounded-xl"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <StickyBottomBar />
    </main>
  );
}
