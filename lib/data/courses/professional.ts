import type { Course, Stage } from '@/lib/types';

// ─── 1. UI/UX Design Fundamentals ────────────────────────────────────────────
const uiuxStages: Stage[] = [
  {
    id: 'ux-s1',
    courseId: 'ui-ux-design',
    order: 1,
    title: 'User Research & Problem Framing',
    description: 'Understand user needs before writing code or drawing mockups.',
    lessons: [
      {
        id: 'ux-s1-l1',
        stageId: 'ux-s1',
        courseId: 'ui-ux-design',
        order: 1,
        title: 'Jobs-to-be-Done & User Personas',
        content: `## The Jobs-to-be-Done (JTBD) Framework

Users do not buy software because they want features; they "hire" a product to make progress in their life:

\`\`\`
"When [Situation / Context],
I want to [Motivation / Action],
So I can [Expected Outcome / Relief]."
\`\`\`

Example:
*"When I am commuting on the subway, I want to complete a 3-minute quiz, so I can feel productive without internet connectivity."*

Understanding the core job prevents building bloated features that nobody uses.`,
        exercise: {
          id: 'ux-s1-l1-ex',
          type: 'multiple-choice',
          question: 'According to the JTBD framework, what is the primary focus of user research?',
          options: [
            'Listing all technical features requested by stakeholders',
            'Understanding the underlying progress and outcome the user seeks to achieve',
            'Designing colorful visual mockups',
            'Counting button clicks in Google Analytics',
          ],
          correctAnswer: 1,
          explanation:
            'JTBD centers on the desired outcome and functional/emotional progress a user wants to achieve in a specific context.',
          hint: 'It is about the progress and outcome, not feature lists.',
        },
      },
    ],
  },
  {
    id: 'ux-s2',
    courseId: 'ui-ux-design',
    order: 2,
    title: 'Information Architecture & Wireframes',
    description: 'Structuring screen hierarchy, flow, and low-fidelity prototypes.',
    lessons: [
      {
        id: 'ux-s2-l1',
        stageId: 'ux-s2',
        courseId: 'ui-ux-design',
        order: 1,
        title: 'Visual Hierarchy & Scanning Patterns',
        content: `## The F-Pattern and Visual Hierarchy

Users rarely read websites word-for-word; they scan in F-shaped or Z-shaped eye patterns:

1. **Size & Scale:** Important elements must be clearly larger.
2. **Contrast:** Key actions (Primary CTA) must visually contrast with surfaces.
3. **White Space:** Generous breathing room signals elegance and decreases cognitive load.
4. **Proximity:** Items placed near each other are perceived as related (Gestalt principle).

\`\`\`
Golden Rule:
A user should be able to identify the primary action on any screen within 3 seconds.
\`\`\``,
        exercise: {
          id: 'ux-s2-l1-ex',
          type: 'multiple-choice',
          question: 'Which Gestalt principle states that objects placed close together are perceived as belonging to a group?',
          options: ['Law of Proximity', 'Law of Continuity', 'Law of Closure', 'Law of Symmetry'],
          correctAnswer: 0,
          explanation: 'The Law of Proximity states that elements positioned near each other are naturally grouped by the human brain.',
          hint: 'Proximity means closeness.',
        },
      },
    ],
  },
  {
    id: 'ux-s3',
    courseId: 'ui-ux-design',
    order: 3,
    title: 'Usability Heuristics & Testing',
    description: 'Nielsen Norman heuristics and running effective usability tests.',
    lessons: [
      {
        id: 'ux-s3-l1',
        stageId: 'ux-s3',
        courseId: 'ui-ux-design',
        order: 1,
        title: 'Visibility of System Status',
        content: `## Jakob Nielsen’s #1 Heuristic

*"The system should always keep users informed about what is going on, through appropriate feedback within reasonable time."*

Examples:
- When a file uploads, show a percentage progress bar.
- When an AI response is being generated, display a clear typing indicator.
- When saving, change button state to "Saved" or show a subtle checkmark.

Leaving a user staring at a frozen button leads to rage clicks, duplicate requests, and immediate churn.`,
        exercise: {
          id: 'ux-s3-l1-ex',
          type: 'multiple-choice',
          question: 'Which of the following is an example of satisfying the "Visibility of System Status" heuristic?',
          options: [
            'Using a fancy gradient background',
            'Displaying an animated progress indicator while submitting a form',
            'Hiding the submit button until all fields are clicked',
            'Removing text labels from navigation icons',
          ],
          correctAnswer: 1,
          explanation:
            'A progress indicator gives timely, understandable feedback about the system’s background operation.',
          hint: 'Feedback shows the user what is currently happening.',
        },
      },
    ],
  },
];

