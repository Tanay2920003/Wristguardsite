export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-background text-foreground py-20 px-6 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      <p className="text-foreground/70 mb-4">Last updated: {new Date().toLocaleDateString()}</p>
      
      <div className="space-y-8 text-foreground/80">
        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">1. Information We Collect</h2>
          <p>Watch Lock & Find uses Firebase to facilitate communication between your phone and smartwatch. We collect the minimum amount of data required to make the app function:</p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>Device identifiers to uniquely pair your phone and watch.</li>
            <li>Real-time command statuses (e.g., lock, ring, locate requests).</li>
            <li>GPS location data (only when specifically requested via the "Locate" feature).</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">2. How We Use Your Data</h2>
          <p>Your data is used strictly for the core functionality of the app. We do not sell, rent, or share your personal data with third parties. Device location is only fetched upon user request and is transmitted securely.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">3. Data Security</h2>
          <p>We use Google Firebase for backend infrastructure, ensuring industry-standard encryption in transit and at rest. Your phone and watch authenticate using your Google Account for secure access.</p>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">4. Device Administrator Permissions</h2>
          <p>The Android app requires "Device Administrator" permissions to provide the remote lock functionality. This permission is strictly used to lock your screen when requested via the smartwatch and for no other purpose.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">5. Contact Us</h2>
          <p>If you have any questions or concerns about this privacy policy, please contact us at support@watchlockfind.com.</p>
        </section>
      </div>
    </main>
  );
}
