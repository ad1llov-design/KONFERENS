'use client';

import { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Sparkles, Send } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/context';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

interface DemoEnrollModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseTitle?: string;
}

export function DemoEnrollModal({ isOpen, onClose, courseTitle }: DemoEnrollModalProps) {
  const { t } = useLanguage();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // Simulate real local application processing
    setTimeout(() => {
      try {
        const lead = {
          name,
          email,
          phone,
          course: courseTitle ?? 'General Inquiry',
          date: new Date().toISOString(),
        };
        const existing = JSON.parse(localStorage.getItem('kivora_demo_leads') ?? '[]');
        existing.push(lead);
        localStorage.setItem('kivora_demo_leads', JSON.stringify(existing));
      } catch {
        // storage fallback
      }
      setLoading(false);
      setSubmitted(true);
    }, 600);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="surface rounded-[var(--r-xl)] max-w-md w-full border border-border shadow-2xl overflow-hidden p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted hover:text-foreground p-1 rounded-[var(--r-xs)] transition-colors"
          aria-label={t.promo.closeBtn}
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center">
            <div className="w-14 h-14 rounded-full bg-success-light border border-success/30 text-success flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">
              {t.promo.successMessage}
            </h3>
            <p className="text-sm text-muted mb-6">
              {courseTitle ? `${courseTitle}` : 'Kivora Platform'}
            </p>
            <Button onClick={onClose} className="w-full">
              {t.promo.closeBtn}
            </Button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="accent">
                <Sparkles className="w-3 h-3 mr-1" />
                {t.courseDetail.freeDemoBadge}
              </Badge>
              <Badge variant="default">MVP Demo</Badge>
            </div>

            <h3 className="text-xl font-bold text-foreground mb-1">
              {t.promo.consultationTitle}
            </h3>
            <p className="text-xs text-muted mb-5 leading-relaxed">
              {courseTitle
                ? `${t.promo.consultationSubtitle} (${courseTitle})`
                : t.promo.consultationSubtitle}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">
                  {t.promo.nameLabel} *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder={t.promo.namePlaceholder}
                  className="w-full px-3.5 py-2 text-sm rounded-[var(--r-md)] bg-surface border border-border placeholder:text-subtle text-foreground focus-accent"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">
                  {t.promo.emailLabel} *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder={t.promo.emailPlaceholder}
                  className="w-full px-3.5 py-2 text-sm rounded-[var(--r-md)] bg-surface border border-border placeholder:text-subtle text-foreground focus-accent"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">
                  {t.promo.phoneLabel}
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder={t.promo.phonePlaceholder}
                  className="w-full px-3.5 py-2 text-sm rounded-[var(--r-md)] bg-surface border border-border placeholder:text-subtle text-foreground focus-accent"
                />
              </div>

              <div className="p-2.5 rounded-[var(--r-sm)] bg-surface-raised border border-border text-[11px] text-muted flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <span>{t.promo.demoNote}</span>
              </div>

              <Button type="submit" loading={loading} className="w-full">
                <Send className="w-4 h-4 mr-1.5" />
                {t.promo.submitBtn}
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