// ─── 2. Digital Marketing & Strategy ─────────────────────────────────────────
const marketingStages: Stage[] = [
  {
    id: 'dm-s1',
    courseId: 'digital-marketing',
    order: 1,
    title: 'Marketing Funnels & Customer Journey',
    description: 'TOFU, MOFU, BOFU, and moving users from awareness to advocacy.',
    lessons: [
      {
        id: 'dm-s1-l1',
        stageId: 'dm-s1',
        courseId: 'digital-marketing',
        order: 1,
        title: 'The Modern Acquisition Funnel',
        content: `## The Three Funnel Stages

Marketing is not just advertising; it is guiding an audience along an intentional journey:

- **TOFU (Top of Funnel - Awareness):** The prospect discovers they have a problem. Educational blog posts, organic social media, podcasts.
- **MOFU (Middle of Funnel - Consideration):** The prospect evaluates potential solutions. Case studies, product comparisons, webinars.
- **BOFU (Bottom of Funnel - Decision):** The prospect is ready to choose. Free trials, demos, discounts, customer testimonials.

\`\`\`
Mistake: Pitching a hard-sell demo to a Top-of-Funnel visitor
who only just discovered they have a challenge.
\`\`\``,
        exercise: {
          id: 'dm-s1-l1-ex',
          type: 'multiple-choice',
          question: 'Which content format is most typical for a Top-of-Funnel (TOFU) awareness audience?',
          options: ['A detailed pricing calculator', 'An educational guide answering "How to solve X"', 'A sales contract', 'A 14-day checkout page'],
          correctAnswer: 1,
          explanation: 'TOFU content solves educational queries and introduces the problem before pitching products.',
          hint: 'Top of funnel is educational, not closing sales.',
        },
      },
    ],
  },
  {
    id: 'dm-s2',
    courseId: 'digital-marketing',
    order: 2,
    title: 'Search Intent & Content Strategy',
    description: 'Understanding informational vs. transactional keywords and distribution.',
    lessons: [
      {
        id: 'dm-s2-l1',
        stageId: 'dm-s2',
        courseId: 'digital-marketing',
        order: 1,
        title: 'Matching Content to Search Intent',
        content: `## Four Types of Search Intent

Search engines rank content that directly answers what the searcher actually wants:

1. **Informational:** *"How do Python loops work"* → Wants a tutorial or explanation.
2. **Navigational:** *"Kivora login"* → Wants to reach a specific webpage.
3. **Commercial Investigation:** *"Best AI language learning platforms 2026"* → Comparing options.
4. **Transactional:** *"Buy Kivora Pro subscription"* → Ready to make a purchase.

Never try to rank a sales page for an informational search query.`,
        exercise: {
          id: 'dm-s2-l1-ex',
          type: 'multiple-choice',
          question: 'What search intent does the query "best noise-cancelling headphones comparison" represent?',
          options: ['Transactional', 'Commercial Investigation', 'Navigational', 'Informational'],
          correctAnswer: 1,
          explanation: 'Comparing products before deciding to purchase represents Commercial Investigation intent.',
          hint: 'The user is comparing before buying.',
        },
      },
    ],
  },
  {
    id: 'dm-s3',
    courseId: 'digital-marketing',
    order: 3,
    title: 'Unit Economics: CAC & LTV',
    description: 'Measuring customer acquisition cost and lifetime value.',
    lessons: [
      {
        id: 'dm-s3-l1',
        stageId: 'dm-s3',
        courseId: 'digital-marketing',
        order: 1,
        title: 'The Golden Ratio: LTV / CAC',
        content: `## Sustainable Unit Economics

Two critical metrics determine whether a digital business thrives or burns cash:

- **CAC (Customer Acquisition Cost):** Total sales & marketing spend divided by new customers acquired.
- **LTV (Customer Lifetime Value):** The total net profit a customer generates across their relationship with you.

\`\`\`
The Golden Benchmark:
LTV : CAC ≥ 3 : 1
\`\`\`

If your LTV:CAC is 1:1, you are breaking even or losing money after operational overhead. If it is 5:1+, you are likely under-investing in growth.`,
        exercise: {
          id: 'dm-s3-l1-ex',
          type: 'multiple-choice',
          question: 'If you spend $1,000 on marketing and acquire 20 paying customers, what is your CAC?',
          options: ['$20', '$50', '$200', '$500'],
          correctAnswer: 1,
          explanation: '$1,000 divided by 20 customers = $50 Customer Acquisition Cost.',
          hint: '1000 / 20 = 50.',
        },
      },
    ],
  },
];

