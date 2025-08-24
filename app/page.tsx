'use client';

import React, { useEffect, useState, useRef } from 'react';

export default function Home() {
  const [showForm, setShowForm] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    const widgetId = process.env.NEXT_PUBLIC_DOCTIFY_WIDGET_ID || '037ze27k';
    script.src = `https://www.doctify.com/get-script?widget_container_id=${widgetId}&type=carousel-widget&tenant=athena-uk&language=en&profileType=specialist&layoutType=layoutA&slugs=dr-sujata-khambekar&background=000&itemBackground=ffffff&rating=5`;
    script.async = true;
    document.body.appendChild(script);
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !(formRef.current as HTMLElement).contains(event.target as Node)) {
        setShowForm(false);
      }
    };
    if (showForm) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showForm]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const message = formData.get('message') as string;

    try {
      // Save to Neon DB
      await fetch('/api/self-refer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, message }),
      });

      // Send to Web3Forms
      const web3formsAccessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || '0e7f0c0a-5e94-46c9-9e95-cd71a82b8c38';
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: web3formsAccessKey,
          name,
          email,
          phone,
          message,
        }),
      });

      setFormSubmitted(true);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6 text-center">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              The Cardiology Clinic
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-1">
              Dr Sujata Khambekar MBBS, MD (Med), DNB, FRCP
            </p>
            <p className="text-base text-gray-500">
              Consultant Cardiologist
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Column - Profile & Reviews */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="md:flex">
                <div className="md:w-2/5">
                  <img 
                    src="/Photo.jpg" 
                    alt="Dr Sujata Khambekar" 
                    className="w-full h-80 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-3/5 p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">About Me</h2>
                  <div className="space-y-3 text-gray-700">
                    <p className="font-semibold">Dr Sujata Khambekar MBBS, MD (Med), DNB, FRCP</p>
                    <p className="text-sm">Experienced consultant Cardiologist in Poole and Bournemouth.</p>
                    <p className="text-sm">Poole hospital | Royal Bournemouth hospital | Nuffield Bournemouth</p>
                    <p className="text-sm">Partnered with all major insurance providers</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Patient Reviews</h2>
              <div className="w-full min-h-64 overflow-visible rounded-lg" id={process.env.NEXT_PUBLIC_DOCTIFY_WIDGET_ID || '037ze27k'}></div>
            </div>
          </div>

          {/* Right Column - Contact & Areas */}
          <div className="lg:col-span-1 flex flex-col space-y-6 h-full">
            {/* Contact Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex-shrink-0">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Email</p>
                    <p className="text-gray-600 text-sm">appointments@thecardiology.clinic</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Phone</p>
                    <p className="text-gray-600 text-sm">0776 151 3391</p>
                  </div>
                </div>
                <div className="bg-blue-50 border-l-4 border-primary-500 p-3 rounded-r-lg">
                  <p className="text-xs text-gray-700">
                    <span className="font-semibold">Response Time:</span> We aim to respond the same day or within 24 hours
                  </p>
                </div>
              </div>
            </div>

            {/* Areas of Interest */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex-grow">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Areas of Interest</h2>
              <div className="space-y-2">
                {[
                  'Cardiac Risk Assessment',
                  'Coronary artery disease and Angina',
                  'Atrial fibrillation',
                  'Hypertension and Cholesterol Control',
                  'Palpitations',
                  'Heart Failure',
                  'Adult congenital heart disease',
                  'Cardiac Imaging'
                ].map((area, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-primary-600 rounded-full flex-shrink-0 mt-1.5"></div>
                    <span className="text-gray-700 text-xs leading-relaxed">{area}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Centered Self Refer Button */}
      {!showForm && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40">
          <button
            onClick={() => setShowForm(true)}
            className="bg-primary-600 text-white px-8 py-4 rounded-full shadow-lg hover:bg-primary-700 transition-all duration-300 transform hover:scale-105 flex items-center space-x-3"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span className="font-semibold text-lg">Self Refer</span>
          </button>
        </div>
      )}

      {/* Form Modal with Smooth Slide Animation */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end justify-center p-4">
          <div 
            ref={formRef}
            className="bg-white rounded-t-2xl w-full max-w-md max-h-[90vh] overflow-y-auto transform transition-all duration-300 ease-out"
            style={{
              animation: 'slideUp 0.3s ease-out forwards'
            }}
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Self Refer</h2>
                <button
                  onClick={() => setShowForm(false)}
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <p className="text-gray-600 mb-6">We aim to respond the same day or within 24 hours.</p>

              {/* Form */}
              {!formSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone (optional)</label>
                    <input
                      type="tel"
                      name="phone"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Your phone number"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                      placeholder="Please describe your symptoms or reason for referral..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Sending...' : 'Submit Referral'}
                  </button>
                </form>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Thank you!</h3>
                  <p className="text-gray-600">Your self-referral has been submitted successfully. We will be in touch shortly.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Partnered with Major Insurance Providers</h3>
            <div className="flex flex-wrap justify-center items-center gap-6 mb-4">
              {[
                { src: '/AVIVA-logo.jpg', alt: 'AVIVA', href: 'https://www.aviva.co.uk/health/health-products/health-insurance/' },
                { src: '/AXA-logo.jpg', alt: 'AXA', href: 'https://www.axahealth.co.uk/' },
                { src: '/Cigna_logo.webp', alt: 'Cigna', href: 'https://www.cigna.co.uk/' },
                { src: '/healix-logo.jpg', alt: 'Healix', href: 'https://healixhealthservices.co.uk/' },
                { src: '/simplyhealth-logo.webp', alt: 'Simply Health', href: 'https://www.simplyhealth.co.uk/' },
                { src: '/Vitality-logo.jpg', alt: 'Vitality', href: 'https://www.vitality.co.uk/' },
                { src: '/WPA-logo.webp', alt: 'WPA', href: 'https://www.wpa.org.uk/' },
                { src: '/Bupa-logo.webp', alt: 'Bupa', href: 'https://finder.bupa.co.uk/Consultant/view/226316/dr_sujata_khambekar' },
                { src: '/nuffield-logo.png', alt: 'Nuffield Health', href: 'https://www.nuffieldhealth.com/consultants/dr-sujata-khambekar' },
                { src: '/allianz-logo.png', alt: 'Allianz Healthcare', href: 'https://www.allianz.co.uk/' }
              ].map((provider, index) => (
                <a 
                  key={index}
                  href={provider.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:opacity-75 transition-opacity"
                >
                  <img src={provider.src} alt={provider.alt} className="h-8 w-auto" />
                </a>
              ))}
            </div>
            <p className="text-sm text-gray-500">
              © 2019–{new Date().getFullYear()} The Cardiology Clinic. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
