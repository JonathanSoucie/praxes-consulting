import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";
import { BookACall, BookingNote } from "@/components/book-a-call";
import { FaqList } from "@/components/sections/faq";
import { generalFaqs } from "@/content/faqs";
import styles from "./refined-home.module.css";

export function HomeClosing() {
  return (
    <>
      <section className={styles.questions} aria-labelledby="home-questions-title">
        <Container className={styles.questionsGrid}>
          <Reveal className={styles.questionsIntro}>
            <Eyebrow>Questions</Eyebrow>
            <h2 id="home-questions-title">Common questions.</h2>
            <p className={styles.questionsDeck}>Coverage, accuracy, and what to expect from your first engagement.</p>
            <Link href="/contact" className={styles.textLink}>
              Talk to us <ArrowRight size={16} aria-hidden />
            </Link>
          </Reveal>
          <Reveal delay={80} className={styles.faq}>
            <FaqList items={generalFaqs} />
          </Reveal>
        </Container>
      </section>

      <section className={styles.closing} aria-labelledby="home-closing-title">
        <Container>
          <Reveal className={styles.closingGrid}>
            <div>
              <Eyebrow>Next Step</Eyebrow>
              <h2 id="home-closing-title">Which distributors carry you?</h2>
              <p className={styles.closingCopy}>
                Tell us about your network, categories, and competitors. In thirty
                minutes, we’ll help you decide whether a census is worth running.
                No preparation required.
              </p>
            </div>
            <div className={styles.closingActions}>
              <BookACall size="lg" withArrow />
              <Link href="/services" className={styles.textLink}>
                Explore our services <ArrowRight size={16} aria-hidden />
              </Link>
              <BookingNote className={styles.bookingNote} />
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
