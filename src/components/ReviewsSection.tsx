import React, { useState } from 'react';
import { Star, ShieldCheck, CheckCircle2, MessageSquarePlus, X, ThumbsUp } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ReviewsSection: React.FC = () => {
  const { t, reviews, submitReview } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successToast, setSuccessToast] = useState(false);

  // Review Form state
  const [form, setForm] = useState({
    author: '',
    city: 'Praha',
    rating: 5,
    title: '',
    content: ''
  });

  const publicReviews = reviews.filter((r) => r.approved);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.author.trim() || !form.content.trim()) return;

    submitReview(form);
    setIsModalOpen(false);
    setSuccessToast(true);
    setForm({
      author: '',
      city: 'Praha',
      rating: 5,
      title: '',
      content: ''
    });

    setTimeout(() => setSuccessToast(false), 5000);
  };

  return (
    <section id="reviews" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Average Rating & Write CTA */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-slate-200">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.25em] font-extrabold text-sky-800">
              {t.reviews.tag}
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-slate-950 tracking-tight">
              {t.reviews.title}
            </h2>
            <div className="flex items-center gap-3 pt-1">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <span className="text-base font-black text-slate-950">
                {t.reviews.avgRating}
              </span>
              <span className="text-slate-300 font-bold">·</span>
              <span className="text-sm text-slate-600 font-bold">
                {t.reviews.totalReviews}
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-slate-950 text-white text-xs sm:text-sm font-black hover:bg-sky-900 transition-colors shadow-md self-start md:self-auto cursor-pointer"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>{t.reviews.writeReviewBtn}</span>
          </button>
        </div>

        {/* Success toast notification */}
        {successToast && (
          <div className="mb-8 p-5 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-sm font-bold flex items-center gap-3 shadow-xs">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
            <span>{t.reviews.submittedSuccess}</span>
          </div>
        )}

        {/* Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {publicReviews.map((rev) => (
            <div
              key={rev.id}
              className="p-7 rounded-3xl bg-[#F8FAFC] border border-slate-200 hover:border-sky-400 hover:bg-white transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between"
            >
              <div className="space-y-3.5">
                {/* Header: Rating & Verified Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  {rev.verified && (
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{t.reviews.verified}</span>
                    </span>
                  )}
                </div>

                {/* Title */}
                <h4 className="text-base sm:text-lg font-bold text-slate-950">
                  {rev.title}
                </h4>

                {/* Content */}
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                  “{rev.content}”
                </p>
              </div>

              {/* Author & City Footer */}
              <div className="pt-4 mt-5 border-t border-slate-200 flex items-center justify-between text-xs sm:text-sm text-slate-600">
                <div>
                  <span className="font-bold text-slate-950">{rev.author}</span>
                  <span className="text-slate-500 ml-1.5 font-medium">({rev.city})</span>
                </div>
                <span className="text-xs text-slate-500 font-semibold">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Review Submission Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 sm:p-8 border border-slate-100">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">
                {t.reviews.modalTitle}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 mt-6">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t.reviews.nameLabel} *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.author}
                    onChange={(e) => setForm({ ...form, author: e.target.value })}
                    placeholder="např. Veronika K."
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t.reviews.cityLabel}
                  </label>
                  <input
                    type="text"
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    placeholder="např. Praha"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t.reviews.ratingLabel}
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setForm({ ...form, rating: star })}
                      className="p-1 text-slate-300 hover:text-amber-400"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= form.rating
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-slate-200'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t.reviews.headlineLabel} *
                </label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="např. Naprosto úžasná hydratace"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t.reviews.contentLabel} *
                </label>
                <textarea
                  required
                  rows={4}
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  placeholder="Popište, jak jste masku používali a jaké výsledky jste zaznamenali..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
                ></textarea>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-slate-900 hover:bg-sky-900 transition-colors shadow-md"
                >
                  {t.reviews.submitBtn}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
