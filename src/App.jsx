import React, { useState, useEffect, useMemo } from 'react';
import AuthGate from './AuthGate.jsx';
import { FeaturePanel } from './FeaturePanels.jsx';
import { ExtraPanel } from './ExtraPanels.jsx';
import { isNative, nativePermissionStatus, nativeRequestPermission, nativeScheduleReminders, nativeCancelAll, nativeTestNotification } from './native.js';
import {
  Home,
  CheckSquare,
  BookOpen,
  Compass,
  MoreHorizontal,
  Calendar as CalendarIcon,
  Bell,
  User,
  Plus,
  Check,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  Music,
  Moon,
  HelpCircle,
  FileText,
  Sparkles,
  Copy,
  ChevronLeft,
  ChevronRight,
  Search,
  Bookmark,
  Highlighter,
  Trash2,
  Pencil,
  XCircle,
  Clock,
  X,
  TrendingUp,
  Palette,
  Settings,
  Mail,
  Info,
  ShieldCheck,
  Sun,
  Flame,
  Share2,
  MessageSquare,
  Smartphone
} from 'lucide-react';

// ============================================================================
// 1. OFFICIAL TRANSFORMER BRAND EMBLEM (Pilgrim, Mountain, Cross & Bible)
// ============================================================================
function TransformerEmblem({ size = "md", showBorder = true }) {
  const dim = size === "lg" ? "w-14 h-14" : size === "sm" ? "w-8 h-8" : "w-10 h-10";
  return <div className={`${dim} rounded-2xl overflow-hidden shrink-0 shadow-lg ${showBorder ? 'border-2 border-[#D5AD59]' : ''}`}><img src="/transformer-logo.png" alt="Transformer logo" className="w-full h-full object-cover" /></div>;
}

// ============================================================================
// 2. THE 7 ROTATING WEEKLY THEMES
// ============================================================================
const THEMES = [
  {
    dayIndex: 0,
    dayName: 'Sunday',
    themeName: 'Midnight Blue & Silver',
    purpose: 'Faith, Rest, and Gratitude',
    primary: '#0F172A',
    accent: '#94A3B8',
    readingBg: '#F8FAFC',
    cardBorder: '#E2E8F0',
    swatches: ['#0F172A', '#94A3B8', '#FFFFFF'],
    scenicType: 'night',
    verse: {
      ref: 'Psalm 27:14 · KJV',
      text: '“Wait on the LORD: be of good courage, and he shall strengthen thine heart: wait, I say, on the LORD.”',
      meaning: 'Rest in His quiet assurance and divine strength.',
      application: 'Quiet your anxious heart and surrender control into His capable hands.'
    },
    principles: [10, 7, 3],
    song: {
      titleEn: 'Ente Daivam Swargathilundu',
      titleMl: 'എന്റെ ദൈവം സ്വർഗ്ഗത്തിലുണ്ട്',
      artist: 'Pr. Blesson Memana',
      theme: 'Faith & Resting in God'
    }
  },
  {
    dayIndex: 1,
    dayName: 'Monday',
    themeName: 'Forest & Gold',
    purpose: 'Growth and New Beginnings',
    primary: '#173F35',
    accent: '#D5AD59',
    readingBg: '#F6F0E3',
    cardBorder: '#E7DEC8',
    swatches: ['#173F35', '#D5AD59', '#F6F0E3'],
    scenicType: 'forest',
    verse: {
      ref: 'Isaiah 22:22 · KJV',
      text: '“And the key of the house of David will I lay upon his shoulder; so he shall open, and none shall shut; and he shall shut, and none shall open.”',
      meaning: 'The Lord holds sovereign authority over your open doors, career, and every season of life.',
      application: 'Trust that God has prepared the way for you this week. Step forward with bold confidence.'
    },
    principles: [1, 9, 8],
    song: {
      titleEn: 'Aathmavin Shakthiyode',
      titleMl: 'ആത്മാവിൻ ശക്തിയോടെ',
      artist: 'Pr. Blesson Memana',
      theme: 'Spiritual Renewal & Empowerment'
    }
  },
  {
    dayIndex: 2,
    dayName: 'Tuesday',
    themeName: 'Ocean Blue',
    purpose: 'Peace and Trust',
    primary: '#0F2C59',
    accent: '#38BDF8',
    readingBg: '#F0F9FF',
    cardBorder: '#BAE6FD',
    swatches: ['#0F2C59', '#38BDF8', '#FFFFFF'],
    scenicType: 'ocean',
    verse: {
      ref: 'Psalm 46:10 · KJV',
      text: '“Be still, and know that I am God: I will be exalted among the heathen, I will be exalted in the earth.”',
      meaning: 'God is in command; striving in anxiety produces no lasting fruit.',
      application: 'Take five minutes of silence during your busiest study hour to acknowledge His peace.'
    },
    principles: [11, 5, 4],
    song: {
      titleEn: 'Athiparin Maravil',
      titleMl: 'അതിപരന്റെ മറവിലിരിക്കും ഞാൻ',
      artist: 'Lordson Antony',
      theme: 'Safety & Trust in God'
    }
  },
  {
    dayIndex: 3,
    dayName: 'Wednesday',
    themeName: 'Lavender',
    purpose: 'Reflection and Wisdom',
    primary: '#581C87',
    accent: '#C084FC',
    readingBg: '#FAF5FF',
    cardBorder: '#E9D5FF',
    swatches: ['#581C87', '#C084FC', '#FFFFFF'],
    scenicType: 'lavender',
    verse: {
      ref: 'Proverbs 3:5–6 · KJV',
      text: '“Trust in the LORD with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths.”',
      meaning: 'Human wisdom is finite; God provides clear guidance when we yield our will to Him.',
      application: 'Pray before making a choice today, committing the outcome completely to the Lord.'
    },
    principles: [3, 2, 7],
    song: {
      titleEn: 'Nanma Niranja Vane',
      titleMl: 'നന്മ നിറഞ്ഞവനേ എന്റെ യേശു നാഥാ',
      artist: 'Dr. Blesson Memana',
      theme: 'Gratitude & Divine Mercy'
    }
  },
  {
    dayIndex: 4,
    dayName: 'Thursday',
    themeName: 'Sunrise Peach',
    purpose: 'Motivation and Action',
    primary: '#9A3412',
    accent: '#FB923C',
    readingBg: '#FFF7ED',
    cardBorder: '#FFEDD5',
    swatches: ['#9A3412', '#FB923C', '#FFFDF9'],
    scenicType: 'sunrise',
    verse: {
      ref: 'Colossians 3:23 · KJV',
      text: '“And whatsoever ye do, do it heartily, as to the Lord, and not unto men; Knowing that of the Lord ye shall receive the reward of the inheritance: for ye serve the Lord Christ.”',
      meaning: 'Every daily duty, study assignment, or job task is a direct offering of worship to Christ.',
      application: 'Give wholehearted diligence to your most tedious responsibility today.'
    },
    principles: [4, 11, 9],
    song: {
      titleEn: 'Yahova Ente Idayan',
      titleMl: 'യഹോവ എന്റെ ഇടയനാകുന്നു',
      artist: 'Immanuel Ministries',
      theme: 'Provision & Heavenly Guidance'
    }
  },
  {
    dayIndex: 5,
    dayName: 'Friday',
    themeName: 'Amber & Brown',
    purpose: 'Discipline and Strength',
    primary: '#451A03',
    accent: '#D97706',
    readingBg: '#FFFBEB',
    cardBorder: '#FDE68A',
    swatches: ['#451A03', '#D97706', '#FFFDF5'],
    scenicType: 'amber',
    verse: {
      ref: 'Proverbs 4:25–27 · KJV',
      text: '“Let thine eyes look right on, and let thine eyelids look straight before thee. Ponder the path of thy feet, and let all thy ways be established.”',
      meaning: 'Distraction is the enemy of spiritual and personal growth. Fix your focus on worthwhile goals.',
      application: 'Turn off notification pings and finish one key project without interruption.'
    },
    principles: [5, 10, 1],
    song: {
      titleEn: 'Krooshile Snehame',
      titleMl: 'ക്രൂശിലെ സ്നേഹമോർക്കുമ്പോൾ',
      artist: 'Pr. Reji Narayanan',
      theme: 'The Love of Calvary'
    }
  },
  {
    dayIndex: 6,
    dayName: 'Saturday',
    themeName: 'Teal & Mint',
    purpose: 'Renewal and Balance',
    primary: '#134E4A',
    accent: '#2DD4BF',
    readingBg: '#F0FDFA',
    cardBorder: '#CCFBF1',
    swatches: ['#134E4A', '#2DD4BF', '#FFFFFF'],
    scenicType: 'teal',
    verse: {
      ref: 'James 2:17 · KJV',
      text: '“Even so faith, if it hath not works, is dead, being alone.”',
      meaning: 'Genuine spiritual conviction expresses itself through practical, consistent discipline.',
      application: 'Convert good intentions into action: start that postponed assignment or chore today.'
    },
    principles: [8, 12, 11],
    song: {
      titleEn: 'Anugrahathinte Uravakal',
      titleMl: 'അനുഗ്രഹത്തിന്റെ ഉറവകളെ',
      artist: 'Classical Pentecostal Hymn',
      theme: 'Spiritual Revivals & Blessings'
    }
  }
];

// ============================================================================
// 3. THE 12 BIBLICAL PRINCIPLES DIRECTORY
// ============================================================================
const ALL_PRINCIPLES = [
  {
    id: 1,
    title: 'Put God first',
    ref: 'Proverbs 3:5–6',
    meaning: 'Trust God and seek His guidance when making decisions.',
    action: 'Begin the day with prayer and Bible reading before becoming occupied with other activities.',
    scriptureText: 'Trust in the Lord with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths.'
  },
  {
    id: 2,
    title: 'Respect everyone',
    ref: 'Romans 12:10',
    meaning: 'Treat people with kindness, dignity, and consideration.',
    action: 'Listen carefully, speak respectfully, and avoid unnecessary arguments.',
    scriptureText: 'Be kindly affectioned one to another with brotherly love; in honour preferring one another.'
  },
  {
    id: 3,
    title: 'Speak less and wisely',
    ref: 'James 1:19',
    meaning: 'Be quick to listen, slow to speak, and slow to become angry.',
    action: 'Pause before responding when you feel frustrated or provoked.',
    scriptureText: 'Wherefore, my beloved brethren, let every man be swift to hear, slow to speak, slow to wrath.'
  },
  {
    id: 4,
    title: 'Be serious and responsible',
    ref: 'Colossians 3:23',
    meaning: 'Work sincerely and give your best effort in all assignments.',
    action: 'Complete an important responsibility without waiting for someone to remind you.',
    scriptureText: 'And whatsoever ye do, do it heartily, as to the Lord, and not unto men.'
  },
  {
    id: 5,
    title: 'Improve focus',
    ref: 'Proverbs 4:25–27',
    meaning: 'Keep your attention on worthwhile goals and avoid unnecessary distractions.',
    action: 'Complete one important task before spending time on entertainment or social feeds.',
    scriptureText: 'Let thine eyes look right on, and let thine eyelids look straight before thee. Turn not to the right hand nor to the left: remove thy foot from evil.'
  },
  {
    id: 6,
    title: 'Stop unnecessary reassurance-seeking',
    ref: 'Philippians 4:6–7',
    meaning: 'Bring concerns to God in prayer while taking sensible steps forward.',
    action: 'Pause, pray, and identify one practical step instead of seeking anxious validation.',
    scriptureText: 'Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God.'
  },
  {
    id: 7,
    title: 'Wait patiently',
    ref: 'Psalm 27:14',
    meaning: 'Wait with courage and avoid making decisions impulsively.',
    action: 'Give yourself time to think and pray before reacting to difficult situations.',
    scriptureText: 'Wait on the LORD: be of good courage, and he shall strengthen thine heart: wait, I say, on the LORD.'
  },
  {
    id: 8,
    title: 'Act toward your dreams',
    ref: 'James 2:17',
    meaning: 'Good intentions should lead to practical, daily execution.',
    action: 'Start one tangible task you have been postponing today.',
    scriptureText: 'Even so faith, if it hath not works, is dead, being alone.'
  },
  {
    id: 9,
    title: 'Plan wisely',
    ref: 'Proverbs 21:5',
    meaning: 'Thoughtful planning helps people use time and resources effectively.',
    action: 'Prepare a realistic timetable and priority checklist for the following day.',
    scriptureText: 'The thoughts of the diligent tend only to plenteousness; but of every one that is hasty only to want.'
  },
  {
    id: 10,
    title: "Trust God's plan",
    ref: 'Proverbs 16:3',
    meaning: 'Commit your plans to God while continuing to act responsibly.',
    action: 'Review your primary goal, pray over it, and take the next sensible step.',
    scriptureText: 'Commit thy works unto the LORD, and thy thoughts shall be established.'
  },
  {
    id: 11,
    title: 'Practise self-control',
    ref: 'Galatians 5:22–23',
    meaning: 'Develop discipline in your words, emotional choices, and behavior.',
    action: 'Avoid one habit or distraction that regularly interferes with your responsibilities.',
    scriptureText: 'But the fruit of the Spirit is love, joy, peace, longsuffering, gentleness, goodness, faith, Meekness, temperance: against such there is no law.'
  },
  {
    id: 12,
    title: 'Manage money wisely',
    ref: 'Luke 14:28',
    meaning: 'Consider costs and plan your material resources carefully.',
    action: 'Review your spending or plan how to use available resources responsibly.',
    scriptureText: 'For which of you, intending to build a tower, sitteth not down first, and counteth the cost, whether he have sufficient to finish it?'
  }
];

// ============================================================================
// Complete 66-book index for the online KJV reader. Chapter text is fetched from a public Bible API.
// Internet is required for full chapter text; curated excerpts below remain available as a limited fallback.
const BIBLE_BOOK_INDEX = [
  ['Genesis',50],['Exodus',40],['Leviticus',27],['Numbers',36],['Deuteronomy',34],['Joshua',24],['Judges',21],['Ruth',4],['1 Samuel',31],['2 Samuel',24],['1 Kings',22],['2 Kings',25],['1 Chronicles',29],['2 Chronicles',36],['Ezra',10],['Nehemiah',13],['Esther',10],['Job',42],['Psalms',150],['Proverbs',31],['Ecclesiastes',12],['Song of Solomon',8],['Isaiah',66],['Jeremiah',52],['Lamentations',5],['Ezekiel',48],['Daniel',12],['Hosea',14],['Joel',3],['Amos',9],['Obadiah',1],['Jonah',4],['Micah',7],['Nahum',3],['Habakkuk',3],['Zephaniah',3],['Haggai',2],['Zechariah',14],['Malachi',4],
  ['Matthew',28],['Mark',16],['Luke',24],['John',21],['Acts',28],['Romans',16],['1 Corinthians',16],['2 Corinthians',13],['Galatians',6],['Ephesians',6],['Philippians',4],['Colossians',4],['1 Thessalonians',5],['2 Thessalonians',3],['1 Timothy',6],['2 Timothy',4],['Titus',3],['Philemon',1],['Hebrews',13],['James',5],['1 Peter',5],['2 Peter',3],['1 John',5],['2 John',1],['3 John',1],['Jude',1],['Revelation',22]
].map(([name, chapters], index) => ({ name, chapters, testament: index < 39 ? 'Old Testament' : 'New Testament' }));

// 4. CURATED BILINGUAL SCRIPTURE EXCERPTS (English KJV & Malayalam).
// This is not a complete Bible: only the verses listed below are available offline.
 // Verify Malayalam wording and obtain any required translation permissions before release.
