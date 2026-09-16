'use client';

import { PageHeader } from '@/components/page-header';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { 
  ArrowRight, 
  Calendar, 
  Clock, 
  Tag, 
  Users, 
  Search, 
  X, 
  Sparkles, 
  RefreshCw, 
  ExternalLink, 
  Mail, 
  Award, 
  ChevronDown, 
  ChevronUp, 
  FileText,
  Building2
} from 'lucide-react';
import { useEffect, useState, useMemo } from 'react';
import { getAllBlogs, normalizeBlog, BlogPost, AuthorItem, BLOG_COLLECTIONS } from '@/lib/db';
import { db } from '@/lib/firebase';
import { collection, onSnapshot } from 'firebase/firestore';

export default function BlogPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [expandedAuthors, setExpandedAuthors] = useState<Record<string, boolean>>({});

  const toggleAuthors = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setExpandedAuthors(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Fetch blogs on mount and listen in real-time if Firestore db is connected
  useEffect(() => {
    let unsubs: (() => void)[] = [];

    async function loadData() {
      try {
        const initial = await getAllBlogs();
        setBlogs(initial);
      } catch (err) {
        console.error('Failed to fetch initial blogs:', err);
      } finally {
        setLoading(false);
      }

      // Realtime listener across blog collections
      const firestore = db;
      if (firestore) {
        try {
          const blogMap = new Map<string, BlogPost>();
          BLOG_COLLECTIONS.forEach((colName) => {
            try {
              const unsub = onSnapshot(collection(firestore, colName), (snapshot) => {
                snapshot.docs.forEach((doc) => {
                  const raw = doc.data();
                  const normalized = normalizeBlog(doc.id, raw);
                  const isHidden = 
                    raw.displayInFrontend === false || 
                    raw.displayInFrontend === 'false' ||
                    normalized.displayInFrontend === false ||
                    normalized.status === 'draft' || 
                    normalized.status === 'archived' || 
                    raw.isPublished === false;

                  if (!isHidden) {
                    blogMap.set(doc.id, normalized);
                  } else {
                    blogMap.delete(doc.id);
                  }
                });

                const list = Array.from(blogMap.values());
                list.sort((a, b) => {
                  const orderA = a.position !== undefined ? a.position : (a.order !== undefined ? a.order : 9999);
                  const orderB = b.position !== undefined ? b.position : (b.order !== undefined ? b.order : 9999);
                  if (orderA !== orderB) return orderA - orderB;
                  const timeA = a.createdAt ? new Date(a.createdAt).getTime() : (a.publishedAt ? new Date(a.publishedAt).getTime() : 0);
                  const timeB = b.createdAt ? new Date(b.createdAt).getTime() : (b.publishedAt ? new Date(b.publishedAt).getTime() : 0);
                  return timeB - timeA;
                });

                if (list.length > 0) {
                  setBlogs(list);
                  setLoading(false);
                }
              }, (err) => {
                console.warn(`Realtime listener for ${colName} failed:`, err);
              });
              unsubs.push(unsub);
            } catch {
              // Ignore unsupported collection listener
            }
          });
        } catch (e) {
          console.warn('Realtime subscription setup failed:', e);
        }
      }
    }

    loadData();

    return () => {
      unsubs.forEach((u) => u());
    };
  }, []);

  const handleManualRefresh = async () => {
    setIsRefreshing(true);
    try {
      const fresh = await getAllBlogs();
      setBlogs(fresh);
    } catch (e) {
      console.error('Manual refresh error:', e);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Derive unique tags for filtering
  const allTags = useMemo(() => {
    const set = new Set<string>();
    blogs.forEach((b) => {
      if (Array.isArray(b.tags)) {
        b.tags.forEach((t) => {
          if (t && typeof t === 'string' && t.trim()) {
            set.add(t.trim());
          }
        });
      }
      if (b.category && typeof b.category === 'string' && b.category !== 'General') {
        set.add(b.category.trim());
      }
    });
    return ['All', ...Array.from(set)];
  }, [blogs]);

  // Filtered blogs by search and tag
  const filteredBlogs = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    return blogs.filter((b) => {
      const matchTag = selectedTag === 'All' 
        || (b.tags && b.tags.some((t) => t.toLowerCase() === selectedTag.toLowerCase()))
        || (b.category && b.category.toLowerCase() === selectedTag.toLowerCase());

      if (!matchTag) return false;

      if (!query) return true;

      const titleMatch = (b.title || '').toLowerCase().includes(query);
      const excerptMatch = (b.excerpt || '').toLowerCase().includes(query);
      const contentMatch = (b.contentMarkdown || b.bodyRichText || '').toLowerCase().includes(query);
      const tagMatch = (b.tags || []).some((t) => t.toLowerCase().includes(query));
      const categoryMatch = (b.category || '').toLowerCase().includes(query);

      // Search across all contributing authors (name, email, ORCID, affiliation, role)
      const authorsMatch = (b.authors || []).some((a: AuthorItem) => 
        (a.name && a.name.toLowerCase().includes(query)) ||
        (a.email && a.email.toLowerCase().includes(query)) ||
        (a.orcid && a.orcid.toLowerCase().includes(query)) ||
        (a.affiliation && a.affiliation.toLowerCase().includes(query)) ||
        (a.role && a.role.toLowerCase().includes(query))
      );

      const legacyAuthorMatch = (b.author || b.authorName || '').toLowerCase().includes(query);

      return titleMatch || excerptMatch || contentMatch || tagMatch || categoryMatch || authorsMatch || legacyAuthorMatch;
    });
  }, [blogs, searchQuery, selectedTag]);

  return (
    <div className="container mx-auto px-4 sm:px-6 max-w-7xl pb-24">
      <PageHeader 
        title="Conference Proceedings" 
        description="Accepted research papers, contributing authors, ORCIDs, and publications directly synchronized with the conference repository." 
      />

      {/* Search & Tag Filter Bar */}
      <div className="mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search input */}
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-light/40 dark:text-primary/40" />
          <input
            type="text"
            placeholder="Search papers, authors, ORCID, affiliations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-10 py-3 rounded-2xl glass border border-white/20 dark:border-white/10 text-sm focus:outline-none focus:border-info-light transition-all placeholder:text-primary-light/40 dark:placeholder:text-primary/40"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-primary-light/40 hover:text-primary-light dark:text-primary/40 dark:hover:text-primary"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sync / Refresh Button */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <button
            onClick={handleManualRefresh}
            disabled={isRefreshing}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl glass hover:border-info-light/40 transition-all text-xs font-semibold text-primary-light/80 dark:text-primary/80 disabled:opacity-50"
            title="Re-sync with backend database"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-info-light' : ''}`} />
            <span>{isRefreshing ? 'Syncing...' : 'Sync Database'}</span>
          </button>
        </div>
      </div>

      {/* Tag Pills Filter */}
      {allTags.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {allTags.map((tag) => {
            const isSelected = selectedTag === tag;
            return (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-300 ${
                  isSelected
                    ? 'bg-info-light text-white shadow-lg shadow-info-light/20 scale-105'
                    : 'glass text-primary-light/70 dark:text-primary/70 hover:text-info-light hover:border-info-light/30'
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>
      )}

      {/* Grid of Articles & Papers */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading && (
          <div className="col-span-full py-20 text-center text-primary-light/60 dark:text-primary/60 font-medium">
            <div className="inline-block animate-spin w-10 h-10 border-4 border-info-light border-t-transparent rounded-full mb-4" />
            <p className="text-base font-semibold">Connecting to conference repository...</p>
            <p className="text-xs text-primary-light/40 dark:text-primary/40 mt-1">Retrieving latest accepted proceedings & papers</p>
          </div>
        )}

        {!loading && filteredBlogs.length === 0 && (
          <div className="col-span-full text-center py-16 glass-card max-w-xl mx-auto p-8 rounded-3xl">
            <Sparkles className="w-10 h-10 text-info-light mx-auto mb-3 opacity-80" />
            <p className="text-xl font-bold mb-2">
              {searchQuery || selectedTag !== 'All' ? 'No matching papers found' : 'No proceedings published yet'}
            </p>
            <p className="text-sm text-primary-light/60 dark:text-primary/60 mb-5">
              {searchQuery || selectedTag !== 'All'
                ? 'Try adjusting your search query or selected category filter.'
                : 'Conference papers and proceedings published from your backend admin portal will appear here immediately.'}
            </p>
            {(searchQuery || selectedTag !== 'All') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedTag('All');
                }}
                className="btn-secondary text-xs"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}

        <AnimatePresence mode="popLayout">
          {filteredBlogs.map((post, idx) => {
            const img = post.coverImageUrl || post.imageUrl || `https://picsum.photos/seed/blog_${post.id || idx}/800/450`;
            const title = post.title;
            const date = post.createdAt || post.publishedAt
              ? new Date(post.createdAt || post.publishedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
              : 'Conference Publication';
            const targetId = post.slug || post.id;
            const authors = post.authors || [];
            const primaryAuthor = authors[0] || {
              name: post.authorName || post.author || 'HSTU Research Society',
              role: post.authorRole || 'Lead Author',
              affiliation: post.affiliation || 'HSTU',
            };
            const coAuthors = authors.slice(1);
            const isExpanded = !!expandedAuthors[post.id];
            const hasFullPaper = !!post.articleUrl;

            return (
              <motion.article
                key={post.id || idx}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.45, delay: idx * 0.05 }}
                className="glass-card group flex flex-col h-full overflow-hidden rounded-[28px] border border-white/20 hover:border-info-light/40 transition-all duration-300 shadow-xl hover:shadow-2xl"
              >
                {/* 16:9 Aspect Header Image with Category & Full Paper Indicators */}
                <div className="relative w-full aspect-video overflow-hidden bg-slate-900 shrink-0">
                  <Image
                    src={img}
                    alt={title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3 flex flex-wrap items-center gap-2">
                    {post.category && (
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-info-light/95 backdrop-blur-md text-white shadow-md">
                        {post.category}
                      </span>
                    )}
                  </div>

                  {/* Read Time / Full Paper Pill */}
                  <div className="absolute top-3 right-3 flex items-center gap-1.5">
                    {hasFullPaper && (
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-600/90 backdrop-blur-md text-white flex items-center gap-1 shadow-md">
                        <FileText className="w-3 h-3" /> Full Paper
                      </span>
                    )}
                    {post.readTimeMinutes && (
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-black/60 backdrop-blur-md text-white flex items-center gap-1">
                        <Clock className="w-3 h-3 text-info-light" /> {post.readTimeMinutes} min
                      </span>
                    )}
                  </div>
                </div>
                
                {/* Content Section */}
                <div className="p-6 sm:p-7 flex flex-col flex-grow">
                  {/* Date & Meta */}
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-info-light font-semibold mb-3">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{date}</span>
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-500/10 text-info-light text-[11px] font-bold">
                      <Users className="w-3 h-3" />
                      <span>{authors.length > 0 ? `${authors.length} Author${authors.length > 1 ? 's' : ''}` : 'Author'}</span>
                    </span>
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl font-bold mb-3 group-hover:text-info-light transition-colors line-clamp-2 leading-snug">
                    <Link href={`/content/proceedings/${targetId}`}>
                      {title}
                    </Link>
                  </h3>
                  
                  {/* Abstract / Excerpt */}
                  <p className="text-primary-light/70 dark:text-primary/70 mb-4 line-clamp-3 text-sm leading-relaxed">
                    {post.excerpt || 'Access the full abstract, empirical findings, contributing authors, and publication references.'}
                  </p>

                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {post.tags.slice(0, 3).map((tag, tIdx) => (
                        <span 
                          key={tIdx} 
                          className="text-[11px] px-2 py-0.5 rounded-md bg-black/5 dark:bg-white/10 text-primary-light/80 dark:text-primary/80 flex items-center gap-1"
                        >
                          <Tag className="w-2.5 h-2.5 opacity-60" /> {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Multiple Authors Box */}
                  <div className="mt-auto bg-black/[0.03] dark:bg-white/[0.04] rounded-2xl p-3.5 border border-black/5 dark:border-white/10 mb-4">
                    {/* Primary Author */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-2.5 min-w-0">
                        {primaryAuthor.imageUrl ? (
                          <Image 
                            src={primaryAuthor.imageUrl} 
                            alt={primaryAuthor.name} 
                            width={32}
                            height={32}
                            className="w-8 h-8 rounded-full object-cover border border-white/20 shrink-0 mt-0.5"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                            {(primaryAuthor.name || 'AU').slice(0, 2).toUpperCase()}
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                            {primaryAuthor.name}
                          </p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate flex items-center gap-1">
                            <span>{primaryAuthor.role || 'Lead Author'}</span>
                            {primaryAuthor.affiliation && (
                              <>
                                <span>•</span>
                                <span className="truncate">{primaryAuthor.affiliation}</span>
                              </>
                            )}
                          </p>
                        </div>
                      </div>

                      {/* Contact Actions: Email & ORCID */}
                      <div className="flex items-center gap-1 shrink-0">
                        {primaryAuthor.email && (
                          <a
                            href={`mailto:${primaryAuthor.email}`}
                            className="p-1.5 text-slate-400 hover:text-info-light hover:bg-black/5 dark:hover:bg-white/10 rounded-lg transition-colors"
                            title={`Email: ${primaryAuthor.email}`}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Mail className="w-3.5 h-3.5" />
                          </a>
                        )}
                        {primaryAuthor.orcid && (
                          <a
                            href={primaryAuthor.orcid.startsWith('http') ? primaryAuthor.orcid : `https://orcid.org/${primaryAuthor.orcid}`}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 text-[#a6ce39] hover:bg-[#a6ce39]/10 rounded-lg transition-colors font-bold text-[10px] flex items-center gap-0.5"
                            title={`ORCID iD: ${primaryAuthor.orcid}`}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Award className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Co-Authors Toggle Button */}
                    {coAuthors.length > 0 && (
                      <div className="mt-2.5 pt-2 border-t border-black/5 dark:border-white/10 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={(e) => toggleAuthors(post.id, e)}
                          className="text-[11px] font-bold text-info-light hover:underline flex items-center gap-1"
                        >
                          <span>{isExpanded ? 'Hide Co-Authors' : `+${coAuthors.length} more author${coAuthors.length > 1 ? 's' : ''}`}</span>
                          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    )}

                    {/* Expanded Co-Authors List */}
                    {isExpanded && coAuthors.length > 0 && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-2.5 space-y-2 pt-2 border-t border-black/5 dark:border-white/10"
                      >
                        {coAuthors.map((ca, cIdx) => (
                          <div 
                            key={cIdx} 
                            className="flex items-center justify-between gap-2 p-2 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/5 dark:border-white/5 text-xs"
                          >
                            <div className="min-w-0">
                              <p className="font-semibold text-slate-800 dark:text-slate-200 text-[11px] truncate">
                                {ca.name}
                              </p>
                              <p className="text-[10px] text-slate-400 dark:text-slate-500 truncate flex items-center gap-1">
                                <span>{ca.role || 'Co-Author'}</span>
                                {ca.affiliation && <span>• {ca.affiliation}</span>}
                              </p>
                            </div>
                            <div className="flex items-center gap-1 shrink-0">
                              {ca.email && (
                                <a
                                  href={`mailto:${ca.email}`}
                                  className="p-1 text-slate-400 hover:text-info-light rounded"
                                  title={`Email: ${ca.email}`}
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <Mail className="w-3 h-3" />
                                </a>
                              )}
                              {ca.orcid && (
                                <a
                                  href={ca.orcid.startsWith('http') ? ca.orcid : `https://orcid.org/${ca.orcid}`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="p-1 text-[#a6ce39] hover:bg-[#a6ce39]/10 rounded"
                                  title={`ORCID iD: ${ca.orcid}`}
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <Award className="w-3 h-3" />
                                </a>
                              )}
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </div>
                  
                  {/* Card Bottom Links */}
                  <div className="flex items-center justify-between gap-2 pt-3 border-t border-black/5 dark:border-white/10">
                    <Link 
                      href={`/content/proceedings/${targetId}`} 
                      className="inline-flex items-center font-bold text-xs sm:text-sm text-info-light hover:underline transition-colors py-1"
                    >
                      Read Abstract & Story <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                    </Link>

                    {/* External Full Paper Button */}
                    {post.articleUrl && (
                      <a
                        href={post.articleUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600/10 dark:bg-blue-400/10 text-blue-600 dark:text-blue-400 hover:bg-blue-600/20 font-bold text-xs transition-colors"
                        title="Open full paper in external tab"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Full Paper</span>
                        <ExternalLink className="w-3 h-3 opacity-70" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
