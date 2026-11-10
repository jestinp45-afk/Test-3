# Transformer — Consolidated Feature Specification

## Product identity
- Name: Transformer
- Motto: Transform your mind. Strengthen your faith. Discipline your life.
- Category: Christian lifestyle, Bible study, personal discipline, productivity
- Contact: jestinp843@gmail.com
- Permanent brand: Forest Green `#173F35`, Gold `#D5AD59`, Warm Cream `#F6F0E3`, Sage Green accents.

## Weekly themes
- Monday: Forest & Gold — growth/new beginnings
- Tuesday: Ocean Blue — peace/trust
- Wednesday: Lavender — reflection/wisdom
- Thursday: Sunrise Peach — motivation/action
- Friday: Amber & Brown — discipline/strength
- Saturday: Teal & Mint — renewal/balance
- Sunday: Midnight Blue & Silver — faith/rest/gratitude
- Nature scenes should match the day. Keep logo and bottom navigation Forest Green + Gold. Theme preview belongs in Settings/More; allow return to automatic rotation.

## Navigation and section order
- Bottom tabs: Home, Tasks, Bible, Principles, More.
- Principles section order: (1) Calendar, (2) Daily Principles, (3) Tasks and Progress.
- Home remains the dashboard and is not replaced by Calendar.

## Home
- Current local date and day-of-year, greeting, current theme, quick links.
- Main verse: Isaiah 22:22 (KJV), with correct reference/translation, short explanation, practical application, read passage and save actions. Clearly separate devotional commentary from Bible quotation.
- Today's tasks, activities, pending/completed summary, reminders and Calendar shortcut.
- Three assigned principles with reference and practical action.
- Malayalam Pentecostal worship song recommendation with verified artist where available and external listening/search link; no claim of in-app streaming.
- Reflection/journal shortcut.

## Tasks
- Create/edit/delete, date/time/deadline, optional reminder, priority (low/medium/high), category, completion state, overdue/upcoming/date/category filters, daily/weekly completion, history, principle links.
- Categories: Prayer & spiritual growth, Bible reading, College & studies, Assignments & revision, Health & exercise, Personal development, Family & responsibilities, Other.
- Users can customise tasks and schedules.

## Bible
- Intended full English/Malayalam reader, book/chapter/verse navigation, translation selector where supported, search, text-size control, bookmarks/highlights/notes, reading plans, progress and offline content where licensed.
- Verify rights for each translation. Current bundled sample text is not a complete Bible.
- Topic discovery: faith, prayer, wisdom, worry, patience, discipline, relationships, responsibility, gratitude, forgiveness, growth.

## Twelve principles
1. Put God first — Proverbs 3:5–6.
2. Respect others — Romans 12:10.
3. Speak wisely — James 1:19.
4. Take responsibility — Colossians 3:23.
5. Stay focused — Proverbs 4:25–27.
6. Replace worry with prayer — Philippians 4:6–7.
7. Practise patience — Psalm 27:14.
8. Take action — James 2:17.
9. Plan wisely — Proverbs 21:5.
10. Trust God's guidance — Proverbs 16:3.
11. Practise self-control — Galatians 5:22–23.
12. Manage money wisely — Luke 14:28.

Each principle should have a passage, plain-language meaning, practical action, checklist, optional reflection, completion state, and date-based history. Three principles per day; rotation may reinforce repeats but must reuse the original 12 records.

Daily rotation:
- Monday: Put God first; Plan wisely; Take action.
- Tuesday: Practise self-control; Stay focused; Take responsibility.
- Wednesday: Speak wisely; Respect others; Practise patience.
- Thursday: Take responsibility; Practise self-control; Plan wisely.
- Friday: Stay focused; Trust God's guidance; Put God first.
- Saturday: Take action; Manage money wisely; Practise self-control.
- Sunday: Trust God's guidance; Practise patience; Speak wisely.

