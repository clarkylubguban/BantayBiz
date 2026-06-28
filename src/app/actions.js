import {
  AlertCircle,
  ArrowDown,
  ArrowUp,
  CheckCircle2,
  ReceiptText,
  Send,
  ShoppingCart,
  Target,
  Upload,
  UsersRound
} from "lucide-react";

export const salaryActions = [
  {
    label: "Add Sweldo",
    detail: "Itala ang kita",
    color: "green",
    icon: ArrowUp,
    screen: "salary-add-sweldo"
  },
  {
    label: "Add Gastos",
    detail: "Itala ang gastos",
    color: "orange",
    icon: ArrowDown,
    screen: "salary-add-gastos"
  },
  {
    label: "Add Padala",
    detail: "Padala sa pamilya",
    color: "blue",
    icon: Send,
    screen: "salary-add-padala"
  },
  {
    label: "Ipon Goal",
    detail: "Para sa pangarap mo",
    color: "purple",
    icon: Target,
    screen: "salary-ipon"
  }
];

export const staffActions = [
  {
    label: "Add Sale",
    detail: "Itala ang benta",
    color: "green",
    icon: ShoppingCart,
    screen: "staff-add-sale"
  },
  {
    label: "Add Expense",
    detail: "Itala ang gastos",
    color: "orange",
    icon: ArrowDown,
    screen: "staff-add-expense"
  },
  {
    label: "Upload Receipt",
    detail: "Kuhanan ng litrato",
    color: "blue",
    icon: Upload,
    screen: "staff-upload-receipt"
  },
  {
    label: "Close Day",
    detail: "Isumite sa owner",
    color: "pink",
    icon: CheckCircle2,
    screen: "staff-close-day"
  }
];

export const ownerStatusCards = [
  {
    label: "Pending Daily Close",
    value: "1",
    color: "orange",
    icon: AlertCircle,
    screen: "owner-review-close"
  },
  {
    label: "Pending Proof Review",
    value: "2",
    color: "blue",
    icon: ReceiptText,
    screen: "owner-proofs"
  },
  {
    label: "Staff Active Today",
    value: "2/3",
    color: "pink",
    icon: UsersRound,
    screen: "owner-staff"
  }
];
