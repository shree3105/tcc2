'use client';

import { useEffect, useState, useRef } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';

export default function Page() {
  const [showReferForm, setShowReferForm] = useState(false);
  const formRef = useRef(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.doctify.com/get-script?widget_container_id=037ze27k&type=carousel-widget&tenant=athena-uk&language=en&profileType=specialist&layoutType=layoutA&slugs=dr-sujata-khambekar&background=000&itemBackground=ffffff&rating=5';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !(formRef.current as HTMLElement).contains(event.target as Node)) {
        setShowReferForm(false);
      }
    };
    if (showReferForm) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showReferForm]);

  return (
    <main className="px-4 py-8 md:px-16 lg:px-32 relative pb-32 flex flex-col items-center bg-gradient-to-br from-[#eef2f7] to-[#f4f9ff] text-[#1f2a44]">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8">

        <section className="col-span-full text-center space-y-2">
          <h1 className="text-4xl font-bold text-[#1c3b70]">The Cardiology Clinic</h1>
          <p className="text-lg text-muted-foreground">Dr Sujata Khambekar MBBS, MD (Med), DNB, FRCP  – Consultant Cardiologist</p>
        </section>

        <div className="mb-8">
          <div className="w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto overflow-hidden rounded-md shadow" style={{ maxHeight: '400px' }}>
            <img src="/Photo.jpg" alt="Cardiology Clinic" className="w-full h-auto object-contain" />
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2 text-[#204585]">Doctify Reviews</h2>
          <div className="w-full overflow-hidden rounded-md shadow" id="037ze27k"></div>
        </div>

        <div className="py-6">
          <h2 className="text-2xl font-semibold mb-2">About Me</h2>
          <p>Dr Sujata Khambekar MBBS, MD (Med), DNB, FRCP</p>
          <p>Experienced consultant Cardiologist in Poole and Bournemouth.</p>
          <p>Poole hospital | Royal Bournemouth hospital | Nuffield Bournemouth</p>
          <p>Partnered with all major insurance providers</p>
          <div className="mt-6 p-6 bg-white rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-2">Contact us or click self refer</h2>
            <p><strong>Email</strong> appointments@thecardiology.clinic</p>
            <p><strong>Telephone</strong> 0776 151 3391</p>
            <p>We aim to respond the same day or within 24 hours</p>
          </div>
        </div>

        <div className="py-6">
          <h2 className="text-2xl font-semibold mb-2">Areas of Interest:</h2>
          <ul className="list-disc list-inside">
            <li>Cardiac Risk Assessment</li>
            <li>Coronary artery disease and Angina</li>
            <li>Atrial fibrillation</li>
            <li>Hypertension and Cholesterol Control</li>
            <li>Palpitations</li>
            <li>Heart Failure</li>
            <li>Atrial fibrillation</li>
            <li>Adult congenital heart disease</li>
            <li>Cardiac Imaging</li>
          </ul>
        </div>
      </div>

      {/* Self Refer Slide-Up Form */}
      <div
        className={`fixed bottom-12 left-0 w-full z-50 transition-all duration-500 ease-in-out ${showReferForm ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none translate-y-full'}`}
      >
        <div ref={formRef} className="bg-white w-full max-w-xl mx-auto p-8 rounded-t-2xl shadow-2xl border border-[#dce3f1]">
          <div className="flex justify-end mb-2">
            <button
              onClick={() => setShowReferForm(false)}
              className="text-gray-500 hover:text-gray-800 text-xl"
              aria-label="Close"
            >
              ×
            </button>
          </div>
          <h2 className="text-2xl font-semibold mb-2">Self Refer</h2>
          <p className="text-sm text-muted-foreground mb-4">We aim to respond the same day or within 24 hours.</p>
          {!formSubmitted ? (
            <form
              action="https://api.web3forms.com/submit"
              method="POST"
              onSubmit={async (e) => {
                e.preventDefault();
                setLoading(true);
                const formData = new FormData(e.currentTarget);
                const name = formData.get('name');
                const email = formData.get('email');
                const phone = formData.get('phone');
                const message = formData.get('message');

                await fetch('/api/self-refer', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ name, email, phone, message }),
                });

                await fetch('https://api.web3forms.com/submit', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    access_key: '0e7f0c0a-5e94-46c9-9e95-cd71a82b8c38',
                    name,
                    email,
                    phone,
                    message,
                  }),
                });

                setLoading(false);
                setFormSubmitted(true);
              }}
              className="space-y-4"
              data-recaptcha="true"
            >
              {/* access_key is already included in fetch, no need to add here */}

              <Input type="text" name="name" placeholder="Your Name" required />
              <Input type="email" name="email" placeholder="Email Address" required />
              <Input type="tel" name="phone" placeholder="Your phone number if you prefer to be called" />
              <Textarea name="message" placeholder="Your Message" rows={4} required />
              <input type="hidden" name="captcha" value="true" />
              <Button type="submit" disabled={loading}>
                {loading ? 'Sending...' : 'Send'}
              </Button>
            </form>
          ) : (
            <div className="text-center text-green-700 text-lg font-medium">
              Thank you for your self-referral! We will be in touch shortly.
            </div>
          )}
        </div>
      </div>

      {/* Toggle Button */}
      {!showReferForm && (
        <button
          onClick={() => setShowReferForm(true)}
          className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#1c3b70] to-[#3b6fa1] hover:from-[#2a4f8a] hover:to-[#4b7fb4] text-white px-8 py-4 rounded-full shadow-lg text-lg font-semibold  z-50"
        >
          Self Refer
        </button>
      )}

      <footer className="w-full max-w-7xl mx-auto text-center text-sm text-muted-foreground py-6 bg-transparent z-40">
        <div className="flex flex-wrap justify-center items-center gap-4 px-4 mb-4">
          <a href="https://www.aviva.co.uk/health/health-products/health-insurance/" target="_blank" rel="noopener noreferrer">
  <img src="/AVIVA-logo.jpg" alt="AVIVA" className="h-10 transition duration-300 ease-in-out hover:blur-sm" />
