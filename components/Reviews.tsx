'use client';

import { useEffect } from 'react';
import { integrations } from '@/lib/config';

/**
 * Doctify reviews carousel. Loads the third-party widget script on mount and
 * renders it into the container matching the configured widget id.
 */
export default function Reviews() {
  const widgetId = integrations.doctifyWidgetId;

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://www.doctify.com/get-script?widget_container_id=${widgetId}&type=carousel-widget&tenant=athena-uk&language=en&profileType=specialist&layoutType=layoutA&slugs=dr-sujata-khambekar&background=fff&itemBackground=ffffff&rating=5`;
    script.async = true;
    document.body.appendChild(script);
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [widgetId]);

  return <div id={widgetId} className="min-h-[16rem] w-full overflow-visible" />;
}
