import {
  Banknote,
  CalendarCheck,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  Home,
  Landmark,
  ListChecks,
  LockKeyhole,
  MoreHorizontal,
  PiggyBank,
  ReceiptText,
  Send,
  ShieldCheck,
  Store,
  Target,
  TrendingDown,
  TrendingUp,
  Upload,
  UserRoundCheck,
  WalletCards
} from "lucide-react";

export const modes = [
  {
    id: "salary",
    label: "Salary Mode",
    title: "Libre habang buhay",
    subtitle: "Libre para sa personal budget",
    description: "Personal money, gastos, padala at ipon.",
    color: "purple",
    icon: WalletCards,
    status: "FREE",
    badgePulse: true
  },
  {
    id: "owner",
    label: "Business Owner",
    title: "Business Owner",
    subtitle: "Paid upgrade for owners",
    description: "Sales, reports, staff at daily close.",
    color: "green",
    icon: Store,
    featured: true
  },
  {
    id: "staff",
    label: "Staff / Katiwala Mode",
    title: "Staff / Katiwala Mode",
    subtitle: "For daily store updates",
    description: "Simple actions for sales, expenses, receipts, and closing.",
    color: "pink",
    icon: UserRoundCheck,
    status: "Staff",
    cta: "May Invite Code Ako"
  }
];

export const dashboardContent = {
  salary: {
    title: "Salary Mode",
    subtitle: "Hi Ana, kumusta budget today?",
    initial: "S",
    hero: {
      eyebrow: "Personal money guard",
      title: "PHP 18,650",
      detail: "Natitirang budget this month",
      color: "purple",
      icon: WalletCards
    },
    metrics: [
      { label: "Sweldo", value: "PHP 32,000", detail: "June total", color: "purple", icon: Banknote },
      { label: "Gastos", value: "PHP 9,850", detail: "Tracked this month", color: "orange", icon: TrendingDown },
      { label: "Padala", value: "PHP 3,500", detail: "Sent home", color: "blue", icon: Send }
    ],
    actions: [
      { label: "Add Sweldo", detail: "Itala ang bagong income", icon: TrendingUp, color: "purple" },
      { label: "Add Gastos", detail: "Para hindi malimutan", icon: ReceiptText, color: "orange" },
      { label: "Add Padala", detail: "Track family support", icon: Send, color: "blue" },
      { label: "Ipon Goal", detail: "PHP 8,000 of PHP 12,000", icon: Target, color: "purple" }
    ],
    statuses: [
      { label: "Free Mode", color: "purple" },
      { label: "4 goals active", color: "blue" }
    ],
    nav: [
      { label: "Dashboard", icon: Home },
      { label: "Transactions", icon: ReceiptText },
      { label: "Ipon", icon: Target },
      { label: "More", icon: MoreHorizontal }
    ]
  },
  owner: {
    title: "Owner Business",
    subtitle: "Cafe update, today",
    initial: "O",
    hero: {
      eyebrow: "Business cash today",
      title: "PHP 18,650",
      detail: "Net cash after expenses",
      color: "green",
      icon: Store
    },
    metrics: [
      { label: "Pending Daily Close", value: "1", detail: "Submitted by Jun", color: "orange", icon: Clock3 },
      { label: "Pending Proof Review", value: "2", detail: "Receipts to check", color: "blue", icon: Upload },
      { label: "Staff Active", value: "2/3", detail: "On shift today", color: "pink", icon: UserRoundCheck }
    ],
    actions: [
      {
        label: "Pending Daily Close",
        detail: "1 store waiting review",
        icon: Clock3,
        color: "orange",
        screen: "owner-review-close"
      },
      { label: "Proof Review", detail: "2 receipts to check", icon: Upload, color: "blue" },
      { label: "Cash Health", detail: "Looks steady today", icon: ShieldCheck, color: "green" },
      { label: "Upgrade Active", detail: "Owner tools enabled", icon: LockKeyhole, color: "green" }
    ],
    statuses: [
      { label: "Paid Upgrade", color: "green" },
      { label: "1 pending close", color: "orange" }
    ],
    nav: [
      { label: "Home", icon: Home },
      { label: "Approvals", icon: ClipboardCheck },
      { label: "Staff", icon: UserRoundCheck },
      { label: "Summary", icon: MoreHorizontal }
    ]
  },
  staff: {
    title: "Katiwala Mode",
    subtitle: "Daily store tasks",
    initial: "K",
    hero: {
      eyebrow: "Shift progress",
      title: "Almost done",
      detail: "Submit daily close before end of shift",
      color: "pink",
      icon: ClipboardCheck
    },
    metrics: [
      { label: "Sales Added", value: "PHP 12,450", detail: "Today so far", color: "pink", icon: Banknote },
      { label: "Gastos Added", value: "PHP 1,240", detail: "Needs receipt", color: "orange", icon: ReceiptText },
      { label: "Receipts", value: "4", detail: "Uploaded today", color: "blue", icon: Upload }
    ],
    actions: [
      { label: "Add Sale", detail: "Record store income", icon: Banknote, color: "pink", screen: "staff-add-sale" },
      { label: "Add Expense", detail: "Log daily gastos", icon: ReceiptText, color: "orange", screen: "staff-add-expense" },
      { label: "Upload Receipt", detail: "Proof for owner", icon: Upload, color: "blue", screen: "staff-upload-receipt" },
      { label: "Close Day", detail: "Submit daily close", icon: CalendarCheck, color: "pink", screen: "staff-close-day" }
    ],
    statuses: [
      { label: "Staff View", color: "pink" },
      { label: "Closing due today", color: "orange" }
    ],
    nav: [
      { label: "Home", icon: Home },
      { label: "Tasks", icon: ListChecks },
      { label: "Proof", icon: Upload },
      { label: "More", icon: MoreHorizontal }
    ]
  }
};

