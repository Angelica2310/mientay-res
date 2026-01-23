export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[--background] px-4 mt-35">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <section className="mb-10">
          <h1 className="text-4xl font-light tracking-wide text-[--textMain]">
            Terms & Conditions
          </h1>
          <p className="mt-3 text-sm text-[--textMain]/70">
            Last updated: {new Date().toLocaleDateString("en-GB")}
          </p>
        </section>

        {/* Content */}
        <section className="space-y-8 text-sm leading-relaxed text-[--textMain]/80">
          <div>
            <h2 className="mb-2 text-base font-medium text-[--textMain]">
              1. About us
            </h2>
            <p>
              This website is operated by Mien Tay Restaurant Ltd, an
              independent Vietnamese restaurant based in Shoreditch, London. The
              website is provided to share information about our restaurant,
              menus, bookings, and private dining enquiries.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-base font-medium text-[--textMain]">
              2. Bookings & enquiries
            </h2>
            <ul className="list-disc space-y-1 pl-5">
              <li>
                All bookings are subject to availability and confirmation.
              </li>
              <li>
                Submitting an online booking request does not guarantee a
                reservation.
              </li>
              <li>Minimum group sizes and booking policies may vary.</li>
              <li>
                For smaller groups or special requests, customers may be asked
                to contact the restaurant directly.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="mb-2 text-base font-medium text-[--textMain]">
              3. Menus & information
            </h2>
            <p>
              Menu items, prices, and availability are subject to change without
              notice. While we aim to keep information accurate, occasional
              errors may occur.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-base font-medium text-[--textMain]">
              4. Allergies & dietary requirements
            </h2>
            <p>
              We welcome dietary requests; however, we cannot guarantee that any
              dish is completely allergen-free. Customers are responsible for
              informing staff of allergies or dietary requirements.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-base font-medium text-[--textMain]">
              5. Use of this website
            </h2>
            <p>
              You agree not to misuse this website, attempt to disrupt its
              operation, or submit false or misleading information.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-base font-medium text-[--textMain]">
              6. Liability
            </h2>
            <p>
              We are not responsible for temporary website downtime, technical
              issues beyond our control, or reliance on information that may be
              outdated or incorrect. Nothing in these terms limits liability
              where it would be unlawful to do so under UK law.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-base font-medium text-[--textMain]">
              7. Changes to these terms
            </h2>
            <p>
              These terms may be updated from time to time. The latest version
              will always be available on this page.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-base font-medium text-[--textMain]">
              8. Contact
            </h2>
            <p>
              If you have any questions about these terms, please contact us
              directly.
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