</a>
<a href="https://www.axahealth.co.uk/" target="_blank" rel="noopener noreferrer">
  <img src="/AXA-logo.jpg" alt="AXA" className="h-10 transition duration-300 ease-in-out hover:blur-sm" />
</a>
<a href="https://www.cigna.co.uk/" target="_blank" rel="noopener noreferrer">
  <img src="/Cigna_logo.webp" alt="Cigna" className="h-10 transition duration-300 ease-in-out hover:blur-sm" />
</a>
<a href="https://healixhealthservices.co.uk/" target="_blank" rel="noopener noreferrer">
  <img src="/healix-logo.jpg" alt="healix" className="h-10 transition duration-300 ease-in-out hover:blur-sm" />
</a>
<a href="https://www.simplyhealth.co.uk/" target="_blank" rel="noopener noreferrer">
  <img src="/simplyhealth-logo.webp" alt="simplyhealth" className="h-10 transition duration-300 ease-in-out hover:blur-sm" />
</a>
<a href="https://www.vitality.co.uk/" target="_blank" rel="noopener noreferrer">
  <img src="/Vitality-logo.jpg" alt="Vitality" className="h-10 transition duration-300 ease-in-out hover:blur-sm" />
</a>
<a href="https://www.wpa.org.uk/" target="_blank" rel="noopener noreferrer">
  <img src="/WPA-logo.webp" alt="WPA" className="h-10 transition duration-300 ease-in-out hover:blur-sm" />
</a>
<a href="https://finder.bupa.co.uk/Consultant/view/226316/dr_sujata_khambekar" target="_blank" rel="noopener noreferrer">
  <img src="/Bupa-logo.webp" alt="Bupa" className="h-10 transition duration-300 ease-in-out hover:blur-sm" />
</a>
<a href="https://www.nuffieldhealth.com/consultants/dr-sujata-khambekar" target="_blank" rel="noopener noreferrer">
  <img src="/nuffield-logo.png" alt="Nuffield Health" className="h-10 transition duration-300 ease-in-out hover:blur-sm" />
</a>
<a href="https://www.allianz.co.uk/" target="_blank" rel="noopener noreferrer">
  <img src="/allianz-logo.png" alt="Allianz Healthcare" className="h-10 transition duration-300 ease-in-out hover:blur-sm" />
</a>
        </div>
        <p className="text-xs">© 2019–{new Date().getFullYear()} The Cardiology Clinic. All rights reserved.</p>
      </footer>
    </main>
  );
}
