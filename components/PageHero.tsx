type Props = {
  title: string;
  subtitle?: string;
  eyebrow?: string;
};

/** Consistent page header used across inner pages. */
export default function PageHero({ title, subtitle, eyebrow }: Props) {
  return (
    <section className="border-b border-primary-100 bg-gradient-to-b from-primary-50 to-sand-50">
      <div className="container-page py-12 sm:py-16">
        {eyebrow && (
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-primary-500">
            {eyebrow}
          </p>
        )}
        <h1 className="font-serif text-3xl font-bold text-primary-900 sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="prose-lg-readable mt-4 max-w-3xl">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