// ============================================================================
const EXPANDED_BIBLE_BOOKS = [
  {
    id: 'isaiah22',
    nameEn: 'Isaiah 22',
    nameMl: 'യെശയ്യാവ് 22',
    testament: 'OT',
    topic: 'Divine Authority & The Key of David',
    verses: [
      {
        num: 20,
        en: 'And it shall come to pass in that day, that I will call my servant Eliakim the son of Hilkiah:',
        ml: 'അന്നാളിൽ ഞാൻ ഹിൽക്കീയാവിന്റെ മകനായ എല്യാക്കീം എന്ന എന്റെ ദാസനെ വിളിക്കും.'
      },
      {
        num: 21,
        en: 'And I will clothe him with thy robe, and strengthen him with thy girdle, and I will commit thy government into his hand: and he shall be a father to the inhabitants of Jerusalem, and to the house of Judah.',
        ml: 'ഞാൻ അവനെ നിന്റെ അങ്കി ധരിപ്പിച്ചു നിന്റെ കച്ചകൊണ്ടു അവനെ അരമുറുക്കി നിന്റെ ആധിപത്യം അവന്റെ കയ്യിൽ ഏല്പിക്കും; അവൻ യെരൂശലേംനിവാസികൾക്കും യെഹൂദാഗൃഹത്തിന്നും ഒരു അപ്പനായിരിക്കും.'
      },
      {
        num: 22,
        en: 'And the key of the house of David will I lay upon his shoulder; so he shall open, and none shall shut; and he shall shut, and none shall open.',
        ml: 'ഞാൻ ദാവീദ് ഗൃഹത്തിന്റെ താക്കോൽ അവന്റെ തോളിൽ വെക്കും; അവൻ തുറന്നാൽ ആരും അടക്കയില്ല; അവൻ അടെച്ചാൽ ആരും തുറക്കയും ഇല്ല.'
      },
      {
        num: 23,
        en: 'And I will fasten him as a nail in a sure place; and he shall be for a glorious throne to his father’s house.',
        ml: 'ഞാൻ അവനെ ഉറപ്പുള്ള സ്ഥലത്തു ഒരു ആണിയായി തറെക്കും; അവൻ തന്റെ പിതൃഭവനത്തിന്നു ഒരു മഹത്വസിംഹാസനമായിരിക്കും.'
      }
    ]
  },
  {
    id: 'proverbs3',
    nameEn: 'Proverbs 3',
    nameMl: 'സദൃശവാക്യങ്ങൾ 3',
    testament: 'OT',
    topic: 'Wholehearted Trust & Divine Direction',
    verses: [
      {
        num: 1,
        en: 'My son, forget not my law; but let thine heart keep my commandments:',
        ml: 'മകനേ, എന്റെ ഉപദേശം മറക്കരുതു; നിന്റെ ഹൃദയം എന്റെ കല്പനകളെ കാത്തുകൊള്ളട്ടെ.'
      },
      {
        num: 2,
        en: 'For length of days, and long life, and peace, shall they add to thee.',
        ml: 'അവ ദീർഘായുസ്സും ജീവകാലവും സമാധാനവും നിനക്കു വർദ്ധിപ്പിച്ചുതരും.'
      },
      {
        num: 3,
        en: 'Let not mercy and truth forsake thee: bind them about thy neck; write them upon the table of thine heart:',
        ml: 'ദയയും വിശ്വസ്തതയും നിന്നെ വിട്ടുപോകരുതു; അവയെ നിന്റെ കഴുത്തിൽ കെട്ടുക; നിന്റെ ഹൃദയത്തിന്റെ പലകയിൽ എഴുതുക.'
      },
      {
        num: 4,
        en: 'So shalt thou find favour and good understanding in the sight of God and man.',
        ml: 'അങ്ങനെ നീ ദൈവത്തിന്റെയും മനുഷ്യരുടെയും ദൃഷ്ടിയിൽ കൃപയും സൽബുദ്ധിയും പ്രാപിക്കും.'
      },
      {
        num: 5,
        en: 'Trust in the LORD with all thine heart; and lean not unto thine own understanding.',
        ml: 'പൂർണ്ണഹൃദയത്തോടെ യഹോവയിൽ ആശ്രയിക്ക; സ്വന്ത വിവേകത്തിൽ ഊന്നരുതു.'
      },
      {
        num: 6,
        en: 'In all thy ways acknowledge him, and he shall direct thy paths.',
        ml: 'നിന്റെ എല്ലാ വഴികളിലും അവനെ നിനച്ചുകൊൾക; അവൻ നിന്റെ പാതകളെ നേരെയാക്കും.'
      },
      {
        num: 7,
        en: 'Be not wise in thine own eyes: fear the LORD, and depart from evil.',
        ml: 'നിനക്കു തന്നേ നീ ജ്ഞാനിയായി തോന്നരുതു; യഹോവയെ ഭയപ്പെട്ടു ദോഷം വിട്ടുമാറുക.'
      },
      {
        num: 8,
        en: 'It shall be health to thy navel, and marrow to thy bones.',
        ml: 'അതു നിന്റെ ശരീരത്തിന്നു സൌഖ്യവും നിന്റെ അസ്ഥികൾക്കു തണുപ്പും ആയിരിക്കും.'
      }
    ]
  },
  {
    id: 'proverbs4',
    nameEn: 'Proverbs 4',
    nameMl: 'സദൃശവാക്യങ്ങൾ 4',
    testament: 'OT',
    topic: 'Guarding Your Heart & Unshakable Focus',
    verses: [
      {
        num: 20,
        en: 'My son, attend to my words; incline thine ear unto my sayings.',
        ml: 'മകനേ, എന്റെ വാക്കുകളെ ശ്രദ്ധിക്ക; എന്റെ വചനങ്ങളിലേക്കു നിന്റെ ചെവി ചായിക്ക.'
      },
      {
        num: 23,
        en: 'Keep thy heart with all diligence; for out of it are the issues of life.',
        ml: 'സകലജാഗ്രതയോടുംകൂടെ നിന്റെ ഹൃദയത്തെ കാത്തുകൊൾക; ജീവന്റെ ഉത്ഭവം അതിൽനിന്നല്ലോ ആകുന്നു.'
      },
      {
        num: 24,
        en: 'Put away from thee a froward mouth, and perverse lips put far from thee.',
        ml: 'വായുടെ വക്രത നിന്നിൽനിന്നു നീക്കിക്കളക; അധരങ്ങളുടെ കോട്ടവും നിന്നിൽനിന്നു അകറ്റുക.'
      },
      {
        num: 25,
        en: 'Let thine eyes look right on, and let thine eyelids look straight before thee.',
        ml: 'നിന്റെ കണ്ണു നേരെ നോക്കട്ടെ; നിന്റെ കൺപോള മുൻപോട്ടു തന്നേ ഇരിക്കട്ടെ.'
      },
      {
        num: 26,
        en: 'Ponder the path of thy feet, and let all thy ways be established.',
        ml: 'നിന്റെ കാലിന്റെ പാതയെ നിരപ്പാക്കുക; നിന്റെ വഴികളൊക്കെയും സ്ഥിരമായിരിക്കട്ടെ.'
      },
      {
        num: 27,
        en: 'Turn not to the right hand nor to the left: remove thy foot from evil.',
        ml: 'വലത്തോട്ടോ ഇടത്തോട്ടോ തിരിയരുതു; നിന്റെ കാലിനെ ദോഷത്തിൽനിന്നു മാറ്റുക.'
      }
    ]
  },
  {
    id: 'proverbs16',
    nameEn: 'Proverbs 16',
    nameMl: 'സദൃശവാക്യങ്ങൾ 16',
    testament: 'OT',
    topic: 'Committing Plans to God & Humility',
    verses: [
      {
        num: 1,
        en: 'The preparations of the heart in man, and the answer of the tongue, is from the LORD.',
        ml: 'മനസ്സിലെ നിരൂപണങ്ങൾ മനുഷ്യന്നുള്ളവ; നാവിന്റെ ഉത്തരമോ യഹോവയിങ്കൽനിന്നു വരുന്നു.'
      },
      {
        num: 2,
        en: 'All the ways of a man are clean in his own eyes; but the LORD weigheth the spirits.',
        ml: 'മനുഷ്യന്റെ വഴികളൊക്കെയും തന്റെ ദൃഷ്ടിയിൽ വെടിപ്പുള്ളതായി തോന്നുന്നു; യഹോവയോ ആത്മാക്കളെ തൂക്കിനോക്കുന്നു.'
      },
      {
        num: 3,
        en: 'Commit thy works unto the LORD, and thy thoughts shall be established.',
        ml: 'നിന്റെ പ്രവൃത്തികളെ യഹോവെക്കു സമർപ്പിക്ക; എന്നാൽ നിന്റെ ഉദ്ദേശങ്ങൾ സാധിക്കും.'
      },
      {
        num: 9,
        en: 'A man’s heart deviseth his way: but the LORD directeth his steps.',
        ml: 'മനുഷ്യന്റെ ഹൃദയം തന്റെ വഴിയെ നിരൂപിക്കുന്നു; എന്നാൽ അവന്റെ കാലടികളെ നടത്തുന്നതു യഹോവയത്രേ.'
      },
      {
        num: 16,
        en: 'How much better is it to get wisdom than gold! and to get understanding rather to be chosen than silver!',
        ml: 'പൊന്നിനെക്കാൾ ജ്ഞാനം സമ്പാദിക്കുന്നതു എത്രയോ നല്ലതു! വെള്ളിയെക്കാൾ വിവേകം സമ്പാദിക്കുന്നതു എത്രയോ ഉത്തമം!'
      }
    ]
  },
  {
    id: 'proverbs21',
    nameEn: 'Proverbs 21',
    nameMl: 'സദൃശവാക്യങ്ങൾ 21',
    testament: 'OT',
    topic: 'The Diligent Planner vs. The Hasty',
    verses: [
      {
        num: 2,
        en: 'Every way of a man is right in his own eyes: but the LORD pondereth the hearts.',
        ml: 'മനുഷ്യന്റെ വഴി ഒക്കെയും തന്റെ കണ്ണിൽ നേരായി തോന്നുന്നു; യഹോവയോ ഹൃദയങ്ങളെ തൂക്കിനോക്കുന്നു.'
      },
      {
        num: 3,
        en: 'To do justice and judgment is more acceptable to the LORD than sacrifice.',
        ml: 'നീതിയും ന്യായവും പ്രവർത്തിക്കുന്നതു യാഗത്തെക്കാൾ യഹോവെക്കു പ്രസാദകരമാകുന്നു.'
      },
      {
        num: 5,
        en: 'The thoughts of the diligent tend only to plenteousness; but of every one that is hasty only to want.',
        ml: 'ഉത്സാഹിയുടെ വിചാരങ്ങൾ സമൃദ്ധിഹേതുവാകുന്നു; തിടുക്കക്കാരൊക്കെയും ദാരിദ്ര്യത്തിലേക്കത്രേ തിടുക്കം കൂട്ടുന്നതു.'
      },
      {
        num: 21,
        en: 'He that followeth after righteousness and mercy findeth life, righteousness, and honour.',
        ml: 'നീതിയെയും ദയയെയും പിന്തുടരുന്നവൻ ജീവനെയും നീതിയെയും മാനത്തെയും കണ്ടെത്തും.'
      }
    ]
  },
  {
    id: 'proverbs27',
    nameEn: 'Proverbs 27',
    nameMl: 'സദൃശവാക്യങ്ങൾ 27',
    testament: 'OT',
    topic: 'Wisdom for Tomorrow & Iron Sharpening Iron',
    verses: [
      {
        num: 1,
        en: 'Boast not thyself of to morrow; for thou knowest not what a day may bring forth.',
        ml: 'നാളത്തെ ദിവസത്തെക്കുറിച്ചു പ്രശംസിക്കരുതു; ഒരു ദിവസം എന്തെല്ലാം ജനിപ്പിക്കും എന്നു നീ അറിയുന്നില്ലല്ലോ.'
      },
      {
        num: 17,
        en: 'Iron sharpeneth iron; so a man sharpeneth the countenance of his friend.',
        ml: 'ഇരിമ്പു ഇരിമ്പിന്നു മൂർച്ചകൂട്ടുന്നു; മനുഷ്യൻ തന്റെ സ്നേഹിതന്റെ മുഖത്തിന്നു മൂർച്ചകൂട്ടുന്നു.'
      },
      {
        num: 23,
        en: 'Be thou diligent to know the state of thy flocks, and look well to thy herds.',
        ml: 'നിന്റെ ആടുകളുടെ അവസ്ഥ നല്ലവണ്ണം അറിഞ്ഞിരിക്ക; നിന്റെ കന്നുകാലികളിൽ ശ്രദ്ധ വെക്കുക.'
      }
    ]
  },
  {
    id: 'psalm23',
    nameEn: 'Psalm 23',
    nameMl: 'സങ്കീർത്തനം 23',
    testament: 'OT',
    topic: 'The Good Shepherd & Constant Provision',
    verses: [
      {
        num: 1,
        en: 'The LORD is my shepherd; I shall not want.',
        ml: 'യഹോവ എന്റെ ഇടയനാകുന്നു; എനിക്കു ഒന്നിന്നും മുട്ടുണ്ടാകയില്ല.'
      },
      {
        num: 2,
        en: 'He maketh me to lie down in green pastures: he leadeth me beside the still waters.',
        ml: 'പച്ചയായ പുൽപ്പുറങ്ങളിൽ അവൻ എന്നെ കിടത്തുന്നു; സ്വസ്ഥതയുള്ള വെള്ളത്തിനരികിലേക്കു എന്നെ നടത്തുന്നു.'
      },
      {
        num: 3,
        en: 'He restoreth my soul: he leadeth me in the paths of righteousness for his name’s sake.',
        ml: 'എന്റെ പ്രാണനെ അവൻ തണുപ്പിക്കുന്നു; തന്റെ നാമനിമിത്തം എന്നെ നീതിപാതകളിൽ നടത്തുന്നു.'
      },
      {
        num: 4,
        en: 'Yea, though I walk through the valley of the shadow of death, I will fear no evil: for thou art with me; thy rod and thy staff they comfort me.',
        ml: 'കൂരിരുൾതാഴ്വരയിൽകൂടി നടന്നാലും ഞാൻ ഒരു അനർത്ഥവും ഭയപ്പെടുകയില്ല; നീ എന്നോടുകൂടെ ഇരിക്കുന്നുവല്ലോ; നിന്റെ വടിയും കോലും എന്നെ ആശ്വസിപ്പിക്കുന്നു.'
      },
      {
        num: 5,
        en: 'Thou preparest a table before me in the presence of mine enemies: thou anointest my head with oil; my cup runneth over.',
        ml: 'എന്റെ ശത്രുക്കൾ കാൺകെ നീ എനിക്കു വിരുന്നൊരുക്കുന്നു; എന്റെ തലയെ എണ്ണകൊണ്ടു അഭിഷേകം ചെയ്യുന്നു; എന്റെ പാനപാത്രം നിറഞ്ഞു കവിയുന്നു.'
      },
      {
        num: 6,
        en: 'Surely goodness and mercy shall follow me all the days of my life: and I will dwell in the house of the LORD for ever.',
        ml: 'നന്മയും കരുണയും എന്റെ ആയുഷ്കാലമൊക്കെയും എന്നെ പിന്തുടരും; ഞാൻ യഹോവയുടെ ആലയത്തിൽ ദീർഘകാലം വസിക്കും.'
      }
    ]
  },
  {
    id: 'psalm27',
    nameEn: 'Psalm 27',
    nameMl: 'സങ്കീർത്തനം 27',
    testament: 'OT',
    topic: 'Light, Salvation & Patient Courage',
    verses: [
      {
        num: 1,
        en: 'The LORD is my light and my salvation; whom shall I fear? the LORD is the strength of my life; of whom shall I be afraid?',
        ml: 'യഹോവ എന്റെ വെളിച്ചവും എന്റെ രക്ഷയും ആകുന്നു; ഞാൻ ആരെ ഭയപ്പെടും? യഹോവ എന്റെ ജീവന്റെ ബലം; ഞാൻ ആരെ പേടിക്കും?'
      },
      {
        num: 4,
        en: 'One thing have I desired of the LORD, that will I seek after; that I may dwell in the house of the LORD all the days of my life, to behold the beauty of the LORD, and to enquire in his temple.',
        ml: 'ഞാൻ യഹോവയോടു ഒരു കാര്യം അപേക്ഷിച്ചു; അതു തന്നേ ഞാൻ അന്വേഷിക്കും: യഹോവയുടെ മനോഹരത്വം കാണ്മാനും അവന്റെ മന്ദിരത്തിൽ ധ്യാനിപ്പാനും എന്റെ ആയുഷ്കാലമൊക്കെയും യഹോവയുടെ ആലയത്തിൽ വസിക്കേണ്ടതു തന്നേ.'
      },
      {
        num: 14,
        en: 'Wait on the LORD: be of good courage, and he shall strengthen thine heart: wait, I say, on the LORD.',
        ml: 'യഹോവയെ പ്രത്യാശിച്ചുകൊള്ളുക; ധൈര്യപ്പെട്ടിരിക്ക, നിന്റെ ഹൃദയം ഉറച്ചിരിക്കട്ടെ; അതേ, യഹോവയെ പ്രത്യാശിച്ചുകൊള്ളുക.'
      }
    ]
  },
  {
    id: 'psalm91',
    nameEn: 'Psalm 91',
    nameMl: 'സങ്കീർത്തനം 91',
    testament: 'OT',
    topic: 'Under the Shadow of the Almighty',
    verses: [
      {
        num: 1,
        en: 'He that dwelleth in the secret place of the most High shall abide under the shadow of the Almighty.',
        ml: 'അത്യുന്നതന്റെ മറവിൽ വസിക്കയും സർവ്വശക്തന്റെ നിഴലിൻ കീഴിൽ പാർക്കയും ചെയ്യുന്നവൻ'
      },
      {
        num: 2,
        en: 'I will say of the LORD, He is my refuge and my fortress: my God; in him will I trust.',
        ml: 'യഹോവയെക്കുറിച്ചു: അവൻ എന്റെ സങ്കേതവും കോട്ടയും ഞാൻ ആശ്രയിക്കുന്ന എന്റെ ദൈവവും എന്നു പറയുന്നു.'
      },
      {
        num: 4,
        en: 'He shall cover thee with his feathers, and under his wings shalt thou trust: his truth shall be thy shield and buckler.',
        ml: 'തന്റെ തൂവലുകൾകൊണ്ടു അവൻ നിന്നെ മറെക്കും; അവന്റെ ചിറകിൻ കീഴിൽ നീ ആശ്രയം പ്രാപിക്കും; അവന്റെ വിശ്വസ്തത നിനക്കു പരിചയും കവചവും ആകുന്നു.'
      },
      {
        num: 11,
        en: 'For he shall give his angels charge over thee, to keep thee in all thy ways.',
        ml: 'നിന്റെ സകലവഴികളിലും നിന്നെ കാക്കേണ്ടതിന്നു അവൻ നിന്നെക്കുറിച്ചു തന്റെ ദൂതന്മാരോടു കല്പിക്കും.'
      }
    ]
  },
  {
    id: 'psalm121',
    nameEn: 'Psalm 121',
    nameMl: 'സങ്കീർത്തനം 121',
    testament: 'OT',
    topic: 'The Lord Is Thy Keeper & Shield',
    verses: [
      {
        num: 1,
        en: 'I will lift up mine eyes unto the hills, from whence cometh my help.',
        ml: 'ഞാൻ എന്റെ കണ്ണു പർവ്വതങ്ങളിലേക്കു ഉയർത്തുന്നു; എനിക്കു സഹായം എവിടെനിന്നു വരും?'
      },
      {
        num: 2,
        en: 'My help cometh from the LORD, which made heaven and earth.',
        ml: 'എനിക്കു സഹായം ആകാശത്തെയും ഭൂമിയെയും ഉണ്ടാക്കിയ യഹോവയിങ്കൽനിന്നു വരുന്നു.'
      },
      {
        num: 5,
        en: 'The LORD is thy keeper: the LORD is thy shade upon thy right hand.',
        ml: 'യഹോവ നിന്റെ പരിപാലകൻ; യഹോവ നിന്റെ വലത്തുഭാഗത്തു നിനക്കു തണൽ.'
      },
      {
        num: 8,
        en: 'The LORD shall preserve thy going out and thy coming in from this time forth, and even for evermore.',
        ml: 'യഹോവ നിന്റെ ഗമനത്തെയും ആഗമനത്തെയും ഇതുമുതൽ എന്നേക്കും കാക്കും.'
      }
    ]
  },
  {
    id: 'isaiah40',
    nameEn: 'Isaiah 40',
    nameMl: 'യെശയ്യാവ് 40',
    testament: 'OT',
    topic: 'Soaring on Eagles’ Wings With Renewed Power',
    verses: [
      {
        num: 28,
        en: 'Hast thou not known? hast thou not heard, that the everlasting God, the LORD, the Creator of the ends of the earth, fainteth not, neither is weary? there is no searching of his understanding.',
        ml: 'നീ അറിയുന്നില്ലയോ? നീ കേട്ടിട്ടില്ലയോ? യഹോവ നിത്യദൈവം; ഭൂമിയുടെ അറുതികളെ സൃഷ്ടിച്ചവൻ തന്നേ; അവൻ ക്ഷീണിക്കുന്നില്ല, തളർന്നുപോകുന്നതുമില്ല; അവന്റെ ബുദ്ധി അഗമ്യമത്രേ.'
      },
      {
        num: 29,
        en: 'He giveth power to the faint; and to them that have no might he increaseth strength.',
        ml: 'അവൻ ക്ഷീണിച്ചിരിക്കുന്നവന്നു ശക്തി നല്കുന്നു; ബലമില്ലാത്തവന്നു അവൻ ബലം വർദ്ധിപ്പിക്കുന്നു.'
      },
      {
        num: 31,
        en: 'But they that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles; they shall run, and not be weary; and they shall walk, and not faint.',
        ml: 'യഹോവയെ കാത്തിരിക്കുന്നവരോ പുതുശക്തി പ്രാപിക്കും; അവർ കഴുകന്മാരെപ്പോലെ ചിറകടിച്ചു കയറും; അവർ ഓടിയാലും ക്ഷീണിച്ചുപോകയില്ല; നടന്നാലും തളർന്നുപോകയില്ല.'
      }
    ]
  },
  {
    id: 'matthew5',
    nameEn: 'Matthew 5',
    nameMl: 'മത്തായി 5',
    testament: 'NT',
    topic: 'The Beatitudes, Salt & Light',
    verses: [
      {
        num: 3,
        en: 'Blessed are the poor in spirit: for theirs is the kingdom of heaven.',
        ml: 'ആത്മാവിൽ ദരിദ്രരായവർ ഭാഗ്യവാന്മാർ; സ്വർഗ്ഗരാജ്യം അവർക്കുള്ളതു.'
      },
      {
        num: 8,
        en: 'Blessed are the pure in heart: for they shall see God.',
        ml: 'ഹൃദയശുദ്ധിയുള്ളവർ ഭാഗ്യവാന്മാർ; അവർ ദൈവത്തെ കാണും.'
      },
      {
        num: 14,
        en: 'Ye are the light of the world. A city that is set on an hill cannot be hid.',
        ml: 'നിങ്ങൾ ലോകത്തിന്റെ വെളിച്ചം ആകുന്നു; മലമേൽ ഇരിക്കുന്ന പട്ടണം മറഞ്ഞിരിപ്പാൻ പാടില്ല.'
      },
      {
        num: 16,
        en: 'Let your light so shine before men, that they may see your good works, and glorify your Father which is in heaven.',
        ml: 'അങ്ങനെ തന്നേ മനുഷ്യർ നിങ്ങളുടെ നല്ല പ്രവൃത്തികളെ കണ്ടു, സ്വർഗ്ഗസ്ഥനായ നിങ്ങളുടെ പിതാവിനെ മഹത്വപ്പെടുത്തേണ്ടതിന്നു നിങ്ങളുടെ വെളിച്ചം അവരുടെ മുമ്പിൽ പ്രകാശിക്കട്ടെ.'
      }
    ]
  },
  {
    id: 'matthew6',
    nameEn: 'Matthew 6',
    nameMl: 'മത്തായി 6',
    testament: 'NT',
    topic: 'Seeking God’s Kingdom First Over Worry',
    verses: [
      {
        num: 26,
        en: 'Behold the fowls of the air: for they sow not, neither do they reap, nor gather into barns; yet your heavenly Father feedeth them. Are ye not much better than they?',
        ml: 'ആകാശത്തിലെ പറവകളെ നോക്കുവിൻ; അവ വിതെക്കുന്നില്ല, കൊയ്യുന്നില്ല, കളപ്പുരകളിൽ കൂട്ടിവെക്കുന്നതുമില്ല; എങ്കിലും സ്വർഗ്ഗസ്ഥനായ നിങ്ങളുടെ പിതാവു അവയെ പുലർത്തുന്നു; അവയെക്കാൾ നിങ്ങൾ എത്ര വിശേഷതയുള്ളവർ?'
      },
      {
        num: 33,
        en: 'But seek ye first the kingdom of God, and his righteousness; and all these things shall be added unto you.',
        ml: 'മുമ്പെ അവന്റെ രാജ്യവും നീതിയും അന്വേഷിപ്പിൻ; അതോടുകൂടെ ഇതൊക്കെയും നിങ്ങൾക്കു കിട്ടും.'
      },
      {
        num: 34,
        en: 'Take therefore no thought for the morrow: for the morrow shall take thought for the things of itself. Sufficient unto the day is the evil thereof.',
        ml: 'അതുകൊണ്ടു നാളെക്കായി വിചാരപ്പെടരുതു; നാളത്തെ ദിവസം തനിക്കായി വിചാരപ്പെടുമല്ലോ; അതതു ദിവസത്തിന്നു അന്നന്നത്തെ ക്ലേശം മതി.'
      }
    ]
  },
  {
    id: 'luke14',
    nameEn: 'Luke 14',
    nameMl: 'ലൂക്കോസ് 14',
    testament: 'NT',
    topic: 'Counting the Cost & Faithful Stewardship',
    verses: [
      {
        num: 28,
        en: 'For which of you, intending to build a tower, sitteth not down first, and counteth the cost, whether he have sufficient to finish it?',
        ml: 'നിങ്ങളിൽ ആരെങ്കിലും ഒരു ഗോപുരം പണിവാൻ ഇച്ഛിച്ചാൽ ആദ്യം ഇരുന്നു അതു തീർപ്പാൻ വക ഉണ്ടോ എന്നു കണക്കു നോക്കുന്നില്ലയോ?'
      },
      {
        num: 29,
        en: 'Lest haply, after he hath laid the foundation, and is not able to finish it, all that behold it begin to mock him,',
        ml: 'അല്ലെങ്കിൽ അടിസ്ഥാനം ഇട്ടശേഷം തീർപ്പാൻ കഴിഞ്ഞില്ല എന്നു കണ്ടവർ ഒക്കെയും ഇവൻ പണിവാൻ തുടങ്ങി, തീർപ്പാനോ കഴിഞ്ഞില്ല എന്നു പരിഹസിക്കുമല്ലോ.'
      }
    ]
  },
  {
    id: 'john1',
    nameEn: 'John 1',
    nameMl: 'യോഹന്നാൻ 1',
    testament: 'NT',
    topic: 'The Word Made Flesh & True Light',
    verses: [
      {
        num: 1,
        en: 'In the beginning was the Word, and the Word was with God, and the Word was God.',
        ml: 'ആദിയിൽ വചനം ഉണ്ടായിരുന്നു; വചനം ദൈവത്തോടുകൂടെ ആയിരുന്നു; വചനം ദൈവം ആയിരുന്നു.'
      },
      {
        num: 4,
        en: 'In him was life; and the life was the light of men.',
        ml: 'അവനിൽ ജീവൻ ഉണ്ടായിരുന്നു; ജീവൻ മനുഷ്യരുടെ വെളിച്ചമായിരുന്നു.'
      },
      {
        num: 5,
        en: 'And the light shineth in darkness; and the darkness comprehended it not.',
        ml: 'വെളിച്ചം ഇരുളിൽ പ്രകാശിക്കുന്നു; ഇരുളോ അതിനെ പിടിച്ചടക്കിയില്ല.'
      },
      {
        num: 12,
        en: 'But as many as received him, to them gave he power to become the sons of God, even to them that believe on his name:',
        ml: 'അവനെ കൈക്കൊണ്ടു അവന്റെ നാമത്തിൽ വിശ്വസിക്കുന്ന ഏവർക്കും ദൈവമക്കൾ ആകുവാൻ അവൻ അധികാരം കൊടുത്തു.'
      }
    ]
  },
  {
    id: 'romans12',
    nameEn: 'Romans 12',
    nameMl: 'റോമർ 12',
    testament: 'NT',
    topic: 'Mind Transformed by God & Active Love',
    verses: [
      {
        num: 1,
        en: 'I beseech you therefore, brethren, by the mercies of God, that ye present your bodies a living sacrifice, holy, acceptable unto God, which is your reasonable service.',
        ml: 'സഹോദരന്മാരേ, ഞാൻ ദൈവത്തിന്റെ മനസ്സലിവു ഓർപ്പിച്ചു നിങ്ങളെ പ്രബോധിപ്പിക്കുന്നതു: നിങ്ങൾ ബുദ്ധിയുള്ള ആരാധനയായി നിങ്ങളുടെ ശരീരങ്ങളെ ജീവനും വിശുദ്ധിയും ദൈവത്തിന്നു പ്രസാദവുമുള്ള യാഗമായി സമർപ്പിപ്പിൻ.'
      },
      {
        num: 2,
        en: 'And be not conformed to this world: but be ye transformed by the renewing of your mind, that ye may prove what is that good, and acceptable, and perfect, will of God.',
        ml: 'ഈ ലോകത്തിന്നു അനുരൂപരാകാതെ നന്മയും പ്രസാദവും പൂർണ്ണതയുമുള്ള ദൈവഹിതം ഇന്നതെന്നു തിരിച്ചറിയേണ്ടതിന്നു മനസ്സു പുതുക്കി രൂപാന്തരപ്പെടുവിൻ.'
      },
      {
        num: 10,
        en: 'Be kindly affectioned one to another with brotherly love; in honour preferring one another;',
        ml: 'സഹോദരപ്രീതിയിൽ തമ്മിൽ സ്നേഹപൂർവ്വം പെരുമാറുവിൻ; ബഹുമാനിക്കുന്നതിൽ അന്യോന്യം മുമ്പികൊൾവിൻ.'
      },
      {
        num: 12,
        en: 'Rejoicing in hope; patient in tribulation; continuing instant in prayer;',
        ml: 'പ്രത്യാശയിൽ സന്തോഷിപ്പിൻ; കഷ്ടതയിൽ സഹിഷ്ണുതയുള്ളവരായിരിപ്പിൻ; പ്രാർത്ഥനയിൽ ഉറ്റിരിപ്പിൻ.'
      }
    ]
  },
  {
    id: 'galatians5',
    nameEn: 'Galatians 5',
    nameMl: 'ഗലാത്യർ 5',
    testament: 'NT',
    topic: 'The Fruit of the Spirit & Self-Control',
    verses: [
      {
        num: 22,
        en: 'But the fruit of the Spirit is love, joy, peace, longsuffering, gentleness, goodness, faith,',
        ml: 'ആത്മാവിന്റെ ഫലമോ: സ്നേഹം, സന്തോഷം, സമാധാനം, ദീർഘക്ഷമ, ദയ, പരോപകാരം, വിശ്വസ്തത,'
      },
      {
        num: 23,
        en: 'Meekness, temperance: against such there is no law.',
        ml: 'സൌമ്യത, ഇന്ദ്രിയജയം; ഈ വകക്കു വിരോധമായി ഒരു ന്യായപ്രമാണവുമില്ല.'
      },
      {
        num: 25,
        en: 'If we live in the Spirit, let us also walk in the Spirit.',
        ml: 'ആത്മാവിനാൽ നാം ജീവിക്കുന്നു എങ്കിൽ ആത്മാവിനെ അനുസരിച്ചു നടക്കയും ചെയ്ക.'
      }
    ]
  },
  {
    id: 'philippians4',
    nameEn: 'Philippians 4',
    nameMl: 'ഫിലിപ്പിയർ 4',
    testament: 'NT',
    topic: 'Replacing Anxiety with Prayer & Christ’s Peace',
    verses: [
      {
        num: 6,
        en: 'Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God.',
        ml: 'ഒന്നിനെക്കുറിച്ചും വിചാരപ്പെടരുതു; എല്ലാറ്റിലും പ്രാർത്ഥനയാലും അപേക്ഷയാലും നിങ്ങളുടെ യാചനകൾ സ്തോത്രത്തോടുകൂടെ ദൈവത്തോടു അറിയിക്കുകയത്രേ വേണ്ടതു.'
      },
      {
        num: 7,
        en: 'And the peace of God, which passeth all understanding, shall keep your hearts and minds through Christ Jesus.',
        ml: 'എന്നാൽ സകലബുദ്ധിയേയും കവിയുന്ന ദൈവ സമാധാനം നിങ്ങളുടെ ഹൃദയങ്ങളെയും ചിന്തകളെയും ക്രിസ്തുയേശുവിങ്കൽ കാക്കും.'
      },
      {
        num: 13,
        en: 'I can do all things through Christ which strengtheneth me.',
        ml: 'എന്നെ ശക്തനാക്കുന്നവൻ മുഖാന്തരം ഞാൻ സകലത്തിന്നും മതിയാകുന്നു.'
      }
    ]
  },
  {
    id: 'colossians3',
    nameEn: 'Colossians 3',
    nameMl: 'കൊലൊസ്സ്യർ 3',
    testament: 'NT',
    topic: 'Working Diligently as Unto the Lord',
    verses: [
      {
        num: 17,
        en: 'And whatsoever ye do in word or deed, do all in the name of the Lord Jesus, giving thanks to God and the Father by him.',
        ml: 'വാക്കിലോ പ്രവൃത്തിയോ എന്തു ചെയ്താലും സകലവും കർത്താവായ യേശുവിന്റെ നാമത്തിൽ ചെയ്തും അവൻ മുഖാന്തരം പിതാവായ ദൈവത്തിന്നു സ്തോത്രം പറഞ്ഞുംകൊണ്ടിരിപ്പിൻ.'
      },
      {
        num: 23,
        en: 'And whatsoever ye do, do it heartily, as to the Lord, and not unto men;',
        ml: 'നിങ്ങൾ ചെയ്യുന്നതു ഒക്കെയും മനുഷ്യർക്കെന്നല്ല കർത്താവിന്നു എന്നപോലെ മനസ്സോടെ ചെയ്‍വിൻ.'
      },
      {
        num: 24,
        en: 'Knowing that of the Lord ye shall receive the reward of the inheritance: for ye serve the Lord Christ.',
        ml: 'നിങ്ങൾ അവകാശമെന്ന പ്രതിഫലം കർത്താവിങ്കൽനിന്നു പ്രാപിക്കും എന്നറിയുന്നുവല്ലോ; കർത്താവായ ക്രിസ്തുവിനെ ആകുന്നു നിങ്ങൾ സേവിക്കുന്നതു.'
      }
    ]
  },
  {
    id: 'james1',
    nameEn: 'James 1',
    nameMl: 'യാക്കോബ് 1',
    testament: 'NT',
    topic: 'Listening Wisely & Being Doers of the Word',
    verses: [
      {
        num: 5,
        en: 'If any of you lack wisdom, let him ask of God, that giveth to all men liberally, and upbraideth not; and it shall be given him.',
        ml: 'നിങ്ങളിൽ ഒരുത്തന്നു ജ്ഞാനം കുറവാകുന്നു എങ്കിൽ ഭർത്സിക്കാതെ എല്ലാവർക്കും ഔദാര്യമായി കൊടുക്കുന്ന ദൈവത്തോടു ചോദിക്കട്ടെ; അപ്പോൾ അവന്നു ലഭിക്കും.'
      },
      {
        num: 19,
        en: 'Wherefore, my beloved brethren, let every man be swift to hear, slow to speak, slow to wrath:',
        ml: 'പ്രിയ സഹോദരന്മാരേ, നിങ്ങൾ ഇതു അറിഞ്ഞുകൊൾവിൻ: ഏതു മനുഷ്യനും കേൾപ്പാൻ വേഗതയും പറവാൻ താമസവും കോപത്തിന്നു താമസവുമുള്ളവൻ ആയിരിക്കട്ടെ.'
      },
      {
        num: 22,
        en: 'But be ye doers of the word, and not hearers only, deceiving your own selves.',
        ml: 'എന്നാൽ വചനം കേൾക്ക മാത്രം ചെയ്തുകൊണ്ടു തങ്ങളെത്തന്നേ ചതിക്കാതെ അതിനെ ചെയ്യുന്നവരായും ഇരിപ്പിൻ.'
      }
    ]
  },
  {
    id: 'james2',
    nameEn: 'James 2',
    nameMl: 'യാക്കോബ് 2',
    testament: 'NT',
    topic: 'Faith Accompanied by Practical Action',
    verses: [
      {
        num: 14,
        en: 'What doth it profit, my brethren, though a man say he hath faith, and have not works? can faith save him?',
        ml: 'സഹോദരന്മാരേ, ഒരുത്തൻ തനിക്കു വിശ്വാസം ഉണ്ടു എന്നു പറകയും പ്രവൃത്തികൾ ഇല്ലാതിരിക്കയും ചെയ്താൽ ഉപകാരം എന്തു? ആ വിശ്വാസത്താൽ അവൻ രക്ഷപ്രാപിക്കുമോ?'
      },
      {
        num: 17,
        en: 'Even so faith, if it hath not works, is dead, being alone.',
        ml: 'അങ്ങനെ തന്നേ വിശ്വാസവും പ്രവൃത്തികൾ ഇല്ലാത്തതായാൽ സ്വതവേ നിർജ്ജീവമാകുന്നു.'
      },
      {
        num: 26,
        en: 'For as the body without the spirit is dead, so faith without works is dead also.',
        ml: 'ആത്മാവില്ലാത്ത ശരീരം നിർജ്ജീവമായിരിക്കുന്നതുപോലെ പ്രവൃത്തിയില്ലാത്ത വിശ്വാസവും നിർജ്ജീവമാകുന്നു.'
      }
    ]
  }
];