// ─── 3. Project Management Essentials ────────────────────────────────────────
const pmStages: Stage[] = [
  {
    id: 'pm-s1',
    courseId: 'project-management',
    order: 1,
    title: 'The Triple Constraint & Scope',
    description: 'Balancing Scope, Time, and Budget to deliver successful projects.',
    lessons: [
      {
        id: 'pm-s1-l1',
        stageId: 'pm-s1',
        courseId: 'project-management',
        order: 1,
        title: 'Scope, Time, and Cost',
        content: `## The Iron Triangle

Every project operates under the constraint of three interdependent forces:

1. **Scope:** What features and deliverables must be built.
2. **Time:** The schedule and deadline for delivery.
3. **Cost (Budget / Resources):** The team members, tools, and budget available.

\`\`\`
The fundamental truth:
You cannot change one corner without affecting at least one of the other two.
If the deadline moves up (Time decreases), you must either:
- Cut features (Decrease Scope), or
- Add engineers/budget (Increase Cost).
\`\`\``,
        exercise: {
          id: 'pm-s1-l1-ex',
          type: 'multiple-choice',
          question: 'If a project client suddenly demands 5 new features without extending the deadline, what must happen?',
          options: [
            'Quality will drop unless more resources are added, or existing scope is deprioritized',
            'Nothing, the team will automatically work twice as fast',
            'The project scope stays identical',
            'The schedule automatically extends without approval',
          ],
          correctAnswer: 0,
          explanation:
            'Increasing scope with fixed time requires increasing resources (cost) or deprioritizing other items; otherwise quality degrades.',
          hint: 'The triple constraint must remain balanced.',
        },
      },
    ],
  },
  {
    id: 'pm-s2',
    courseId: 'project-management',
    order: 2,
    title: 'Agile & Scrum in Action',
    description: 'Sprints, backlogs, user stories, and daily ceremonies.',
    lessons: [
      {
        id: 'pm-s2-l1',
        stageId: 'pm-s2',
        courseId: 'project-management',
        order: 1,
        title: 'The Scrum Framework & Sprint Cadence',
        content: `## Iterative Delivery with Scrum

Scrum organizes work into fixed timeboxes called **Sprints** (typically 1–2 weeks):

- **Product Backlog:** Prioritized master list of features and bug fixes maintained by the Product Owner.
- **Sprint Planning:** The team pulls high-priority items into the Sprint Backlog.
- **Daily Standup:** 15-minute sync: *What did I do yesterday? What will I do today? Any blockers?*
- **Sprint Review & Demo:** Present working software to stakeholders.
- **Sprint Retrospective:** Team reflection: *What went well? What can we improve next sprint?*`,
        exercise: {
          id: 'pm-s2-l1-ex',
          type: 'multiple-choice',
          question: 'What is the primary objective of the Sprint Retrospective meeting?',
          options: [
            'To sell features to customers',
            'For the team to inspect its internal process and identify concrete improvements for the next sprint',
            'To write code together',
            'To evaluate employee salaries',
          ],
          correctAnswer: 1,
          explanation:
            'The Retrospective is dedicated to team reflection and continuous improvement of collaboration and workflow.',
          hint: 'Retrospective means looking back to improve.',
        },
      },
    ],
  },
  {
    id: 'pm-s3',
    courseId: 'project-management',
    order: 3,
    title: 'Risk Management & Mitigation',
    description: 'Identifying, scoring, and mitigating project risks before they become crises.',
    lessons: [
      {
        id: 'pm-s3-l1',
        stageId: 'pm-s3',
        courseId: 'project-management',
        order: 1,
        title: 'Probability vs. Impact Matrix',
        content: `## Risk Assessment

A **risk** is an uncertain event that, if it occurs, has an effect on project objectives.

Assess each risk on two axes (1–5 scale):
\`Risk Score = Probability × Impact\`

Strategies for handling risk:
- **Avoid:** Change the project plan to eliminate the threat entirely.
- **Mitigate:** Take proactive action to reduce probability or impact (e.g., adding unit tests).
- **Transfer:** Shift the risk to a third party (e.g., insurance, vendor SLA).
- **Accept:** Acknowledge the risk and prepare a contingency fund.`,
        exercise: {
          id: 'pm-s3-l1-ex',
          type: 'multiple-choice',
          question: 'What risk response strategy is being used when a team writes automated integration tests to reduce regression bugs?',
          options: ['Risk Avoidance', 'Risk Mitigation', 'Risk Transfer', 'Risk Acceptance'],
          correctAnswer: 1,
          explanation: 'Writing tests reduces the likelihood and severity of bugs, which is the definition of Risk Mitigation.',
          hint: 'Mitigating means reducing the impact or probability.',
        },
      },
    ],
  },
];

