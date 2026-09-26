export default function NewsletterSignup() {
  const signupUrl = process.env.NEXT_PUBLIC_NEWSLETTER_SIGNUP_URL;

  if (!signupUrl) {
    return (
      <p className="newsletter-status">
        Newsletter signup is being prepared for launch.
      </p>
    );
  }

  return (
    <form action={signupUrl} method="post">
      <input
        type="email"
        name="email"
        placeholder="Email address"
        aria-label="Email address"
        autoComplete="email"
        required
      />
      <button type="submit">Subscribe</button>
    </form>
  );
}
