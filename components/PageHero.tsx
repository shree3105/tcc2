type Props = {
  title: string;
  subtitle?: string;
  eyebrow?: string;
};

/** Consistent page header used across inner pages. */
export default function PageHero({ title, subtitle, eyebrow }: Props) {
  return (
    <section className="border-b border-primary-100 bg-gradient-to-b from-primary-50 to-sand-50">
      <div className="container-page py-8 sm:py-12">
        {eyebrow && (
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-primary-500">
            {eyebrow}
          </p>
        )}
        <h1 className="font-serif text-2xl font-bold text-primary-900 sm:text-3xl lg:text-4xl">
          {title}
        </h1>
        {subtitle && (
          <p className="prose-lg-readable mt-3 max-w-3xl">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