// ─── 4. Entrepreneurship & Startup Foundations ───────────────────────────────
const startupStages: Stage[] = [
  {
    id: 'ent-s1',
    courseId: 'entrepreneurship',
    order: 1,
    title: 'Problem Discovery & Customer Interviews',
    description: 'Validate problems and avoid building things nobody wants.',
    lessons: [
      {
        id: 'ent-s1-l1',
        stageId: 'ent-s1',
        courseId: 'entrepreneurship',
        order: 1,
        title: 'The Mom Test: Finding Honest Truth',
        content: `## How to Talk to Customers

People lie to you when they know you are an entrepreneur seeking compliments. The **Mom Test** principles:

1. **Talk about their life and past behavior, not your idea:**
   - Bad: *"Would you buy an app that organizes your study notes?"* (They will say yes to be polite!)
   - Good: *"How did you organize your notes last semester? How much did you pay for tools?"*
2. **Ask about specific past events, not generic futures:**
   - *"Tell me about the last time you struggled with this problem..."*
3. **Listen more than you talk.** You are a detective, not a salesperson.`,
        exercise: {
          id: 'ent-s1-l1-ex',
          type: 'multiple-choice',
          question: 'Which question adheres best to The Mom Test methodology?',
          options: [
            '"Do you think an AI tutor is a cool concept?"',
            '"How did you prepare for your last exam, and what was the hardest part?"',
            '"Would you pay $5/month if our app has quiz features?"',
            '"Do you like our new orange logo?"',
          ],
          correctAnswer: 1,
          explanation:
            'It asks about a concrete past experience and specific pain points rather than asking for speculative opinions or validation of an idea.',
          hint: 'Ask about past behavior, not hypothetical opinions.',
        },
      },
    ],
  },
  {
    id: 'ent-s2',
    courseId: 'entrepreneurship',
    order: 2,
    title: 'The Lean Canvas & Business Models',
    description: 'Deconstruct your venture on a single page.',
    lessons: [
      {
        id: 'ent-s2-l1',
        stageId: 'ent-s2',
        courseId: 'entrepreneurship',
        order: 1,
        title: 'Unique Value Proposition (UVP)',
        content: `## Crafting a Clear UVP

Your Unique Value Proposition is a single clear statement describing:
1. What benefit you deliver.
2. Who your target audience is.
3. How you solve it differently from existing alternatives.

\`\`\`
Formula:
"We help [Target Customer] solve [Problem] through [Differentiation],
unlike [Existing Ineffective Alternative]."
\`\`\`

Example:
*"Kivora helps busy students master practical skills through 5-minute interactive lessons with a private AI tutor, unlike passive video platforms with 30-minute lectures."*`,
        exercise: {
          id: 'ent-s2-l1-ex',
          type: 'multiple-choice',
          question: 'What is the primary role of a Unique Value Proposition (UVP)?',
          options: [
            'To list every feature in the engineering backlog',
            'To clearly communicate the unique benefit and differentiation to the customer',
            'To calculate gross margin percentages',
            'To file intellectual property patents',
          ],
          correctAnswer: 1,
          explanation: 'A UVP succinctly states why a customer should choose you over existing alternatives.',
          hint: 'Value proposition communicates unique benefits clearly.',
        },
      },
    ],
  },
  {
    id: 'ent-s3',
    courseId: 'entrepreneurship',
    order: 3,
    title: 'MVP Definition & Pitching',
    description: 'Building the smallest thing that delivers real customer value.',
    lessons: [
      {
        id: 'ent-s3-l1',
        stageId: 'ent-s3',
        courseId: 'entrepreneurship',
        order: 1,
        title: 'What a Minimum Viable Product Really Is',
        content: `## Minimum Viable Product (MVP)

An MVP is NOT a broken or low-quality product; it is the **smallest version** of your product that allows you to start the build-measure-learn loop:

\`\`\`
Analogy:
If you want to build a car:
- Bad: Start with a wheel (useless alone), then axle, then chassis.
- Good: Start with a skateboard (transports a person immediately!),
  then bicycle, then scooter, then car.
\`\`\`

Each iteration must provide complete, standalone value to the user while testing a critical hypothesis.`,
        exercise: {
          id: 'en-s3-l1-ex',
          type: 'multiple-choice',
          question: 'What is the true purpose of launching an MVP?',
          options: [
            'To release a half-finished app with bugs',
            'To test core commercial hypotheses with real users with minimal resource expenditure',
            'To impress venture capitalists before testing with users',
            'To finish software development permanently',
          ],
          correctAnswer: 1,
          explanation: 'An MVP exists to validate key assumptions and learn quickly from user behavior.',
          hint: 'Learning with minimum wasted effort.',
        },
      },
    ],
  },
];

