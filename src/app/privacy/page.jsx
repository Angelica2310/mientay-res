export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[--background] px-4 mt-35">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <section className="mb-10">
          <h1 className="text-4xl font-light tracking-wide text-[--textMain]">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-[--textMain]/70">
            Last updated: {new Date().toLocaleDateString("en-GB")}
          </p>
        </section>

        {/* Content */}
        <section className="space-y-8 text-sm leading-relaxed text-[--textMain]/80">
          <div>
            <h2 className="mb-2 text-base font-medium text-[--textMain]">
              1. Our commitment to your privacy
            </h2>
            <p>
              Mien Tay Restaurant is committed to protecting your personal data
              and respecting your privacy in accordance with UK data protection
              laws.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-base font-medium text-[--textMain]">
              2. Information we collect
            </h2>
            <p>We may collect personal information when you:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Submit a booking or enquiry form</li>
              <li>Contact us via the website</li>
            </ul>
            <p className="mt-2">
              This may include your name, email address, phone number, booking
              details, and any notes such as dietary or accessibility requests.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-base font-medium text-[--textMain]">
              3. How we use your information
            </h2>
            <ul className="list-disc space-y-1 pl-5">
              <li>To respond to booking requests and enquiries</li>
              <li>To manage reservations and private dining requests</li>
              <li>To contact you regarding your booking</li>
            </ul>
            <p className="mt-2">
              We do not sell or share your personal data for marketing purposes.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-base font-medium text-[--textMain]">
              4. Third-party services
            </h2>
            <p>
              Form submissions on this website are processed using EmailJS, a
              third-party service that delivers form data via email. EmailJS
              processes data only to deliver messages and does not use it for
              its own marketing.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-base font-medium text-[--textMain]">
              5. Data storage & retention
            </h2>
            <p>
              Booking and enquiry information is stored securely in our email
              inboxes and retained only for as long as necessary to manage
              customer communication.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-base font-medium text-[--textMain]">
              6. Cookies
            </h2>
            <p>
              This website does not use advertising or tracking cookies.
              Essential cookies may be used to ensure the site functions
              correctly.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-base font-medium text-[--textMain]">
              7. Your rights
            </h2>
            <p>
              Under UK data protection law, you have the right to request access
              to, correction of, or deletion of your personal data. To exercise
              these rights, please contact us directly.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-base font-medium text-[--textMain]">
              8. Changes to this policy
            </h2>
            <p>
              This Privacy Policy may be updated occasionally. Any changes will
              be posted on this page.
            </p>
          </div>
        </section>

        {/* Divider */}
        <div className="relative mt-12">
          <div className="h-px w-full bg-[--textMain]/15" />
          <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-[--accent]/60" />
        </div>
      </div>
    </main>
  );
}