export const trustPoints = [
  { label: "Simple", color: "green", icon: CheckCircle2 },
  { label: "Clear", color: "blue", icon: ShieldCheck },
  { label: "Friendly", color: "pink", icon: PiggyBank }
];

export const staffFormScreens = {
  "staff-add-sale": {
    title: "Add Sale",
    subtitle: "Katiwala Mode",
    eyebrow: "Record income",
    heading: "Bagong benta",
    detail: "Quick entry para malinaw ang sales today.",
    icon: Banknote,
    color: "pink",
    buttonLabel: "Save Sale",
    fields: [
      { label: "Amount", value: "₱1,250" },
      { label: "Payment", value: "Cash" },
      { label: "Note", value: "Walk-in orders and iced coffee" }
    ]
  },
  "staff-add-expense": {
    title: "Add Expense",
    subtitle: "Katiwala Mode",
    eyebrow: "Log gastos",
    heading: "Bagong gastos",
    detail: "Itala agad para hindi mawala sa daily close.",
    icon: ReceiptText,
    color: "orange",
    buttonLabel: "Save Expense",
    fields: [
      { label: "Amount", value: "₱320" },
      { label: "Category", value: "Supplies" },
      { label: "Note", value: "Cups and tissue refill" }
    ]
  },
  "staff-upload-receipt": {
    title: "Upload Receipt",
    subtitle: "Katiwala Mode",
    eyebrow: "Proof for owner",
    heading: "Receipt proof",
    detail: "Attach proof para mabilis ma-check ng owner later.",
    icon: Upload,
    color: "blue",
    buttonLabel: "Save Receipt",
    fields: [
      { label: "Receipt file", value: "receipt_0627.jpg" },
      { label: "Linked item", value: "Supplies - ₱320" },
      { label: "Note", value: "Clear photo uploaded" }
    ]
  }
};

export const staffCloseDay = {
  title: "Close Day",
  subtitle: "Katiwala Mode",
  eyebrow: "Submit daily close",
  heading: "Daily close summary",
  detail: "Review muna bago ipasa sa owner.",
  icon: CalendarCheck,
  color: "pink",
  totals: [
    { label: "Total Sales", value: "₱12,450", color: "pink", icon: Banknote },
    { label: "Total Expenses", value: "₱3,890", color: "orange", icon: ReceiptText },
    { label: "Net Cash", value: "₱8,560", color: "blue", icon: WalletCards },
    { label: "Receipts Uploaded", value: "6", color: "blue", icon: Upload }
  ],
  note: "Complete po ang cash count and receipts today."
};

export const ownerDailyCloseReview = {
  title: "Review Daily Close",
  subtitle: "Owner Business",
  eyebrow: "For owner review",
  heading: "Jun's daily close",
  detail: "Submitted today at 8:42 PM",
  submittedBy: "Jun",
  submittedTime: "8:42 PM",
  staffNote: "Complete po ang cash count and receipts today.",
  icon: ClipboardCheck,
  color: "green",
  totals: [
    { label: "Total Sales", value: "₱12,450", color: "green", icon: Banknote },
    { label: "Total Expenses", value: "₱3,890", color: "orange", icon: ReceiptText },
    { label: "Net Cash", value: "₱8,560", color: "blue", icon: WalletCards },
    { label: "Receipts Uploaded", value: "6", color: "blue", icon: Upload }
  ],
  proofs: [
    { label: "Receipt 01", detail: "Supplies - ₱320", color: "blue", icon: ReceiptText },
    { label: "Receipt 02", detail: "Market run - ₱1,140", color: "orange", icon: ReceiptText },
    { label: "Receipt 03", detail: "Store items - ₱640", color: "blue", icon: Upload },
    { label: "Receipt 04", detail: "Cash proof", color: "green", icon: WalletCards }
  ]
};
