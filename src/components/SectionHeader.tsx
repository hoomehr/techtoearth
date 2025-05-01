'use client';

import Link from 'next/link';

interface SectionHeaderProps {
  tag: string;
  title: string;
  subtitle: string;
  description?: string;
  actionButton?: {
    text: string;
    href: string;
  };
  className?: string;
}

export default function SectionHeader({
  tag,
  title,
  subtitle,
  description,
  actionButton,
  className = '',
}: SectionHeaderProps) {
  return (
    <div className={`section-header ${className}`}>
      <div className="section-tag-container">
        <span className="section-tag">
          {tag}
        </span>
      </div>
      <h2 className="section-title">
        {title}
        <span className="section-subtitle">{subtitle}</span>
      </h2>
      {description && (
        <p className="section-description">
          {description}
        </p>
      )}
      
      {actionButton && (
        <div className="section-button-container">
          <Link
            href={actionButton.href}
            className="section-button"
          >
            {actionButton.text}
          </Link>
        </div>
      )}
    </div>
  );
}