// Quick topic navigation shortcuts
const SCRIPTURE_TOPICS = [
  { name: 'Faith & Trust', verse: 'Proverbs 3:5–6', bookId: 'proverbs3' },
  { name: 'Fear & Worry', verse: 'Philippians 4:6–7', bookId: 'philippians4' },
  { name: 'Divine Protection', verse: 'Psalm 91:1–4', bookId: 'psalm91' },
  { name: 'The Shepherd', verse: 'Psalm 23:1–6', bookId: 'psalm23' },
  { name: 'Focus & Diligence', verse: 'Proverbs 4:23–27', bookId: 'proverbs4' },
  { name: 'Renewed Strength', verse: 'Isaiah 40:29–31', bookId: 'isaiah40' },
  { name: 'Inner Peace', verse: 'John 1:1–5', bookId: 'john1' },
  { name: 'Speech & Listening', verse: 'James 1:19', bookId: 'james1' },
  { name: 'Work as Unto God', verse: 'Colossians 3:23', bookId: 'colossians3' },
  { name: 'Fruit & Self-Control', verse: 'Galatians 5:22–23', bookId: 'galatians5' },
  { name: 'Financial Prudence', verse: 'Luke 14:28', bookId: 'luke14' },
  { name: 'Action Over Delay', verse: 'James 2:17', bookId: 'james2' }
];

// ============================================================================
// 5. VECTOR LANDSCAPE CANVAS HEADERS
// ============================================================================
function ScenicCanvas({ type, className = "w-full h-full object-cover" }) {
  // Natural landscape photography, with one distinct scene for each daily theme.
  // The surrounding banner adds a dark readability overlay; photos remain atmospheric.
  const scenes = {
    forest: {
      src: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1800&q=85',
      alt: 'Natural evergreen forest with soft morning light'
    },
    ocean: {
      src: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1800&q=85',
      alt: 'Blue ocean waves beneath a natural sky'
    },
    lavender: {
      src: 'https://images.unsplash.com/photo-1499002238440-d264edd596ec?auto=format&fit=crop&w=1800&q=85',
      alt: 'Quiet countryside in soft lavender evening light'
    },
    sunrise: {
      src: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1800&q=85',
      alt: 'Mountain lake at sunrise with natural warm light'
    },
    amber: {
      src: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=85',
      alt: 'Golden-hour natural mountain landscape'
    },
    teal: {
      src: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=1800&q=85',
      alt: 'Waterfall flowing through a lush green landscape'
    },
    night: {
      src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1800&q=85',
      alt: 'Mountain peaks beneath a deep blue evening sky'
    }
  };
  const scene = scenes[type] || scenes.forest;
  return (
    <img
      className={className}
      src={scene.src}
      alt={scene.alt}
      loading="eager"
      decoding="async"
      onError={(event) => {
        // Keep a tasteful landscape-like fallback if the photo host is unavailable.
        event.currentTarget.style.display = 'none';
        if (event.currentTarget.parentElement) {
          event.currentTarget.parentElement.style.background =
            'linear-gradient(145deg, var(--theme-primary, #173F35), var(--theme-accent, #D5AD59), #10251f)';
        }
      }}
    />
  );
}