## Five Daily Questions — do not add 12 extra daily questions
1. Morning: “What are the three most important tasks I must complete today?”
2. Morning: “Have I planned time for prayer and Bible reading today?”
3. During day: “What distraction should I avoid to finish my main task?”
4. Afternoon: “Which task have I completed, and what should I work on next?”
5. Evening: “What did I accomplish today, and what is tomorrow's first task?”

Save answers by date; allow historical review; link answers to tasks/principles; use checklists where appropriate; no guilt-based messages.

## Calendar and suggested timetable
- Month/week/day views, date selection, events, descriptions, times, recurring activities where supported, reminders, task links, historical and upcoming activities, local date/day-of-year.
- Example editable schedule: 7:25 AM prayer/Bible/planning; 9 AM study/work; 1 PM progress check; 2 PM study/work; 5 PM unfinished-task review; 9 PM reflection and tomorrow plan.

## More menu
- Daily Questions; Journal & Prayer Notes; Progress & Achievements; Appearance & Language; Notifications & Reminders; Feedback & Contact; About Transformer.
- Journal fields: date, title, reflection, prayer request, gratitude, related verse/principle. Private by default.
- Progress: tasks, Bible chapters/plans, principles, goals, journal and consistency; use real saved data, preserve history, no shame for missed days.
- Feedback: category, optional 1–5 rating, required message, email copy option, recipient `jestinp843@gmail.com`; backend success only after confirmation. Without a backend, open an email draft and state that the user must send it.
- Reminders: editable defaults 7:25 AM, 1 PM, 5 PM, 9 PM; toggles per reminder, permissions, no duplicates, local time.
- Settings: automatic/manual theme, previews, supported language/translation, text size, reminders, privacy, export/deletion where implemented, version/credits.

## Privacy and quality
- Local-first storage unless cloud sync is explicitly added and disclosed.
- Never upload private journal entries automatically.
- Disclose external image/music links and internet requirements.
- Test dates/time zones, theme rotation, storage persistence, all buttons, accessibility, notifications, feedback, Bible permissions, offline fallbacks, and production build.


## Added Bible topic guides
- Emotions & Inner Peace: fear/anxiety (Philippians 4:6–7), sadness (Psalm 34:18), anger (James 1:19–20), loneliness (Psalm 23:4), gratitude (1 Thessalonians 5:16–18), forgiveness (Ephesians 4:32).
- Decisions & Wisdom: ask for wisdom (James 1:5), trust God’s direction (Proverbs 3:5–6), plan ahead (Proverbs 21:5), good influences (1 Corinthians 15:33), think before choosing (Proverbs 14:15), responsibility (Colossians 3:23).
- Guidance & Spiritual Growth: guidance (Psalm 32:8), prayer (Jeremiah 33:3), Scripture as a lamp (Psalm 119:105), patience (Psalm 27:14), strength (Isaiah 41:10), commit plans (Proverbs 16:3).
- Each topic has a reference, short explanation, and practical action. References are not a substitute for a complete licensed Bible text.


## Approved implementation additions
- Offline-first access with a production service-worker shell/asset cache and the existing Firebase retry sync.
- Smart Calendar day/week/month agenda, task integration, and recurring event entries.
- Digital Sanctuary theme visuals: Sunday Silver Blossom; Monday Emerald Garden; Tuesday Ocean Breeze; Wednesday Lavender Garden; Thursday Peach Sunrise; Friday Warm Autumn Forest; Saturday Mint Garden. Include focus timer, presets, custom intervals, generated local ambient textures, and daily goal/history.
- Personal Growth Assistant suggestions based on saved activity; universal search; countdowns; recently deleted task recovery; local safety snapshots and JSON backup/restore; personalization controls; notification-centre view.
- Advanced task priorities, subtasks, and recurrence metadata.
- Settings appearance mode selector: Light, Dark, System.
- Remove the authenticated green synchronization/account strip while retaining authentication and background sync.
- Android widget concepts are included in-app; native Android AppWidget implementation is a separately disclosed follow-up.