// ─── 5. Professional Communication & Negotiation ─────────────────────────────
const commStages: Stage[] = [
  {
    id: 'comm-s1',
    courseId: 'communication-skills',
    order: 1,
    title: 'Active Listening & Empathy',
    description: 'Listen to understand rather than simply waiting for your turn to speak.',
    lessons: [
      {
        id: 'comm-s1-l1',
        stageId: 'comm-s1',
        courseId: 'communication-skills',
        order: 1,
        title: 'Paraphrasing and Mirroring',
        content: `## The 3 Levels of Listening

Most people operate at Level 1 (Internal: thinking about what *they* will say next). Professional communicators practice Level 2 and 3:

1. **Mirroring:** Repeating the last 1–3 critical words with an inquisitive tone.
2. **Paraphrasing:** Restating the speaker’s thoughts in your own words:
   *"If I understand correctly, your primary concern is meeting the Friday deadline..."*
3. **Emotional Validation:** Naming the unspoken emotion:
   *"It sounds like this delay has created a lot of frustration for your team."*

When people feel deeply understood, defensiveness drops immediately.`,
        exercise: {
          id: 'comm-s1-l1-ex',
          type: 'multiple-choice',
          question: 'Which response demonstrates effective paraphrasing when a colleague says: "We are overwhelmed with client revisions"?',
          options: [
            '"You shouldn’t worry so much."',
            '"So it sounds like the current volume of client feedback is putting heavy pressure on your team’s capacity?"',
            '"Well, my team worked 50 hours last week too."',
            '"Let me tell you about my morning."',
          ],
          correctAnswer: 1,
          explanation:
            'It accurately mirrors the core concern without dismissing, competing, or redirecting to oneself.',
          hint: 'Acknowledge their exact situation and emotion.',
        },
      },
    ],
  },
  {
    id: 'comm-s2',
    courseId: 'communication-skills',
    order: 2,
    title: 'Structure & Persuasion: The STAR Method',
    description: 'Deliver compelling answers in interviews, pitches, and presentations.',
    lessons: [
      {
        id: 'comm-s2-l1',
        stageId: 'comm-s2',
        courseId: 'communication-skills',
        order: 1,
        title: 'The STAR Framework',
        content: `## Structuring Impact Stories

When explaining a past achievement or handling behavioral interview questions, use **STAR**:

- **S (Situation):** Set the context. Keep it brief (~15% of your time).
- **T (Task):** Describe your specific responsibility or challenge (~15%).
- **A (Action):** What exact actions did *you* take? Use "I", not just "we" (~50%).
- **R (Result):** Quantify the tangible outcome (~20%).

\`\`\`
Example:
"Last quarter our server costs spiked by 40% (S). I was tasked with cutting waste without degrading performance (T). I audited our database queries, cached frequent API endpoints with Redis, and consolidated unused containers (A). As a result, our monthly cloud bill dropped by 28% while latency improved by 45ms (R)."
\`\`\``,
        exercise: {
          id: 'comm-s2-l1-ex',
          type: 'multiple-choice',
          question: 'In the STAR framework, which part should receive the largest proportion of your explanation time?',
          options: ['Situation (Context)', 'Task (Responsibility)', 'Action (What you actually did)', 'Resume Summary'],
          correctAnswer: 2,
          explanation:
            'The Action step reveals your personal decision-making, skills, and initiative, and should comprise ~50% of your answer.',
          hint: 'The interviewer wants to know what YOU did.',
        },
      },
    ],
  },
  {
    id: 'comm-s3',
    courseId: 'communication-skills',
    order: 3,
    title: 'Constructive Feedback & Negotiation',
    description: 'Give feedback that builds trust and negotiate win-win agreements.',
    lessons: [
      {
        id: 'comm-s3-l1',
        stageId: 'comm-s3',
        courseId: 'communication-skills',
        order: 1,
        title: 'Nonviolent Communication (NVC) for Feedback',
        content: `## Separating Observation from Evaluation

When giving feedback, judgments create defensiveness (*"You are always disorganized"*). NVC uses 4 objective steps:

1. **Observation (Facts):** *"In the last 3 team meetings, your camera was off and you did not speak."* (Not an attack; a factual recording).
2. **Feeling (Impact):** *"I felt disconnected from your perspective."*
3. **Need:** *"Because we value full team alignment on architecture decisions."*
4. **Request (Actionable & Specific):** *"Could you share your thoughts during the next sprint planning?"*

Focus on the behavior and its consequence, never on character flaws.`,
        exercise: {
          id: 'comm-s3-l1-ex',
          type: 'multiple-choice',
          question: 'Which statement represents an objective observation rather than a subjective evaluation?',
          options: [
            '"You are always late and lazy."',
            '"You submitted the report 2 hours after the agreed 5:00 PM deadline."',
            '"You don’t care about our team goals."',
            '"Your presentation was boring."',
          ],
          correctAnswer: 1,
          explanation: 'It states a verifiable, timestamped fact without attaching personal insults or mind-reading.',
          hint: 'Look for the measurable, verifiable fact.',
        },
      },
    ],
  },
];

