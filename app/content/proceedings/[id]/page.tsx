'use client';

import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { getBlogById, BlogPost, AuthorItem } from '@/lib/db';
import { 
  ChevronLeft, 
  Calendar, 
  Clock, 
  Tag, 
  Share2, 
  Check, 
  ArrowLeft, 
  BookOpen, 
  ExternalLink, 
  Mail, 
  Award, 
  Users, 
  FileText,
  Building2,
  GraduationCap,
  Sparkles
} from 'lucide-react';
import { LatexRenderer } from '@/components/latex-renderer';

export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function load() {
      if (typeof id === 'string') {
        try {
          const data = await getBlogById(id);
          setPost(data);
        } catch (err) {
          console.error('Error fetching blog post from database:', err);
        }
      }
      setLoading(false);
    }
    load();
  }, [id]);

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-6 pt-36 pb-24 text-center">
        <div className="inline-block animate-spin w-10 h-10 border-4 border-info-light border-t-transparent rounded-full mb-4" />
        <p className="text-base font-semibold">Retrieving publication details from repository...</p>
        <p className="text-xs text-primary-light/60 dark:text-primary/60 mt-1">Please hold on a moment</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container mx-auto px-6 pt-36 pb-24 text-center">
        <div className="glass-card max-w-md mx-auto p-8 rounded-3xl">
          <BookOpen className="w-12 h-12 text-info-light mx-auto mb-4 opacity-80" />
          <h2 className="text-2xl font-bold mb-3">Publication Not Found</h2>
          <p className="text-primary-light/60 dark:text-primary/60 mb-6 text-sm">
            The requested proceeding or paper may have been unpublished or updated in the backend conference portal.
          </p>
          <button onClick={() => router.push('/content/proceedings')} className="btn-secondary text-sm inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to Proceedings
          </button>
        </div>
      </div>
    );
  }

  const dStr = post.createdAt || post.publishedAt
    ? new Date(post.createdAt || post.publishedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) 
    : 'Conference Publication';

  const postImage = post.coverImageUrl || post.imageUrl || `https://picsum.photos/seed/${post.id}/1200/675`;
  const postContent = post.bodyRichText || post.contentMarkdown || post.description || post.content || '';
  const authors: AuthorItem[] = post.authors && post.authors.length > 0
    ? post.authors
    : [
        {
          name: post.authorName || post.author || 'HSTU Research Society',
          role: post.authorRole || 'Lead Author',
          affiliation: post.affiliation || 'HSTU',
          email: post.authorEmail || '',
          orcid: post.authorOrcid || '',
        }
      ];

  const hasFullPaper = !!post.articleUrl;

  return (
    <div className="container mx-auto px-4 sm:px-6 max-w-4xl pt-32 pb-24">
      {/* Top Navigation & Action Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <button 
          onClick={() => router.push('/content/proceedings')} 
          className="inline-flex items-center gap-2 text-primary-light/70 hover:text-info-light dark:text-primary/70 dark:hover:text-info-light transition-colors font-semibold text-sm"
        >
          <ChevronLeft className="w-4 h-4" /> Back to All Proceedings
        </button>

        <div className="flex items-center gap-2">
          {hasFullPaper && (
            <a
              href={post.articleUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md hover:shadow-lg"
              title="Open full paper in external tab"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Full Paper</span>
              <ExternalLink className="w-3 h-3 opacity-80" />
            </a>
          )}

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full glass text-xs font-semibold hover:border-info-light/50 transition-all shadow-sm"
            title="Copy link to clipboard"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-emerald-500 font-bold">Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span>Share</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Badges and metadata */}
      <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-info-light mb-4">
        {post.category && (
          <span className="px-3 py-1 rounded-full bg-info-light text-white font-bold text-xs shadow-md shadow-info-light/20">
            {post.category}
          </span>
        )}

        <span className="flex items-center gap-1.5">
          <Calendar className="w-4 h-4" />
          <span>{dStr}</span>
        </span>

        <span className="flex items-center gap-1.5 text-primary-light/70 dark:text-primary/70">
          <Users className="w-4 h-4" />
          <span>{authors.length} Contributing Author{authors.length > 1 ? 's' : ''}</span>
        </span>

        {post.readTimeMinutes && (
          <span className="flex items-center gap-1.5 text-primary-light/60 dark:text-primary/60">
            <Clock className="w-4 h-4" />
            <span>{post.readTimeMinutes} min read</span>
          </span>
        )}
      </div>

      {/* Article / Paper Title */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 leading-[1.2] text-primary-light dark:text-primary">
        {post.title}
      </h1>

      {/* Full Paper Banner CTA (if articleUrl is configured) */}
      {hasFullPaper && (
        <div className="mb-8 p-5 sm:p-6 rounded-3xl bg-blue-500/[0.07] dark:bg-blue-500/[0.12] border border-blue-500/20 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-blue-600/10 dark:bg-blue-400/20 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                <span>Official Full Paper Link</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  Available
                </span>
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 max-w-xl">
                The full publication is accessible via our external conference repository or digital library.
              </p>
            </div>
          </div>
          <a
            href={post.articleUrl}
            target="_blank"
            rel="noreferrer"
            className="self-stretch sm:self-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md shrink-0"
          >
            <span>Open Full Article</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      )}

      {/* Authors & Contributors Section */}
      <div className="mb-10 p-6 sm:p-7 rounded-[28px] glass border border-white/20 dark:border-white/10 shadow-lg">
        <div className="flex items-center justify-between gap-2 mb-5 pb-3 border-b border-black/5 dark:border-white/10">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-info-light" />
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Authors & Affiliations ({authors.length})
            </h3>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            HSTU Research Society
          </span>
        </div>

        {/* Authors Grid */}
        <div className="grid sm:grid-cols-2 gap-4">
          {authors.map((author, index) => {
            const isLead = index === 0;
            return (
              <div 
                key={index}
                className="p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/5 dark:border-white/5 flex items-start gap-3.5"
              >
                {/* Avatar */}
                {author.imageUrl ? (
                  <Image 
                    src={author.imageUrl} 
                    alt={author.name} 
                    width={44}
                    height={44}
                    className="w-11 h-11 rounded-2xl object-cover border border-white/20 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-11 h-11 rounded-2xl bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-black text-sm flex items-center justify-center shrink-0 border border-blue-200 dark:border-blue-800">
                    {(author.name || 'AU').slice(0, 2).toUpperCase()}
                  </div>
                )}

                {/* Author Details */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate">
                      {author.name}
                    </h4>
                    {isLead && (
                      <span className="px-2 py-0.2 rounded-md text-[10px] font-bold bg-blue-500/10 text-info-light">
                        {author.role || 'Lead Author'}
                      </span>
                    )}
                    {!isLead && author.role && (
                      <span className="px-2 py-0.2 rounded-md text-[10px] font-semibold bg-black/5 dark:bg-white/5 text-slate-600 dark:text-slate-400">
                        {author.role}
                      </span>
                    )}
                  </div>

                  {/* Affiliation */}
                  {author.affiliation && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-1 leading-snug">
                      <Building2 className="w-3 h-3 shrink-0 opacity-60" />
                      <span className="truncate">{author.affiliation}</span>
                    </p>
                  )}

                  {/* Actions: Email & ORCID */}
                  <div className="flex flex-wrap items-center gap-2 mt-2 pt-2 border-t border-black/5 dark:border-white/5">
                    {author.email && (
                      <a
                        href={`mailto:${author.email}`}
                        className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-600 hover:text-info-light dark:text-slate-400 dark:hover:text-info-light transition-colors"
                        title={`Send email to ${author.name}`}
                      >
                        <Mail className="w-3 h-3" />
                        <span className="truncate max-w-[140px]">{author.email}</span>
                      </a>
                    )}

                    {author.orcid && (
                      <a
                        href={author.orcid.startsWith('http') ? author.orcid : `https://orcid.org/${author.orcid}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#a6ce39]/15 text-[#6c881f] dark:text-[#a6ce39] font-mono text-[10px] font-bold hover:bg-[#a6ce39]/25 transition-colors"
                        title={`Verified ORCID Profile: ${author.orcid}`}
                      >
                        <Award className="w-3 h-3 text-[#a6ce39]" />
                        <span>ORCID</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {post.tags.map((tag, tIdx) => (
            <span 
              key={tIdx} 
              className="text-xs px-3 py-1 rounded-full bg-blue-500/10 text-info-light font-medium flex items-center gap-1"
            >
              <Tag className="w-3 h-3" /> {tag}
            </span>
          ))}
        </div>
      )}

      {/* 16:9 Cover Image */}
      <div className="relative w-full aspect-video rounded-[28px] overflow-hidden mb-12 shadow-2xl bg-slate-900 border border-white/20">
        <Image
          src={postImage}
          alt={post.title}
          fill
          sizes="(max-width: 896px) 100vw, 896px"
          className="object-cover"
          referrerPolicy="no-referrer"
          priority
        />
      </div>

      {/* Paper Content / Abstract with LaTeX & Markdown rendering */}
      <div className="glass-card p-6 sm:p-10 rounded-[32px] border border-white/20 dark:border-white/10 shadow-xl mb-12">
        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-black/5 dark:border-white/10 text-sm font-bold uppercase tracking-wider text-slate-500">
          <FileText className="w-4 h-4 text-info-light" />
          <span>Paper Abstract & Content</span>
        </div>
        <LatexRenderer content={postContent} />
      </div>

      {/* Full Paper Bottom CTA */}
      {hasFullPaper && (
        <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-transparent border border-blue-500/20 mb-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Need the complete manuscript?
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
              Read the full publication with full figures, experimental datasets, and appendices.
            </p>
          </div>
          <a
            href={post.articleUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md hover:shadow-lg"
          >
            <span>Read Full Paper</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      )}

      {/* Bottom Back Button & Share */}
      <div className="pt-8 border-t border-white/10 flex items-center justify-between">
        <button 
          onClick={() => router.push('/content/proceedings')} 
          className="btn-secondary text-sm inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Back to All Proceedings
        </button>

        <button
          onClick={handleShare}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl glass text-xs font-semibold hover:border-info-light/50 transition-all"
        >
          <Share2 className="w-4 h-4 text-info-light" />
          <span>{copied ? 'Copied' : 'Share Publication'}</span>
        </button>
      </div>
    </div>
  );
}
