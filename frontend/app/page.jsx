import Link from "next/link";
import {
  FaArrowRight,
  FaCheck,
  FaChevronDown,
  FaCircleCheck,
  FaClock,
  FaEllipsis,
  FaLayerGroup,
  FaUsers,
} from "react-icons/fa6";
import styles from "./page.module.css";

const tasks = [
  {
    title: "Plan the product roadmap",
    detail: "Product · Today",
    color: "purple",
    status: "In progress",
    progress: "progressSixty",
  },
  {
    title: "Review design updates",
    detail: "Design · Today",
    color: "blue",
    status: "In review",
    progress: "progressEighty",
  },
  {
    title: "Prepare launch checklist",
    detail: "Marketing · Tomorrow",
    color: "green",
    status: "To do",
    progress: "progressTwenty",
  },
];

const features = [
  {
    icon: FaLayerGroup,
    title: "Organize tasks",
    description:
      "Keep projects and priorities in one clear place, so everyone knows what needs attention next.",
    tone: "blue",
  },
  {
    icon: FaCircleCheck,
    title: "Track your progress",
    description:
      "See work move forward at a glance and celebrate the milestones your team reaches together.",
    tone: "purple",
  },
  {
    icon: FaUsers,
    title: "Manage your team",
    description:
      "Bring people and projects together with shared workspaces that make collaboration feel simple.",
    tone: "green",
  },
];

export default function HomePage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link className={styles.brand} href="/" aria-label="TaskFlow home">
            <span className={styles.brandMark} aria-hidden="true">
              <FaCheck />
            </span>
            <span>taskflow</span>
          </Link>

          <nav className={styles.nav} aria-label="Main navigation">
            <Link className={styles.navLink} href="#features">
              Features
            </Link>
          </nav>

          <div className={styles.headerActions}>
            <Link className={styles.loginLink} href="/login">
              Log in
            </Link>
            <Link className={styles.headerCta} href="/register">
              Get started <FaArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </header>

      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <div className={styles.eyebrow}>
              <span className={styles.eyebrowDot} />
              Plan smarter. Get more done.
            </div>
            <h1 id="hero-title">
              Your work, organized.
              <span>Your goals, within reach.</span>
            </h1>
            <p className={styles.heroDescription}>
              Bring tasks, progress, and your team together in one thoughtful
              workspace. Spend less time keeping track, and more time moving
              forward.
            </p>
            <div className={styles.heroActions}>
              <Link className={styles.primaryCta} href="/register">
                Get started free <FaArrowRight aria-hidden="true" />
              </Link>
              <Link className={styles.secondaryCta} href="/login">
                Sign in
              </Link>
            </div>
            <p className={styles.heroNote}>
              <FaCheck aria-hidden="true" />
              A simpler way to make progress, together
            </p>
          </div>

          <div className={styles.previewWrap}>
            <div className={styles.previewGlow} aria-hidden="true" />
            <section
              className={styles.dashboardPreview}
              aria-label="Illustrative TaskFlow dashboard preview"
            >
              <div className={styles.previewTopbar}>
                <div className={styles.windowDots} aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </div>
                <span className={styles.previewLabel}>WORKSPACE PREVIEW</span>
                <FaEllipsis className={styles.previewEllipsis} aria-hidden="true" />
              </div>

              <div className={styles.previewContent}>
                <div className={styles.workspaceHeading}>
                  <div>
                    <span className={styles.workspaceEyebrow}>MONDAY, MAY 20</span>
                    <h2>Your workspace</h2>
                  </div>
                  <div
                    className={styles.avatarStack}
                    role="img"
                    aria-label="Illustrative team members"
                  >
                    <span>JD</span>
                    <span>AM</span>
                    <span>+2</span>
                  </div>
                </div>

                <div className={styles.overviewCard}>
                  <div className={styles.overviewText}>
                    <span>Weekly progress</span>
                    <strong>Nice momentum!</strong>
                    <small>Example progress for this preview</small>
                  </div>
                  <div
                    className={styles.progressRing}
                    role="img"
                    aria-label="Illustrative progress: 68 percent"
                  >
                    <div>
                      <strong>68%</strong>
                      <span>complete</span>
                    </div>
                  </div>
                </div>

                <div className={styles.taskHeader}>
                  <div>
                    <h3>Focus tasks</h3>
                    <span>Example tasks for your team</span>
                  </div>
                  <div className={styles.filterButton} aria-hidden="true">
                    This week <FaChevronDown aria-hidden="true" />
                  </div>
                </div>

                <div className={styles.taskList}>
                  {tasks.map((task) => (
                    <article className={styles.taskRow} key={task.title}>
                      <span
                        className={`${styles.taskIcon} ${styles[task.color]}`}
                        aria-hidden="true"
                      >
                        <FaCheck />
                      </span>
                      <div className={styles.taskInfo}>
                        <strong>{task.title}</strong>
                        <span>{task.detail}</span>
                      </div>
                      <div className={styles.taskStatus}>
                        <span className={`${styles.statusBadge} ${styles[task.color]}`}>
                          {task.status}
                        </span>
                        <span className={styles.taskProgress}>
                          <span className={styles[task.progress]} />
                        </span>
                      </div>
                    </article>
                  ))}
                </div>

                <div className={styles.previewFooter}>
                  <span><FaClock aria-hidden="true" /> Keep your week in view</span>
                  <span>Illustrative preview</span>
                </div>
              </div>
            </section>
            <div className={styles.floatingNote} aria-hidden="true">
              <span className={styles.floatingCheck}><FaCheck /></span>
              <span><strong>One step at a time</strong><small>Progress adds up</small></span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.features} id="features" aria-labelledby="features-title">
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeading}>
            <span className={styles.sectionEyebrow}>MADE FOR YOUR MOMENTUM</span>
            <h2 id="features-title">Everything in sync. Nothing in the way.</h2>
            <p>
              The essentials to keep your work clear, your progress visible, and
              your team connected.
            </p>
          </div>
          <div className={styles.featureGrid}>
            {features.map(({ icon: Icon, title, description, tone }) => (
              <article className={styles.featureCard} key={title}>
                <span className={`${styles.featureIcon} ${styles[tone]}`} aria-hidden="true">
                  <Icon />
                </span>
                <h3>{title}</h3>
                <p>{description}</p>
                <span className={styles.featureArrow} aria-hidden="true">
                  <FaArrowRight />
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.closingCta} aria-labelledby="closing-title">
        <div className={styles.closingInner}>
          <div>
            <span className={styles.closingEyebrow}>MAKE ROOM FOR WHAT MATTERS</span>
            <h2 id="closing-title">Ready to make work feel lighter?</h2>
            <p>Start organizing your next great idea with TaskFlow.</p>
          </div>
          <Link className={styles.closingButton} href="/register">
            Get started free <FaArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <Link className={styles.brand} href="/" aria-label="TaskFlow home">
            <span className={styles.brandMark} aria-hidden="true">
              <FaCheck />
            </span>
            <span>taskflow</span>
          </Link>
          <p>© {new Date().getFullYear()} TaskFlow. Made for meaningful work.</p>
        </div>
      </footer>
    </main>
  );
}
