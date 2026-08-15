interface FeaturePageProps {
  eyebrow: string;
  title: string;
  description: string;
}

export default function FeaturePage({
  eyebrow,
  title,
  description,
}: FeaturePageProps) {
  return (
    <div className="feature-page">

      <div className="feature-heading">

        <p className="eyebrow">
          {eyebrow}
        </p>

        <h1>
          {title}
        </h1>

        <p className="feature-description">
          {description}
        </p>

      </div>


      <div className="coming-area">

        <div className="coming-line" />

        <span>
          FUNDING INTELLIGENCE
        </span>

        <p>
          Your personalized opportunities will appear here.
        </p>

      </div>

    </div>
  );
}