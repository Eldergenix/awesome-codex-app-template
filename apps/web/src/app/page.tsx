import { AuthButtons } from "../components/auth-buttons";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col gap-8 px-6 py-16">
      <section className="rounded-xl border border-border bg-muted p-8">
        <p className="text-sm text-muted-foreground">Enterprise mono-repo template</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">Web app ready</h1>
        <p className="mt-4 text-muted-foreground">
          Next.js 16, React 19, Tailwind CSS 4, AI SDK 6, and Supabase Auth are scaffolded.
        </p>
      </section>
      <AuthButtons />
    </main>
  );
}
