import { Container, Section, Button } from "@/components/ui";

export default function NotFound() {
  return (
    <Section>
      <Container>
        <div className="mx-auto max-w-lg py-16 text-center">
          <p className="font-mono text-sm text-accent">404</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight">
            This page didn&apos;t pass evaluation.
          </h1>
          <p className="mt-3 text-muted">
            The link is broken or the page has moved. Let&apos;s get you back to
            something that works.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Button href="/">Home</Button>
            <Button href="/work" variant="outline">
              Case studies
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