export const PROFESSIONAL_COURSES: Course[] = [
  {
    id: 'ui-ux-design',
    title: 'UX/UI Design Fundamentals',
    tagline: 'Design human-centered digital experiences that users love.',
    description:
      'Learn the core discipline of UX/UI. Master the Jobs-to-be-Done framework, visual hierarchy, low-fidelity wireframing, and Jakob Nielsen’s usability heuristics.',
    level: 'Beginner',
    category: 'professional',
    estimatedHours: 8,
    stages: uiuxStages,
    topicsPreview: [
      'Jobs-to-be-Done (JTBD) & persona mapping',
      'Visual hierarchy, scanning patterns & Gestalt principles',
      'Information architecture & low-fidelity wireframes',
      'Nielsen Norman usability heuristics',
      'Conducting practical user testing sessions',
    ],
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing & Strategy',
    tagline: 'Master acquisition funnels, content strategies, and unit economics.',
    description:
      'Drive measurable business growth. Understand TOFU/MOFU/BOFU funnels, search intent matching, and unit economics (CAC vs. LTV).',
    level: 'Beginner to Elementary',
    category: 'professional',
    estimatedHours: 8,
    stages: marketingStages,
    topicsPreview: [
      'The modern acquisition funnel (TOFU/MOFU/BOFU)',
      'Search intent and distribution strategy',
      'Customer Acquisition Cost (CAC) and Lifetime Value (LTV)',
      'Conversion rate optimization & A/B testing',
      'Email marketing and retention loops',
    ],
  },
  {
    id: 'project-management',
    title: 'Project Management',
    tagline: 'Deliver projects on time, within scope, and under budget.',
    description:
      'Lead initiatives with confidence. Master the Iron Triangle, Agile/Scrum ceremonies, sprint backlogs, and risk probability-impact matrices.',
    level: 'Beginner to Elementary',
    category: 'professional',
    estimatedHours: 8,
    stages: pmStages,
    topicsPreview: [
      'The Triple Constraint: Scope, Time, and Cost',
      'Agile principles & Scrum sprint lifecycle',
      'Writing effective user stories and acceptance criteria',
      'Risk probability vs. impact matrix',
      'Stakeholder communication and management',
    ],
  },
  {
    id: 'entrepreneurship',
    title: 'Entrepreneurship & Startup Fundamentals',
    tagline: 'Transform validated problems into sustainable business ventures.',
    description:
      'Build startups that solve real problems. Master customer discovery with The Mom Test, craft compelling Unique Value Propositions, and launch lean MVPs.',
    level: 'Beginner',
    category: 'professional',
    estimatedHours: 9,
    stages: startupStages,
    topicsPreview: [
      'Customer discovery & The Mom Test interview rules',
      'Crafting sharp Unique Value Propositions (UVP)',
      'The Lean Canvas one-page business model',
      'Defining and scoping a true Minimum Viable Product (MVP)',
      'Pitch decks and early customer acquisition',
    ],
  },
  {
    id: 'communication-skills',
    title: 'Professional Communication & Negotiation',
    tagline: 'Articulate ideas persuasively and resolve conflicts with empathy.',
    description:
      'Elevate your interpersonal impact. Learn active listening techniques, structure compelling stories with STAR, and deliver feedback using Nonviolent Communication.',
    level: 'Beginner to Elementary',
    category: 'professional',
    estimatedHours: 7,
    stages: commStages,
    topicsPreview: [
      'Active listening: Mirroring, paraphrasing, and validation',
      'The STAR method for impactful presentations and interviews',
      'Delivering constructive feedback via Nonviolent Communication',
      'Principled negotiation: Separating people from problems',
      'Managing high-stakes difficult conversations',
    ],
  },
];