// ============================================================================
// 6. MAIN APPLICATION COMPONENT
// ============================================================================
// Local date key avoids UTC date drift and stale hard-coded demo dates.
function getLocalDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function AppContent({ signOutUser }) {
  // A live clock forces date/theme recalculation on resume and at midnight.
  const [clockNow, setClockNow] = useState(() => new Date());
  const todayKey = getLocalDateKey(clockNow);
  const greeting = clockNow.getHours() < 12 ? 'Good morning!' : clockNow.getHours() < 17 ? 'Good afternoon!' : clockNow.getHours() < 21 ? 'Good evening!' : 'Good night!';
  useEffect(() => {
    const refreshClock = () => setClockNow(new Date());
    const timer = window.setInterval(refreshClock, 30_000);
    window.addEventListener('focus', refreshClock);
    document.addEventListener('visibilitychange', refreshClock);
    return () => { window.clearInterval(timer); window.removeEventListener('focus', refreshClock); document.removeEventListener('visibilitychange', refreshClock); };
  }, []);
  // Navigation tabs: 'home', 'tasks', 'bible', 'principles', 'more'
  const [activeTab, setActiveTab] = useState('home');

  // Subview inside the "More" tab (e.g. 'theme', 'questions', 'bibleBridge', 'principles', 'calendar', 'tasks', 'journal', 'progress', 'reminders', 'feedback', 'about')
  const [moreSubView, setMoreSubView] = useState(null);

  // Theme configuration
  const [autoTheme, setAutoTheme] = useState(() => { try { return localStorage.getItem('transformer_auto_theme') !== 'false'; } catch { return true; } });
  const [manualThemeIndex, setManualThemeIndex] = useState(() => { try { const n = Number(localStorage.getItem('transformer_manual_theme')); return Number.isInteger(n) && n >= 0 && n < THEMES.length ? n : 1; } catch { return 1; } });
  const [appearanceMode, setAppearanceMode] = useState(() => { try { return localStorage.getItem('transformer_appearance_mode') || 'light'; } catch { return 'light'; } });
  const [systemDark, setSystemDark] = useState(() => typeof window !== 'undefined' && window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)').matches : false);
  useEffect(() => { try { localStorage.setItem('transformer_auto_theme', String(autoTheme)); localStorage.setItem('transformer_manual_theme', String(manualThemeIndex)); localStorage.setItem('transformer_appearance_mode', appearanceMode); } catch {} }, [autoTheme, manualThemeIndex, appearanceMode]);
  useEffect(() => { const media = window.matchMedia?.('(prefers-color-scheme: dark)'); if (!media) return; const update = e => setSystemDark(e.matches); media.addEventListener?.('change', update); return () => media.removeEventListener?.('change', update); }, []);
  const darkMode = appearanceMode === 'dark' || (appearanceMode === 'system' && systemDark);
  const savedAccentChoice = (() => { try { return localStorage.getItem('transformer_accent_override') || 'theme'; } catch { return 'theme'; } })();
  const effectiveAccent = ({ emerald: '#16A34A', gold: '#D5AD59', blue: '#38BDF8', lavender: '#C084FC' })[savedAccentChoice] || null;

  // Toast alert system
  const [toast, setToast] = useState(null);
  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3200);
  };

  // Browser notifications: work while this app is open/active. Web browsers cannot
  // guarantee timed notifications after the tab/browser is fully closed without a push backend.
  const DEFAULT_REMINDERS = [
    { id: 'morning', title: 'Morning Prayer & Bible reading', time: '07:25', enabled: true },
    { id: 'progress', title: 'Check Task Progress & Focus', time: '13:00', enabled: true },
    { id: 'unfinished', title: 'Review Unfinished Tasks', time: '17:00', enabled: true },
    { id: 'reflection', title: "Evening Reflection & Tomorrow's Plan", time: '21:00', enabled: true }
  ];
  const [reminders, setReminders] = useState(() => {
    try { const saved = JSON.parse(localStorage.getItem('transformer_reminders') || 'null'); return Array.isArray(saved) ? saved : DEFAULT_REMINDERS; }
    catch { return DEFAULT_REMINDERS; }
  });
  const [notificationsEnabled, setNotificationsEnabled] = useState(() => {
    try { return localStorage.getItem('transformer_notifications_enabled') === 'true'; } catch { return false; }
  });
  const [notificationPermission, setNotificationPermission] = useState(() => (isNative() ? 'default' : ('Notification' in window ? Notification.permission : 'unsupported')));
  useEffect(() => { try { localStorage.setItem('transformer_reminders', JSON.stringify(reminders)); localStorage.setItem('transformer_notifications_enabled', String(notificationsEnabled)); } catch {} }, [reminders, notificationsEnabled]);
  useEffect(() => {
    if (!isNative()) return;
    nativePermissionStatus().then(p => setNotificationPermission(p === 'granted' ? 'granted' : p === 'denied' ? 'denied' : 'default'));
  }, []);
  useEffect(() => {
    if (!isNative()) return;
    if (notificationsEnabled && notificationPermission === 'granted') nativeScheduleReminders(reminders);
    else if (!notificationsEnabled) nativeCancelAll();
  }, [notificationsEnabled, notificationPermission, reminders]);
  const enableNotifications = async () => {
    if (isNative()) {
      const permission = await nativeRequestPermission();
      setNotificationPermission(permission);
      if (permission === 'granted') { setNotificationsEnabled(true); showToast('Daily reminders scheduled on this device.'); await nativeTestNotification(); }
      else { setNotificationsEnabled(false); showToast('Notifications were not allowed. Enable them in Android Settings > Apps > Transformer.'); }
      return;
    }
    if (!('Notification' in window)) { showToast('This browser does not support notifications. Try Chrome on HTTPS or localhost.'); return; }
    try {
      const permission = Notification.permission === 'granted' ? 'granted' : await Notification.requestPermission();
      setNotificationPermission(permission);
      if (permission === 'granted') { setNotificationsEnabled(true); showToast('Notifications enabled while Transformer is open.'); new Notification('Transformer reminders enabled', { body: 'Your daily prayer, focus and reflection reminders are ready.' }); }
      else { setNotificationsEnabled(false); showToast('Notifications were not allowed. Enable them in your browser settings.'); }
    } catch { showToast('Could not enable notifications in this browser.'); }
  };
  useEffect(() => {
    if (isNative() || !notificationsEnabled || notificationPermission !== 'granted') return undefined;
    const checkReminders = () => {
      const now = new Date();
      const dateKey = getLocalDateKey(now);
      const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      reminders.forEach(reminder => {
        if (!reminder.enabled || reminder.time !== currentTime) return;
        const sentKey = `transformer_reminder_sent_${dateKey}_${reminder.id}`;
        try { if (localStorage.getItem(sentKey)) return; localStorage.setItem(sentKey, '1'); } catch {}
        try { new Notification(`Transformer: ${reminder.title}`, { body: 'Take a moment to pause, pray, and continue with intention.', tag: sentKey }); } catch {}
      });
    };
    checkReminders();
    const timer = window.setInterval(checkReminders, 15_000);
    return () => window.clearInterval(timer);
  }, [notificationsEnabled, notificationPermission, reminders]);

  // Determine active theme
  const activeTheme = useMemo(() => {
    if (autoTheme) {
      const today = clockNow.getDay();
      return THEMES.find(t => t.dayIndex === today) || THEMES[1];
    }
    return THEMES[manualThemeIndex] || THEMES[1];
  }, [autoTheme, manualThemeIndex, clockNow]);

  // Tasks state with localStorage persistence
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem('transformer_tasks');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [
      { id: '1', title: 'Morning prayer & Bible reading', time: '6:30 AM', deadline: '7:30 AM', category: 'Faith & Prayer', priority: 'High', principleId: 1, completed: true, date: todayKey },
      { id: '2', title: 'Study Nursing Foundation chapter 4', time: '9:00 AM', deadline: '11:30 AM', category: 'Studies', priority: 'High', principleId: 4, completed: false, date: todayKey },
      { id: '3', title: 'Complete pharmacology clinical notes', time: '2:00 PM', deadline: '4:00 PM', category: 'Assignments', priority: 'Medium', principleId: 8, completed: false, date: todayKey },
      { id: '4', title: 'Evening reflection & next day plan', time: '8:00 PM', deadline: '9:00 PM', category: 'Personal Dev', priority: 'Low', principleId: 9, completed: false, date: todayKey }
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem('transformer_tasks', JSON.stringify(tasks));
    } catch (e) {}
  }, [tasks]);

  const [deletedTasks, setDeletedTasks] = useState(() => { try { return JSON.parse(localStorage.getItem('transformer_deleted_tasks') || '[]'); } catch { return []; } });
  useEffect(() => { try { localStorage.setItem('transformer_deleted_tasks', JSON.stringify(deletedTasks)); } catch {} }, [deletedTasks]);
  // Keep a rolling on-device safety snapshot of Transformer-owned local data.
  useEffect(() => {
    const createSnapshot = () => {
      try {
        const data = {};
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && key.startsWith('transformer_') && key !== 'transformer_auto_backup') data[key] = localStorage.getItem(key);
        }
        localStorage.setItem('transformer_auto_backup', JSON.stringify({ app: 'Transformer', savedAt: new Date().toISOString(), data }));
      } catch (error) { console.warn('Local safety backup could not be updated:', error); }
    };
    const timer = window.setInterval(createSnapshot, 60000);
    window.addEventListener('pagehide', createSnapshot);
    createSnapshot();
    return () => { window.clearInterval(timer); window.removeEventListener('pagehide', createSnapshot); };
  }, []);

  // Timetable checkmarks
  const [timetableChecks, setTimetableChecks] = useState({
    '6:30 AM': true,
    '9:00 AM': false,
    '1:00 PM': false,
    '2:00 PM': false,
    '8:00 PM': false
  });

  // Calendar Date selection
  const [selectedCalendarDate, setSelectedCalendarDate] = useState(getLocalDateKey());

  // Month switcher for standard clean calendar
  const [viewMonthOffset, setViewMonthOffset] = useState(0);

  // Principle action checks & notes
  const [principleActionChecks, setPrincipleActionChecks] = useState(() => {
    try { const saved = JSON.parse(localStorage.getItem('transformer_principle_action_checks') || '{}'); return saved && typeof saved === 'object' && !Array.isArray(saved) ? saved : {}; } catch { return {}; }
  });
  const [principleNotes, setPrincipleNotes] = useState(() => {
    try { const saved = JSON.parse(localStorage.getItem('transformer_principle_notes') || '{}'); return saved && typeof saved === 'object' && !Array.isArray(saved) ? saved : {}; } catch { return {}; }
  });
  useEffect(() => { try { localStorage.setItem('transformer_principle_action_checks', JSON.stringify(principleActionChecks)); } catch {} }, [principleActionChecks]);
  useEffect(() => { try { localStorage.setItem('transformer_principle_notes', JSON.stringify(principleNotes)); } catch {} }, [principleNotes]);

  // Journal entries
  const [journalEntries, setJournalEntries] = useState(() => {
    try {
      const saved = localStorage.getItem('transformer_journal');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [
      {
        id: 'j1',
        date: todayKey,
        title: 'Beginning the week with God',
        category: 'Reflection',
        reflection: 'Lord, give me strength to stay consistent with clinical duties and guard my time from distractions.',
        prayer: 'Praying for wisdom in studies and peace at home.',
        gratitude: 'Grateful for good health, family, and open doors.'
      }
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem('transformer_journal', JSON.stringify(journalEntries));
    } catch (e) {}
  }, [journalEntries]);

  // Daily Questions state
  const [questionAnswers, setQuestionAnswers] = useState(() => {
    try {
      const saved = localStorage.getItem('transformer_questions');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {
      q1_task1: 'Complete Nursing Foundation chapter 4',
      q1_task2: 'Pharmacology clinical notes',
      q1_task3: 'Evening family prayer',
      q2_faithTime: 'Yes, 6:30 AM prayer completed',
      q3_distraction: 'Endless short video scrolling during breaks',
      q4_progress: 'Finished morning study module',
      q5_reflection: 'Accomplished morning routine; tomorrow begins with clinical posting.'
    };
  });

  useEffect(() => {
    try {
      localStorage.setItem('transformer_questions', JSON.stringify(questionAnswers));
    } catch (e) {}
  }, [questionAnswers]);


  // Bible Reader State
  const [selectedBook, setSelectedBook] = useState(EXPANDED_BIBLE_BOOKS[0]);
  const [bibleLanguage, setBibleLanguage] = useState('bilingual'); // 'bilingual', 'en', 'ml'
  const [bibleFontSize, setBibleFontSize] = useState('text-sm');
  const [savedVerses, setSavedVerses] = useState(['Isaiah 22:22', 'Proverbs 3:5–6', 'Psalm 23:1']);
  const [verseHighlights, setVerseHighlights] = useState({});
  const [bibleSearchQuery, setBibleSearchQuery] = useState('');
  const [readingPlanProgress, setReadingPlanProgress] = useState(19);
  const [fullBibleBook, setFullBibleBook] = useState('Genesis');
  const [fullBibleChapter, setFullBibleChapter] = useState(1);
  const [fullBibleVerses, setFullBibleVerses] = useState([]);
  const [fullBibleLoading, setFullBibleLoading] = useState(false);
  const [fullBibleError, setFullBibleError] = useState('');
  const [fullBibleRetry, setFullBibleRetry] = useState(0);
  const [questionReviewVisible, setQuestionReviewVisible] = useState(false);

  // Load KJV chapters with a timeout, cache, and a second request format for service resilience.
  useEffect(() => {
    let cancelled = false;
    const cacheKey = `transformer_kjv_${fullBibleBook}_${fullBibleChapter}`;
    async function loadChapter() {
      setFullBibleLoading(true); setFullBibleError('');
      try {
        const cached = localStorage.getItem(cacheKey);
        if (cached) { const parsed = JSON.parse(cached); if (Array.isArray(parsed) && parsed.length) setFullBibleVerses(parsed); }
      } catch {}
      const reference = `${fullBibleBook} ${fullBibleChapter}`;
      const urls = [
        `https://bible-api.com/${encodeURIComponent(reference)}?translation=kjv`,
        `https://bible-api.com/?reference=${encodeURIComponent(reference)}&translation=kjv`
      ];
      let lastError;
      for (const url of urls) {
        const controller = new AbortController();
        const timeout = window.setTimeout(() => controller.abort(), 15000);
        try {
          const response = await fetch(url, { signal: controller.signal, headers: { Accept: 'application/json' } });
          if (!response.ok) throw new Error(`Bible service returned HTTP ${response.status}`);
          const data = await response.json();
          if (!Array.isArray(data.verses) || !data.verses.length) throw new Error(data.error || 'No verses were returned.');
          const verses = data.verses.map(v => ({ num: Number(v.verse), en: String(v.text || '').trim() })).filter(v => v.en);
          if (!verses.length) throw new Error('The Bible service returned an empty chapter.');
          if (!cancelled) {
            setFullBibleVerses(verses);
            try { localStorage.setItem(cacheKey, JSON.stringify(verses)); } catch {}
          }
          lastError = null; break;
        } catch (error) { lastError = error; }
        finally { window.clearTimeout(timeout); }
      }
      if (!cancelled && lastError) {
        setFullBibleError(navigator.onLine === false
          ? 'You are offline. Reconnect to the internet and tap Retry. Previously loaded chapters remain available on this device.'
          : `The KJV service could not load ${reference}. Please retry in a moment. ${lastError?.name === 'AbortError' ? 'The request timed out.' : ''}`);
      }
      if (!cancelled) setFullBibleLoading(false);
    }
    loadChapter();
    return () => { cancelled = true; };
  }, [fullBibleBook, fullBibleChapter, fullBibleRetry]);


  // Modals
  const [activePrincipleModal, setActivePrincipleModal] = useState(null);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [taskForm, setTaskForm] = useState({ title: '', time: '09:00 AM', deadline: '', priority: 'Medium', category: 'Studies', principleId: 1, date: todayKey, subtasksText: '', recurrence: 'None' });
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [shareVerseModal, setShareVerseModal] = useState(null);

  // Feedback form
  const [feedbackCategory, setFeedbackCategory] = useState('Feature suggestion');
  const [feedbackRating, setFeedbackRating] = useState(5);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  // --------------------------------------------------------------------------
  // CALCULATED METRICS
  // --------------------------------------------------------------------------
  const todayTasks = tasks.filter(t => t.date === todayKey);
  const completedToday = todayTasks.filter(t => t.completed).length;
  const totalToday = todayTasks.length;
  const progressPercent = totalToday > 0 ? Math.round((completedToday / totalToday) * 100) : 0;

  // Filtered bible verses
  const filteredVerses = useMemo(() => {
    if (!bibleSearchQuery.trim()) return selectedBook.verses;
    const q = bibleSearchQuery.toLowerCase();
    return selectedBook.verses.filter(v => v.en.toLowerCase().includes(q) || v.ml.toLowerCase().includes(q));
  }, [selectedBook, bibleSearchQuery]);

  // --------------------------------------------------------------------------
  // HANDLERS
  // --------------------------------------------------------------------------
  const toggleTask = (id) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const handleSaveTask = () => {
    if (!taskForm.title.trim()) {
      showToast('Please enter a task title');
      return;
    }
    const newTask = {
      id: editingTaskId || Date.now().toString(),
      title: taskForm.title,
      time: taskForm.time || '10:00 AM',
      deadline: taskForm.deadline || '',
      category: taskForm.category,
      priority: taskForm.priority,
      principleId: Number(taskForm.principleId),
      completed: editingTaskId ? !!tasks.find(t => t.id === editingTaskId)?.completed : false,
      cancelled: editingTaskId ? !!tasks.find(t => t.id === editingTaskId)?.cancelled : false,
      date: taskForm.date || todayKey,
      subtasks: (taskForm.subtasksText || '').split('\n').map(x => x.trim()).filter(Boolean).map((title, index) => ({ id: `${editingTaskId || Date.now()}-${index}`, title, completed: false })),
      recurrence: taskForm.recurrence || 'None'
    };
    setTasks(prev => editingTaskId ? prev.map(t => t.id === editingTaskId ? newTask : t) : [newTask, ...prev]);
    setIsTaskModalOpen(false);
    setEditingTaskId(null);
    setTaskForm({ title: '', time: '09:00 AM', deadline: '', priority: 'Medium', category: 'Studies', principleId: 1, date: todayKey, subtasksText: '', recurrence: 'None' });
    showToast(editingTaskId ? 'Task updated successfully' : 'Task added successfully');
  };

  const pushMorningPrioritiesToTasks = () => {
    const newItems = [
      questionAnswers.q1_task1 && { title: questionAnswers.q1_task1, priority: 'High', category: 'Studies' },
      questionAnswers.q1_task2 && { title: questionAnswers.q1_task2, priority: 'Medium', category: 'Assignments' },
      questionAnswers.q1_task3 && { title: questionAnswers.q1_task3, priority: 'Medium', category: 'Faith & Prayer' }
    ].filter(Boolean);

    if (newItems.length === 0) {
      showToast('Enter priorities in Question 1 first');
      return;
    }

    const created = newItems.map((item, idx) => ({
      id: (Date.now() + idx).toString(),
      title: item.title,
      time: idx === 0 ? '09:00 AM' : idx === 1 ? '02:00 PM' : '07:00 PM',
      deadline: '',
      category: item.category,
      priority: item.priority,
      principleId: 1,
      completed: false,
      date: todayKey
    }));

    setTasks(prev => [...created, ...prev]);
    showToast('Priorities pushed directly into Tasks!');
  };

  const copyEmail = () => {
    navigator.clipboard?.writeText('jestinp843@gmail.com');
    showToast('Email jestinp843@gmail.com copied to clipboard!');
  };

  const handleFeedbackSubmit = () => {
    if (!feedbackMessage.trim()) {
      showToast('Please enter your feedback message');
      return;
    }
    const subject = encodeURIComponent(`Transformer feedback — ${feedbackCategory}`);
    const body = encodeURIComponent(
      `Category: ${feedbackCategory}\nRating: ${feedbackRating}/5\n\n${feedbackMessage.trim()}`
    );
    // No feedback server is configured in this prototype. Open the user's email app
    // so they can review and send the message themselves.
    window.location.href = `mailto:jestinp843@gmail.com?subject=${subject}&body=${body}`;
    showToast('Email draft opened. Review it and press Send in your email app.');
  };

  const cycleHighlight = (verseKey) => {
    const colors = ['gold', 'green', 'blue', 'peach', null];
    const current = verseHighlights[verseKey] || null;
    const nextIndex = (colors.indexOf(current) + 1) % colors.length;
    const nextColor = colors[nextIndex];
    setVerseHighlights({ ...verseHighlights, [verseKey]: nextColor });
    showToast(nextColor ? `Highlighted in ${nextColor}` : 'Highlight cleared');
  };

  return (
    <div
      data-theme={activeTheme.dayName.toLowerCase()} data-appearance={darkMode ? 'dark' : 'light'}
      className="theme-app min-h-screen bg-[#F6F0E3]/40 text-slate-900 font-sans antialiased flex flex-col justify-between selection:bg-[#D5AD59]/30"
      style={{
        '--theme-primary': activeTheme.primary,
        '--theme-accent': effectiveAccent || activeTheme.accent,
        '--theme-reading-bg': activeTheme.readingBg,
        '--theme-border': activeTheme.cardBorder,
        '--app-bg': darkMode ? '#000000' : activeTheme.readingBg,
        '--app-surface': darkMode ? '#101010' : '#FFFFFF',
        '--app-text': darkMode ? '#E8F1FC' : '#17211E',
        '--app-muted': darkMode ? '#A9BCD2' : '#64748B',
        backgroundColor: darkMode ? '#000000' : activeTheme.readingBg,
        color: darkMode ? '#E8F1FC' : '#17211E'
      }}
    >
      <style>{`
        .transformer-no-motion *, .transformer-no-motion *::before, .transformer-no-motion *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; scroll-behavior: auto !important; }
        .theme-app .border-slate-100, .theme-app .border-slate-200, .theme-app [class~="border-[#E7DEC8]"] { border-color: var(--theme-border) !important; }
        .theme-app [class~="bg-white"] { background-color: color-mix(in srgb, var(--theme-reading-bg) 30%, white) !important; }
        .theme-app [class~="bg-slate-50"] { background-color: color-mix(in srgb, var(--theme-reading-bg) 65%, white) !important; }
        .theme-app [class~="bg-slate-100"] { background-color: color-mix(in srgb, var(--theme-reading-bg) 45%, var(--theme-accent) 8%) !important; }
        .theme-app [class~="text-[#173F35]"] { color: var(--theme-primary) !important; }
        .theme-app [class~="bg-[#173F35]"] { background-color: var(--theme-primary) !important; }
        .theme-app [class~="border-[#173F35]"] { border-color: var(--theme-primary) !important; }
        .theme-app [class~="text-[#D5AD59]"], .theme-app [class~="text-[#B88F3E]"] { color: var(--theme-accent) !important; }
        .theme-app [class~="bg-[#D5AD59]"] { background-color: var(--theme-accent) !important; }
        .theme-app .theme-reading-surface { background-color: var(--theme-reading-bg) !important; border-color: var(--theme-border) !important; }
        .theme-app .theme-topline { box-shadow: inset 0 3px 0 var(--theme-accent); }
        .theme-app [class~="bg-emerald-50"] { background-color: color-mix(in srgb, var(--theme-reading-bg) 70%, var(--theme-primary) 8%) !important; }
        .theme-app [class~="text-emerald-800"], .theme-app [class~="text-emerald-950"] { color: var(--theme-primary) !important; }
        .theme-app button:focus-visible, .theme-app input:focus-visible, .theme-app select:focus-visible { outline: 2px solid var(--theme-accent); outline-offset: 2px; }
        .theme-app[data-appearance=\"dark\"] { color: var(--app-text) !important; background: var(--app-bg) !important; }
        .theme-app[data-appearance=\"dark\"] .bg-white, .theme-app[data-appearance=\"dark\"] [class~=\"bg-white\"], .theme-app[data-appearance=\"dark\"] .bg-slate-50, .theme-app[data-appearance=\"dark\"] .bg-slate-100 { background-color: var(--app-surface) !important; }
        .theme-app[data-appearance=\"dark\"] .text-slate-900, .theme-app[data-appearance=\"dark\"] .text-slate-800, .theme-app[data-appearance=\"dark\"] .text-slate-700, .theme-app[data-appearance=\"dark\"] .text-gray-900 { color: var(--app-text) !important; }
        .theme-app[data-appearance=\"dark\"] .text-slate-600, .theme-app[data-appearance=\"dark\"] .text-slate-500, .theme-app[data-appearance=\"dark\"] .text-gray-500 { color: var(--app-muted) !important; }
        .theme-app[data-appearance=\"dark\"] .border-slate-100, .theme-app[data-appearance=\"dark\"] .border-slate-200 { border-color: #333333 !important; }
        .theme-app[data-appearance=\"dark\"] input, .theme-app[data-appearance=\"dark\"] textarea, .theme-app[data-appearance=\"dark\"] select { background-color: #111111 !important; color: var(--app-text) !important; border-color: #3A3A3A !important; }
        .theme-app[data-appearance=\"dark\"] [class~="bg-[#F6F0E3]"], .theme-app[data-appearance=\"dark\"] [class~="bg-[#F6F0E3]/40"], .theme-app[data-appearance=\"dark\"] [class~="bg-amber-50"], .theme-app[data-appearance=\"dark\"] [class~="bg-emerald-50"], .theme-app[data-appearance=\"dark\"] [class~="bg-indigo-50"], .theme-app[data-appearance=\"dark\"] [class~="bg-blue-50"], .theme-app[data-appearance=\"dark\"] [class~="bg-purple-50"], .theme-app[data-appearance=\"dark\"] [class~="bg-teal-50"] { background-color: #101010 !important; }
        .theme-app[data-appearance=\"dark\"] [class~="text-slate-400"], .theme-app[data-appearance=\"dark\"] [class~="text-slate-300"], .theme-app[data-appearance=\"dark\"] [class~="text-gray-400"] { color: #9fb2c9 !important; }
        .theme-app[data-appearance=\"dark\"] [class~="text-[#173F35]"], .theme-app[data-appearance=\"dark\"] [class~="text-[#B88F3E]"] { color: color-mix(in srgb, var(--theme-accent) 78%, white) !important; }
        .theme-app[data-appearance=\"dark\"] [class~="border-[#E7DEC8]"] { border-color: #3A3A3A !important; }
        .theme-app[data-appearance=\"dark\"] .divide-slate-100 > :not([hidden]) ~ :not([hidden]) { border-color: #333333 !important; }
        .theme-app[data-appearance=\"dark\"] .theme-reading-surface { background-color: #101010 !important; }
      `}</style>
      
      {/* Toast Alert */}
      {toast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-[#173F35] text-white px-5 py-2.5 rounded-full shadow-2xl border border-[#D5AD59] flex items-center space-x-2 text-xs font-bold animate-in fade-in duration-200">
          <Sparkles className="w-4 h-4 text-[#D5AD59]" />
          <span>{toast}</span>
        </div>
      )}

      {/* Main Container constrained for mobile/desktop layout */}
      <div className="w-full max-w-md mx-auto min-h-screen shadow-2xl flex flex-col relative pb-20" style={{backgroundColor: darkMode ? "#000000" : activeTheme.readingBg}}>
        
        {/* =================================================================== */}
        {/* TOP BRAND HEADER (Fixed Forest Green & Gold with Pilgrim Emblem)   */}
        {/* =================================================================== */}
        <header className="h-[74px] bg-[#173F35] border-b border-[#D5AD59]/30 px-4 flex items-center justify-between text-white shrink-0 sticky top-0 z-30 shadow-md">
          <div
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => { setActiveTab('home'); setMoreSubView(null); }}
          >
            <TransformerEmblem size="md" />
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-serif font-black tracking-widest text-lg text-white group-hover:text-[#D5AD59] transition-colors">
                  TRANSFORMER
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#D5AD59]" />
              </div>
              <p className="text-[10px] text-[#D5AD59] font-medium tracking-wide uppercase">
                Faith • Discipline • Growth
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => { setActiveTab('more'); setMoreSubView('reminders'); }}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/15 flex items-center justify-center text-white relative transition"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#D5AD59] ring-2 ring-[#173F35]" />
            </button>

            <button
              onClick={() => { setActiveTab('more'); setMoreSubView(null); }}
              className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#D5AD59] to-amber-200 p-[1.5px] shadow-sm hover:scale-105 transition"
              title="Profile"
            >
              <div className="w-full h-full rounded-full bg-[#173F35] flex items-center justify-center text-[#D5AD59]">
                <User className="w-4 h-4" />
              </div>
            </button>
          </div>
        </header>

        {/* =================================================================== */}
        {/* MAIN BODY SWITCHER (Tabs: Home, Tasks, Bible, Principles, More)    */}
        {/* =================================================================== */}
        <div className="flex-1 overflow-y-auto no-scrollbar">
          
          {/* ----------------------------------------------------------------- */}
          {/* TAB 1: HOME SECTION                                               */}
          {/* ----------------------------------------------------------------- */}
          {activeTab === 'home' && (
            <div className="space-y-4 pb-6 animate-in fade-in duration-150">
              
              {/* 1. Welcome & 16:9 Scenic Banner with Pilgrim Cross Motif */}
              <div className="theme-topline relative w-full aspect-[16/9] min-h-[240px] max-h-[360px] overflow-hidden shadow-inner rounded-b-2xl">
                <ScenicCanvas type={activeTheme.scenicType} />
                <div className="absolute inset-0 bg-gradient-to-r from-[#081B15]/95 via-[#081B15]/75 to-transparent flex flex-col justify-center px-6 text-white">
                  <div className="inline-flex items-center space-x-2 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-[10px] font-bold text-amber-200 tracking-wider mb-2 w-fit">
                    <CalendarIcon className="w-3 h-3 text-[#D5AD59]" />
                    <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }).toUpperCase()} · DAY {Math.floor((new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()) - new Date(new Date().getFullYear(), 0, 0)) / 86400000)} OF {new Date().getFullYear() % 4 === 0 ? 366 : 365}</span>
                  </div>
                  <h2 className="font-serif font-black text-2xl tracking-tight text-white drop-shadow-md">
                    {greeting}
                  </h2>
                  <p className="text-xs text-white/95 font-serif italic mt-1 max-w-[270px] leading-snug drop-shadow">
                    Begin with God. Continue with purpose.
                  </p>
                  <div className="flex items-center space-x-2 mt-3">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#D5AD59] bg-[#173F35]/90 px-2.5 py-0.5 rounded-md border border-[#D5AD59]/30">
                      {activeTheme.themeName}
                    </span>
                  </div>
                </div>
              </div>

              {/* 2. Main Bible Verse Card: Isaiah 22:22 KJV (Warm Cream #F6F0E3 Surface) */}
              <div className="px-4">
                <div
                  className="theme-reading-surface p-5 rounded-3xl border shadow-sm transition-all"
                  style={{
                    backgroundColor: activeTheme.readingBg,
                    borderColor: activeTheme.cardBorder
                  }}
                >
                  <div className="flex items-center justify-between border-b border-black/5 pb-2.5 mb-2.5">
                    <div className="flex items-center space-x-2">
                      <div className="w-7 h-7 rounded-xl bg-[#173F35] text-[#D5AD59] flex items-center justify-center shadow-xs">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#173F35]">
                        TODAY'S SCRIPTURE
                      </span>
                    </div>
                    <span className="font-serif font-bold text-xs text-[#B88F3E]">
                      {activeTheme.verse.ref}
                    </span>
                  </div>

                  <blockquote className="font-serif text-sm font-medium leading-relaxed text-slate-800 italic">
                    {activeTheme.verse.text}
                  </blockquote>

                  <div className="mt-3 pt-2.5 border-t border-black/5 flex items-center justify-between">
                    <p className="text-[11px] text-slate-600 font-sans max-w-[210px] leading-tight">
                      {activeTheme.verse.meaning}
                    </p>
                    <button
                      onClick={() => {
                        const target = EXPANDED_BIBLE_BOOKS.find(b => b.id === 'isaiah22') || EXPANDED_BIBLE_BOOKS[0];
                        setSelectedBook(target);
                        setActiveTab('bible');
                      }}
                      className="text-xs font-bold text-[#173F35] flex items-center space-x-1 hover:text-[#B88F3E] transition group"
                    >
                      <span>Read reflection</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>

              {/* 3. Section 1: 1. Calendar & Daily Plan */}
              <div className="px-4">
                <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-serif font-black text-sm text-slate-900 flex items-center space-x-1.5">
                        <CalendarIcon className="w-4 h-4 text-[#173F35]" />
                        <span>1. Calendar & Daily Plan</span>
                      </h3>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        {new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' })} • Timetable & Responsibilities
                      </p>
                    </div>
                    <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                      {completedToday} of {totalToday} complete
                    </span>
                  </div>

                  {/* Horizontal Weekday Carousel */}
                  <div className="flex items-center justify-between gap-1 py-1">
                    {Array.from({ length: 7 }, (_, i) => { const dayDate = new Date(clockNow); dayDate.setDate(clockNow.getDate() - clockNow.getDay() + i); const key = getLocalDateKey(dayDate); return { day: dayDate.toLocaleDateString('en-US', { weekday: 'short' }), num: dayDate.getDate(), active: key === selectedCalendarDate, key }; }).map((d, i) => (
                      <button
                        key={i}
                        onClick={() => { setSelectedCalendarDate(d.key); showToast(`Selected ${d.day} ${d.num}`); }}
                        className={`flex-1 flex flex-col items-center py-2 rounded-2xl text-xs transition ${
                          d.active
                            ? 'bg-[#173F35] text-[#D5AD59] font-black shadow-md scale-105'
                            : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <span className="text-[9px] uppercase tracking-wider">{d.day}</span>
                        <span className="text-xs font-bold mt-0.5">{d.num}</span>
                      </button>
                    ))}
                  </div>

                  {/* Progress bar */}
                  <div className="space-y-1 pt-1">
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${progressPercent}%`,
                          backgroundColor: '#608066'
                        }}
                      />
                    </div>
                    <p className="text-[10px] text-slate-500 italic">
                      Steady, faithful progress honors God. Focus on one task at a time.
                    </p>
                  </div>

                  {/* Shared task data: overdue, today and upcoming */}
                  <div className="space-y-3 pt-1">
                    {[['Overdue', tasks.filter(t => !t.completed && !t.cancelled && t.date && t.date < todayKey)], ['Today', tasks.filter(t => !t.completed && !t.cancelled && t.date === todayKey)], ['Upcoming', tasks.filter(t => !t.completed && !t.cancelled && t.date && t.date > todayKey)]].map(([label, items]) => (
                      <div key={label}>
                        <div className="flex items-center justify-between mb-1"><b className="text-[11px] uppercase tracking-wide text-slate-500">{label}</b><span className="text-[10px] opacity-60">{items.length}</span></div>
                        {items.length ? items.slice(0,3).map(task => <button key={task.id} onClick={() => toggleTask(task.id)} className="w-full p-2.5 mb-1 rounded-xl border flex items-center justify-between text-left text-xs" style={{borderColor:'var(--theme-border)',background:'var(--app-surface)',color:'var(--app-text)'}}><span className="flex items-center gap-2"><span className="w-4 h-4 rounded border flex items-center justify-center" style={{borderColor:activeTheme.accent}}>{task.completed?'✓':''}</span><span>{task.title}</span></span><small className="opacity-60">{task.time || ''}</small></button>) : <p className="text-[10px] text-slate-400 py-1">No {label.toLowerCase()} tasks.</p>}
                      </div>
                    ))}
                    <div className="text-[10px] text-slate-500">Completed tasks: {tasks.filter(t => t.completed && t.date === todayKey).length} today</div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center gap-2 pt-2">
                    <button
                      onClick={() => setIsTaskModalOpen(true)}
                      className="flex-1 py-2.5 rounded-xl bg-[#173F35] text-[#D5AD59] font-bold text-xs flex items-center justify-center space-x-1.5 shadow-sm hover:bg-[#1f4e42] transition"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Task</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('tasks')}
                      className="flex-1 py-2.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 font-bold text-xs flex items-center justify-center space-x-1.5 transition"
                    >
                      <span>View Tasks</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* 4. Section 2: 2. Today's Principles */}
              <div className="px-4">
                <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 rounded-full bg-[#173F35] text-[#D5AD59] flex items-center justify-center">
                        <Compass className="w-3.5 h-3.5" />
                      </div>
                      <h3 className="font-serif font-black text-sm text-slate-900">
                        2. Today's Principles
                      </h3>
                    </div>
                    <button
                      onClick={() => setActiveTab('principles')}
                      className="text-xs font-bold text-[#173F35] hover:text-[#B88F3E]"
                    >
                      View All
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    {activeTheme.principles.map((pid, idx) => {
                      const p = ALL_PRINCIPLES.find(item => item.id === pid);
                      if (!p) return null;
                      return (
                        <div
                          key={p.id}
                          onClick={() => setActivePrincipleModal(p)}
                          className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-[#F6F0E3]/60 transition flex items-start space-x-3 cursor-pointer group"
                        >
                          <span className="w-6 h-6 rounded-lg bg-[#D5AD59]/20 text-[#173F35] font-black text-xs flex items-center justify-center shrink-0 border border-[#D5AD59]/40 mt-0.5">
                            0{idx + 1}
                          </span>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-bold text-xs text-slate-900 group-hover:text-[#173F35]">
                                {p.title}
                              </h4>
                              <span className="text-[10px] font-serif font-bold text-[#B88F3E]">
                                {p.ref}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                              {p.action}
                            </p>
                          </div>
                          <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-600 self-center" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* 5. Section 3: Malayalam Pentecostal Worship Song */}
              <div className="px-4">
                <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex items-center space-x-3.5">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden relative shrink-0 shadow-sm">
                    <ScenicCanvas type={activeTheme.scenicType} />
                    <div className="absolute inset-0 bg-black/25 flex items-center justify-center text-white">
                      <Music className="w-5 h-5 text-amber-200" />
                    </div>
                  </div>

                  <div className="min-w-0 flex-1">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
                      Malayalam Worship
                    </span>
                    <h4 className="font-serif font-bold text-xs text-slate-900 truncate mt-1">
                      {activeTheme.song.titleEn}
                    </h4>
                    <p className="text-[11px] font-serif text-slate-600 truncate">
                      {activeTheme.song.titleMl}
                    </p>
                    <p className="text-[10px] text-slate-400">
                      {activeTheme.song.artist}
                    </p>
                  </div>

                  <div className="flex flex-col gap-1.5 shrink-0">
                    <a
                      href={`https://www.youtube.com/results?search_query=${encodeURIComponent(activeTheme.song.titleEn + ' Malayalam christian song')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 text-[10px] font-bold flex items-center space-x-1 transition"
                    >
                      <span>YouTube</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <a
                      href={`https://open.spotify.com/search/${encodeURIComponent(activeTheme.song.titleEn)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-[10px] font-bold flex items-center space-x-1 transition"
                    >
                      <span>Spotify</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>

              {/* 6. Reflect on Your Day */}
              <div className="px-4">
                <div
                  className="theme-reading-surface p-5 rounded-3xl border shadow-sm space-y-3"
                  style={{
                    backgroundColor: activeTheme.readingBg,
                    borderColor: activeTheme.cardBorder
                  }}
                >
                  <div className="flex items-center space-x-2">
                    <Moon className="w-4 h-4 text-[#173F35]" />
                    <h4 className="font-serif font-bold text-sm text-slate-900">
                      Reflect on Your Day
                    </h4>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-serif">
                    Review what God enabled you to accomplish today and prepare tomorrow’s first step in quiet confidence.
                  </p>
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => { setActiveTab('more'); setMoreSubView('questions'); }}
                      className="flex-1 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center space-x-1.5 shadow-2xs hover:bg-slate-50 transition"
                    >
                      <HelpCircle className="w-3.5 h-3.5 text-[#173F35]" />
                      <span>Answer 5 Questions</span>
                    </button>
                    <button
                      onClick={() => { setActiveTab('more'); setMoreSubView('journal'); }}
                      className="flex-1 py-2.5 rounded-xl bg-[#173F35] text-[#D5AD59] font-bold text-xs flex items-center justify-center space-x-1.5 shadow-sm hover:bg-[#1f4e42] transition"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Write Journal Note</span>
                    </button>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* ----------------------------------------------------------------- */}
          {/* TAB 2: TASKS SECTION                                              */}
          {/* ----------------------------------------------------------------- */}
          {activeTab === 'tasks' && (
            <div className="p-4 space-y-4 pb-8 animate-in fade-in duration-150">
              
              {/* Header & Guilt-Free Progress Bar */}
              <div className="bg-[#173F35] p-5 rounded-3xl text-white shadow-md space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#D5AD59]">
                      Daily Responsibilities
                    </span>
                    <h2 className="font-serif font-bold text-lg text-white">
                      My Tasks & Consistency
                    </h2>
                  </div>
                  <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-white/10 text-[#D5AD59] border border-[#D5AD59]/30">
                    {completedToday} of {totalToday} ({progressPercent}%)
                  </span>
                </div>

                <div className="w-full h-2.5 bg-black/20 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500 bg-[#D5AD59]"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>

                <p className="text-[11px] text-white/80 italic font-serif">
                  "And whatsoever ye do, do it heartily, as to the Lord." — Incomplete tasks can be rescheduled tomorrow with grace.
                </p>
              </div>

              {/* Add Task Trigger */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center space-x-1 text-xs text-slate-500">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Showing Today's Schedule</span>
                </div>
                <button
                  onClick={() => setIsTaskModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-[#173F35] text-[#D5AD59] font-bold text-xs flex items-center space-x-1.5 shadow-sm hover:bg-[#1f4e42] transition"
                >
                  <Plus className="w-4 h-4" />
                  <span>New Task</span>
                </button>
              </div>

              {/* Tasks List */}
              <div className="space-y-2.5">
                {tasks.map(task => {
                  const linkedPrinciple = ALL_PRINCIPLES.find(p => p.id === task.principleId);
                  return (
                    <div
                      key={task.id}
                      className={`p-4 rounded-2xl border transition-all ${
                        task.completed
                          ? 'bg-[#F0FDF4] border-emerald-200'
                          : 'bg-white border-slate-200 shadow-xs hover:border-[#173F35]/40'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <button
                          onClick={() => toggleTask(task.id)}
                          className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition ${
                            task.completed
                              ? 'bg-[#608066] text-white shadow-xs'
                              : 'border-2 border-slate-300 hover:border-[#173F35]'
                          }`}
                        >
                          {task.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </button>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <h4 className={`font-semibold text-xs text-slate-900 ${task.completed ? 'line-through text-slate-400' : ''}`}>
                              {task.title}
                            </h4>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                              task.priority === 'High' ? 'bg-red-50 text-red-700' :
                              task.priority === 'Medium' ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-emerald-700'
                            }`}>
                              {task.priority}
                            </span>
                          </div>
                          {!!task.subtasks?.length && <div className="mt-2 space-y-1">{task.subtasks.map(sub=><label key={sub.id} className="flex items-center gap-2 text-[10px] opacity-80"><input type="checkbox" checked={!!sub.completed} onChange={()=>setTasks(prev=>prev.map(t=>t.id===task.id?{...t,subtasks:t.subtasks.map(x=>x.id===sub.id?{...x,completed:!x.completed}:x)}:t))}/><span className={sub.completed?'line-through opacity-50':''}>{sub.title}</span></label>)}</div>}

                          <div className="flex flex-wrap items-center gap-2 mt-2 text-[10px] text-slate-500">
                            <span className="flex items-center space-x-1">
                              <Clock className="w-3 h-3 text-slate-400" />
                              <span>{task.time}</span>
                            </span>
                            {task.deadline && (
                              <span className="text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">
                                Due: {task.deadline}
                              </span>
                            )}
                            <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium">
                              {task.category}
                            </span>
                            {linkedPrinciple && (
                              <span className="text-[#173F35] bg-[#D5AD59]/20 px-2 py-0.5 rounded-full font-bold flex items-center space-x-1">
                                <Compass className="w-2.5 h-2.5 text-[#B88F3E]" />
                                <span>{linkedPrinciple.title}</span>
                              </span>
                            )}
                          </div>
                        </div>

                        <button onClick={() => { setEditingTaskId(task.id); setTaskForm({ title: task.title || '', time: task.time || '', deadline: task.deadline || '', priority: task.priority || 'Medium', category: task.category || 'Other', principleId: String(task.principleId || 1), date: task.date || todayKey, subtasksText: (task.subtasks || []).map(x=>x.title).join('\n'), recurrence: task.recurrence || 'None' }); setIsTaskModalOpen(true); }} className="text-slate-400 hover:text-[#173F35] p-1" title="Edit task"><Pencil className="w-3.5 h-3.5" /></button>
                        <button onClick={() => { setTasks(prev => prev.map(t => t.id === task.id ? { ...t, cancelled: !t.cancelled } : t)); showToast(task.cancelled ? 'Task restored' : 'Task cancelled'); }} className="text-slate-400 hover:text-amber-600 p-1" title={task.cancelled ? 'Restore task' : 'Cancel task'}><XCircle className="w-3.5 h-3.5" /></button>
                        <button
                          onClick={() => {
                            setDeletedTasks(prev => [{ ...task, deletedAt: new Date().toISOString() }, ...prev]);
                            setTasks(prev => prev.filter(t => t.id !== task.id));
                            showToast('Task moved to Recently Deleted');
                          }}
                          className="text-slate-300 hover:text-red-500 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          )}

          {/* ----------------------------------------------------------------- */}
          {/* TAB 3: MASSIVELY EXPANDED BIBLE SECTION (English & Malayalam)     */}
          {/* ----------------------------------------------------------------- */}
          {activeTab === 'bible' && (
            <div className="p-4 space-y-4 pb-8 animate-in fade-in duration-150">
              
              {/* Top Bible Controls & Search */}
              <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-4 h-4 text-[#173F35]" />
                    <span className="font-serif font-black text-sm text-slate-900">
                      Read the Bible
                    </span>
                  </div>
                  <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl text-[11px] font-bold">
                    <button
                      onClick={() => setBibleLanguage('bilingual')}
                      className={`px-2 py-1 rounded-lg transition ${bibleLanguage === 'bilingual' ? 'bg-[#173F35] text-[#D5AD59]' : 'text-slate-600'}`}
                    >
                      Parallel
                    </button>
                    <button
                      onClick={() => setBibleLanguage('en')}
                      className={`px-2 py-1 rounded-lg transition ${bibleLanguage === 'en' ? 'bg-[#173F35] text-[#D5AD59]' : 'text-slate-600'}`}
                    >
                      KJV
                    </button>
                    <button
                      onClick={() => setBibleLanguage('ml')}
                      className={`px-2 py-1 rounded-lg transition ${bibleLanguage === 'ml' ? 'bg-[#173F35] text-[#D5AD59]' : 'text-slate-600'}`}
                    >
                      മലയാളം
                    </button>
                  </div>
                </div>

                {/* Search Bar for Scriptures */}
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={bibleSearchQuery}
                    onChange={(e) => setBibleSearchQuery(e.target.value)}
                    placeholder="Search keywords or verses in this chapter..."
                    className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:border-[#173F35]"
                  />
                  {bibleSearchQuery && (
                    <button onClick={() => setBibleSearchQuery('')} className="absolute right-2.5 top-2 text-slate-400">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

              </div>

              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-3 text-[11px] leading-relaxed text-emerald-950">
                <strong>Complete KJV reader:</strong> Choose any of the 66 books and chapter below. Full chapter text loads from an online Bible service, so an internet connection is required. Only the King James Version (KJV) is offered for the complete online reader; Malayalam excerpts are shown separately.
              </div>

              <div className="p-4 rounded-3xl border border-[#E7DEC8] bg-white shadow-sm space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-serif font-black text-sm text-[#173F35]">1. Full Bible Reader · KJV</h3>
                  <span className="text-[10px] text-slate-500">66 books</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <label className="text-[11px] font-bold text-slate-600">Book
                    <select value={fullBibleBook} onChange={e => { setFullBibleBook(e.target.value); setFullBibleChapter(1); }} className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2 text-xs">
                      {BIBLE_BOOK_INDEX.map(book => <option key={book.name} value={book.name}>{book.name}</option>)}
                    </select>
                  </label>
                  <label className="text-[11px] font-bold text-slate-600">Chapter
                    <select value={fullBibleChapter} onChange={e => setFullBibleChapter(Number(e.target.value))} className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-2 text-xs">
                      {Array.from({length: BIBLE_BOOK_INDEX.find(b => b.name === fullBibleBook)?.chapters || 1}, (_, i) => <option key={i+1} value={i+1}>{i+1}</option>)}
                    </select>
                  </label>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <button disabled={fullBibleChapter <= 1} onClick={() => setFullBibleChapter(c => Math.max(1,c-1))} className="px-3 py-2 rounded-xl bg-slate-100 text-xs font-bold disabled:opacity-40">← Previous</button>
                  <span className="text-xs font-bold text-[#173F35]">{fullBibleBook} {fullBibleChapter}</span>
                  <button disabled={fullBibleChapter >= (BIBLE_BOOK_INDEX.find(b => b.name === fullBibleBook)?.chapters || 1)} onClick={() => setFullBibleChapter(c => c+1)} className="px-3 py-2 rounded-xl bg-slate-100 text-xs font-bold disabled:opacity-40">Next →</button>
                </div>
                {fullBibleLoading && <p className="text-xs text-slate-500 py-3">Loading chapter…</p>}
                {fullBibleError && <div className="text-xs text-amber-900 bg-amber-50 rounded-xl p-3">{fullBibleError}<button onClick={() => setFullBibleRetry(n => n + 1)} className="ml-2 underline font-bold">Retry</button></div>}
                {!fullBibleLoading && !fullBibleError && <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
                  {fullBibleVerses.filter(v => !bibleSearchQuery.trim() || v.en.toLowerCase().includes(bibleSearchQuery.toLowerCase()) || String(v.num) === bibleSearchQuery.trim()).map(v => {
                    const ref = `${fullBibleBook} ${fullBibleChapter}:${v.num}`;
                    return <div key={v.num} className="flex gap-3 text-sm leading-relaxed"><span className="font-mono text-xs font-bold text-[#B88F3E] pt-1">{v.num}</span><div className="flex-1"><p className="font-serif text-slate-900">{v.en}</p><div className="flex gap-3 mt-1 text-[10px]"><button onClick={() => setSavedVerses(prev => prev.includes(ref) ? prev.filter(x => x !== ref) : [...prev, ref])} className="text-[#173F35] font-bold">{savedVerses.includes(ref) ? '★ Saved' : '☆ Bookmark'}</button><button onClick={() => cycleHighlight(ref)} className="text-slate-500">Highlight</button></div></div></div>;
                  })}
                  {fullBibleVerses.length > 0 && bibleSearchQuery.trim() && fullBibleVerses.filter(v => v.en.toLowerCase().includes(bibleSearchQuery.toLowerCase()) || String(v.num) === bibleSearchQuery.trim()).length === 0 && <p className="text-xs text-slate-500">No verses match this search in the current chapter.</p>}
                </div>}
              </div>

<div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-3">
                <div className="flex items-center gap-2">
                  <Compass className="w-4 h-4 text-[#173F35]" />
                  <h4 className="font-serif font-bold text-sm text-slate-900">2. Guidance by Topic</h4>
                </div>
                <p className="text-xs text-slate-600">Find Scripture references for real-life situations. These topic guides are separate from the Bible reader; use the reference to open the available passage.</p>
                <div className="grid grid-cols-2 gap-2">
                  {SCRIPTURE_TOPICS.map((topic, i) => (
                    <button key={i} onClick={() => {
                      const targetBook = EXPANDED_BIBLE_BOOKS.find(b => b.id === topic.bookId);
                      if (targetBook) { setSelectedBook(targetBook); setBibleSearchQuery(''); showToast(`Guidance: ${topic.name} — ${topic.verse}`); }
                    }} className="p-3 rounded-2xl bg-[#F6F0E3]/70 hover:bg-[#F6F0E3] border border-[#E7DEC8] text-left transition">
                      <span className="block font-bold text-[11px] text-[#173F35]">{topic.name}</span>
                      <span className="text-[10px] font-serif text-[#B88F3E]">{topic.verse}</span>
                    </button>
                  ))}
                </div>
              </div>

<div className="p-5 rounded-3xl border border-[#E7DEC8] bg-[#F6F0E3] shadow-sm space-y-4">
                <div className="flex items-center gap-2 border-b border-black/5 pb-2">
                  <BookOpen className="w-4 h-4 text-[#173F35]" />
                  <h3 className="font-serif font-black text-sm text-[#173F35]">3. Scripture Library</h3>
                </div>
                <div className="flex items-center justify-between border-b border-black/5 pb-2">
                  <div>
                    <h3 className="font-serif font-black text-base text-[#173F35]">
                      {selectedBook.nameEn} · {selectedBook.nameMl}
                    </h3>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-sans font-bold">
                      Topic: {selectedBook.topic}
                    </p>
                  </div>
                  <div className="flex items-center space-x-1.5 text-xs text-slate-500">
                    <button
                      onClick={() => setBibleFontSize(bibleFontSize === 'text-sm' ? 'text-base' : 'text-sm')}
                      className="px-2 py-0.5 rounded bg-white/60 font-bold border border-slate-200"
                      title="Adjust font size"
                    >
                      A±
                    </button>
                  </div>
                </div>

                {/* Verses Stack */}
                <div className="space-y-4">
                  {filteredVerses.map(v => {
                    const verseId = `${selectedBook.nameEn}:${v.num}`;
                    const isSaved = savedVerses.includes(verseId);
                    const hl = verseHighlights[verseId];
                    const hlClass = hl === 'gold' ? 'bg-amber-100/70 p-2 rounded-xl' :
                                    hl === 'green' ? 'bg-emerald-100/70 p-2 rounded-xl' :
                                    hl === 'blue' ? 'bg-sky-100/70 p-2 rounded-xl' :
                                    hl === 'peach' ? 'bg-orange-100/70 p-2 rounded-xl' : '';

                    return (
                      <div key={v.num} className={`group relative transition ${hlClass}`}>
                        <div className="flex items-start space-x-2">
                          <span className="font-mono text-xs font-bold text-[#B88F3E] shrink-0 mt-0.5">
                            {v.num}
                          </span>
                          <div className={`space-y-1.5 ${bibleFontSize}`}>
                            {(bibleLanguage === 'en' || bibleLanguage === 'bilingual') && (
                              <p className="font-serif text-slate-900 leading-relaxed font-normal">
                                {v.en}
                              </p>
                            )}
                            {(bibleLanguage === 'ml' || bibleLanguage === 'bilingual') && (
                              <p className="font-serif text-slate-800 leading-relaxed font-normal text-emerald-950">
                                {v.ml}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Action strip */}
                        <div className="flex items-center space-x-3 mt-1.5 ml-5 text-[10px] text-slate-400">
                          <button
                            onClick={() => {
                              if (isSaved) {
                                setSavedVerses(savedVerses.filter(x => x !== verseId));
                                showToast('Removed from Bookmarks');
                              } else {
                                setSavedVerses([...savedVerses, verseId]);
                                showToast('Verse bookmarked!');
                              }
                            }}
                            className={`flex items-center space-x-1 font-bold ${isSaved ? 'text-[#B88F3E]' : 'hover:text-[#173F35]'}`}
                          >
                            <Bookmark className="w-3 h-3" />
                            <span>{isSaved ? 'Bookmarked' : 'Save'}</span>
                          </button>
                          
                          <button
                            onClick={() => cycleHighlight(verseId)}
                            className="flex items-center space-x-1 hover:text-[#173F35]"
                          >
                            <Highlighter className="w-3 h-3" />
                            <span>Highlight</span>
                          </button>

                          <button
                            onClick={() => setShareVerseModal({ ref: `${selectedBook.nameEn}:${v.num}`, text: v.en, ml: v.ml })}
                            className="flex items-center space-x-1 hover:text-[#173F35]"
                          >
                            <Share2 className="w-3 h-3" />
                            <span>Share Card</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

<div className="p-4 rounded-3xl border border-slate-100 bg-white shadow-sm space-y-2">
                <div>
                  <h3 className="font-serif font-black text-sm text-[#173F35]">4. Browse Malayalam Scripture Passages</h3>
                  <p className="text-[11px] text-slate-500 mt-1">Choose a book/topic below to explore the curated English and Malayalam verses.</p>
                </div>
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
                  {EXPANDED_BIBLE_BOOKS.map(b => (
                    <button
                      key={b.id}
                      onClick={() => { setSelectedBook(b); setBibleSearchQuery(''); }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition ${selectedBook.id === b.id ? 'bg-[#173F35] text-[#D5AD59] shadow-xs' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
                    >
                      {b.nameEn}
                    </button>
                  ))}
                </div>
              </div>

              {/* 31-Day Proverbs Plan Card */}
              <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-[#D5AD59]" />
                    <h4 className="font-serif font-bold text-sm text-slate-900">
                      31-Day Proverbs Journey
                    </h4>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                    Day {readingPlanProgress} of 31
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-serif">
                  Read Proverbs chapter {readingPlanProgress} today for practical divine wisdom on speech, stewardship, and diligence.
                </p>
                <button
                  onClick={() => {
                    const next = Math.min(readingPlanProgress + 1, 31);
                    setReadingPlanProgress(next);
                    showToast(`Proverbs ${readingPlanProgress} completed! Moved to Day ${next}`);
                  }}
                  className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-[#173F35] hover:text-[#D5AD59] text-slate-700 font-bold text-xs flex items-center justify-center space-x-1.5 transition"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Mark Today's Chapter Complete</span>
                </button>
              </div>

              {/* Topic-Based Scripture Search / Quick Nav */}
              <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-3">
                <h4 className="font-serif font-bold text-sm text-slate-900 flex items-center space-x-1.5">
                  <Search className="w-4 h-4 text-[#173F35]" />
                  <span>Topic-Based Scripture Search</span>
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {SCRIPTURE_TOPICS.map((topic, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        const targetBook = EXPANDED_BIBLE_BOOKS.find(b => b.id === topic.bookId);
                        if (targetBook) {
                          setSelectedBook(targetBook);
                          showToast(`Opened ${targetBook.nameEn} for ${topic.name}`);
                        }
                      }}
                      className="p-2.5 rounded-2xl bg-slate-50 hover:bg-[#F6F0E3] border border-slate-100 text-left transition"
                    >
                      <h5 className="font-bold text-[11px] text-slate-800">{topic.name}</h5>
                      <span className="text-[10px] font-serif text-[#B88F3E] font-medium">{topic.verse}</span>
                    </button>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ----------------------------------------------------------------- */}
          {/* TAB 4: PRINCIPLES SECTION (Strict 3-Order Sequence)              */}
          {/* ----------------------------------------------------------------- */}
          {activeTab === 'principles' && (() => {
            const selectedPrinciplesTheme = THEMES.find(theme => theme.dayIndex === new Date(`${selectedCalendarDate}T12:00:00`).getDay()) || THEMES[1];
            const selectedDateTasks = tasks.filter(task => !task.cancelled && task.date === selectedCalendarDate);
            const selectedDateLabel = new Date(`${selectedCalendarDate}T12:00:00`).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
            const shiftSelectedDate = (days) => { const date = new Date(`${selectedCalendarDate}T12:00:00`); date.setDate(date.getDate() + days); setSelectedCalendarDate(getLocalDateKey(date)); };
            return (
            <div className="p-4 space-y-4 pb-8 animate-in fade-in duration-150">
              
              {/* Order 1: Calendar and Date Selection */}
              <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#D5AD59]">
                      Order 1
                    </span>
                    <h3 className="font-serif font-bold text-sm text-slate-900 flex items-center space-x-1.5">
                      <CalendarIcon className="w-4 h-4 text-[#173F35]" />
                      <span>1. Calendar and Date Selection</span>
                    </h3>
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                    {selectedCalendarDate}
                  </span>
                </div>

                <p className="text-xs text-slate-500">
                  Select a date to review scheduled principles, tasks, and historical notes.
                </p>

                {/* Quick Date Selector */}
                <div className="flex items-center gap-2">
                  <button type="button" aria-label="Previous day" onClick={() => shiftSelectedDate(-1)} className="rounded-lg border px-3 py-2 text-sm" style={{borderColor: activeTheme.accent}}>‹</button>
                  <input aria-label="Choose selected date" type="date" value={selectedCalendarDate} onChange={e => e.target.value && setSelectedCalendarDate(e.target.value)} className="min-w-0 flex-1 rounded-lg border p-2 text-xs" />
                  <button type="button" aria-label="Next day" onClick={() => shiftSelectedDate(1)} className="rounded-lg border px-3 py-2 text-sm" style={{borderColor: activeTheme.accent}}>›</button>
                </div>
                <div className="flex items-center justify-between gap-1 py-1">
                  {Array.from({ length: 5 }, (_, i) => {
                    const d = new Date(`${selectedCalendarDate}T12:00:00`);
                    d.setDate(d.getDate() + i - 2);
                    return getLocalDateKey(d);
                  }).map(dt => (
                    <button
                      key={dt}
                      onClick={() => setSelectedCalendarDate(dt)}
                      className={`flex-1 py-2 px-1 rounded-xl text-xs font-bold transition text-center ${
                        selectedCalendarDate === dt
                          ? 'bg-[#173F35] text-[#D5AD59] shadow-sm'
                          : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <div className="text-[9px] uppercase">{new Date(`${dt}T12:00:00`).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Order 2: Daily Principles (The 3 assigned for that day) */}
              <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#D5AD59]">
                      Order 2
                    </span>
                    <h3 className="font-serif font-bold text-sm text-slate-900 flex items-center space-x-1.5">
                      <Compass className="w-4 h-4 text-[#173F35]" />
                      <span>2. Daily Principles</span>
                    </h3>
                  </div>
                  <span className="text-[10px] font-bold text-[#B88F3E]">
                    3 Assigned
                  </span>
                </div>

                <div className="space-y-3">
                  {selectedPrinciplesTheme.principles.map((pid, idx) => {
                    const p = ALL_PRINCIPLES.find(item => item.id === pid);
                    if (!p) return null;
                    return (
                      <div
                        key={p.id}
                        className="p-4 rounded-2xl bg-[#F6F0E3]/60 border border-[#E7DEC8] space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-[#173F35]">
                            Principle {idx + 1}: {p.title}
                          </span>
                          <span className="text-[10px] font-serif font-bold text-[#B88F3E]">
                            {p.ref}
                          </span>
                        </div>
                        <p className="text-xs text-slate-700 italic font-serif">
                          "{p.scriptureText}"
                        </p>
                        <p className="text-[11px] text-slate-600">
                          <strong>Meaning:</strong> {p.meaning}
                        </p>
                        <div className="p-2.5 rounded-xl bg-white border border-[#E7DEC8] text-[11px] text-slate-800 font-medium">
                          <strong>Practical Action:</strong> {p.action}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Order 3: Tasks and Progress */}
              <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#D5AD59]">
                    Order 3
                  </span>
                  <h3 className="font-serif font-bold text-sm text-slate-900 flex items-center space-x-1.5">
                    <CheckSquare className="w-4 h-4 text-[#173F35]" />
                    <span>3. Tasks and Progress</span>
                  </h3>
                </div>

                <div className="rounded-2xl border p-3 space-y-2" style={{borderColor: activeTheme.cardBorder}}>
                  <p className="text-xs font-bold">Tasks for {selectedDateLabel}</p>
                  {selectedDateTasks.length ? selectedDateTasks.map(task => <div key={task.id} className="flex items-center gap-2 text-xs"><span>{task.completed ? '✓' : '○'}</span><span className={task.completed ? 'line-through opacity-60' : ''}>{task.title}</span><span className="ml-auto opacity-60">{task.time || ''}</span></div>) : <p className="text-xs opacity-60">No tasks scheduled for this date.</p>}
                </div>
                <div className="space-y-2">
                  {selectedPrinciplesTheme.principles.map((pid, idx) => {
                    const p = ALL_PRINCIPLES.find(item => item.id === pid);
                    if (!p) return null;
                    const key = `${selectedCalendarDate}-${pid}`;
                    const isChecked = principleActionChecks[key] || false;
                    return (
                      <div
                        key={p.id}
                        onClick={() => setPrincipleActionChecks(current => ({ ...current, [key]: !current[key] }))}
                        className={`p-3 rounded-2xl border flex items-center space-x-3 cursor-pointer transition ${
                          isChecked ? 'bg-[#F0FDF4] border-emerald-200' : 'bg-slate-50 border-slate-100'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-md flex items-center justify-center transition shrink-0 ${
                          isChecked ? 'bg-[#608066] text-white' : 'border-2 border-slate-300'
                        }`}>
                          {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className={`text-xs font-semibold ${isChecked ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                            {p.action}
                          </p>
                          <span className="text-[10px] text-slate-400">
                            Linked to Principle #{p.id} ({p.title})
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Reflection for Selected Date */}
                <div className="pt-2 space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-700">
                    Brief Reflection for {selectedCalendarDate}
                  </label>
                  <textarea
                    value={principleNotes[selectedCalendarDate] || ''}
                    onChange={(e) => setPrincipleNotes(current => ({ ...current, [selectedCalendarDate]: e.target.value }))}
                    placeholder="How did you apply God's principles today? What did you learn?"
                    className="w-full h-20 p-3 text-xs bg-slate-50 rounded-2xl border border-slate-200 focus:outline-none focus:border-[#173F35] font-serif"
                  />
                  <button
                    onClick={() => showToast('Reflection saved to historical journal')}
                    className="w-full py-2 rounded-xl bg-[#173F35] text-[#D5AD59] font-bold text-xs"
                  >
                    Save Today's Reflection
                  </button>
                </div>
              </div>

              {/* View All 12 Principles Directory */}
              <div className="bg-slate-50 p-4 rounded-3xl border border-slate-200 text-center">
                <p className="text-xs text-slate-600 mb-2 font-serif">
                  Want to review the complete Biblical Principles library?
                </p>
                <button
                  onClick={() => setActivePrincipleModal(ALL_PRINCIPLES[0])}
                  className="px-4 py-2 rounded-xl bg-white border border-slate-300 font-bold text-xs text-[#173F35] hover:bg-slate-100 transition"
                >
                  Browse All 12 Principles
                </button>
              </div>

            </div>
            );
          })()}

          {/* ----------------------------------------------------------------- */}
          {/* TAB 5: MORE MENU & ERROR-PROOF SUBVIEWS (NO WHITE SCREEN)         */}
          {/* ----------------------------------------------------------------- */}
          {activeTab === 'more' && (
            <div className="p-4 space-y-4 pb-8 animate-in fade-in duration-150">
              
              {/* SUBVIEW RENDERER */}
              {moreSubView ? (
                <div className="space-y-4">
                  
                  {/* Universal Reliable Back Header */}
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                    <button
                      onClick={() => setMoreSubView(null)}
                      className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#173F35] hover:text-[#B88F3E] bg-[#F6F0E3] px-3 py-1.5 rounded-xl border border-[#D5AD59]/40 transition shadow-xs"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Back to More Tools</span>
                    </button>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Transformer Tools
                    </span>
                  </div>

                  {['readingJourney','dailyReflection','weeklyReports','focusMode','fullCalendar'].includes(moreSubView) && (
                    <FeaturePanel view={moreSubView} tasks={tasks} setTasks={setTasks} activeTheme={activeTheme} darkMode={darkMode} onBack={() => setMoreSubView(null)} showToast={showToast} />
                  )}
                  {['offlineAccess','universalSearch','countdown','backupRestore','recentlyDeleted','personalGrowth','personalization','homeWidgets','notificationCentre','smartCalendar'].includes(moreSubView) && (
                    <ExtraPanel view={moreSubView} tasks={tasks} setTasks={setTasks} deletedTasks={deletedTasks} setDeletedTasks={setDeletedTasks} activeTheme={activeTheme} showToast={showToast} />
                  )}

                  {/* 1. Daily Theme Sub-view */}
                  {moreSubView === 'theme' && (
                    <div className="space-y-4 animate-in fade-in">
                      <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-3">
                        <div className="space-y-2">
                          <h3 className="font-serif font-bold text-sm text-slate-900 flex items-center gap-2"><Moon className="w-4 h-4 text-[#173F35]" /> App appearance</h3>
                          <p className="text-xs text-slate-500">Light and dark appearance work with all seven weekly colour themes. The original daily scenery remains unchanged.</p>
                          <div className="grid grid-cols-3 gap-2">
                            {[['light','Light'],['dark','Dark'],['system','System']].map(([value,label]) => <button key={value} onClick={() => { setAppearanceMode(value); showToast(`${label} appearance selected`); }} className={`rounded-xl border px-3 py-2 text-xs font-bold ${appearanceMode === value ? 'bg-[#173F35] text-white border-[#D5AD59]' : 'bg-slate-50 text-slate-700 border-slate-200'}`}>{label}</button>)}
                          </div>
                        </div>
                        <div className="h-px bg-slate-100" />
                        <div className="flex items-center justify-between">
                          <h3 className="font-serif font-bold text-sm text-slate-900 flex items-center space-x-1.5">
                            <Palette className="w-4 h-4 text-[#173F35]" />
                            <span>Weekly Color Themes</span>
                          </h3>
                          <button
                            onClick={() => {
                              setAutoTheme(!autoTheme);
                              showToast(autoTheme ? 'Manual theme mode enabled' : 'Automatic daily rotation enabled');
                            }}
                            className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                              autoTheme ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            {autoTheme ? 'Auto Daily Rotation' : 'Manual Selection'}
                          </button>
                        </div>
                        <p className="text-xs text-slate-500">
                          Forest Green and Gold remain permanent branding; card accents and scenery rotate weekly.
                        </p>
                      </div>

                      <div className="space-y-2.5">
                        {THEMES.map((th, idx) => (
                          <div
                            key={th.dayName}
                            onClick={() => {
                              setAutoTheme(false);
                              setManualThemeIndex(idx);
                              showToast(`Switched theme to ${th.dayName} — ${th.themeName}`);
                            }}
                            className={`p-4 rounded-3xl border flex items-center justify-between transition cursor-pointer ${
                              activeTheme.dayName === th.dayName
                                ? 'bg-[#F6F0E3] border-[#D5AD59] shadow-sm'
                                : 'bg-white border-slate-100 hover:bg-slate-50'
                            }`}
                          >
                            <div>
                              <h4 className="font-bold text-xs text-slate-900">
                                {th.dayName} — {th.themeName}
                              </h4>
                              <p className="text-[10px] text-slate-500">{th.purpose}</p>
                            </div>
                            <div className="flex items-center space-x-1.5">
                              {th.swatches.map((color, cIdx) => (
                                <span
                                  key={cIdx}
                                  className="w-4 h-4 rounded-full border border-black/10"
                                  style={{ backgroundColor: color }}
                                />
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 2. Daily Questions Sub-view */}
                  {moreSubView === 'questions' && (
                    <div className="space-y-4 animate-in fade-in">
                      <div className="bg-[#173F35] p-5 rounded-3xl text-white space-y-1">
                        <span className="text-[10px] font-bold text-[#D5AD59] uppercase tracking-wider">
                          Planning & Focus
                        </span>
                        <h3 className="font-serif font-bold text-lg">The 5 Daily Questions</h3>
                        <p className="text-xs text-white/80 font-serif">
                          Start strong, avoid distractions, and finish in peace without guilt.
                        </p>
                      </div>

                      {/* Question 1 */}
                      <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm space-y-2.5">
                        <div className="flex items-center space-x-2">
                          <Sun className="w-4 h-4 text-[#D5AD59]" />
                          <h4 className="font-bold text-xs text-slate-900">
                            1. Morning — Set your priorities (Prov 16:3)
                          </h4>
                        </div>
                        <p className="text-[11px] text-slate-500 italic">
                          "What are the three most important tasks I must complete today?"
                        </p>
                        <input
                          type="text"
                          value={questionAnswers.q1_task1}
                          onChange={(e) => setQuestionAnswers({ ...questionAnswers, q1_task1: e.target.value })}
                          className="w-full p-2.5 text-xs bg-slate-50 rounded-xl border border-slate-200"
                          placeholder="Priority 1..."
                        />
                        <input
                          type="text"
                          value={questionAnswers.q1_task2}
                          onChange={(e) => setQuestionAnswers({ ...questionAnswers, q1_task2: e.target.value })}
                          className="w-full p-2.5 text-xs bg-slate-50 rounded-xl border border-slate-200"
                          placeholder="Priority 2..."
                        />
                        <input
                          type="text"
                          value={questionAnswers.q1_task3}
                          onChange={(e) => setQuestionAnswers({ ...questionAnswers, q1_task3: e.target.value })}
                          className="w-full p-2.5 text-xs bg-slate-50 rounded-xl border border-slate-200"
                          placeholder="Priority 3..."
                        />
                        <button
                          onClick={pushMorningPrioritiesToTasks}
                          className="w-full py-2.5 rounded-xl bg-[#173F35] text-[#D5AD59] font-bold text-xs hover:bg-[#1f4e42] transition"
                        >
                          Push to Tasks List
                        </button>
                      </div>

                      {/* Question 2 */}
                      <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm space-y-2">
                        <div className="flex items-center space-x-2">
                          <BookOpen className="w-4 h-4 text-[#173F35]" />
                          <h4 className="font-bold text-xs text-slate-900">
                            2. Faith — Give God your time (Prov 3:5–6)
                          </h4>
                        </div>
                        <p className="text-[11px] text-slate-500 italic">
                          "Have I planned time for prayer and Bible reading today?"
                        </p>
                        <input
                          type="text"
                          value={questionAnswers.q2_faithTime}
                          onChange={(e) => setQuestionAnswers({ ...questionAnswers, q2_faithTime: e.target.value })}
                          className="w-full p-2.5 text-xs bg-slate-50 rounded-xl border border-slate-200"
                        />
                      </div>

                      {/* Question 3 */}
                      <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm space-y-2">
                        <div className="flex items-center space-x-2">
                          <Flame className="w-4 h-4 text-amber-600" />
                          <h4 className="font-bold text-xs text-slate-900">
                            3. Focus — Avoid distractions (Prov 4:25–27)
                          </h4>
                        </div>
                        <p className="text-[11px] text-slate-500 italic">
                          "What distraction should I avoid to finish my main task?"
                        </p>
                        <input
                          type="text"
                          value={questionAnswers.q3_distraction}
                          onChange={(e) => setQuestionAnswers({ ...questionAnswers, q3_distraction: e.target.value })}
                          className="w-full p-2.5 text-xs bg-slate-50 rounded-xl border border-slate-200"
                        />
                      </div>

                      {/* Question 4 */}
                      <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm space-y-2">
                        <div className="flex items-center space-x-2">
                          <CheckCircle2 className="w-4 h-4 text-[#608066]" />
                          <h4 className="font-bold text-xs text-slate-900">
                            4. Afternoon — Check progress (Jas 2:17)
                          </h4>
                        </div>
                        <p className="text-[11px] text-slate-500 italic">
                          "Which task have I completed, and what should I work on next?"
                        </p>
                        <input
                          type="text"
                          value={questionAnswers.q4_progress}
                          onChange={(e) => setQuestionAnswers({ ...questionAnswers, q4_progress: e.target.value })}
                          className="w-full p-2.5 text-xs bg-slate-50 rounded-xl border border-slate-200"
                        />
                      </div>

                      {/* Question 5 */}
                      <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm space-y-2">
                        <div className="flex items-center space-x-2">
                          <Moon className="w-4 h-4 text-purple-700" />
                          <h4 className="font-bold text-xs text-slate-900">
                            5. Night — Review your day (Col 3:23)
                          </h4>
                        </div>
                        <p className="text-[11px] text-slate-500 italic">
                          "What did I accomplish today, and what is tomorrow's first task?"
                        </p>
                        <input
                          type="text"
                          value={questionAnswers.q5_reflection}
                          onChange={(e) => setQuestionAnswers({ ...questionAnswers, q5_reflection: e.target.value })}
                          className="w-full p-2.5 text-xs bg-slate-50 rounded-xl border border-slate-200"
                        />
                      </div>

                      <button onClick={() => setQuestionReviewVisible(v => !v)} className="w-full py-3 rounded-2xl bg-[#173F35] text-[#D5AD59] font-bold text-sm shadow-sm">
                        {questionReviewVisible ? 'Hide end-of-day review' : 'Finish questions & reveal my action plan'}
                      </button>
                      {questionReviewVisible && <div className="p-4 rounded-3xl border border-[#E7DEC8] bg-[#F6F0E3] space-y-3">
                        <h4 className="font-serif font-black text-[#173F35]">Your personal review & next steps</h4>
                        <p className="text-xs text-slate-600">Review is shown only after you choose to finish. Use this as a kind guide, not a judgement.</p>
                        {[
                          {title:'Priorities', answer:[questionAnswers.q1_task1,questionAnswers.q1_task2,questionAnswers.q1_task3].filter(Boolean).length, advice:'Write three specific priorities and give the first one a time slot.', good:'Your priorities are listed. Put the most important one first.'},
                          {title:'Prayer and Bible reading', answer:questionAnswers.q2_faithTime, advice:'Choose a realistic time today for prayer and a Bible chapter; start small if needed.', good:'Protect the time you planned for prayer and Scripture.'},
                          {title:'Distractions', answer:questionAnswers.q3_distraction, advice:'Name one distraction and put a simple barrier in place, such as Do Not Disturb for 25 minutes.', good:'Keep the distraction you identified away during your main task.'},
                          {title:'Progress', answer:questionAnswers.q4_progress, advice:'Choose one unfinished task and define the next small action.', good:'Continue with the next task instead of trying to do everything at once.'},
                          {title:'Tomorrow', answer:questionAnswers.q5_reflection, advice:'Write one accomplishment and choose tomorrow’s first task before sleeping.', good:'Use your reflection to prepare a calm start tomorrow.'}
                        ].map((item, i) => {
                          const answerText = Array.isArray(item.answer) ? '' : String(item.answer || '').trim();
                          const hasAnswer = Array.isArray(item.answer) ? item.answer > 0 : answerText.length > 0;
                          const soundsNegative = /no|not yet|didn't|did not|couldn't|failed|none|forgot|wasted|partly|maybe/i.test(answerText);
                          return <div key={item.title} className="rounded-2xl bg-white p-3"><p className="text-xs font-bold text-[#173F35]">{i+1}. {item.title}</p><p className="mt-1 text-xs text-slate-600">{!hasAnswer ? item.advice : soundsNegative ? item.advice : item.good}</p></div>;
                        })}
                        <button onClick={() => { setQuestionReviewVisible(false); showToast('Review saved on this device.'); }} className="w-full py-2 rounded-xl border border-[#173F35] text-[#173F35] text-xs font-bold">Close review</button>
                      </div>}
                    </div>
                  )}

                  {/* 3. Bible Quick Bridge Sub-view */}
                  {moreSubView === 'bibleBridge' && (
                    <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-4 animate-in fade-in">
                      <div className="flex items-center space-x-2">
                        <BookOpen className="w-5 h-5 text-[#173F35]" />
                        <h3 className="font-serif font-bold text-base text-slate-900">
                          Bible Reader & Scripture Hub
                        </h3>
                      </div>
                      <p className="text-xs text-slate-600 font-serif leading-relaxed">
                        Read bilingual texts in English KJV and Malayalam സത്യവേദപുസ്തകം, highlight verses, review reading plans, and take notes.
                      </p>
                      <button
                        onClick={() => { setActiveTab('bible'); setMoreSubView(null); }}
                        className="w-full py-3 rounded-2xl bg-[#173F35] text-[#D5AD59] font-bold text-xs flex items-center justify-center space-x-2 shadow-md hover:bg-[#1f4e42] transition"
                      >
                        <span>Open Full Bible Reader</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  {/* 4. Principles Sub-view (All 12) */}
                  {moreSubView === 'principles' && (
                    <div className="space-y-4 animate-in fade-in">
                      <div className="bg-[#173F35] p-5 rounded-3xl text-white space-y-1">
                        <span className="text-[10px] font-bold text-[#D5AD59] uppercase tracking-wider">
                          Character & Faith
                        </span>
                        <h3 className="font-serif font-bold text-lg">The 12 Biblical Principles</h3>
                        <p className="text-xs text-white/80 font-serif">
                          Practical biblical standards for daily decisions and spiritual strength.
                        </p>
                      </div>

                      <div className="space-y-3">
                        {ALL_PRINCIPLES.map(p => (
                          <div
                            key={p.id}
                            onClick={() => setActivePrincipleModal(p)}
                            className="p-4 rounded-3xl bg-[#F6F0E3]/70 border border-[#E7DEC8] hover:bg-[#F6F0E3] transition cursor-pointer space-y-2"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-xs text-[#173F35]">
                                #{p.id} {p.title}
                              </span>
                              <span className="text-[10px] font-serif font-bold text-[#B88F3E]">
                                {p.ref}
                              </span>
                            </div>
                            <p className="text-xs text-slate-700 italic font-serif">
                              "{p.scriptureText}"
                            </p>
                            <p className="text-[11px] text-slate-600">
                              <strong>Habit:</strong> {p.action}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 5. Clean, Normal Yearly/Monthly Calendar (NO Progress Bars) */}
                  {moreSubView === 'calendar' && (
                    <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-4 animate-in fade-in">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                            Standard Schedule
                          </span>
                          <h3 className="font-serif font-bold text-sm text-slate-900 flex items-center space-x-1.5">
                            <CalendarIcon className="w-4 h-4 text-[#173F35]" />
                            <span>Yearly & Monthly Calendar</span>
                          </h3>
                        </div>
                        <div className="flex items-center space-x-1">
                          <button
                            onClick={() => setViewMonthOffset(viewMonthOffset - 1)}
                            className="p-1 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-600"
                          >
                            <ChevronLeft className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-xs font-mono font-bold text-[#173F35] bg-[#F6F0E3] px-2.5 py-1 rounded-full">
                            {viewMonthOffset === 0 ? 'October 2026' : viewMonthOffset === -1 ? 'September 2026' : 'November 2026'}
                          </span>
                          <button
                            onClick={() => setViewMonthOffset(viewMonthOffset + 1)}
                            className="p-1 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-600"
                          >
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <p className="text-xs text-slate-500 font-sans">
                        Clean calendar view. Click any date to view standard daily timetable notes without progress bars.
                      </p>

                      {/* Standard Clean Calendar Grid (Sun to Sat) */}
                      <div className="space-y-2">
                        <div className="grid grid-cols-7 text-center text-[10px] font-bold text-slate-400 pb-1 border-b">
                          <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
                        </div>
                        <div className="grid grid-cols-7 gap-1 text-center text-xs">
                          {/* October 2026 begins Thursday (offset 4) */}
                          <div /><div /><div /><div />
                          {Array.from({ length: 31 }, (_, i) => i + 1).map(day => {
                            const isToday = day === 19;
                            return (
                              <button
                                key={day}
                                onClick={() => showToast(`Schedule for Oct ${day}: 7:25 AM Prayer, 9 AM Duty, 8 PM Reflection`)}
                                className={`h-8 rounded-xl font-bold flex items-center justify-center transition ${
                                  isToday
                                    ? 'bg-[#173F35] text-[#D5AD59] shadow-sm'
                                    : 'hover:bg-slate-100 text-slate-700'
                                }`}
                              >
                                {day}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-xs space-y-1">
                        <span className="font-bold text-[#173F35]">Selected Date: Oct 19 (Day 292 of 365)</span>
                        <p className="text-[11px] text-slate-500">
                          Suggested Timetable: 6:30 AM Morning prayer • 9:00 AM Study • 1:00 PM Review • 8:00 PM Reflection
                        </p>
                      </div>
                    </div>
                  )}

                  {/* 6. Tasks Sub-view Bridge */}
                  {moreSubView === 'tasks' && (
                    <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-4 animate-in fade-in">
                      <div className="flex items-center space-x-2">
                        <CheckSquare className="w-5 h-5 text-[#173F35]" />
                        <h3 className="font-serif font-bold text-base text-slate-900">
                          Tasks & Daily Habits
                        </h3>
                      </div>
                      <p className="text-xs text-slate-600 font-serif leading-relaxed">
                        Manage your active task list, deadlines, category tags, and biblical principle linkage.
                      </p>
                      <button
                        onClick={() => { setActiveTab('tasks'); setMoreSubView(null); }}
                        className="w-full py-3 rounded-2xl bg-[#173F35] text-[#D5AD59] font-bold text-xs flex items-center justify-center space-x-2 shadow-md hover:bg-[#1f4e42] transition"
                      >
                        <span>Open Tasks Planner</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  {/* 7. Journal & Prayer Notes Sub-view */}
                  {moreSubView === 'journal' && (
                    <div className="space-y-4 animate-in fade-in">
                      <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-3">
                        <h3 className="font-serif font-bold text-sm text-slate-900 flex items-center space-x-1.5">
                          <FileText className="w-4 h-4 text-[#173F35]" />
                          <span>Private Journal & Prayer Notes</span>
                        </h3>
                        <p className="text-xs text-slate-500">
                          All entries remain 100% private and stored locally on your device.
                        </p>
                        <button
                          onClick={() => {
                            const newEntry = {
                              id: Date.now().toString(),
                              date: todayKey,
                              title: 'Evening Reflection & Petition',
                              category: 'Prayer Request',
                              reflection: 'Trusting God with current clinical exams and daily discipline.',
                              prayer: 'Peace that surpasses understanding for my family and studies.',
                              gratitude: 'Thankful for guidance throughout this day.'
                            };
                            setJournalEntries([newEntry, ...journalEntries]);
                            showToast('Sample journal entry recorded');
                          }}
                          className="w-full py-2.5 rounded-xl bg-[#173F35] text-[#D5AD59] font-bold text-xs hover:bg-[#1f4e42] transition"
                        >
                          + Write New Entry
                        </button>
                      </div>

                      <div className="space-y-3">
                        {journalEntries.map(j => (
                          <div key={j.id} className="p-4 rounded-3xl bg-[#F6F0E3] border border-[#E7DEC8] space-y-2">
                            <div className="flex items-center justify-between">
                              <h4 className="font-bold text-xs text-[#173F35]">{j.title}</h4>
                              <span className="text-[10px] font-mono text-slate-500">{j.date}</span>
                            </div>
                            <p className="text-xs text-slate-800 font-serif leading-relaxed">
                              {j.reflection}
                            </p>
                            <div className="text-[11px] text-slate-600 bg-white/70 p-2 rounded-xl">
                              <strong>Prayer:</strong> {j.prayer}
                            </div>
                            <div className="text-[11px] text-slate-600 bg-white/70 p-2 rounded-xl">
                              <strong>Gratitude:</strong> {j.gratitude}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 8. Progress & Achievements */}
                  {moreSubView === 'progress' && (
                    <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-4 animate-in fade-in">
                      <h3 className="font-serif font-bold text-sm text-slate-900 flex items-center space-x-1.5">
                        <TrendingUp className="w-4 h-4 text-[#173F35]" />
                        <span>Progress & Consistency</span>
                      </h3>
                      <p className="text-xs text-slate-500">
                        Transformer celebrates your consistency without guilt or condemnation.
                      </p>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                          <span className="text-[10px] text-slate-400 font-bold uppercase">Tasks Completed</span>
                          <h4 className="text-xl font-black text-[#173F35] font-mono mt-1">{tasks.filter(t => t.completed).length} / {tasks.length}</h4>
                          <span className="text-[10px] text-emerald-700 font-bold">Recorded completions</span>
                        </div>
                        <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                          <span className="text-[10px] text-slate-400 font-bold uppercase">Chapters Read</span>
                          <h4 className="text-xl font-black text-[#173F35] font-mono mt-1">{(() => { try { return JSON.parse(localStorage.getItem('transformer_reading_journey') || '{}').completed?.length || 0; } catch { return 0; } })()}</h4>
                          <span className="text-[10px] text-emerald-700 font-bold">Recorded chapters</span>
                        </div>
                        <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                          <span className="text-[10px] text-slate-400 font-bold uppercase">Principles Practiced</span>
                          <h4 className="text-xl font-black text-[#173F35] font-mono mt-1">{Object.keys(principleNotes || {}).length} notes</h4>
                          <span className="text-[10px] text-emerald-700 font-bold">Saved principle notes</span>
                        </div>
                        <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                          <span className="text-[10px] text-slate-400 font-bold uppercase">Reflections Saved</span>
                          <h4 className="text-xl font-black text-[#173F35] font-mono mt-1">{journalEntries.length}</h4>
                          <span className="text-[10px] text-emerald-700 font-bold">Saved journal entries</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 9. Notifications & Reminders */}
                  {moreSubView === 'reminders' && (
                    <>
                    <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm space-y-2 mb-4"><h3 className="font-bold text-sm text-slate-900">Account & Security</h3><p className="text-xs text-slate-500">Manage your signed-in Transformer account.</p><button onClick={() => { if (window.confirm('Sign out of Transformer? Your synced data will remain in your account.')) signOutUser?.(); }} className="w-full rounded-xl py-3 bg-[#173F35] text-[#D5AD59] text-xs font-bold">Sign out</button></div>
                    <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-4 animate-in fade-in">
                      <h3 className="font-serif font-bold text-sm text-slate-900 flex items-center space-x-1.5">
                        <Bell className="w-4 h-4 text-[#173F35]" />
                        <span>Notifications & Reminders</span>
                      </h3>
                      <p className="text-xs text-slate-500">
                        Customise gentle notification times for prayer, reading, and evening review.
                      </p>

                      <div className="space-y-2.5">
                        {reminders.map((rem) => (
                          <div key={rem.id} className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex flex-wrap gap-2 items-center justify-between text-xs">
                            <label className="flex items-center gap-2 font-medium text-slate-800 flex-1 min-w-[150px]">
                              <input type="checkbox" checked={!!rem.enabled} onChange={(e) => setReminders(prev => prev.map(r => r.id === rem.id ? { ...r, enabled: e.target.checked } : r))} />
                              {rem.title}
                            </label>
                            <input aria-label={`${rem.title} time`} type="time" value={rem.time} onChange={(e) => setReminders(prev => prev.map(r => r.id === rem.id ? { ...r, time: e.target.value } : r))} className="font-mono font-bold text-[#173F35] bg-white px-2 py-1 rounded border" />
                          </div>
                        ))}
                      </div>
                      <p className="text-[11px] text-slate-500">Permission: {notificationPermission}. Times use your phone's local clock. Keep this app open for scheduled browser reminders; reminders are not guaranteed after the browser is closed.</p>
                      <button onClick={enableNotifications} className="w-full py-2.5 rounded-xl bg-[#173F35] text-[#D5AD59] font-bold text-xs transition">{notificationsEnabled ? 'Notifications Enabled — Recheck Permission' : 'Enable Notifications'}</button>
                      <button
                        onClick={async () => { if (isNative()) { if (notificationPermission !== 'granted') { showToast('Enable notifications first.'); return; } const ok = await nativeTestNotification(); showToast(ok ? 'Test notification will appear in 2 seconds.' : 'Test notification failed.'); return; } if (!('Notification' in window) || Notification.permission !== 'granted') { showToast('Enable notifications first.'); return; } try { new Notification('Transformer test reminder', { body: 'Time for prayer, Bible reading and focused study.' }); showToast('Test notification sent.'); } catch { showToast('Test notification failed.'); } }}
                        className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition"
                      >
                        Send Test Notification
                      </button>
                    </div>
                    </>
                  )}

                  {/* 10. Feedback & Contact (Exact replica of 1000077136.jpg) */}
                  {moreSubView === 'feedback' && (
                    <div className="p-5 rounded-3xl bg-[#F6F0E3] border border-[#E7DEC8] space-y-4 shadow-sm animate-in fade-in">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-2xl bg-[#173F35] text-[#D5AD59] flex items-center justify-center">
                          <MessageSquare className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-serif font-black text-base text-[#173F35]">
                            Feedback & Suggestions
                          </h3>
                          <p className="text-[11px] text-slate-600">
                            Help make Transformer better.
                          </p>
                        </div>
                      </div>

                      {/* Category Radio Group */}
                      <div className="space-y-2 pt-1">
                        <label className="text-xs font-serif font-bold text-[#173F35]">
                          What is your feedback about?
                        </label>
                        {[
                          'Feature suggestion',
                          'Report a problem',
                          'Bible content or verses',
                          'Theme or design',
                          'Other feedback'
                        ].map((cat) => (
                          <label
                            key={cat}
                            onClick={() => setFeedbackCategory(cat)}
                            className="flex items-center space-x-3 p-2 rounded-xl hover:bg-white/50 cursor-pointer text-xs font-serif text-slate-800"
                          >
                            <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                              feedbackCategory === cat ? 'border-[#173F35] bg-[#173F35]' : 'border-slate-400'
                            }`}>
                              {feedbackCategory === cat && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                            </span>
                            <span>{cat}</span>
                          </label>
                        ))}
                      </div>

                      {/* Experience Rating */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-serif font-bold text-[#173F35]">
                          Rate your experience
                        </label>
                        <div className="flex items-center space-x-4 pt-1">
                          {[1, 2, 3, 4, 5].map((rating) => (
                            <button
                              key={rating}
                              onClick={() => setFeedbackRating(rating)}
                              className={`w-7 h-7 rounded-full text-xs font-bold transition flex items-center justify-center ${
                                feedbackRating === rating
                                  ? 'bg-[#173F35] text-[#D5AD59] shadow-md scale-110'
                                  : 'bg-white border border-slate-300 text-slate-600'
                              }`}
                            >
                              {rating}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Message Box */}
                      <div className="space-y-1">
                        <label className="text-xs font-serif font-bold text-[#173F35]">
                          Your message
                        </label>
                        <textarea
                          value={feedbackMessage}
                          onChange={(e) => setFeedbackMessage(e.target.value)}
                          placeholder="Write your suggestion or describe the problem..."
                          className="w-full h-24 p-3 bg-white rounded-2xl border border-slate-300 focus:outline-none focus:border-[#173F35] text-xs font-serif"
                        />
                      </div>

                      <button
                        onClick={handleFeedbackSubmit}
                        className="w-full py-3 rounded-2xl bg-[#173F35] hover:bg-[#1f4e42] text-[#D5AD59] font-black text-xs shadow-md transition"
                      >
                        Prepare Feedback Email
                      </button>

                      <div className="pt-2 text-center space-y-2 border-t border-black/5">
                        <p className="text-[11px] text-slate-600">
                          Contact the creator directly: <strong className="text-[#173F35]">jestinp843@gmail.com</strong>
                        </p>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={copyEmail}
                            className="flex-1 py-2 rounded-xl bg-white border border-slate-300 text-xs font-bold text-slate-700 flex items-center justify-center space-x-1.5 hover:bg-slate-50 transition"
                          >
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Email</span>
                          </button>
                          <a
                            href="mailto:jestinp843@gmail.com?subject=Transformer%20App%20Feedback"
                            className="flex-1 py-2 rounded-xl bg-white border border-slate-300 text-xs font-bold text-slate-700 flex items-center justify-center space-x-1.5 hover:bg-slate-50 transition"
                          >
                            <Mail className="w-3.5 h-3.5 text-[#173F35]" />
                            <span>Email Creator</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 11. About Transformer Sub-view with Official Emblem */}
                  {moreSubView === 'about' && (
                    <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-4 animate-in fade-in">
                      <div className="flex items-center space-x-3.5">
                        <TransformerEmblem size="lg" />
                        <div>
                          <h3 className="font-serif font-black text-base text-slate-900">
                            Transformer v1.0.0
                          </h3>
                          <p className="text-xs text-[#B88F3E] font-serif font-bold">
                            Transform your mind. Strengthen your faith. Discipline your life.
                          </p>
                          <p className="text-[10px] text-slate-400">Created by Jestin P Varghese</p>
                        </div>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed font-serif">
                        Transformer is a Christian personal development and devotional productivity system. It combines Scripture reading, practical habits, timetable management, and guilt-free consistency tracking.
                      </p>
                      <div className="p-3.5 bg-emerald-50 rounded-2xl text-[11px] text-emerald-900 space-y-1 border border-emerald-100">
                        <div className="flex items-center space-x-1 font-bold">
                          <ShieldCheck className="w-4 h-4 text-emerald-700" />
                          <span>Private Account Sync</span>
                        </div>
                        <p>
                          Supported tasks, journal entries, daily question answers, theme preferences, and reminder settings are stored locally and synchronized to your signed-in account. Other app data may remain on this device unless explicitly added to cloud sync.
                        </p>
                      </div>
                    </div>
                  )}

                </div>
              ) : (
                /* MAIN MORE MENU LIST (Matching Exact Right Mockup from 1000077130_2.png) */
                <div className="space-y-4 animate-in fade-in">
                  
                  {/* Profile Card Header */}
                  <div className="p-5 rounded-3xl bg-[#173F35] text-white flex items-center justify-between shadow-md">
                    <div className="flex items-center space-x-3.5">
                      <div className="w-12 h-12 rounded-full bg-[#D5AD59] p-0.5 shadow-md">
                        <div className="w-full h-full rounded-full bg-[#173F35] flex items-center justify-center text-[#D5AD59]">
                          <User className="w-6 h-6" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-serif font-bold text-base text-white">
                          Jestin P Varghese
                        </h3>
                        <p className="text-xs text-[#D5AD59] font-serif italic">
                          Keep going. God is with you.
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setMoreSubView('theme')}
                      className="p-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition"
                    >
                      <Settings className="w-4 h-4" />
                    </button>
                  </div>

                  {/* The Menu List Items (All 11 Accessible, Guaranteed Bug-Free) */}
                  <div className="bg-white rounded-3xl border border-slate-100 shadow-sm divide-y divide-slate-100 overflow-hidden">
                    
                    <div className="px-4 pt-4 pb-1 text-[10px] font-black uppercase tracking-widest opacity-60">Spiritual Growth</div>
                    {[['readingJourney','Bible Reading Journey','7 · 30 · 90 · 365 day plans',BookOpen],['dailyReflection','Daily Reflection','Gratitude · Learning · Growth',FileText]].map(([view,label,desc,Icon]) => <button key={view} onClick={() => setMoreSubView(view)} className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50"><span className="flex items-center gap-3"><span className="w-9 h-9 rounded-2xl flex items-center justify-center bg-emerald-50 text-emerald-800"><Icon size={17}/></span><span><b className="block text-xs">{label}</b><small className="opacity-60">{desc}</small></span></span><ChevronRight size={16}/></button>)}
                    <div className="px-4 pt-3 pb-1 text-[10px] font-black uppercase tracking-widest opacity-60">Productivity & Insights</div>
                    {[['focusMode','Focus Mode','25/5 · 50/10 · Session history',Clock],['weeklyReports','Weekly Reports','Charts · Previous-week comparison',TrendingUp],['fullCalendar','Full Calendar','All months · Any year · Task agenda',CalendarIcon]].map(([view,label,desc,Icon]) => <button key={view} onClick={() => setMoreSubView(view)} className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50"><span className="flex items-center gap-3"><span className="w-9 h-9 rounded-2xl flex items-center justify-center bg-amber-50 text-amber-800"><Icon size={17}/></span><span><b className="block text-xs">{label}</b><small className="opacity-60">{desc}</small></span></span><ChevronRight size={16}/></button>)}
                    <div className="px-4 pt-3 pb-1 text-[10px] font-black uppercase tracking-widest opacity-60">More Tools</div>
                    {[['smartCalendar','Smart Calendar','Events · Tasks · Agenda',CalendarIcon],['universalSearch','Universal Search','Find saved app content',Search],['personalGrowth','Personal Growth Assistant','Progress · Gentle suggestions',Sparkles],['countdown','Countdown','Exams · Events · Deadlines',Clock],['offlineAccess','Offline Access','Saved content · Local-first',ShieldCheck],['backupRestore','Backup & Restore','Export · Restore app data',Share2],['recentlyDeleted','Recently Deleted','Restore removed tasks',Trash2],['notificationCentre','Notification Centre','Review reminder schedule',Bell],['personalization','Personalization Centre','Text size · Motion · Preferences',Palette],['homeWidgets','Android Home Screen Widgets','Tasks · Events · Scripture',Smartphone]].map(([view,label,desc,Icon]) => <button key={view} onClick={() => setMoreSubView(view)} className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50"><span className="flex items-center gap-3"><span className="w-9 h-9 rounded-2xl flex items-center justify-center bg-emerald-50 text-emerald-800"><Icon size={17}/></span><span><b className="block text-xs">{label}</b><small className="opacity-60">{desc}</small></span></span><ChevronRight size={16}/></button>)}

                    {/* Item 1: Daily Theme */}
                    <button
                      onClick={() => setMoreSubView('theme')}
                      className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition text-left"
                    >
                      <div className="flex items-center space-x-3.5">
                        <div className="w-9 h-9 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center">
                          <Palette className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="font-bold text-xs text-slate-900">Daily Theme</h4>
                          <p className="text-[11px] text-slate-500">{activeTheme.dayName} · {activeTheme.themeName}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        {activeTheme.swatches.map((c, i) => (
                          <span key={i} className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c }} />
                        ))}
                        <ChevronRight className="w-4 h-4 text-slate-300 ml-1" />
                      </div>
                    </button>

                    {/* Item 2: Daily Questions */}
                    <button
                      onClick={() => setMoreSubView('questions')}
                      className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition text-left"
                    >
                      <div className="flex items-center space-x-3.5">
                        <div className="w-9 h-9 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center">
                          <HelpCircle className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="font-bold text-xs text-slate-900">Daily Questions</h4>
                          <p className="text-[11px] text-slate-500">Reflect • Grow • Apply</p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-300" />
                    </button>

                    {/* Item 3: Bible */}
                    <button
                      onClick={() => setMoreSubView('bibleBridge')}
                      className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition text-left"
                    >
                      <div className="flex items-center space-x-3.5">
                        <div className="w-9 h-9 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center">
                          <BookOpen className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="font-bold text-xs text-slate-900">Bible</h4>
                          <p className="text-[11px] text-slate-500">Read • Study • Save • Notes</p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-300" />
                    </button>

                    {/* Item 4: Principles */}
                    <button
                      onClick={() => setMoreSubView('principles')}
                      className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition text-left"
                    >
                      <div className="flex items-center space-x-3.5">
                        <div className="w-9 h-9 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                          <Compass className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="font-bold text-xs text-slate-900">Principles</h4>
                          <p className="text-[11px] text-slate-500">12 Biblical Principles for Daily Life</p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-300" />
                    </button>

                    {/* Item 5: Calendar (Clean Yearly/Monthly, NO progress bars) */}
                    <button
                      onClick={() => setMoreSubView('fullCalendar')}
                      className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition text-left"
                    >
                      <div className="flex items-center space-x-3.5">
                        <div className="w-9 h-9 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center">
                          <CalendarIcon className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="font-bold text-xs text-slate-900">Calendar</h4>
                          <p className="text-[11px] text-slate-500">Schedule • Events • Reminders</p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-300" />
                    </button>

                    {/* Item 6: Tasks */}
                    <button
                      onClick={() => setMoreSubView('tasks')}
                      className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition text-left"
                    >
                      <div className="flex items-center space-x-3.5">
                        <div className="w-9 h-9 rounded-2xl bg-rose-50 text-rose-700 flex items-center justify-center">
                          <CheckSquare className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="font-bold text-xs text-slate-900">Tasks</h4>
                          <p className="text-[11px] text-slate-500">My Tasks • Progress • History</p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-300" />
                    </button>

                    {/* Item 7: Journal */}
                    <button
                      onClick={() => setMoreSubView('journal')}
                      className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition text-left"
                    >
                      <div className="flex items-center space-x-3.5">
                        <div className="w-9 h-9 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="font-bold text-xs text-slate-900">Journal</h4>
                          <p className="text-[11px] text-slate-500">Thoughts • Prayers • Reflections</p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-300" />
                    </button>

                    {/* Item 8: Progress */}
                    <button
                      onClick={() => setMoreSubView('progress')}
                      className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition text-left"
                    >
                      <div className="flex items-center space-x-3.5">
                        <div className="w-9 h-9 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center">
                          <TrendingUp className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="font-bold text-xs text-slate-900">Progress</h4>
                          <p className="text-[11px] text-slate-500">Streaks • Goals • Achievements</p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-300" />
                    </button>

                    {/* Item 9: Settings / Appearance and theme preferences */}
                    <button
                      onClick={() => setMoreSubView('theme')}
                      className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition text-left"
                    >
                      <div className="flex items-center space-x-3.5">
                        <div className="w-9 h-9 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center">
                          <Settings className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="font-bold text-xs text-slate-900">Settings</h4>
                          <p className="text-[11px] text-slate-500">Appearance • Themes • Notifications</p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-300" />
                    </button>

                    {/* Item 10: Feedback & Suggestions */}
                    <button
                      onClick={() => setMoreSubView('feedback')}
                      className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition text-left"
                    >
                      <div className="flex items-center space-x-3.5">
                        <div className="w-9 h-9 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
                          <MessageSquare className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="font-bold text-xs text-slate-900">Feedback</h4>
                          <p className="text-[11px] text-slate-500">Share your thoughts and suggestions</p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-300" />
                    </button>

                    {/* Item 11: About Transformer */}
                    <button
                      onClick={() => setMoreSubView('about')}
                      className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition text-left"
                    >
                      <div className="flex items-center space-x-3.5">
                        <div className="w-9 h-9 rounded-2xl bg-slate-100 text-slate-600 flex items-center justify-center">
                          <Info className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="font-bold text-xs text-slate-900">About Transformer</h4>
                          <p className="text-[11px] text-slate-500">Transform your mind. Strengthen your faith.</p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-300" />
                    </button>

                  </div>
                </div>
              )}

            </div>
          )}

        </div>

        {/* =================================================================== */}
        {/* FIXED BOTTOM NAVIGATION BAR (Permanent Forest Green & Gold Anchor) */}
        {/* =================================================================== */}
        <nav className="fixed bottom-2 left-3 right-3 max-w-md mx-auto h-[68px] rounded-2xl bg-[#173F35] border border-[#D5AD59]/40 px-2 flex items-center justify-between text-white z-40 shadow-2xl" style={{bottom: "max(8px, env(safe-area-inset-bottom))"}}>
          
          {/* 1. Home */}
          <button
            onClick={() => { setActiveTab('home'); setMoreSubView(null); }}
            className={`flex-1 flex flex-col items-center justify-center py-1 transition relative ${
              activeTab === 'home' ? 'text-[#D5AD59] font-black' : 'text-slate-300 hover:text-white'
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-[10px] mt-0.5">Home</span>
            {activeTab === 'home' && <span className="w-6 h-0.5 bg-[#D5AD59] rounded-full absolute bottom-1" />}
          </button>

          {/* 2. Tasks */}
          <button
            onClick={() => { setActiveTab('tasks'); setMoreSubView(null); }}
            className={`flex-1 flex flex-col items-center justify-center py-1 transition relative ${
              activeTab === 'tasks' ? 'text-[#D5AD59] font-black' : 'text-slate-300 hover:text-white'
            }`}
          >
            <CheckSquare className="w-5 h-5" />
            <span className="text-[10px] mt-0.5">Tasks</span>
            {activeTab === 'tasks' && <span className="w-6 h-0.5 bg-[#D5AD59] rounded-full absolute bottom-1" />}
          </button>

          {/* 3. Bible */}
          <button
            onClick={() => { setActiveTab('bible'); setMoreSubView(null); }}
            className={`flex-1 flex flex-col items-center justify-center py-1 transition relative ${
              activeTab === 'bible' ? 'text-[#D5AD59] font-black' : 'text-slate-300 hover:text-white'
            }`}
          >
            <BookOpen className="w-5 h-5" />
            <span className="text-[10px] mt-0.5">Bible</span>
            {activeTab === 'bible' && <span className="w-6 h-0.5 bg-[#D5AD59] rounded-full absolute bottom-1" />}
          </button>

          {/* 4. Principles */}
          <button
            onClick={() => { setActiveTab('principles'); setMoreSubView(null); }}
            className={`flex-1 flex flex-col items-center justify-center py-1 transition relative ${
              activeTab === 'principles' ? 'text-[#D5AD59] font-black' : 'text-slate-300 hover:text-white'
            }`}
          >
            <Compass className="w-5 h-5" />
            <span className="text-[10px] mt-0.5">Principles</span>
            {activeTab === 'principles' && <span className="w-6 h-0.5 bg-[#D5AD59] rounded-full absolute bottom-1" />}
          </button>

          {/* 5. More */}
          <button
            onClick={() => { setActiveTab('more'); setMoreSubView(null); }}
            className={`flex-1 flex flex-col items-center justify-center py-1 transition relative ${
              activeTab === 'more' ? 'text-[#D5AD59] font-black' : 'text-slate-300 hover:text-white'
            }`}
          >
            <MoreHorizontal className="w-5 h-5" />
            <span className="text-[10px] mt-0.5">More</span>
            {activeTab === 'more' && <span className="w-6 h-0.5 bg-[#D5AD59] rounded-full absolute bottom-1" />}
          </button>

        </nav>

        {/* =================================================================== */}
        {/* MODAL: ADD TASK DIALOG                                             */}
        {/* =================================================================== */}
        {isTaskModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
            <div className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl space-y-3.5 border border-slate-200">
              <div className="flex items-center justify-between border-b pb-2">
                <h3 className="font-serif font-black text-sm text-slate-900">
                  {editingTaskId ? 'Edit Daily Responsibility' : 'New Daily Responsibility'}
                </h3>
                <button onClick={() => { setIsTaskModalOpen(false); setEditingTaskId(null); }} className="text-slate-400 hover:text-slate-700">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Title</label>
                <input
                  type="text"
                  value={taskForm.title}
                  onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
                  placeholder="e.g., Study Nursing chapter 5"
                  className="w-full p-2.5 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:border-[#173F35]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Scheduled Time</label>
                  <input
                    type="text"
                    value={taskForm.time}
                    onChange={(e) => setTaskForm({ ...taskForm, time: e.target.value })}
                    className="w-full p-2 text-xs bg-slate-50 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Deadline (Optional)</label>
                  <input
                    type="text"
                    value={taskForm.deadline}
                    onChange={(e) => setTaskForm({ ...taskForm, deadline: e.target.value })}
                    placeholder="e.g. 5:00 PM"
                    className="w-full p-2 text-xs bg-slate-50 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase">Scheduled date</label>
                <input type="date" value={taskForm.date || todayKey} onChange={e => setTaskForm({ ...taskForm, date: e.target.value })} className="w-full p-2.5 text-xs bg-slate-50 rounded-xl border border-slate-200" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Priority</label>
                  <select
                    value={taskForm.priority}
                    onChange={(e) => setTaskForm({ ...taskForm, priority: e.target.value })}
                    className="w-full p-2 text-xs bg-slate-50 rounded-xl border border-slate-200"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Category</label>
                  <select
                    value={taskForm.category}
                    onChange={(e) => setTaskForm({ ...taskForm, category: e.target.value })}
                    className="w-full p-2 text-xs bg-slate-50 rounded-xl border border-slate-200"
                  >
                    <option value="Faith & Prayer">Faith & Prayer</option>
                    <option value="Studies">Studies</option>
                    <option value="Assignments">Assignments</option>
                    <option value="Health">Health</option>
                    <option value="Personal Dev">Personal Dev</option>
                    <option value="Family">Family</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Repeat
                  <select value={taskForm.recurrence || 'None'} onChange={e=>setTaskForm({...taskForm,recurrence:e.target.value})} className="block w-full mt-1 p-2 text-xs bg-slate-50 rounded-xl border border-slate-200"><option>None</option><option>Daily</option><option>Weekly</option><option>Monthly</option></select>
                </label>
                <label className="text-[10px] font-bold text-slate-400 uppercase">Subtasks (one per line)
                  <textarea value={taskForm.subtasksText || ''} onChange={e=>setTaskForm({...taskForm,subtasksText:e.target.value})} rows={2} placeholder="Read chapter\nReview key points" className="block w-full mt-1 p-2 text-xs bg-slate-50 rounded-xl border border-slate-200" />
                </label>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase">Link to Biblical Principle</label>
                <select
                  value={taskForm.principleId}
                  onChange={(e) => setTaskForm({ ...taskForm, principleId: e.target.value })}
                  className="w-full p-2 text-xs bg-slate-50 rounded-xl border border-slate-200"
                >
                  {ALL_PRINCIPLES.map(p => (
                    <option key={p.id} value={p.id}>
                      #{p.id} {p.title} ({p.ref})
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleSaveTask}
                className="w-full py-2.5 rounded-xl bg-[#173F35] text-[#D5AD59] font-black text-xs shadow-md mt-2 hover:bg-[#1f4e42] transition"
              >
                {editingTaskId ? 'Save Changes' : 'Save Task'}
              </button>
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* MODAL: SCRIPTURE SHARE CARD PREVIEW                                */}
        {/* =================================================================== */}
        {shareVerseModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
            <div className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl space-y-4 border border-slate-200">
              <div className="flex items-center justify-between border-b pb-2">
                <span className="text-xs font-bold text-[#173F35] flex items-center space-x-1.5">
                  <Share2 className="w-4 h-4 text-[#D5AD59]" />
                  <span>Scripture Share Card</span>
                </span>
                <button onClick={() => setShareVerseModal(null)} className="text-slate-400 hover:text-slate-700">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Graphic Card Preview with Pilgrim Emblem */}
              <div className="p-6 rounded-3xl bg-[#173F35] text-white shadow-inner space-y-3 relative overflow-hidden border border-[#D5AD59]/30">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#D5AD59]/10 rounded-full blur-xl pointer-events-none" />
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <TransformerEmblem size="sm" />
                    <span className="text-[10px] font-serif font-black tracking-widest text-[#D5AD59]">TRANSFORMER</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-[#D5AD59] bg-black/30 px-2 py-0.5 rounded-md">
                    {shareVerseModal.ref}
                  </span>
                </div>
                <blockquote className="font-serif text-sm italic leading-relaxed text-amber-50">
                  “{shareVerseModal.text}”
                </blockquote>
                <p className="font-serif text-xs leading-relaxed text-white/80 pt-1 border-t border-white/10">
                  {shareVerseModal.ml}
                </p>
                <div className="flex items-center justify-between pt-1 text-[9px] text-white/60 uppercase tracking-widest font-mono">
                  <span>Transform your mind</span>
                  <span>Strengthen your faith</span>
                </div>
              </div>

              <button
                onClick={() => {
                  navigator.clipboard?.writeText(`"${shareVerseModal.text}" — ${shareVerseModal.ref}\n${shareVerseModal.ml}\n(Transformer App)`);
                  showToast('Verse text copied for sharing!');
                  setShareVerseModal(null);
                }}
                className="w-full py-2.5 rounded-xl bg-[#173F35] text-[#D5AD59] font-bold text-xs flex items-center justify-center space-x-1.5 shadow-sm hover:bg-[#1f4e42] transition"
              >
                <Copy className="w-4 h-4" />
                <span>Copy Share Text</span>
              </button>
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* MODAL: PRINCIPLE DEEP DIVE                                         */}
        {/* =================================================================== */}
        {activePrincipleModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
            <div className="w-full max-w-sm bg-[#F6F0E3] rounded-3xl p-5 shadow-2xl space-y-3.5 border border-[#E7DEC8] max-h-[85vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-black/10 pb-2">
                <span className="text-[10px] font-mono font-bold text-[#173F35] bg-white px-2 py-0.5 rounded">
                  Principle #{activePrincipleModal.id}
                </span>
                <button onClick={() => setActivePrincipleModal(null)} className="text-slate-500 hover:text-black">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div>
                <h3 className="font-serif font-black text-base text-[#173F35]">
                  {activePrincipleModal.title}
                </h3>
                <span className="text-xs font-serif font-bold text-[#B88F3E]">
                  {activePrincipleModal.ref}
                </span>
              </div>

              <blockquote className="p-3 bg-white/70 rounded-2xl border border-[#E7DEC8] font-serif text-xs italic text-slate-800 leading-relaxed">
                "{activePrincipleModal.scriptureText}"
              </blockquote>

              <div className="space-y-1 text-xs">
                <strong className="text-[#173F35]">Biblical Meaning:</strong>
                <p className="text-slate-700 leading-relaxed">{activePrincipleModal.meaning}</p>
              </div>

              <div className="p-3 bg-white rounded-2xl border border-[#E7DEC8] space-y-1 text-xs">
                <strong className="text-[#173F35]">Practical Daily Habit:</strong>
                <p className="text-slate-800">{activePrincipleModal.action}</p>
              </div>

              <button
                onClick={() => {
                  setActivePrincipleModal(null);
                  showToast(`Practicing "${activePrincipleModal.title}" today!`);
                }}
                className="w-full py-2.5 rounded-xl bg-[#173F35] text-[#D5AD59] font-bold text-xs shadow-sm hover:bg-[#1f4e42] transition"
              >
                Apply This Principle Today
              </button>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}

export default function App() {
  return <AuthGate>{({ signOutUser }) => <AppContent signOutUser={signOutUser} />}</AuthGate>;
}
